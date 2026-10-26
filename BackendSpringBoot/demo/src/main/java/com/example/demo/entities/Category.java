package com.example.demo.entities;

import java.util.ArrayList;
import java.util.List;
import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnore;

//Định nghĩa Category là 1 entity tương ứng với bảng trong db
@Entity
//Cấu hình cho class này tương ứng với bảng có tên là categories trong db
@Table(name = "categories")
public class Category {

    //Pk, Auto_increment
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;

    //Attr name tương ứng với cột name trong db
    @Column
    private String Name;

    @Column(columnDefinition = "TEXT")
    private String Description;

    //Định nghĩa 1 category có nhiều book
    //@JsonIgnore: không trả danh sách book ngược lại để tránh vòng lặp JSON (book -> category -> books -> ...)
    @JsonIgnore
    @OneToMany(mappedBy = "category")
    private List<Book> books = new ArrayList<>();

    public Long getId() {
        return Id;
    }

    public void setId(Long id) {
        Id = id;
    }

    public String getName() {
        return Name;
    }

    public void setName(String name) {
        Name = name;
    }

    public String getDescription() {
        return Description;
    }

    public void setDescription(String description) {
        Description = description;
    }
}