using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReaderService.Models;
using UserService.Models;

namespace ReaderService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PurchasesController : ControllerBase
    {
        private readonly DIGITALBOOKSContext _context;

        public PurchasesController(DIGITALBOOKSContext context)
        {
            _context = context;
        }

        // GET: api/Purchases
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Purchase>>> GetPurchases()
        {
          if (_context.Purchases == null)
          {
              return NotFound();
          }
            return await _context.Purchases.ToListAsync();
        }

        // GET: api/Purchases/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Purchase>> GetPurchase(int id)
        {
          if (_context.Purchases == null)
          {
              return NotFound();
          }
            var purchase = await _context.Purchases.FindAsync(id);

            if (purchase == null)
            {
                return NotFound();
            }

            return purchase;
        }

        // Get purchased book history
        [HttpGet]
        [Route("GetPurchasedBookHistory")]
        public List<BookHistoryViewModel> GetPurchasedBookHistory(string EmailId)
        {
            List<BookHistoryViewModel> lsBookHistory = new List<BookHistoryViewModel>();
            if (_context.Purchases == null)
            {
                return lsBookHistory;
            }

            lsBookHistory = (from purchase in _context.Purchases
                             join book in _context.Books on purchase.BookId equals book.BookId
                             where purchase.EmailId == EmailId && book.Active == true
                             select new
                             {
                                 purchaseId = purchase.PurchaseId,
                                 bookId = book.BookId,
                                 bookName = book.BookName
                             }).ToList()
                     .Select(x => new BookHistoryViewModel()
                     {
                         PurchaseId = x.purchaseId,
                         BookId = x.bookId,
                         BookName = x.bookName
                     }).ToList();

            return lsBookHistory;
        }
        // PUT: api/Purchases/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPurchase(int id, Purchase purchase)
        {
            if (id != purchase.PurchaseId)
            {
                return BadRequest();
            }

            _context.Entry(purchase).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PurchaseExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Purchases
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        //[HttpPost]
        //public async Task<ActionResult<Purchase>> PostPurchase(Purchase purchase)
        //{
        //  if (_context.Purchases == null)
        //  {
        //      return Problem("Entity set 'DIGITALBOOKSContext.Purchases'  is null.");
        //  }
        //    _context.Purchases.Add(purchase);
        //    await _context.SaveChangesAsync();

        //    return CreatedAtAction("GetPurchase", new { id = purchase.PurchaseId }, purchase);
        //}

        [HttpPost]
        public async Task<ActionResult<Purchase>> PostPurchase(Purchase purchase)
        {
            if (_context.Purchases == null)
            {
                return Problem("Entity set 'DigitalBooksContext.Purchases'  is null.");
            }



            var count = _context.Purchases.Where(x => x.EmailId == purchase.EmailId && x.BookId == purchase.BookId).Count();
            if (count == 0)
            {
                bool result = purchase.callPaymentAuzreFunPost();



                if (result)
                    return Ok(purchase);
                else
                    return BadRequest("Something went wrong");
            }
            else
            {
                return Problem("Purchase Already Exists");
            }
        }

        // DELETE: api/Purchases/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePurchase(int id)
        {
            if (_context.Purchases == null)
            {
                return NotFound();
            }
            var purchase = await _context.Purchases.FindAsync(id);
            if (purchase == null)
            {
                return NotFound();
            }

            _context.Purchases.Remove(purchase);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PurchaseExists(int id)
        {
            return (_context.Purchases?.Any(e => e.PurchaseId == id)).GetValueOrDefault();
        }
    }
}
