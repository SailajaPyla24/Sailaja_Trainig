using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReaderService.Models;

namespace ReaderService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize]
    public class BooksController : ControllerBase
    {
        private readonly DIGITALBOOKSContext _context;

        public BooksController(DIGITALBOOKSContext context)
        {
            _context = context;
        }

        // GET: api/Books
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Book>>> GetBooks()
        {
            if (_context.Books == null)
            {
                return NotFound();
            }
            return await _context.Books.ToListAsync();
        }

        [HttpGet]
        [Route("SearchBook")]
        public async Task<ActionResult<IEnumerable<Book>>> SearchBook(string BName, string Author, string Publisher, DateTime publishedDate)
        {
            if (_context.Books == null)
            {
                return NotFound();
            }
            var userlist = await _context.UserTables.Where(x => x.UserName.Equals(Author)).ToListAsync();
            int userId = 0;
            if (userlist.Count() > 0)
                userId = userlist.Select(x => x.UserId).FirstOrDefault();
            var book = await _context.Books.Where(x => x.BookName.Equals(BName) && x.UserId == userId && x.Publisher == Publisher && x.PublishedDate == publishedDate).ToListAsync();
            if (book == null)
            {
                return NotFound();
            }
            else
            {
                foreach (var item in book)
                {
                    item.User = null;
                }
            }
            return book;
        }

        // GET: api/Books/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Book>> GetBook(int id)
        {
            if (_context.Books == null)
            {
                return NotFound();
            }
            var book = await _context.Books.FindAsync(id);

            if (book == null)
            {
                return NotFound();
            }

            return book;
        }
        //private bool BookWithAuthorExists(int id, int userID)
        //{
        //    return (_context.Books?.Any(e => e.BookId == id && e.UserId == userID)).GetValueOrDefault();
        //}

        //[HttpPut("UpdateBookStatus/{BookId}/{UserID}/{Status}")]
        //[Authorize]
        //public async Task<IActionResult> UpdateBookStatus(int BookId, int UserID, bool Status)
        //{
        //    if (BookId < 1)
        //    {
        //        return BadRequest();
        //    }

        //    if (BookWithAuthorExists(BookId, UserID))
        //    {
        //        var book = _context.Books.Find(BookId);
        //        book.Active = Status;
        //        book.ModifiedDate = DateTime.Now;
        //        _context.Entry(book).State = EntityState.Modified;
        //        //context.Entry(user).State = Entitystate.Modified;
        //    }
        //    else
        //        return NotFound();

        //    try
        //    {
        //        _context.SaveChanges();
        //        await _context.SaveChangesAsync();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        if (!BookExists(BookId))
        //        {
        //            return NotFound();
        //        }
        //        else
        //        {
        //            throw;
        //        }
        //    }

        //    return NoContent();
        //}


        private bool BookExists(int id)
            {
                return (_context.Books?.Any(e => e.BookId == id)).GetValueOrDefault();
            }
        }
    }

