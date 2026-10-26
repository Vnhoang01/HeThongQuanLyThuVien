package com.example.demo.Controller;

import com.example.demo.entities.Author;
import com.example.demo.Services.AuthorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/authors")
@CrossOrigin(origins = "*")
public class AuthorController {

    @Autowired
    public AuthorService authorService;

    // Phương thức lấy toàn bộ dữ liệu
    @GetMapping
    public List<Author> getAllAuthor() {
        return authorService.getAllAuthor();
    }

    // Phương thức lấy 1 bản ghi
    @GetMapping("/{Id}")
    public Author getAuthorById(@PathVariable Long Id) {
        return authorService.getAuthorById(Id);
    }

    // Phương thức để thêm dữ liệu
    @PostMapping("/create")
    public String createAuthor(@RequestBody Author author) {
        authorService.createAuthor(author);
        return "Thêm thành công";
    }

    // Phương thức để sửa dữ liệu
    @PutMapping("/{Id}")
    public String updateAuthor(
            @PathVariable Long Id,
            @RequestBody Author author) {

        authorService.updateAuthor(Id, author);

        return "Sửa thành công";
    }

    // Phương thức để xóa dữ liệu
    @DeleteMapping("/{Id}")
    public String deleteAuthor(@PathVariable Long Id) {

        authorService.deleteAuthor(Id);

        return "Xóa thành công";
    }
}