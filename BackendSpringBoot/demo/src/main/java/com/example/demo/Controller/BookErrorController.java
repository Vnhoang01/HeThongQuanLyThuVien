package com.example.demo.Controller;

import com.example.demo.entities.BookError;
import com.example.demo.Services.BookErrorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/errors")
@CrossOrigin(origins = "*")
public class BookErrorController {

    @Autowired
    public BookErrorService bookErrorService;

    // Phương thức lấy toàn bộ dữ liệu
    @GetMapping
    public List<BookError> getAllBookError() {
        return bookErrorService.getAllBookError();
    }

    // Phương thức lấy 1 bản ghi
    @GetMapping("/{Id}")
    public BookError getBookErrorById(@PathVariable Long Id) {
        return bookErrorService.getBookErrorById(Id);
    }

    // Phương thức để thêm dữ liệu
    @PostMapping("/create")
    public String createBookError(@RequestBody BookError bookError) {
        bookErrorService.createBookError(bookError);
        return "Thêm thành công";
    }

    // Phương thức để sửa dữ liệu
    @PutMapping("/{Id}")
    public String updateBookError(
            @PathVariable Long Id,
            @RequestBody BookError bookError) {

        bookErrorService.updateBookError(Id, bookError);

        return "Sửa thành công";
    }

    // Phương thức để xóa dữ liệu
    @DeleteMapping("/{Id}")
    public String deleteBookError(@PathVariable Long Id) {

        bookErrorService.deleteBookError(Id);

        return "Xóa thành công";
    }
}