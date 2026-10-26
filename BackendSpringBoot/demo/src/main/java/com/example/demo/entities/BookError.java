package com.example.demo.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "errors")
public class BookError {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;

    @Column
    private String Name;

    @Column
    private Double FineAmount;

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

    public Double getFineAmount() {
        return FineAmount;
    }

    public void setFineAmount(Double fineAmount) {
        FineAmount = fineAmount;
    }
}