import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authHeaders } from '../Utils/auth';

const AddPublisherForm = () => {

    // Biến nhận name từ form
    const [name, setName] = useState('');

    // Biến nhận address từ form
    const [address, setAddress] = useState('');

    // Biến nhận phoneNumber từ form
    const [phoneNumber, setPhoneNumber] = useState('');

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        // Kiểm tra đã nhập Name hay chưa
        if (name.trim() === '') {
            alert("Không được để trống");
            return;
        }

        // Tạo biến mới để lưu
        const newPublisher = {
            Name: name,
            Address: address,
            PhoneNumber: phoneNumber
        };

        // Gọi API lưu
        fetch('http://localhost:8080/publishers/create', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                ...authHeaders(),
            },
            body: JSON.stringify(newPublisher)
        })
            .then(response => {
                if (response.ok) {
                    alert("Thêm thành công");
                    navigate('/publishers');
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
                    <h3 className="page-title">🏢 Thêm nhà xuất bản</h3>
                    <p className="page-subtitle">Tạo mới một nhà xuất bản</p>
                </div>
                <Link to="/publishers" className="btn btn-outline-secondary">← Quay lại</Link>
            </div>

            <div className="form-card">
                <form onSubmit={handleSubmit}>

                    <div className="form-group">
                        <label className="form-label">Tên nhà xuất bản <span className="required-star">*</span></label>
                        <input className="form-control" type="text" placeholder="VD: NXB Trẻ" value={name}
                            onChange={(e) => setName(e.target.value)} />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Địa chỉ</label>
                        <input className="form-control" type="text" placeholder="VD: 123 Lê Lợi, Quận 1" value={address}
                            onChange={(e) => setAddress(e.target.value)} />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Số điện thoại</label>
                        <input className="form-control" type="text" placeholder="VD: 02838221234" value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)} />
                    </div>

                    <div className="form-actions">
                        <button type="submit" className="btn btn-primary">➕ Thêm mới</button>
                        <Link to="/publishers" className="btn btn-outline-secondary">Hủy</Link>
                    </div>

                </form>
            </div>

        </div>
    );
}

export default AddPublisherForm;