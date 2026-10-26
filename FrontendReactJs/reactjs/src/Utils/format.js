//Các hàm định dạng dữ liệu hiển thị:
//- Tự thêm dấu tiếng Việt cho dữ liệu người dùng gõ không dấu
//- Định dạng ngày tháng, số tiền, các giá trị enum (giới tính, trạng thái, vai trò)

//Cụm từ nhiều chữ: khớp cụm dài trước để tránh sai ví dụ "tac gia" -> "tác giả" thay vì "tác giá"
const PHRASES = {
    'nha xuat ban': 'nhà xuất bản',
    'xuat ban': 'xuất bản',
    'khach hang': 'khách hàng',
    'tac gia': 'tác giả',
    'the loai': 'thể loại',
    'so dien thoai': 'số điện thoại',
    'dia chi': 'địa chỉ',
    'trang thai': 'trạng thái',
    'vai tro': 'vai trò',
    'mo ta': 'mô tả',
    'ngay sinh': 'ngày sinh',
    'gioi tinh': 'giới tính',
    'danh sach': 'danh sách',
    'tien phat': 'tiền phạt',
    'loai sach': 'loại sách',
    'doc gia': 'độc giả',
    'thu vien': 'thư viện',
    'he thong': 'hệ thống',
    'quan ly': 'quản lý',
    'giai tri': 'giải trí',
    'van hoc': 'văn học',
    'lich su': 'lịch sử',
    'khoa hoc': 'khoa học',
    'thieu nhi': 'thiếu nhi',
    'tam ly': 'tâm lý',
    'my thuat': 'mỹ thuật',
    'am nhac': 'âm nhạc',
    'cong nghe': 'công nghệ',
    'tinh cam': 'tình cảm',
    'the gioi': 'thế giới',
    'cuoc song': 'cuộc sống',
    'tuoi tho': 'tuổi thơ',
    'trinh tham': 'trinh thám',
    'dao duc': 'đạo đức',
    'hoc duong': 'học đường',
    'quan tri vien': 'quản trị viên',
    'nguoi dung': 'người dùng',
    'nhan vien': 'nhân viên',
    'tai khoan': 'tài khoản',
    'ngon ngu': 'ngôn ngữ',
    'gia dinh': 'gia đình',
    'thoi gian': 'thời gian',
    'noi dung': 'nội dung',
    'chi tiet': 'chi tiết',
    'cap nhat': 'cập nhật',
    'tim kiem': 'tìm kiếm',
    'chuc nang': 'chức năng',
    'them moi': 'thêm mới',
    'tac pham': 'tác phẩm',
    'nha van': 'nhà văn',
    'mat khau': 'mật khẩu',
    'dang nhap': 'đăng nhập',
    'dang xuat': 'đăng xuất',
    'thong tin': 'thông tin',
    'ten nha': 'tên nhà'
};

