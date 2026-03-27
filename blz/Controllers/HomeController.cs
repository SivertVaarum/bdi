using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using blz.Models;
namespace blz.Controllers;


public class HomeController : Controller
{
    private Counter o = Counter.getInstance();

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Index()
    {
        ViewBag.Count = o.Number;
        return View();
    }
    public IActionResult Privacy()
    {
        return View();
    }
    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
    [HttpPost]
    public IActionResult Knapp()
    {
        o.incr();
        
        return RedirectToAction("Index");
    }
}
