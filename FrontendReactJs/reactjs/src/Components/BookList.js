import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authHeaders } from '../Utils/auth';
import { apiFetch } from '../Utils/api';
import { toVietnamese, formatStatus } from '../Utils/format';

const BookList = () => {

    // Gọi hàm điều hướng
    const navigate = useNavigate();

    // State lưu books được gửi về
    const [books, setBooks] = useState([]);

    // State quản lý trạng thái loading
    const [loading, setLoading] = useState(true);

    // Gọi API ngay khi component được chạy lần đầu
    useEffect(() => {
        apiFetch('http://localhost:8080/books', { headers: { ...authHeaders() } })
            .then(data => {
                setBooks(data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Lỗi tải dữ liệu", error);
                setLoading(false);
            })
    }, []);

    //Xóa bản ghi sau khi xác nhận
    const handleDelete = (book) => {
        if (!window.confirm(`Bạn có chắc muốn xóa sách "${book.Name}" không?`)) {
            return;
        }

        apiFetch(`http://localhost:8080/books/${book.Id}`, {
            method: 'DELETE',
            headers: { ...authHeaders() }
        })
            .then(() => {
                //Xóa khỏi bảng hiển thị, không cần tải lại trang
                setBooks(prev => prev.filter(item => item.Id !== book.Id));
            })
            .catch(error => {
                console.error('Lỗi xóa', error);
                //Hiển thị đúng thông báo do server trả về (VD: sách còn bản ghi sách)
                alert(error.message || 'Đã xảy ra lỗi khi xóa');
            });
    };



    return (
        <div className="list-page">

            {/* Đầu trang: tiêu đề + nút thêm mới */}
            <div className="page-header">
                <div>
                    <h3 className="page-title">📖 Sách</h3>
                    <p className="page-subtitle">Danh sách sách trong thư viện</p>
                </div>

                <button
                    className="btn btn-primary add-btn"
                    onClick={() => navigate('/books/create')}
                >
                    ＋ Thêm sách
                </button>
            </div>

            {/* Thẻ bảng danh sách */}
            <div className="table-card">

                <div className="table-card-header">
                    <span>Danh sách sách</span>
                    <span className="badge text-bg-primary">{books.length}</span>
                </div>

                {loading ? (
                    <div className="loading-box">
                        <div className="spinner-border text-primary" role="status"></div>
                        <span>Đang tải dữ liệu...</span>
                    </div>
                ) : books.length === 0 ? (
                    <div className="table-empty">
                        <div className="empty-icon">📖</div>
                        <p>Chưa có sách nào. Bấm "＋ Thêm sách" để bắt đầu.</p>
                    </div>
                ) : (
                    <div className="table-responsive">
                        <table className="table list-table align-middle mb-0">
                            <thead>
                                <tr>
                                    <th className="stt-cell">STT</th>
                                    <th>Mã</th>
                                    <th>Tên sách</th>
                                    <th>Thể loại</th>
                                    <th>Tác giả</th>
                                    <th>Nhà xuất bản</th>
                                    <th>Năm XB</th>
                                    <th>Tổng SL</th>
                                    <th>Còn lại</th>
                                    <th>Trạng thái</th>
                                    <th>Thao tác</th>
                                </tr>
                            </thead>

                            <tbody>
                                {books.map((book, index) => (
                                    <tr key={book.Id}>
                                        <td className="stt-cell">{index + 1}</td>
                                        <td><span className="id-badge">{book.Id}</span></td>
                                        <td className="cell-strong">{toVietnamese(book.Name, true)}</td>
                                        <td>{book.category ? toVietnamese(book.category.Name, true) : '-'}</td>
                                        <td>{book.author ? toVietnamese(book.author.Name, true) : '-'}</td>
                                        <td>{book.publisher ? toVietnamese(book.publisher.Name, true) : '-'}</td>
                                        <td>{book.YearOfPublication ?? '-'}</td>
                                        <td>{book.TotalQuantity ?? 0}</td>
                                        <td>{book.AvailableQuantity ?? 0}</td>
                                        <td>{formatStatus(book.Status)}</td>
                                        <td>
                                            <div className="action-group">
                                                <button className="btn btn-sm btn-outline-primary"
                                                    onClick={() => navigate(`/books/edit/${book.Id}`)}>
                                                    ✏️ Sửa
                                                </button>
                                                <button className="btn btn-sm btn-outline-danger"
                                                    onClick={() => handleDelete(book)}>
                                                    🗑️ Xóa
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

            </div>

        </div>
    );
};

export default BookList;