//Từ đơn không dấu -> có dấu (dạng chữ thường)
const WORDS = {
    //Họ
    'nguyen': 'nguyễn', 'tran': 'trần', 'le': 'lê', 'ly': 'lý', 'pham': 'phạm',
    'hoang': 'hoàng', 'vu': 'vũ', 'dang': 'đặng', 'bui': 'bùi', 'do': 'đỗ',
    'phan': 'phan', 'truong': 'trương', 'dao': 'đào', 'duong': 'dương',
    'cao': 'cao', 'quach': 'quách', 'huu': 'hữu',

    //Tên
    'anh': 'ánh', 'an': 'an', 'bac': 'bắc', 'chinh': 'chính', 'cong': 'công',
    'cuong': 'cường', 'dung': 'dũng', 'duy': 'duy', 'ha': 'hà', 'hai': 'hải',
    'hanh': 'hạnh', 'hien': 'hiền', 'hieu': 'hiếu', 'hoa': 'hoa', 'hong': 'hồng',
    'huong': 'hương', 'huy': 'huy', 'huynh': 'huỳnh', 'khiem': 'khiêm',
    'khanh': 'khánh', 'lan': 'lan', 'lien': 'liên', 'minh': 'minh', 'my': 'my',
    'nam': 'nam', 'nga': 'nga', 'ngoc': 'ngọc', 'phong': 'phong', 'phuc': 'phúc',
    'phuong': 'phương', 'quang': 'quang', 'son': 'sơn', 'tam': 'tam', 'thao': 'thảo',
    'thanh': 'thanh', 'thu': 'thư', 'thuy': 'thủy', 'tien': 'tiên', 'trang': 'trang',
    'trung': 'trung', 'tuan': 'tuấn', 'tuyet': 'tuyết', 'van': 'văn', 'yen': 'yen',
    'binh': 'bình', 'chau': 'châu', 'diem': 'diễm', 'giang': 'giang', 'hoai': 'hoài',
    'kien': 'kiên', 'long': 'long', 'mai': 'mai', 'ngan': 'ngân', 'xuan': 'xuân',
    'thai': 'thái', 'nghi': 'nghị', 'tram': 'trâm', 'tung': 'tùng', 'duc': 'đức',
    'chi': 'chi',

    //Từ thường gặp trong dữ liệu thư viện
    'sach': 'sách', 'tac': 'tác', 'nha': 'nhà', 'xuat': 'xuất', 'khach': 'khách',
    'hang': 'hàng', 'the': 'thể', 'loai': 'loại', 'doc': 'đọc', 'giai': 'giải',
    'tri': 'trí', 'hoc': 'học', 'lich': 'lịch', 'su': 'sự', 'khoa': 'khoa',
    'thieu': 'thiếu', 'nhi': 'nhi', 'phat': 'phạt', 'loi': 'lỗi',
    'muon': 'mượn', 'tra': 'trả', 'quan': 'quản', 'thong': 'thống',
    'vien': 'viện', 'gioi': 'giới', 'tinh': 'tính', 'ngay': 'ngày', 'sinh': 'sinh',
    'dia': 'địa', 'so': 'số', 'dien': 'điện', 'thoai': 'thoại',
    'vai': 'vai', 'tro': 'trò', 'mo': 'mô', 'ta': 'tả',
    'ten': 'tên', 'danh': 'danh', 'them': 'thêm', 'xoa': 'xóa', 'sua': 'sửa',
    'tim': 'tìm', 'kiem': 'kiếm', 'cap': 'cập', 'nhat': 'nhật', 'chuc': 'chức',
    'nang': 'năng', 'nguoi': 'người', 'dinh': 'đinh',
    'thoi': 'thời', 'gian': 'gian', 'noi': 'nội', 'tiet': 'tiết',
    'nghe': 'nghề', 'am': 'âm', 'nhac': 'nhạc',
    'cam': 'cảm',
    'cuoc': 'cuộc', 'song': 'sống', 'tuoi': 'tuổi', 'tho': 'thơ', 'he': 'hệ',
    'nhan': 'nhân', 'tai': 'tài', 'khoan': 'khoản', 'nu': 'nữ',
    'mat': 'mật', 'khau': 'khẩu', 'nhap': 'nhập',
    'gia': 'giá', 'trinh': 'trinh',
    'tre': 'trẻ', 'em': 'em',
    'moi': 'mới', 'cu': 'cũ'
};

//Regex nhận diện dữ liệu đã có sẵn dấu tiếng Việt
const ACCENT_REGEX = /[àáảãạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđ]/i;

//Viết hoa chữ đầu
const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

//Đổi kiểu hoa/thường của kết quả theo dữ liệu gốc
const matchCase = (source, target) => {
    if (source === source.toUpperCase() && source !== source.toLowerCase()) {
        //Dữ liệu đang gõ ALL CAPS -> viết hoa từng chữ
        return target.split(' ').map(capitalize).join(' ');
    }

    if (source[0] === source[0].toUpperCase()) {
        //Chữ đầu hoa -> chữ đầu hoa
        return capitalize(target);
    }

    //Dữ liệu chữ thường -> giữ chữ thường
    return target.toLowerCase();
};

