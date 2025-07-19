using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PaymentApi.Models;

namespace PaymentApi.Controllers
{
  [Route("api/[controller]/[action]")]
  [ApiController]
  public class GeneralController : ControllerBase
  {
    private readonly PaymentDetailContex dbContext;

    public GeneralController(PaymentDetailContex dbContext)
    {
      this.dbContext = dbContext;
    }


    // GET: api/PaymentList
    [AllowAnonymous]
    [HttpGet]
    public async Task<IActionResult> GetPayments() {

      ResponseDto responseDto = new ResponseDto();
      responseDto.data = await dbContext.paymentDetails.ToListAsync();
      return Ok(responseDto);
    }


    // GET: api/PaymentDetail
    [AllowAnonymous]
    [HttpGet("{id}")]
    public async Task<IActionResult> GetPaymentDetail(int id) {

      ResponseDto responseDto = new ResponseDto();
      responseDto.data = await dbContext.paymentDetails.FindAsync(1);
      return Ok(responseDto);
    }
  }
}
