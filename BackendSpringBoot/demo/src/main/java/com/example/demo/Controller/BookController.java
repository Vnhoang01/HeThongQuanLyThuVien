package com.example.demo.Controller;

import com.example.demo.entities.Book;
import com.example.demo.Services.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
// Định nghĩa API
@RequestMapping("/books")
@CrossOrigin(origins = "*")
public class BookController {

    @Autowired
    public BookService bookService;

    // Phương thức lấy toàn bộ dữ liệu
    @GetMapping
    public List<Book> getAllBook() {
        return bookService.getAllBook();
    }

    // Phương thức lấy 1 bản ghi
    @GetMapping("/{Id}")
    public Book getBookById(@PathVariable Long Id) {
        return bookService.getBookById(Id);
    }

    // Phương thức để thêm dữ liệu
    @PostMapping("/create")
    public String createBook(@RequestBody Book book) {
        bookService.createBook(book);
        return "Thêm thành công";
    }

    // Phương thức để sửa dữ liệu
    @PutMapping("/{Id}")
    public String updateBook(
            @PathVariable Long Id,
            @RequestBody Book book) {

        bookService.updateBook(Id, book);

        return "Sửa thành công";
    }

    // Phương thức để xóa dữ liệu
    @DeleteMapping("/{Id}")
    public String deleteBook(@PathVariable Long Id) {

        bookService.deleteBook(Id);

        return "Xóa thành công";
    }
}