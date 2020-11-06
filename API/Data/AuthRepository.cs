using API.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Data
{
    public class AuthRepository : IAuthRepository
    {
        private readonly MyContext _myContext;

        public AuthRepository(MyContext myContext)
        {
            _myContext = myContext;
        }

        public async Task<User> Login(string username, string password)
        {
            // tambahin include photos, untuk memuat photourl saat di home.
            var user = await _myContext.Users.Include(p=> p.Photos).FirstOrDefaultAsync(x => x.Username == username);

            if (user == null)
                return null;

            if (!VerifyPasswordHash(password, user.PasswordHash, user.PasswordSalt)) // user.password connect dan berasal dari user.username
                return null; // jika user tidak cocok return null 

            return user; // jika username dan password cocok, login success dan return user
        }

        private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512(passwordSalt))
            {

                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password)); // password user dijadikan hash

                for(int i = 0; i < computedHash.Length; i++) // cek setiap karakter password hash
                {
                    if (computedHash[i] != passwordHash[i]) // jika computed hash tidak cocok dengan passwordHast(yang ada di database)
                        return false; // jika tidak cocok return false
                }

                return true;
            }

        }

        public async Task<User> Register(User user, string password)
        {
            byte[] passwordHash, passwordSalt; // define passwordHash and passwordSalt to byte[]
            CreatePasswordHash(password, out passwordHash, out passwordSalt); // buat password user menjadi Hash dan Salt

            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;

            await _myContext.Users.AddAsync(user);
            await _myContext.SaveChangesAsync();

            return user;
        }

        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using(var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        public async Task<bool> UserExists(string username)
        {
            if (await _myContext.Users.AnyAsync(x => x.Username == username))
                return true;

            return false;
        }


    }
}
