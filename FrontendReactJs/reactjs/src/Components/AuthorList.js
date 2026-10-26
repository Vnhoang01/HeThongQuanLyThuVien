import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authHeaders } from '../Utils/auth';
import { apiFetch } from '../Utils/api';
import { toVietnamese } from '../Utils/format';

const AuthorList = () => {

    // Gọi hàm điều hướng
    const navigate = useNavigate();

    // State lưu authors được gửi về
    const [authors, setAuthors] = useState([]);

    // State quản lý trạng thái loading
    const [loading, setLoading] = useState(true);

    // Gọi API ngay khi component được chạy lần đầu
    useEffect(() => {
        fetch('http://localhost:8080/authors', { headers: { ...authHeaders() } })
            .then(response => response.json())
            .then(data => {
                setAuthors(data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Lỗi tải dữ liệu", error);
                setLoading(false);
            })
    }, []);

    //Xóa bản ghi sau khi xác nhận
    const handleDelete = (author) => {
        if (!window.confirm(`Bạn có chắc muốn xóa tác giả "${author.Name}" không?`)) {
            return;
        }

        apiFetch(`http://localhost:8080/authors/${author.Id}`, {
            method: 'DELETE',
            headers: { ...authHeaders() }
        })
            .then(() => {
                setAuthors(prev => prev.filter(item => item.Id !== author.Id));
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
                    <h3 className="page-title">✍️ Tác giả</h3>
                    <p className="page-subtitle">Danh sách tác giả của thư viện</p>
                </div>

                <button
                    className="btn btn-primary add-btn"
                    onClick={() => navigate('/authors/create')}
                >
                    ＋ Thêm tác giả
                </button>
            </div>

            {/* Thẻ bảng danh sách */}
            <div className="table-card">

                <div className="table-card-header">
                    <span>Danh sách tác giả</span>
                    <span className="badge text-bg-primary">{authors.length}</span>
                </div>

                {loading ? (
                    <div className="loading-box">
                        <div className="spinner-border text-primary" role="status"></div>
                        <span>Đang tải dữ liệu...</span>
                    </div>
                ) : authors.length === 0 ? (
                    <div className="table-empty">
                        <div className="empty-icon">✍️</div>
                        <p>Chưa có tác giả nào. Bấm "＋ Thêm tác giả" để bắt đầu.</p>
                    </div>
                ) : (
                    <div className="table-responsive">
                        <table className="table list-table align-middle mb-0">
                            <thead>
                                <tr>
                                    <th className="stt-cell">STT</th>
                                    <th>Mã</th>
                                    <th>Tên</th>
                                    <th>Thao tác</th>
                                </tr>
                            </thead>

                            <tbody>
                                {authors.map((author, index) => (
                                    <tr key={author.Id}>
                                        <td className="stt-cell">{index + 1}</td>
                                        <td><span className="id-badge">{author.Id}</span></td>
                                        <td className="cell-strong">{toVietnamese(author.Name, true)}</td>
                                        <td>
                                            <div className="action-group">
                                                <button className="btn btn-sm btn-outline-primary"
                                                    onClick={() => navigate(`/authors/edit/${author.Id}`)}>
                                                    ✏️ Sửa
                                                </button>
                                                <button className="btn btn-sm btn-outline-danger"
                                                    onClick={() => handleDelete(author)}>
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

export default AuthorList;