package com.example.demo.Services;

import com.example.demo.entities.BookDetail;
import com.example.demo.Repositories.BookDetailRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookDetailService {

    @Autowired
    public BookDetailRepository bookDetailRepository;

    // Phương thức lấy tất cả bản ghi
    public List<BookDetail> getAllBookDetail() {
        return bookDetailRepository.findAll();
    }

    // Phương thức lấy 1 bản ghi theo id
    public BookDetail getBookDetailById(Long Id) {
        return bookDetailRepository.findById(Id)
                .orElseThrow(() -> new RuntimeException("Không có book detail phù hợp"));
    }

    // Phương thức lưu dữ liệu
    public BookDetail createBookDetail(BookDetail bookDetail) {
        return bookDetailRepository.save(bookDetail);
    }

    // Phương thức sửa dữ liệu
    public BookDetail updateBookDetail(Long Id, BookDetail bookDetail) {

        BookDetail existingBookDetail = this.getBookDetailById(Id);

        existingBookDetail.setBarcode(bookDetail.getBarcode());
        existingBookDetail.setName(bookDetail.getName());
        existingBookDetail.setStatus(bookDetail.getStatus());
        existingBookDetail.setBook(bookDetail.getBook());

        return bookDetailRepository.save(existingBookDetail);
    }

    // Phương thức xóa dữ liệu
    public BookDetail deleteBookDetail(Long Id) {

        BookDetail existingBookDetail = this.getBookDetailById(Id);

        bookDetailRepository.deleteById(Id);

        return existingBookDetail;
    }
}