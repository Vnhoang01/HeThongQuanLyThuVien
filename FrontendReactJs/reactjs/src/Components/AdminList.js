import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authHeaders } from '../Utils/auth';
import { apiFetch } from '../Utils/api';
import { toVietnamese, formatRole } from '../Utils/format';

const AdminList = () => {

    // Gọi hàm điều hướng
    const navigate = useNavigate();

    // State lưu admins được gửi về
    const [admins, setAdmins] = useState([]);

    // State quản lý trạng thái loading
    const [loading, setLoading] = useState(true);

    // Gọi API ngay khi component được chạy lần đầu
    useEffect(() => {
        fetch('http://localhost:8080/admins', { headers: { ...authHeaders() } })
            .then(response => response.json())
            .then(data => {
                setAdmins(data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Lỗi tải dữ liệu", error);
                setLoading(false);
            })
    }, []);

    //Xóa bản ghi sau khi xác nhận
    const handleDelete = (admin) => {
        if (!window.confirm(`Bạn có chắc muốn xóa tài khoản "${admin.Email}" không?`)) {
            return;
        }

        apiFetch(`http://localhost:8080/admins/${admin.Id}`, {
            method: 'DELETE',
            headers: { ...authHeaders() }
        })
            .then(() => {
                setAdmins(prev => prev.filter(item => item.Id !== admin.Id));
            })
            .catch(error => {
                console.error('Lỗi xóa', error);
                //Hiển thị đúng thông báo do server trả về (VD: admin còn phiếu mượn đã duyệt)
                alert(error.message || 'Đã xảy ra lỗi khi xóa');
            });
    };

    return (
        <div className="list-page">

            {/* Đầu trang: tiêu đề + nút thêm mới */}
            <div className="page-header">
                <div>
                    <h3 className="page-title">🔑 Tài khoản admin</h3>
                    <p className="page-subtitle">Danh sách tài khoản quản trị hệ thống</p>
                </div>

                <button
                    className="btn btn-primary add-btn"
                    onClick={() => navigate('/admins/create')}
                >
                    ＋ Thêm admin
                </button>
            </div>

            {/* Thẻ bảng danh sách */}
            <div className="table-card">

                <div className="table-card-header">
                    <span>Danh sách tài khoản admin</span>
                    <span className="badge text-bg-primary">{admins.length}</span>
                </div>

                {loading ? (
                    <div className="loading-box">
                        <div className="spinner-border text-primary" role="status"></div>
                        <span>Đang tải dữ liệu...</span>
                    </div>
                ) : admins.length === 0 ? (
                    <div className="table-empty">
                        <div className="empty-icon">🔑</div>
                        <p>Chưa có tài khoản admin nào. Bấm "＋ Thêm admin" để bắt đầu.</p>
                    </div>
                ) : (
                    <div className="table-responsive">
                        <table className="table list-table align-middle mb-0">
                            <thead>
                                <tr>
                                    <th className="stt-cell">STT</th>
                                    <th>Mã</th>
                                    <th>Họ tên</th>
                                    <th>Email</th>
                                    <th>Số điện thoại</th>
                                    <th>Vai trò</th>
                                    <th>Thao tác</th>
                                </tr>
                            </thead>

                            <tbody>
                                {admins.map((admin, index) => (
                                    <tr key={admin.Id}>
                                        <td className="stt-cell">{index + 1}</td>
                                        <td><span className="id-badge">{admin.Id}</span></td>
                                        <td className="cell-strong">{toVietnamese(admin.Name, true)}</td>
                                        <td>{admin.Email}</td>
                                        <td>{admin.PhoneNumber}</td>
                                        <td>{formatRole(admin.Role)}</td>
                                        <td>
                                            <div className="action-group">
                                                <button className="btn btn-sm btn-outline-primary"
                                                    onClick={() => navigate(`/admins/edit/${admin.Id}`)}>
                                                    ✏️ Sửa
                                                </button>
                                                <button className="btn btn-sm btn-outline-danger"
                                                    onClick={() => handleDelete(admin)}>
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

export default AdminList;