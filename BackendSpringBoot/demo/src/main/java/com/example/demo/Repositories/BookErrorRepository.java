package com.example.demo.Repositories;

import com.example.demo.entities.BookError;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookErrorRepository extends JpaRepository<BookError, Long> {
}