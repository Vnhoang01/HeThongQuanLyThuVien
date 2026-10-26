import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authHeaders } from '../Utils/auth';
import { apiFetch } from '../Utils/api';
import { toVietnamese, formatDate, formatGender, formatStatus } from '../Utils/format';

const CustomerList = () => {

    // Gọi hàm điều hướng
    const navigate = useNavigate();

    // State lưu customers được gửi về
    const [customers, setCustomers] = useState([]);

    // State quản lý trạng thái loading
    const [loading, setLoading] = useState(true);

    // Gọi API ngay khi component được chạy lần đầu
    useEffect(() => {
        fetch('http://localhost:8080/customers', { headers: { ...authHeaders() } })
            .then(response => response.json())
            .then(data => {
                setCustomers(data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Lỗi tải dữ liệu", error);
                setLoading(false);
            })
    }, []);

    //Xóa bản ghi sau khi xác nhận
    const handleDelete = (customer) => {
        if (!window.confirm(`Bạn có chắc muốn xóa khách hàng "${customer.Name}" không?`)) {
            return;
        }

        apiFetch(`http://localhost:8080/customers/${customer.Id}`, {
            method: 'DELETE',
            headers: { ...authHeaders() }
        })
            .then(() => {
                setCustomers(prev => prev.filter(item => item.Id !== customer.Id));
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
                    <h3 className="page-title">👤 Khách hàng</h3>
                    <p className="page-subtitle">Danh sách khách hàng của thư viện</p>
                </div>

                <button
                    className="btn btn-primary add-btn"
                    onClick={() => navigate('/customers/create')}
                >
                    ＋ Thêm khách hàng
                </button>
            </div>

            {/* Thẻ bảng danh sách */}
            <div className="table-card">

                <div className="table-card-header">
                    <span>Danh sách khách hàng</span>
                    <span className="badge text-bg-primary">{customers.length}</span>
                </div>

                {loading ? (
                    <div className="loading-box">
                        <div className="spinner-border text-primary" role="status"></div>
                        <span>Đang tải dữ liệu...</span>
                    </div>
                ) : customers.length === 0 ? (
                    <div className="table-empty">
                        <div className="empty-icon">👤</div>
                        <p>Chưa có khách hàng nào. Bấm "＋ Thêm khách hàng" để bắt đầu.</p>
                    </div>
                ) : (
                    <div className="table-responsive">
                        <table className="table list-table align-middle mb-0">
                            <thead>
                                <tr>
                                    <th className="stt-cell">STT</th>
                                    <th>Mã</th>
                                    <th>Họ tên</th>
                                    <th>Ngày sinh</th>
                                    <th>Giới tính</th>
                                    <th>Email</th>
                                    <th>Số điện thoại</th>
                                    <th>Địa chỉ</th>
                                    <th>Trạng thái</th>
                                    <th>Thao tác</th>
                                </tr>
                            </thead>

                            <tbody>
                                {customers.map((customer, index) => (
                                    <tr key={customer.Id}>
                                        <td className="stt-cell">{index + 1}</td>
                                        <td><span className="id-badge">{customer.Id}</span></td>
                                        <td className="cell-strong">{toVietnamese(customer.Name, true)}</td>
                                        <td>{formatDate(customer.DateOfBirth)}</td>
                                        <td>{formatGender(customer.Gender)}</td>
                                        <td>{customer.Email}</td>
                                        <td>{customer.PhoneNumber}</td>
                                        <td>{toVietnamese(customer.Address, true)}</td>
                                        <td>{formatStatus(customer.Status)}</td>
                                        <td>
                                            <div className="action-group">
                                                <button className="btn btn-sm btn-outline-primary"
                                                    onClick={() => navigate(`/customers/edit/${customer.Id}`)}>
                                                    ✏️ Sửa
                                                </button>
                                                <button className="btn btn-sm btn-outline-danger"
                                                    onClick={() => handleDelete(customer)}>
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

export default CustomerList;