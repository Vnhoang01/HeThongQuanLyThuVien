package com.example.demo.Services;

import com.example.demo.entities.BookError;
import com.example.demo.Repositories.BookErrorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookErrorService {

    @Autowired
    public BookErrorRepository bookErrorRepository;

    // Phương thức lấy tất cả bản ghi
    public List<BookError> getAllBookError() {
        return bookErrorRepository.findAll();
    }

    // Phương thức lấy 1 bản ghi theo id
    public BookError getBookErrorById(Long Id) {
        return bookErrorRepository.findById(Id)
                .orElseThrow(() -> new RuntimeException("Không có lỗi phù hợp"));
    }

    // Phương thức lưu dữ liệu
    public BookError createBookError(BookError bookError) {
        return bookErrorRepository.save(bookError);
    }

    // Phương thức sửa dữ liệu
    public BookError updateBookError(Long Id, BookError bookError) {

        BookError existingBookError = this.getBookErrorById(Id);

        existingBookError.setName(bookError.getName());
        existingBookError.setFineAmount(bookError.getFineAmount());

        return bookErrorRepository.save(existingBookError);
    }

    // Phương thức xóa dữ liệu
    public BookError deleteBookError(Long Id) {

        BookError existingBookError = this.getBookErrorById(Id);

        bookErrorRepository.deleteById(Id);

        return existingBookError;
    }
}