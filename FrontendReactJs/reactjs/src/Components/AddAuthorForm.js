import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authHeaders } from '../Utils/auth';

const AddAuthorForm = () => {

    // Biến nhận name từ form
    const [name, setName] = useState('');

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        // Kiểm tra đã nhập Name hay chưa
        if (name.trim() === '') {
            alert("Không được để trống");
            return;
        }

        // Tạo biến mới để lưu
        const newAuthor = {
            Name: name
        };

        // Gọi API lưu
        fetch('http://localhost:8080/authors/create', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                ...authHeaders(),
            },
            body: JSON.stringify(newAuthor)
        })
            .then(response => {
                if (response.ok) {
                    alert("Thêm thành công");
                    navigate('/authors');
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
                    <h3 className="page-title">✍️ Thêm tác giả</h3>
                    <p className="page-subtitle">Tạo mới một tác giả</p>
                </div>
                <Link to="/authors" className="btn btn-outline-secondary">← Quay lại</Link>
            </div>

            <div className="form-card">
                <form onSubmit={handleSubmit}>

                    <div className="form-group">
                        <label className="form-label">Tên tác giả <span className="required-star">*</span></label>
                        <input className="form-control" type="text" placeholder="VD: Nguyễn Nhật Ánh" value={name}
                            onChange={(e) => setName(e.target.value)} />
                    </div>

                    <div className="form-actions">
                        <button type="submit" className="btn btn-primary">➕ Thêm mới</button>
                        <Link to="/authors" className="btn btn-outline-secondary">Hủy</Link>
                    </div>

                </form>
            </div>

        </div>
    );
}

export default AddAuthorForm;