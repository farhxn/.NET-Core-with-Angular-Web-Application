using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace PaymentApi.Models
{
    public class PaymentDetailContex : IdentityDbContext
    {
        public PaymentDetailContex(DbContextOptions<PaymentDetailContex> options) : base(options)
        {
            
        }
        public DbSet<PaymentDetail> paymentDetails { get; set; }
        public DbSet<AppUser> appUsers { get; set; }
    }
}
