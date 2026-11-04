import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation, Link } from 'react-router-dom';
import { authHeaders } from '../Utils/auth';
import { apiFetch } from '../Utils/api';

const EditBookForm = () => {
    const navigate = useNavigate();
    const { id: routeId } = useParams();
    const location = useLocation();

    // Hỗ trợ cả 2 cách truyền dữ liệu:
    // 1) URL params: /books/edit/:id
    // 2) navigate('/books/edit/...', { state: { book } })
    const bookFromState = location?.state?.book;
    const bookId = routeId || bookFromState?.Id || bookFromState?.id || '';
    const [bookName, setBookName] = useState('');
    const [bookYear, setBookYear] = useState('');
    const [totalQty, setTotalQty] = useState('0');
    const [availQty, setAvailQty] = useState('0');
    const [status, setStatus] = useState('Available');
    const [bookDesc, setBookDesc] = useState('');
    const [catId, setCatId] = useState('');
    const [authId, setAuthId] = useState('');
    const [pubId, setPubId] = useState('');
    const [cats, setCats] = useState([]);
    const [auths, setAuths] = useState([]);
    const [pubs, setPubs] = useState([]);

    useEffect(() => {
        Promise.all([
            apiFetch('http://localhost:8080/categories', { headers: { ...authHeaders() } }),
            apiFetch('http://localhost:8080/authors', { headers: { ...authHeaders() } }),
            apiFetch('http://localhost:8080/publishers', { headers: { ...authHeaders() } })
        ]).then(([c, a, p]) => { setCats(c); setAuths(a); setPubs(p); });
    }, []);
    useEffect(() => {
        if (bookId) {
            apiFetch(`http://localhost:8080/books/${bookId}`, { headers: { ...authHeaders() } })
                .then(b => {
                    setBookName(b.Name); setBookYear(b.YearOfPublication || ''); setTotalQty(b.TotalQuantity || '0');
                    setAvailQty(b.AvailableQuantity || '0'); setStatus(b.Status || 'Available'); setBookDesc(b.Description || '');
                    setCatId(b.category ? b.category.Id : ''); setAuthId(b.author ? b.author.Id : ''); setPubId(b.publisher ? b.publisher.Id : '');
                });
        }
    }, [bookId]);
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!bookName.trim()) { alert('Không được để trống'); return; }
        const book = { Name: bookName, YearOfPublication: bookYear === '' ? null : Number(bookYear),
            TotalQuantity: Number(totalQty), AvailableQuantity: Number(availQty), Status: status,
            Description: bookDesc, category: catId ? { Id: Number(catId) } : null,
            author: authId ? { Id: Number(authId) } : null, publisher: pubId ? { Id: Number(pubId) } : null };
        apiFetch(`http://localhost:8080/books/edit/${bookId}`, { method: 'PUT',
            headers: { 'Content-type': 'application/json', ...authHeaders() }, body: JSON.stringify(book) })
            .then(() => { alert('Sửa thành công'); navigate('/books'); })
            .catch(error => { console.error('Lỗi', error); alert(error.message || 'Đã xảy ra lỗi'); });
    };
    return (<div className="list-page"><div className="page-header"><div><h3 className="page-title">✏️ Sửa sách</h3><p className="page-subtitle">Cập nhật thông tin cuốn sách</p></div><Link to="/books" className="btn btn-outline-secondary">← Quay lại</Link></div><form><div className="container-fluid"><div className="row"><div className="col-md-6 mb-3"><input className="form-control" value={bookName} onChange={(e) => setBookName(e.target.value)} /></div><div className="col-md-6 mb-3"><input className="form-control" type="number" value={bookYear} onChange={(e) => setBookYear(e.target.value)} /></div></div><div className="row"><div className="col-md-6 mb-3"><input className="form-control" type="number" min="0" value={totalQty} onChange={(e) => setTotalQty(e.target.value)} /></div><div className="col-md-6 mb-3"><input className="form-control" type="number" min="0" value={availQty} onChange={(e) => setAvailQty(e.target.value)} /></div></div><div className="row"><div className="col-md-6 mb-3"><select className="form-control" value={status} onChange={(e) => setStatus(e.target.value)}><option value="Available">Hoạt động</option><option value="Inactive">Ngừng hoạt động</option></select></div><div className="col-md-6 mb-3"><textarea className="form-control" rows="3" placeholder="Mô tả" value={bookDesc} onChange={(e) => setBookDesc(e.target.value)} /></div></div><div className="row"><div className="col-md-6 mb-3"><select className="form-control" value={catId} onChange={(e) => setCatId(e.target.value)}><option value="">-- Chọn thể loại --</option>{cats.map(c => <option key={c.Id} value={c.Id}>{c.Name}</option>)}</select></div><div className="col-md-6 mb-3"><select className="form-control" value={authId} onChange={(e) => setAuthId(e.target.value)}><option value="">-- Chọn tác giả --</option>{auths.map(a => <option key={a.Id} value={a.Id}>{a.Name}</option>)}</select></div></div><div className="row"><div className="col-md-12 mb-3"><select className="form-control" value={pubId} onChange={(e) => setPubId(e.target.value)}><option value="">-- Chọn nhà xuất bản --</option>{pubs.map(p => <option key={p.Id} value={p.Id}>{p.Name}</option>)}</select></div></div><div className="form-actions"><button className="btn btn-primary">💾 Lưu</button><Link to="/books" className="btn btn-outline-secondary">Hủy</Link></div></div></form></div>);
};

export default EditBookForm;