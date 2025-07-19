namespace PaymentApi.Models
{
  public class ResponseDto
  {
    public Boolean isSuccess { get; set; } = true;
    public string message { get; set; } = "Successfull";

    public object data { get; set; }
  }
}
