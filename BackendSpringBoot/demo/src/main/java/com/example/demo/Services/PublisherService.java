package com.example.demo.Services;

import com.example.demo.entities.Publisher;
import com.example.demo.Exceptions.DeleteRestrictedException;
import com.example.demo.Repositories.BookRepository;
import com.example.demo.Repositories.PublisherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PublisherService {

    @Autowired
    public PublisherRepository publisherRepository;

    //Dùng để kiểm tra nhà xuất bản còn sách nào tham chiếu không
    @Autowired
    public BookRepository bookRepository;

    // Phương thức lấy tất cả bản ghi
    public List<Publisher> getAllPublisher() {
        return publisherRepository.findAll();
    }

    // Phương thức lấy 1 bản ghi theo id
    public Publisher getPublisherById(Long Id) {
        return publisherRepository.findById(Id)
                .orElseThrow(() -> new RuntimeException("Không có publisher phù hợp"));
    }

    // Phương thức lưu dữ liệu
    public Publisher createPublisher(Publisher publisher) {
        return publisherRepository.save(publisher);
    }

    // Phương thức sửa dữ liệu
    public Publisher updatePublisher(Long Id, Publisher publisher) {

        Publisher existingPublisher = this.getPublisherById(Id);

        existingPublisher.setName(publisher.getName());
        existingPublisher.setAddress(publisher.getAddress());
        existingPublisher.setPhoneNumber(publisher.getPhoneNumber());

        return publisherRepository.save(existingPublisher);
    }

    // Phương thức xóa dữ liệu
    // Nhà xuất bản còn sách tham chiếu thì không được xóa
    public Publisher deletePublisher(Long Id) {

        Publisher existingPublisher = this.getPublisherById(Id);

        long soSach = bookRepository.countByPublisherId(Id);

        if (soSach > 0) {
            throw new DeleteRestrictedException("Không thể xóa nhà xuất bản \"" + existingPublisher.getName()
                    + "\" vì còn " + soSach + " sách của nhà xuất bản này. "
                    + "Vui lòng chuyển hoặc xóa các sách đó trước.");
        }

        publisherRepository.deleteById(Id);

        return existingPublisher;
    }
}