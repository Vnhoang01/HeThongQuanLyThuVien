import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authHeaders } from '../Utils/auth';
import { apiFetch } from '../Utils/api';

const AddLoanSlipForm = () => {
    const navigate = useNavigate();
    const [bookId, setBookId] = useState('');
    const [customerId, setCustomerId] = useState('');
    const [quantity, setQuantity] = useState('1');
    const [borrowDate, setBorrowDate] = useState('');
    const [returnDate, setReturnDate] = useState('');

    useEffect(() => {
        apiFetch('http://localhost:8080/books', { headers: { ...authHeaders() } })
            .then(data => { setBookId(data ? data[0].Id : ''); })
            .catch(() => setBookId(''));
        apiFetch('http://localhost:8080/customers', { headers: { ...authHeaders() } })
            .then(data => { setCustomerId(data ? data[0].Id : ''); })
            .catch(() => setCustomerId(''));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newLoan = {
            BookId: Number(bookId),
            CustomerId: Number(customerId),
            Quantity: Number(quantity),
            BorrowDate: borrowDate,
            ReturnDate: returnDate
        };
        apiFetch('http://localhost:8080/loans/create', {
            method: 'POST',
            headers: { 'Content-type': 'application/json', ...authHeaders() },
            body: JSON.stringify(newLoan)
        })
            .then(() => { alert('Tạo phiếu mượn thành công'); navigate('/loans'); })
            .catch(error => { console.error('Lỗi', error); alert(error.message || 'Đã xảy ra lỗi'); });
    };

    return (
        <div className="list-page">
            <div className="page-header">
                <div>
                    <h3 className="page-title">➕ Tạo phiếu mượn</h3>
                    <p className="page-subtitle">Tạo mới phiếu mượn cho sách</p>
                </div>
                <Link to="/loans" className="btn btn-outline-secondary">← Quay lại</Link>
            </div>

            <form>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Sách</label>
                            <select className="form-control" value={bookId} onChange={(e) => setBookId(e.target.value)} disabled>
                                <option value="">-- Chọn sách --</option>
                            </select>
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Khách hàng</label>
                            <select className="form-control" value={customerId} onChange={(e) => setCustomerId(e.target.value)} disabled>
                                <option value="">-- Chọn khách hàng --</option>
                            </select>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Số lượng</label>
                            <input className="form-control" type="number" min="1" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Ngày mượn</label>
                            <input className="form-control" type="date" value={borrowDate} onChange={(e) => setBorrowDate(e.target.value)} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Ngày trảrát</label>
                            <input className="form-control" type="date" value={returnDate} onChange={(e) => setReturnDate(e.target.value)} />
                        </div>
                    </div>
                    <div className="form-actions">
                        <button type="submit" className="btn btn-primary">➕ Tạo phiếu mượn</button>
                        <Link to="/loans" className="btn btn-outline-secondary">Hủy</Link>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AddLoanSlipForm;