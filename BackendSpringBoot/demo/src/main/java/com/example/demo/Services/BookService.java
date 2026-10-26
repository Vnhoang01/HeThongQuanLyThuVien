package com.example.demo.Services;

import com.example.demo.entities.Book;
import com.example.demo.Exceptions.DeleteRestrictedException;
import com.example.demo.Repositories.BookDetailRepository;
import com.example.demo.Repositories.BookRepository;
import com.example.demo.Repositories.CategoryRepository;
import com.example.demo.Repositories.AuthorRepository;
import com.example.demo.Repositories.PublisherRepository;
import com.example.demo.entities.Author;
import com.example.demo.entities.Category;
import com.example.demo.entities.Publisher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookService {

    @Autowired
    public BookRepository bookRepository;

    //Dùng để kiểm tra sách còn bản ghi (bản sách) nào tham chiếu không
    @Autowired
    public BookDetailRepository bookDetailRepository;

    //Các kho thể loại / tác giả / nhà xuất bản, dùng để tìm bản ghi theo Id khi thêm / sửa sách
    @Autowired
    public CategoryRepository categoryRepository;

    @Autowired
    public AuthorRepository authorRepository;

    @Autowired
    public PublisherRepository publisherRepository;

    // Phương thức lấy tất cả bản ghi
    public List<Book> getAllBook() {
        return bookRepository.findAll();
    }

    // Phương thức lấy 1 bản ghi theo id
    public Book getBookById(Long Id) {
        return bookRepository.findById(Id)
                .orElseThrow(() -> new RuntimeException("Không có book phù hợp"));
    }

    // Phương thức lưu dữ liệu
    public Book createBook(Book book) {

        //Tìm lại thể loại / tác giả / nhà xuất bản từ Id để không bị mất tên khi lưu
        applyRelations(book);

        return bookRepository.save(book);
    }

    // Phương thức sửa dữ liệu
    public Book updateBook(Long Id, Book book) {

        Book existingBook = this.getBookById(Id);

        existingBook.setName(book.getName());
        existingBook.setYearOfPublication(book.getYearOfPublication());
        existingBook.setTotalQuantity(book.getTotalQuantity());
        existingBook.setAvailableQuantity(book.getAvailableQuantity());
        existingBook.setStatus(book.getStatus());
        existingBook.setDescription(book.getDescription());

        //Chỉ cập nhật quan hệ khi frontend gửi kèm Id, nếu không thì giữ nguyên quan hệ cũ
        if (book.getCategory() != null) {
            existingBook.setCategory(resolveCategory(book.getCategory()));
        }

        if (book.getAuthor() != null) {
            existingBook.setAuthor(resolveAuthor(book.getAuthor()));
        }

        if (book.getPublisher() != null) {
            existingBook.setPublisher(resolvePublisher(book.getPublisher()));
        }

        return bookRepository.save(existingBook);
    }

    //Tìm bản ghi thể loại / tác giả / nhà xuất bản theo Id mà frontend gửi lên
    private void applyRelations(Book book) {

        if (book.getCategory() != null) {
            book.setCategory(resolveCategory(book.getCategory()));
        }

        if (book.getAuthor() != null) {
            book.setAuthor(resolveAuthor(book.getAuthor()));
        }

        if (book.getPublisher() != null) {
            book.setPublisher(resolvePublisher(book.getPublisher()));
        }
    }

    //Thể loại: lấy đúng bản ghi trong DB theo Id (nếu không có thì báo lỗi)
    private Category resolveCategory(Category category) {

        if (category.getId() == null) {
            throw new RuntimeException("Thể loại không hợp lệ");
        }

        return categoryRepository.findById(category.getId())
                .orElseThrow(() -> new RuntimeException("Không có thể loại phù hợp"));
    }

    //Tác giả: lấy đúng bản ghi trong DB theo Id
    private Author resolveAuthor(Author author) {

        if (author.getId() == null) {
            throw new RuntimeException("Tác giả không hợp lệ");
        }

        return authorRepository.findById(author.getId())
                .orElseThrow(() -> new RuntimeException("Không có tác giả phù hợp"));
    }

    //Nhà xuất bản: lấy đúng bản ghi trong DB theo Id
    private Publisher resolvePublisher(Publisher publisher) {

        if (publisher.getId() == null) {
            throw new RuntimeException("Nhà xuất bản không hợp lệ");
        }

        return publisherRepository.findById(publisher.getId())
                .orElseThrow(() -> new RuntimeException("Không có nhà xuất bản phù hợp"));
    }

    // Phương thức xóa dữ liệu
    // Sách còn bản ghi sách (book_details) thì không được xóa
    public Book deleteBook(Long Id) {

        Book existingBook = this.getBookById(Id);

        long soBanSach = bookDetailRepository.countByBookId(Id);

        if (soBanSach > 0) {
            throw new DeleteRestrictedException("Không thể xóa sách \"" + existingBook.getName()
                    + "\" vì còn " + soBanSach + " bản ghi sách thuộc cuốn sách này. "
                    + "Vui lòng xóa các bản ghi sách đó trước.");
        }

        bookRepository.deleteById(Id);

        return existingBook;
    }
}