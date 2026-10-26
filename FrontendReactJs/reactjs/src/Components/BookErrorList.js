import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authHeaders } from '../Utils/auth';
import { apiFetch } from '../Utils/api';
import { toVietnamese, formatCurrency } from '../Utils/format';

const BookErrorList = () => {

    // Gọi hàm điều hướng
    const navigate = useNavigate();

    // State lưu errors được gửi về
    const [bookErrors, setBookErrors] = useState([]);

    // State quản lý trạng thái loading
    const [loading, setLoading] = useState(true);

    // Gọi API ngay khi component được chạy lần đầu
    useEffect(() => {
        fetch('http://localhost:8080/errors', { headers: { ...authHeaders() } })
            .then(response => response.json())
            .then(data => {
                setBookErrors(data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Lỗi tải dữ liệu", error);
                setLoading(false);
            })
    }, []);

    //Xóa bản ghi sau khi xác nhận
    const handleDelete = (bookError) => {
        if (!window.confirm(`Bạn có chắc muốn xóa lỗi sách "${bookError.Name}" không?`)) {
            return;
        }

        apiFetch(`http://localhost:8080/errors/${bookError.Id}`, {
            method: 'DELETE',
            headers: { ...authHeaders() }
        })
            .then(() => {
                setBookErrors(prev => prev.filter(item => item.Id !== bookError.Id));
            })
            .catch(error => {
                console.error('Lỗi xóa', error);
                //Hiển thị đúng thông báo do server trả về
                alert(error.message || 'Đã xảy ra lỗi khi xóa');
            });
    };

    return (
        <div className="list-page">

            {/* Đầu trang: tiêu đề + nút thêm mới */}
            <div className="page-header">
                <div>
                    <h3 className="page-title">⚠️ Lỗi sách</h3>
                    <p className="page-subtitle">Danh sách lỗi sách và mức tiền phạt</p>
                </div>

                <button
                    className="btn btn-primary add-btn"
                    onClick={() => navigate('/errors/create')}
                >
                    ＋ Thêm lỗi sách
                </button>
            </div>

            {/* Thẻ bảng danh sách */}
            <div className="table-card">

                <div className="table-card-header">
                    <span>Danh sách lỗi sách</span>
                    <span className="badge text-bg-primary">{bookErrors.length}</span>
                </div>

                {loading ? (
                    <div className="loading-box">
                        <div className="spinner-border text-primary" role="status"></div>
                        <span>Đang tải dữ liệu...</span>
                    </div>
                ) : bookErrors.length === 0 ? (
                    <div className="table-empty">
                        <div className="empty-icon">⚠️</div>
                        <p>Chưa có lỗi sách nào. Bấm "＋ Thêm lỗi sách" để bắt đầu.</p>
                    </div>
                ) : (
                    <div className="table-responsive">
                        <table className="table list-table align-middle mb-0">
                            <thead>
                                <tr>
                                    <th className="stt-cell">STT</th>
                                    <th>Mã</th>
                                    <th>Tên lỗi</th>
                                    <th>Tiền phạt</th>
                                    <th>Thao tác</th>
                                </tr>
                            </thead>

                            <tbody>
                                {bookErrors.map((bookError, index) => (
                                    <tr key={bookError.Id}>
                                        <td className="stt-cell">{index + 1}</td>
                                        <td><span className="id-badge">{bookError.Id}</span></td>
                                        <td className="cell-strong">{toVietnamese(bookError.Name, true)}</td>
                                        <td>{formatCurrency(bookError.FineAmount)}</td>
                                        <td>
                                            <div className="action-group">
                                                <button className="btn btn-sm btn-outline-primary"
                                                    onClick={() => navigate(`/errors/edit/${bookError.Id}`)}>
                                                    ✏️ Sửa
                                                </button>
                                                <button className="btn btn-sm btn-outline-danger"
                                                    onClick={() => handleDelete(bookError)}>
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
}

export default BookErrorList;