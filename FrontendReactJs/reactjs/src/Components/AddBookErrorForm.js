import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authHeaders } from '../Utils/auth';

const AddBookErrorForm = () => {

    // Các biến nhận dữ liệu từ form
    const [name, setName] = useState('');
    const [fineAmount, setFineAmount] = useState('');

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        // Kiểm tra đã nhập Name hay chưa
        if (name.trim() === '') {
            alert("Không được để trống");
            return;
        }

        // Tạo biến mới để lưu
        const newBookError = {
            Name: name,
            FineAmount: fineAmount
        };

        // Gọi API lưu
        fetch('http://localhost:8080/errors/create', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                ...authHeaders(),
            },
            body: JSON.stringify(newBookError)
        })
            .then(response => {
                if (response.ok) {
                    alert("Thêm thành công");
                    navigate('/errors');
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
                    <h3 className="page-title">⚠️ Thêm lỗi sách</h3>
                    <p className="page-subtitle">Tạo mới một lỗi sách và mức tiền phạt</p>
                </div>
                <Link to="/errors" className="btn btn-outline-secondary">← Quay lại</Link>
            </div>

            <div className="form-card">
                <form onSubmit={handleSubmit}>

                    <div className="form-group">
                        <label className="form-label">Tên lỗi <span className="required-star">*</span></label>
                        <input className="form-control" type="text" placeholder="VD: Sách rách trang" value={name}
                            onChange={(e) => setName(e.target.value)} />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Tiền phạt (VNĐ) <span className="required-star">*</span></label>
                        <input className="form-control" type="number" min="0" placeholder="VD: 50000" value={fineAmount}
                            onChange={(e) => setFineAmount(e.target.value)} />
                    </div>

                    <div className="form-actions">
                        <button type="submit" className="btn btn-primary">➕ Thêm mới</button>
                        <Link to="/errors" className="btn btn-outline-secondary">Hủy</Link>
                    </div>

                </form>
            </div>

        </div>
    );
}

export default AddBookErrorForm;