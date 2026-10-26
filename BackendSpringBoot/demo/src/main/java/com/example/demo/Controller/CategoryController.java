package com.example.demo.Controller;

import com.example.demo.entities.Category;
import com.example.demo.Services.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
// Định nghĩa API
@RequestMapping("/categories")
@CrossOrigin(origins = "*")
public class CategoryController {

    @Autowired
    public CategoryService categoryService;

    // Phương thức lấy toàn bộ dữ liệu
    @GetMapping
    public List<Category> getAllCategory() {
        return categoryService.getAllCategory();
    }

    // Phương thức lấy 1 bản ghi
    @GetMapping("/{Id}")
    public Category getCategoryById(@PathVariable Long Id) {
        return categoryService.getCategoryById(Id);
    }

    // Phương thức để thêm dữ liệu
    @PostMapping("/create")
    public String createCategory(@RequestBody Category category) {
        categoryService.createCategory(category);
        return "Thêm thành công";
    }

    // Phương thức để sửa dữ liệu
    @PutMapping("/{Id}")
    public String updateCategory(
            @PathVariable Long Id,
            @RequestBody Category category) {

        categoryService.updateCategory(Id, category);

        return "Sửa thành công";
    }

    // Phương thức để xóa dữ liệu
    @DeleteMapping("/{Id}")
    public String deleteCategory(@PathVariable Long Id) {

        categoryService.deleteCategory(Id);

        return "Xóa thành công";
    }
}