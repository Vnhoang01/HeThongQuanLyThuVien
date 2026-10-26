package com.example.demo.Services;

import com.example.demo.entities.Author;
import com.example.demo.Exceptions.DeleteRestrictedException;
import com.example.demo.Repositories.AuthorRepository;
import com.example.demo.Repositories.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AuthorService {

    @Autowired
    public AuthorRepository authorRepository;

    //Dùng để kiểm tra tác giả còn sách nào tham chiếu không
    @Autowired
    public BookRepository bookRepository;

    // Phương thức lấy tất cả bản ghi
    public List<Author> getAllAuthor() {
        return authorRepository.findAll();
    }

    // Phương thức lấy 1 bản ghi theo id
    public Author getAuthorById(Long Id) {
        return authorRepository.findById(Id)
                .orElseThrow(() -> new RuntimeException("Không có author phù hợp"));
    }

    // Phương thức lưu dữ liệu
    public Author createAuthor(Author author) {
        return authorRepository.save(author);
    }

    // Phương thức sửa dữ liệu
    public Author updateAuthor(Long Id, Author author) {

        Author existingAuthor = this.getAuthorById(Id);

        existingAuthor.setName(author.getName());

        return authorRepository.save(existingAuthor);
    }

    // Phương thức xóa dữ liệu
    // Tác giả còn sách tham chiếu thì không được xóa
    public Author deleteAuthor(Long Id) {

        Author existingAuthor = this.getAuthorById(Id);

        long soSach = bookRepository.countByAuthorId(Id);

        if (soSach > 0) {
            throw new DeleteRestrictedException("Không thể xóa tác giả \"" + existingAuthor.getName()
                    + "\" vì còn " + soSach + " sách của tác giả này. "
                    + "Vui lòng chuyển hoặc xóa các sách đó trước.");
        }

        authorRepository.deleteById(Id);

        return existingAuthor;
    }
}