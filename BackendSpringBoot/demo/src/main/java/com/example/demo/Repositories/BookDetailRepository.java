package com.example.demo.Repositories;

import com.example.demo.entities.BookDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface BookDetailRepository extends JpaRepository<BookDetail, Long> {

    //Đếm số bản ghi (bản sách) của 1 cuốn sách (dùng để chặn xóa sách khi còn bản ghi)
    @Query("SELECT COUNT(d) FROM BookDetail d WHERE d.book.id = :bookId")
    long countByBookId(@Param("bookId") Long bookId);
}