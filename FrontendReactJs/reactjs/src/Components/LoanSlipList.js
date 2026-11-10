import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authHeaders } from '../Utils/auth';
import { apiFetch } from '../Utils/api';
import { toVietnamese, formatStatus } from '../Utils/format';

const LoanSlipList = () => {
    const navigate = useNavigate();
    const [loans, setLoans] = useState([]);
const [loading, setLoading] = useState(true);

    useEffect(() => {
        apiFetch('http://localhost:8080/loan-slips', { headers: { ...authHeaders() } })
            .then(data => { setLoans(data); setLoading(false); })
            .catch(error => { console.error('Lỗi tải dữ liệu mượn', error); setLoading(false); });
    }, []);

    const handleDelete = (loan) => {
        if (!window.confirm(`Bạn có chắc muốn xóa phiếu mượn "${loan.Code}" không?`)) return;
        apiFetch(`http://localhost:8080/loan-slips/${loan.Id}`, {
            method: 'DELETE', headers: { ...authHeaders() }
        })
            .then(() => { setLoans(loans => loans.filter(l => l.Id !== loan.Id)); })
            .catch(error => { alert(error.message || 'Lỗi xóa thất bại'); });
    };

    return (
        <div className="list-page">
            <div className="page-header">
                <div>
                    <h3 className="page-title">📋 Phiếu mượn</h3>
                    <p className="page-subtitle">Danh sách phiếu mượn trong thư viện</p>
                </div>
                <button className="btn btn-primary" onClick={() => navigate('/loans/create')}>＋ Tạo phiếu mượn</button>
            </div>

            <div className="table-card">
                <div className="table-card-header">
                    <span>Danh sách phiếu mượn</span>
                    <span className="badge text-primary">{loans.length}</span>
                </div>

                {loading ? (
                    <div className="loading-box">
                        <div className="spinner-border text-primary" role="status" />
                        <span>Đang tải dữ liệu...</span>
                    </div>
                ) : loans.length === 0 ? (
                    <div className="table-body">
                        <div className="empty-icon">📖</div>
                        <p>Chưa có phiếu mượn. Bấm "＋ Tạo phiếu mượn" để bắt đầu.</p>
                    </div>
                ) : (
                    <div className="table-responsive">
                        <table className="table list-table align-middle mb-0">
                            <thead>
                                <tr>
                                    <th className="stt-cell">STT</th>
                                    <th>Mã</th>
                                    <th>Sách</th>
                                    <th>Khách hàng</th>
                                    <th>Ngày mượn</th>
                                    <th>Ngày trảrát</th>
                                    <th>Số lượng</th>
                                    <th>Trạng thái</th>
                                    <th>Thao tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loans.map((loan, index) => (
                                    <tr key={loan.Id}>
                                        <td className="stt-cell">{index + 1}</td>
                                        <td><span className="id-badge">{loan.Code}</span></td>
                                        <td>{loan.bookook ? loan.Book.Name : 'N/A'}</td>
                                        <td>{loan.Customer ? loan.Customer.Name : 'N/A'}</td>
                                        <td>{loan.BorrowDate ? new Date(loan.BorrowDate).toLocaleDateString() : 'N/A'}</td>
                                        <td>{loan.ReturnDate ? new Date(loan.ReturnDate).toLocaleDateString() : 'Chưa trả trảrát'}</td>
                                        <td>{loan.Quantity}</td>
                                        <td>{formatStatus.Status}</td>
                                        <td>
                                            <div className="action-group">
                                                <button className="btn btn-sm btn-outline-primary" onClick={() => navigate(`/loans/edit/${loan.Id}`)}>✏️ Sửa</button>
                                                <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(loan)}>🗑️ Xóa</button>
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
};

export default LoanSlipList;