//Chuyển 1 từ đơn
const convertWord = (word, titleCase) => {
    //Giữ nguyên số, email, đường dẫn...
    if (word === '' || /[\d@/:._-]/.test(word)) {
        return word;
    }

    //Đã có sẵn dấu thì giữ nguyên
    if (ACCENT_REGEX.test(word)) {
        return titleCase ? capitalize(word) : word;
    }

    const mapped = WORDS[word.toLowerCase()];

    //Không có trong từ điển thì giữ nguyên dạng đang gõ
    if (mapped === undefined) {
        return titleCase ? capitalize(word) : word;
    }

    //Chế độ viết hoa từng chữ dùng cho tên riêng / tên danh mục
    if (titleCase) {
        return capitalize(mapped);
    }

    return matchCase(word, mapped);
};

//Chuyển chuỗi không dấu -> có dấu.
//titleCase = true: viết hoa từng chữ (dùng cho tên riêng, tên danh mục)
export const toVietnamese = (text, titleCase = false) => {
    if (text === null || text === undefined || text === '') {
        return '';
    }

    let result = String(text);

    //Dữ liệu đã có dấu sẵn thì giữ nguyên
    if (ACCENT_REGEX.test(result)) {
        return result;
    }

    //Thay các cụm từ dài trước (khớp cả hoa/thường)
    const phrases = Object.keys(PHRASES).sort((a, b) => b.length - a.length);

    phrases.forEach((phrase) => {
        const regex = new RegExp(`\\b${phrase}\\b`, 'gi');

        result = result.replace(regex, (matched) => {
            const converted = PHRASES[phrase];

            return titleCase
                ? converted.split(' ').map(capitalize).join(' ')
                : matchCase(matched, converted);
        });
    });

    //Các từ còn lại chuyển từng từ
    return result
        .split(/(\s+)/)
        .map((part) => (/^\s+$/.test(part) ? part : convertWord(part, titleCase)))
        .join('');
};

//Định dạng ngày: 2004-05-12 hoặc 2004-05-12T00:00:00 -> 12/05/2004
export const formatDate = (value) => {
    if (!value) {
        return '';
    }

    const matched = String(value).match(/^(\d{4})-(\d{2})-(\d{2})/);

    if (!matched) {
        return toVietnamese(value);
    }

    return `${matched[3]}/${matched[2]}/${matched[1]}`;
};

//Định dạng số tiền: 25000 -> 25.000 ₫
export const formatCurrency = (value) => {
    const number = Number(value);

    if (Number.isNaN(number)) {
        return toVietnamese(value);
    }

    return `${number.toLocaleString('vi-VN')} ₫`;
};

//Giới tính
export const formatGender = (value) => {
    const map = { male: 'Nam', m: 'Nam', nu: 'Nữ', female: 'Nữ', f: 'Nữ' };
    const key = String(value ?? '').trim().toLowerCase();

    return map[key] || toVietnamese(value, true);
};

//Trạng thái
export const formatStatus = (value) => {
    const map = {
        active: 'Hoạt động',
        enable: 'Hoạt động',
        enabled: 'Hoạt động',
        inactive: 'Ngừng hoạt động',
        disable: 'Ngừng hoạt động',
        disabled: 'Ngừng hoạt động',
        locked: 'Đã khóa',
        deleted: 'Đã xóa'
    };
    const key = String(value ?? '').trim().toLowerCase();

    return map[key] || toVietnamese(value, true);
};

//Vai trò
export const formatRole = (value) => {
    const map = { admin: 'Quản trị viên', user: 'Người dùng', staff: 'Nhân viên', manager: 'Quản lý' };
    const key = String(value ?? '').trim().toLowerCase();

    return map[key] || toVietnamese(value, true);
};

