package com.example.demo.Controller;

import com.example.demo.entities.Publisher;
import com.example.demo.Services.PublisherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/publishers")
@CrossOrigin(origins = "*")
public class PublisherController {

    @Autowired
    public PublisherService publisherService;

    // Phương thức lấy toàn bộ dữ liệu
    @GetMapping
    public List<Publisher> getAllPublisher() {
        return publisherService.getAllPublisher();
    }

    // Phương thức lấy 1 bản ghi
    @GetMapping("/{Id}")
    public Publisher getPublisherById(@PathVariable Long Id) {
        return publisherService.getPublisherById(Id);
    }

    // Phương thức để thêm dữ liệu
    @PostMapping("/create")
    public String createPublisher(@RequestBody Publisher publisher) {
        publisherService.createPublisher(publisher);
        return "Thêm thành công";
    }

    // Phương thức để sửa dữ liệu
    @PutMapping("/{Id}")
    public String updatePublisher(
            @PathVariable Long Id,
            @RequestBody Publisher publisher) {

        publisherService.updatePublisher(Id, publisher);

        return "Sửa thành công";
    }

    // Phương thức để xóa dữ liệu
    @DeleteMapping("/{Id}")
    public String deletePublisher(@PathVariable Long Id) {

        publisherService.deletePublisher(Id);

        return "Xóa thành công";
    }
}