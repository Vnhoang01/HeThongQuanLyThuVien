package com.example.demo.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "books")
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;

    @Column
    private String Name;

    @Column
    private Integer YearOfPublication;

    @Column(columnDefinition = "INT CHECK(total_quantity >= 0)")
    private Integer TotalQuantity;

    @Column(columnDefinition = "INT CHECK(available_quantity >= 0)")
    private Integer AvailableQuantity;

    @Column
    private String Status;

    @Column(columnDefinition = "TEXT")
    private String Description;

    // Nhiều Book thuộc 1 Category
    // EAGER: để JSON trả về đầy đủ thông tin thể loại (không có HibernateLazyInitializer)
    @ManyToOne(fetch = FetchType.EAGER)
    //Cột FK
    @JoinColumn(name = "category_id")
    private Category category;

    // Nhiều Book thuộc 1 Author
    @ManyToOne(fetch = FetchType.EAGER)
    //Cột FK
    @JoinColumn(name = "author_id")
    private Author author;

    // Nhiều Book thuộc 1 Publisher
    @ManyToOne(fetch = FetchType.EAGER)
    //Cột FK
    @JoinColumn(name = "publisher_id")
    private Publisher publisher;

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

    public Integer getYearOfPublication() {
        return YearOfPublication;
    }

    public void setYearOfPublication(Integer yearOfPublication) {
        YearOfPublication = yearOfPublication;
    }

    public Integer getTotalQuantity() {
        return TotalQuantity;
    }

    public void setTotalQuantity(Integer totalQuantity) {
        TotalQuantity = totalQuantity;
    }

    public Integer getAvailableQuantity() {
        return AvailableQuantity;
    }

    public void setAvailableQuantity(Integer availableQuantity) {
        AvailableQuantity = availableQuantity;
    }

    public String getStatus() {
        return Status;
    }

    public void setStatus(String status) {
        Status = status;
    }

    public String getDescription() {
        return Description;
    }

    public void setDescription(String description) {
        Description = description;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public Author getAuthor() {
        return author;
    }

    public void setAuthor(Author author) {
        this.author = author;
    }

    public Publisher getPublisher() {
        return publisher;
    }

    public void setPublisher(Publisher publisher) {
        this.publisher = publisher;
    }
}
