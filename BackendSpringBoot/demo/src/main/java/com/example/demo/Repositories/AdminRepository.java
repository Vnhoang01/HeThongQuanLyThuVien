package com.example.demo.Repositories;

import com.example.demo.entities.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

public interface AdminRepository extends JpaRepository<Admin, Long> {
    //Entity Admin viet thuoc tinh hoa (Email), dung @Query chi dinh dung ten de KHONG loi PathElementException
    @Query("SELECT a FROM Admin a WHERE a.Email = :email")
    Optional<Admin> findByEmail(@Param("email") String email);
}