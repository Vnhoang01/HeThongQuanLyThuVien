import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authHeaders } from '../Utils/auth';
import { apiFetch } from '../Utils/api';
import { toVietnamese } from '../Utils/format';

const CategoryList = () => {

    // Gọi hàm điều hướng
    const navigate = useNavigate();

    // State lưu categories được gửi về
    const [categories, setCategories] = useState([]);

    // State quản lý trạng thái loading
    const [loading, setLoading] = useState(true);

    // Gọi API ngay khi component được chạy lần đầu
    useEffect(() => {
        fetch('http://localhost:8080/categories', { headers: { ...authHeaders() } })
            .then(response => response.json())
            .then(data => {
                setCategories(data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Lỗi tải dữ liệu", error);
                setLoading(false);
            })
    }, []);

    //Xóa bản ghi sau khi xác nhận
    const handleDelete = (category) => {
        if (!window.confirm(`Bạn có chắc muốn xóa thể loại "${category.Name}" không?`)) {
            return;
        }

        apiFetch(`http://localhost:8080/categories/${category.Id}`, {
            method: 'DELETE',
            headers: { ...authHeaders() }
        })
            .then(() => {
                //Xóa khỏi bảng hiển thị, không cần tải lại trang
                setCategories(prev => prev.filter(item => item.Id !== category.Id));
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
                    <h3 className="page-title">🗂️ Thể loại</h3>
                    <p className="page-subtitle">Danh sách thể loại sách trong thư viện</p>
                </div>

                <button
                    className="btn btn-primary add-btn"
                    onClick={() => navigate('/categories/create')}
                >
                    ＋ Thêm thể loại
                </button>
            </div>

            {/* Thẻ bảng danh sách */}
            <div className="table-card">

                <div className="table-card-header">
                    <span>Danh sách thể loại</span>
                    <span className="badge text-bg-primary">{categories.length}</span>
                </div>

                {loading ? (
                    <div className="loading-box">
                        <div className="spinner-border text-primary" role="status"></div>
                        <span>Đang tải dữ liệu...</span>
                    </div>
                ) : categories.length === 0 ? (
                    <div className="table-empty">
                        <div className="empty-icon">🗂️</div>
                        <p>Chưa có thể loại nào. Bấm "＋ Thêm thể loại" để bắt đầu.</p>
                    </div>
                ) : (
                    <div className="table-responsive">
                        <table className="table list-table align-middle mb-0">
                            <thead>
                                <tr>
                                    <th className="stt-cell">STT</th>
                                    <th>Mã</th>
                                    <th>Tên</th>
                                    <th>Mô tả</th>
                                    <th>Thao tác</th>
                                </tr>
                            </thead>

                            <tbody>
                                {categories.map((category, index) => (
                                    <tr key={category.Id}>
                                        <td className="stt-cell">{index + 1}</td>
                                        <td><span className="id-badge">{category.Id}</span></td>
                                        <td className="cell-strong">{toVietnamese(category.Name, true)}</td>
                                        <td>{toVietnamese(category.Description)}</td>
                                        <td>
                                            <div className="action-group">
                                                <button className="btn btn-sm btn-outline-primary"
                                                    onClick={() => navigate(`/categories/edit/${category.Id}`)}>
                                                    ✏️ Sửa
                                                </button>
                                                <button className="btn btn-sm btn-outline-danger"
                                                    onClick={() => handleDelete(category)}>
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

export default CategoryList;