package com.example.demo.Services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.Category;
import com.example.demo.Exceptions.DeleteRestrictedException;
import com.example.demo.Repositories.BookRepository;
import com.example.demo.Repositories.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {

    @Autowired
    public CategoryRepository categoryRepository;

    //Dùng để kiểm tra thể loại còn sách nào tham chiếu không
    @Autowired
    public BookRepository bookRepository;

    // Phương thức lấy tất cả bản ghi
    public List<Category> getAllCategory() {
        return categoryRepository.findAll();
    }

    // Phương thức lấy 1 bản ghi theo id
    public Category getCategoryById(Long Id) {
        return categoryRepository.findById(Id)
                .orElseThrow(() -> new RuntimeException("Không có category phù hợp"));
    }

    // Phương thức lưu dữ liệu
    public Category createCategory(Category category) {
        return categoryRepository.save(category);
    }

    // Phương thức sửa dữ liệu
    public Category updateCategory(Long Id, Category category) {

        Category existingCategory = this.getCategoryById(Id);

        existingCategory.setName(category.getName());
        existingCategory.setDescription(category.getDescription());

        return categoryRepository.save(existingCategory);
    }

    // Phương thức xóa dữ liệu
    // Thể loại còn sách tham chiếu thì không được xóa
    public Category deleteCategory(Long Id) {

        Category existingCategory = this.getCategoryById(Id);

        long soSach = bookRepository.countByCategoryId(Id);

        if (soSach > 0) {
            throw new DeleteRestrictedException("Không thể xóa thể loại \"" + existingCategory.getName()
                    + "\" vì còn " + soSach + " sách thuộc thể loại này. "
                    + "Vui lòng chuyển hoặc xóa các sách đó trước.");
        }

        categoryRepository.deleteById(Id);

        return existingCategory;
    }
}