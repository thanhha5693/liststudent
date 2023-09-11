// Khai báo biến lưu trữ dữ liệu sinh viên
var data = [];

// Khai báo biến lưu trữ trang hiện tại và số mục trên mỗi trang
var currentPage = 1;
var itemsPerPage = 3;

// Biến để xác định vị trí cần sửa
var editingIndex = -1;

// Hàm lưu thông tin sinh viên mới
function save() {
    // Lấy giá trị từ các trường nhập liệu
    var item_id = document.getElementById("id").value;
    var item_name = document.getElementById("name").value;
    var item_age = document.getElementById("age").value;

    // Tạo đối tượng mới và thêm vào mảng data
    var item = {
        Id: item_id,
        Name: item_name,
        Age: item_age
    };
    data.push(item);

    // Gọi hàm render để cập nhật giao diện
    render();
}

// Kiểm tra xem có dữ liệu đã lưu trong localStorage không
var storedData = localStorage.getItem("studentData");
if (storedData) {
    // Nếu có dữ liệu, chuyển nó thành mảng và gán cho biến data
    data = JSON.parse(storedData);
}

// Hàm lưu thông tin sinh viên và cập nhật giao diện
function save() {
    // Lấy giá trị từ các trường nhập liệu
    var item_id = document.getElementById("id").value;
    var item_name = document.getElementById("name").value;
    var item_age = document.getElementById("age").value;

    // Tạo đối tượng mới và thêm vào mảng data
    var item = {
        Id: item_id,
        Name: item_name,
        Age: item_age
    };
    data.push(item);

    // Lưu dữ liệu vào localStorage
    saveDataToLocalStorage();

    // Gọi hàm render để cập nhật giao diện
    render();
}

// ...

// Hàm sửa thông tin sinh viên
function edit(index) {
    var result = confirm("Bạn chắc chắn muốn sửa vậy ư?");
    if (result) {
        // Lấy giá trị từ các trường chỉnh sửa và cập nhật thông tin
        var item_id = document.getElementById("edit-id").value;
        var item_name = document.getElementById("edit-name").value;
        var item_age = document.getElementById("edit-age").value;

        // Cập nhật thông tin và lưu vào LocalStorage
        data[editingIndex].Id = item_id;
        data[editingIndex].Name = item_name;
        data[editingIndex].Age = item_age;
        saveDataToLocalStorage();
        render();
        closeEditModal();
    }
}

// ...

// Hàm xóa sinh viên
function remove(index) {
    var result = confirm("Có nhất thiết phải xóa không?");
    if (result) {
        // Xóa sinh viên khỏi mảng và lưu vào LocalStorage
        data.splice(index, 1);
        saveDataToLocalStorage();

        // Hiển thị lại trang
        render();
    }
}

// Hàm lưu dữ liệu vào localStorage
function saveDataToLocalStorage() {
    localStorage.setItem("studentData", JSON.stringify(data));
}

// Khởi tạo ứng dụng và hiển thị dữ liệu ban đầu
render();

// Hàm tìm kiếm
function search() {
    // Lấy giá trị từ trường tìm kiếm và chuyển thành chữ thường
    var searchValue = document.getElementById("search").value.toLowerCase();

    // Tạo mảng lọc dựa trên giá trị tìm kiếm
    var filteredData = data.filter(function (item) {
        return (
            item.Id.toString().includes(searchValue) ||
            item.Name.toLowerCase().includes(searchValue) ||
            item.Age.toString().includes(searchValue)
        );
    });

    // Hiển thị kết quả tìm kiếm
    render(filteredData);
}

// Hàm hiển thị dữ liệu lên giao diện
function render(dataToRender) {
    // Xóa nội dung của bảng hiển thị sinh viên
    var studentList = document.getElementById("studentList");
    studentList.innerHTML = "";

    // Lấy dữ liệu để hiển thị (hoặc dữ liệu đã lọc)
    var dataToDisplay = dataToRender || data;
    var startIndex = (currentPage - 1) * itemsPerPage;
    var endIndex = startIndex + itemsPerPage;

    // Lặp qua dữ liệu để hiển thị lên trang
    for (let i = startIndex; i < Math.min(endIndex, dataToDisplay.length); i++) {
        var student = dataToDisplay[i];
        var row = `
            <tr>
                <td>${i + 1}</td>
                <td>${student.Id}</td>
                <td>${student.Name}</td>
                <td>${student.Age}</td>
                <td>
                    <button onclick="openEditModal(${i})">Sửa</button>
                    <button onclick="remove(${i})">Xóa</button>
                </td>
            </tr>`;
        studentList.innerHTML += row;
    }

    // Cập nhật thông tin về trang
    var pageTotal = Math.ceil(dataToDisplay.length / itemsPerPage);
    var pageInfo = document.getElementById("page-info");
    pageInfo.textContent = `Trang ${currentPage} / ${pageTotal}`;
}

// Hàm chuyển đến trang trước
function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        render();
    }
}

// Hàm chuyển đến trang kế tiếp
function nextPage() {
    var pageTotal = Math.ceil(data.length / itemsPerPage);
    if (currentPage < pageTotal) {
        currentPage++;
        render();
    }
}

// Hàm mở modal để chỉnh sửa thông tin sinh viên
function openEditModal(index) {
    editingIndex = index;
    var studentToEdit = data[index];
    document.getElementById("edit-id").value = studentToEdit.Id;
    document.getElementById("edit-name").value = studentToEdit.Name;
    document.getElementById("edit-age").value = studentToEdit.Age;
    var editModal = document.getElementById("edit-modal");
    editModal.style.display = "block";
}

// Hàm đóng modal chỉnh sửa
function closeEditModal() {
    editingIndex = -1;
    document.getElementById("edit-id").value = "";
    document.getElementById("edit-name").value = "";
    document.getElementById("edit-age").value = "";
    var editModal = document.getElementById("edit-modal");
    editModal.style.display = "none";
}

// Hàm hủy việc xóa
function cancelDelete() {
    var deleteModal = document.getElementById("delete-modal");
    deleteModal.style.display = "none";
}

// Hàm xác nhận việc xóa
function confirmDelete() {
    remove(editingIndex);
    var deleteModal = document.getElementById("delete-modal");
    deleteModal.style.display = "none";
}

// Hàm chuyển đổi chế độ sáng/tối
function toggleDarkMode() {
    var body = document.body;
    body.classList.toggle("dark-mode");
    var appTitle = document.getElementById("app-title");
    if (body.classList.contains("dark-mode")) {
        appTitle.textContent = "Quản lý sinh viên (Chế độ tối)";
    } else {
        appTitle.textContent = "Quản lý sinh viên (Chế độ sáng)";
    }
}

// Khởi tạo ứng dụng và hiển thị dữ liệu ban đầu
render();

// Hàm thiết lập chế độ sáng
function setLightMode() {
    document.body.classList.remove("dark-mode");
    document.getElementById("light-mode-button").disabled = true;
    document.getElementById("dark-mode-button").disabled = false;
    var appTitle = document.getElementById("app-title");
    appTitle.textContent = "Quản lý sinh viên (Chế độ sáng)";
}

// Hàm thiết lập chế độ tối
function setDarkMode() {
    document.body.classList.add("dark-mode");
    document.getElementById("dark-mode-button").disabled = true;
    document.getElementById("light-mode-button").disabled = false;
    var appTitle = document.getElementById("app-title");
    appTitle.textContent = "Quản lý sinh viên (Chế độ tối)";
}

// Khởi tạo ứng dụng và hiển thị dữ liệu ban đầu
render();
