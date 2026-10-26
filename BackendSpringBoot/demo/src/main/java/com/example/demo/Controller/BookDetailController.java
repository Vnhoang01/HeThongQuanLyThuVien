package com.example.demo.Controller;

import com.example.demo.entities.BookDetail;
import com.example.demo.Services.BookDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
// Định nghĩa API
@RequestMapping("/book-details")
@CrossOrigin(origins = "*")
public class BookDetailController {

    @Autowired
    public BookDetailService bookDetailService;

    // Phương thức lấy toàn bộ dữ liệu
    @GetMapping
    public List<BookDetail> getAllBookDetail() {
        return bookDetailService.getAllBookDetail();
    }

    // Phương thức lấy 1 bản ghi
    @GetMapping("/{Id}")
    public BookDetail getBookDetailById(@PathVariable Long Id) {
        return bookDetailService.getBookDetailById(Id);
    }

    // Phương thức để thêm dữ liệu
    @PostMapping("/create")
    public String createBookDetail(@RequestBody BookDetail bookDetail) {
        bookDetailService.createBookDetail(bookDetail);
        return "Thêm thành công";
    }

    // Phương thức để sửa dữ liệu
    @PutMapping("/{Id}")
    public String updateBookDetail(
            @PathVariable Long Id,
            @RequestBody BookDetail bookDetail) {

        bookDetailService.updateBookDetail(Id, bookDetail);

        return "Sửa thành công";
    }

    // Phương thức để xóa dữ liệu
    @DeleteMapping("/{Id}")
    public String deleteBookDetail(@PathVariable Long Id) {

        bookDetailService.deleteBookDetail(Id);

        return "Xóa thành công";
    }
}