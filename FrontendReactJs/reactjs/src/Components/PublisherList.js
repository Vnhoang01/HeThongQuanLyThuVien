import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authHeaders } from '../Utils/auth';
import { apiFetch } from '../Utils/api';
import { toVietnamese } from '../Utils/format';

const PublisherList = () => {

    // Gọi hàm điều hướng
    const navigate = useNavigate();

    // State lưu publishers được gửi về
    const [publishers, setPublishers] = useState([]);

    // State quản lý trạng thái loading
    const [loading, setLoading] = useState(true);

    // Gọi API ngay khi component được chạy lần đầu
    useEffect(() => {
        fetch('http://localhost:8080/publishers', { headers: { ...authHeaders() } })
            .then(response => response.json())
            .then(data => {
                setPublishers(data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Lỗi tải dữ liệu", error);
                setLoading(false);
            })
    }, []);

    //Xóa bản ghi sau khi xác nhận
    const handleDelete = (publisher) => {
        if (!window.confirm(`Bạn có chắc muốn xóa nhà xuất bản "${publisher.Name}" không?`)) {
            return;
        }

        apiFetch(`http://localhost:8080/publishers/${publisher.Id}`, {
            method: 'DELETE',
            headers: { ...authHeaders() }
        })
            .then(() => {
                setPublishers(prev => prev.filter(item => item.Id !== publisher.Id));
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
                    <h3 className="page-title">🏢 Nhà xuất bản</h3>
                    <p className="page-subtitle">Danh sách nhà xuất bản của thư viện</p>
                </div>

                <button
                    className="btn btn-primary add-btn"
                    onClick={() => navigate('/publishers/create')}
                >
                    ＋ Thêm nhà xuất bản
                </button>
            </div>

            {/* Thẻ bảng danh sách */}
            <div className="table-card">

                <div className="table-card-header">
                    <span>Danh sách nhà xuất bản</span>
                    <span className="badge text-bg-primary">{publishers.length}</span>
                </div>

                {loading ? (
                    <div className="loading-box">
                        <div className="spinner-border text-primary" role="status"></div>
                        <span>Đang tải dữ liệu...</span>
                    </div>
                ) : publishers.length === 0 ? (
                    <div className="table-empty">
                        <div className="empty-icon">🏢</div>
                        <p>Chưa có nhà xuất bản nào. Bấm "＋ Thêm nhà xuất bản" để bắt đầu.</p>
                    </div>
                ) : (
                    <div className="table-responsive">
                        <table className="table list-table align-middle mb-0">
                            <thead>
                                <tr>
                                    <th className="stt-cell">STT</th>
                                    <th>Mã</th>
                                    <th>Tên</th>
                                    <th>Địa chỉ</th>
                                    <th>Số điện thoại</th>
                                    <th>Thao tác</th>
                                </tr>
                            </thead>

                            <tbody>
                                {publishers.map((publisher, index) => (
                                    <tr key={publisher.Id}>
                                        <td className="stt-cell">{index + 1}</td>
                                        <td><span className="id-badge">{publisher.Id}</span></td>
                                        <td className="cell-strong">{toVietnamese(publisher.Name, true)}</td>
                                        <td>{toVietnamese(publisher.Address, true)}</td>
                                        <td>{publisher.PhoneNumber}</td>
                                        <td>
                                            <div className="action-group">
                                                <button className="btn btn-sm btn-outline-primary"
                                                    onClick={() => navigate(`/publishers/edit/${publisher.Id}`)}>
                                                    ✏️ Sửa
                                                </button>
                                                <button className="btn btn-sm btn-outline-danger"
                                                    onClick={() => handleDelete(publisher)}>
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

export default PublisherList;