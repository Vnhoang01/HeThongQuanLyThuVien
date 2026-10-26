import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authHeaders } from '../Utils/auth';

const AddAdminForm = () => {

    // Các biến nhận dữ liệu từ form
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [role, setRole] = useState('ADMIN');

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        // Kiểm tra đã nhập Name hay chưa
        if (name.trim() === '') {
            alert("Không được để trống");
            return;
        }

        // Tạo biến mới để lưu
        const newAdmin = {
            Name: name,
            Email: email,
            Password: password,
            PhoneNumber: phoneNumber,
            Role: role
        };

        //Gọi API lưu
        fetch('http://localhost:8080/admins/create', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                ...authHeaders(),
            },
            body: JSON.stringify(newAdmin)
        })
            .then(response => {
                if (response.ok) {
                    alert("Thêm thành công");
                    navigate('/admins');
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
                    <h3 className="page-title">🔑 Thêm tài khoản admin</h3>
                    <p className="page-subtitle">Tạo mới một tài khoản quản trị</p>
                </div>
                <Link to="/admins" className="btn btn-outline-secondary">← Quay lại</Link>
            </div>

            <div className="form-card">
                <form onSubmit={handleSubmit}>

                    <div className="form-group">
                        <label className="form-label">Họ tên <span className="required-star">*</span></label>
                        <input className="form-control" type="text" placeholder="VD: Quản trị viên" value={name}
                            onChange={(e) => setName(e.target.value)} />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Email <span className="required-star">*</span></label>
                        <input className="form-control" type="email" placeholder="VD: admin@gmail.com" value={email}
                            onChange={(e) => setEmail(e.target.value)} />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Mật khẩu</label>
                        <input className="form-control" type="password" placeholder="VD: 12345678" value={password}
                            onChange={(e) => setPassword(e.target.value)} />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Số điện thoại</label>
                        <input className="form-control" type="text" placeholder="VD: 0901234567" value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)} />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Vai trò <span className="required-star">*</span></label>
                        <select className="form-select" value={role}
                            onChange={(e) => setRole(e.target.value)}>
                            <option value="ADMIN">Quản trị viên (ADMIN)</option>
                            <option value="LIBRARIAN">Thủ thư (LIBRARIAN)</option>
                        </select>
                    </div>

                    <div className="form-actions">
                        <button type="submit" className="btn btn-primary">➕ Thêm mới</button>
                        <Link to="/admins" className="btn btn-outline-secondary">Hủy</Link>
                    </div>

                </form>
            </div>

        </div>
    );
}

export default AddAdminForm;