﻿using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace PaymentApi.Models
{
    public class AppUser : IdentityUser
    {
        [PersonalData]
        [Column(TypeName = "nvarchar(150)")]
       public string FullName { get; set; } = "";
        
        [PersonalData]
        [Column(TypeName = "nvarchar(10)")]
       public string Gender { get; set; } = "";

        [PersonalData]
       public DateTime DOB { get; set; }

        [PersonalData]
       public int? LibraryID { get; set; }
    }
}
