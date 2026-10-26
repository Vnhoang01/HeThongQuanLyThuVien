import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authHeaders } from '../Utils/auth';

const AddCategoryForm = () => {

    // Biến nhận name từ form
    const [name, setName] = useState('');

    // Biến nhận description từ form
    const [description, setDescription] = useState('');

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        // Kiểm tra đã nhập Name hay chưa
        if (name.trim() === '') {
            alert("Không được để trống");
            return;
        }

        // Tạo biến mới để lưu
        const newCategory = {
            Name: name,
            Description: description
        };

        // Gọi API lưu
        fetch('http://localhost:8080/categories/create', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                ...authHeaders(),
            },
            body: JSON.stringify(newCategory)
        })
            .then(response => {
                if (response.ok) {
                    alert("Thêm thành công");
                    navigate('/categories');
                } else {
                    alert("Thêm thất bại");
                }
            })
            .catch(error => {
                console.error("Lỗi ", error);
                alert("Đã xảy ra lỗi");
            });
    }

    return (
        <div className="list-page">

            <div className="page-header">
                <div>
                    <h3 className="page-title">🗂️ Thêm thể loại</h3>
                    <p className="page-subtitle">Tạo mới một thể loại sách</p>
                </div>
                <Link to="/categories" className="btn btn-outline-secondary">← Quay lại</Link>
            </div>

            <div className="form-card">
                <form onSubmit={handleSubmit}>

                    <div className="form-group">
                        <label className="form-label">Tên thể loại <span className="required-star">*</span></label>
                        <input className="form-control" type="text" placeholder="VD: Sách giải trí" value={name}
                            onChange={(e) => setName(e.target.value)} />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Mô tả</label>
                        <textarea className="form-control" rows="3" placeholder="Mô tả ngắn về thể loại này"
                            value={description} onChange={(e) => setDescription(e.target.value)} />
                    </div>

                    <div className="form-actions">
                        <button type="submit" className="btn btn-primary">➕ Thêm mới</button>
                        <Link to="/categories" className="btn btn-outline-secondary">Hủy</Link>
                    </div>

                </form>
            </div>

        </div>
    );
}

export default AddCategoryForm;