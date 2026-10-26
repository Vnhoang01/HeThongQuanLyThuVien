import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authHeaders } from '../Utils/auth';

const AddCustomerForm = () => {

    // Các biến nhận dữ liệu từ form
    const [name, setName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [gender, setGender] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [address, setAddress] = useState('');
    const [status, setStatus] = useState('');

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        // Kiểm tra đã nhập Name hay chưa
        if (name.trim() === '') {
            alert("Không được để trống");
            return;
        }

        // Tạo biến mới để lưu
        const newCustomer = {
            Name: name,
            DateOfBirth: dateOfBirth,
            Gender: gender,
            Email: email,
            PhoneNumber: phoneNumber,
            Password: password,
            Address: address,
            Status: status
        };

        // Gọi API lưu
        fetch('http://localhost:8080/customers/create', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                ...authHeaders(),
            },
            body: JSON.stringify(newCustomer)
        })
            .then(response => {
                if (response.ok) {
                    alert("Thêm thành công");
                    navigate('/customers');
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
                    <h3 className="page-title">👤 Thêm khách hàng</h3>
                    <p className="page-subtitle">Tạo mới một khách hàng</p>
                </div>
                <Link to="/customers" className="btn btn-outline-secondary">← Quay lại</Link>
            </div>

            <div className="form-card">
                <form onSubmit={handleSubmit}>

                    <div className="form-group">
                        <label className="form-label">Họ tên <span className="required-star">*</span></label>
                        <input className="form-control" type="text" placeholder="VD: Nguyễn Văn A" value={name}
                            onChange={(e) => setName(e.target.value)} />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Ngày sinh <span className="required-star">*</span></label>
                        <input className="form-control" type="date" value={dateOfBirth}
                            onChange={(e) => setDateOfBirth(e.target.value)} />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Giới tính</label>
                        <input className="form-control" type="text" placeholder="VD: Nam hoặc Nữ" value={gender}
                            onChange={(e) => setGender(e.target.value)} />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Email</label>
                        <input className="form-control" type="email" placeholder="VD: khachhang@gmail.com" value={email}
                            onChange={(e) => setEmail(e.target.value)} />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Số điện thoại</label>
                        <input className="form-control" type="text" placeholder="VD: 0901234567" value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)} />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Mật khẩu</label>
                        <input className="form-control" type="password" placeholder="VD: 12345678" value={password}
                            onChange={(e) => setPassword(e.target.value)} />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Địa chỉ</label>
                        <input className="form-control" type="text" placeholder="VD: 12/3 Nguyễn Văn A" value={address}
                            onChange={(e) => setAddress(e.target.value)} />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Trạng thái</label>
                        <input className="form-control" type="text" placeholder="VD: Hoạt động" value={status}
                            onChange={(e) => setStatus(e.target.value)} />
                    </div>

                    <div className="form-actions">
                        <button type="submit" className="btn btn-primary">➕ Thêm mới</button>
                        <Link to="/customers" className="btn btn-outline-secondary">Hủy</Link>
                    </div>

                </form>
            </div>

        </div>
    );
}

export default AddCustomerForm;