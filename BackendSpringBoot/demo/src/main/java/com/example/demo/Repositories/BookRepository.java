package com.example.demo.Repositories;

import com.example.demo.entities.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface BookRepository extends JpaRepository<Book, Long> {

    //Đếm số sách thuộc 1 thể loại (dùng để chặn xóa thể loại khi còn sách liên kết)
    @Query("SELECT COUNT(b) FROM Book b WHERE b.category.id = :categoryId")
    long countByCategoryId(@Param("categoryId") Long categoryId);

    //Đếm số sách thuộc 1 tác giả (dùng để chặn xóa tác giả khi còn sách liên kết)
    @Query("SELECT COUNT(b) FROM Book b WHERE b.author.id = :authorId")
    long countByAuthorId(@Param("authorId") Long authorId);

    //Đếm số sách thuộc 1 nhà xuất bản (dùng để chặn xóa nhà xuất bản khi còn sách liên kết)
    @Query("SELECT COUNT(b) FROM Book b WHERE b.publisher.id = :publisherId")
    long countByPublisherId(@Param("publisherId") Long publisherId);
}