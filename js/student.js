// Khai báo biến lưu trữ dữ liệu sinh viên
var data = [];

// Khai báo biến lưu trữ trang hiện tại và số mục trên mỗi trang
var currentPage = 1;
var itemsPerPage = 3;

// Biến để xác định vị trí cần sửa
var editingIndex = -1;

// Hàm lưu thông tin sinh viên mới

// Kiểm tra xem có dữ liệu đã lưu trong localStorage không
var storedData = localStorage.getItem("studentData");
if (storedData) {
    // Nếu có dữ liệu, chuyển nó thành mảng và gán cho biến data
    data = JSON.parse(storedData);
}

// Hàm lưu thông tin sinh viên và cập nhật giao diện
// ...

// Hàm lưu thông tin sinh viên và cập nhật giao diện
function save() {
    // Lấy giá trị từ các trường nhập liệu
    var item_id = document.getElementById("id").value;
    var item_name = document.getElementById("name").value;
    var item_age = document.getElementById("age").value;

    // Kiểm tra nếu các trường nhập liệu đều không rỗng
    if (item_id.trim() !== "" && item_name.trim() !== "" && item_age.trim() !== "") {
        // Tạo đối tượng mới và thêm vào mảng data
        var item = {
            Id: item_id,
            Name: item_name,
            Age: item_age
        };
        data.push(item);

        // Xóa nội dung của các trường nhập liệu sau khi lưu
        document.getElementById("id").value = "";
        document.getElementById("name").value = "";
        document.getElementById("age").value = "";

        // Lưu dữ liệu vào localStorage
        saveDataToLocalStorage();

        // Gọi hàm render để cập nhật giao diện
        render();
    } else {
        alert("Điền đủ thông tin đê bạn ơi !!!");
    }
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
    var searchValue = document.getElementById("search").value.toLowerCase();
    var filteredData = data.filter(function(student) {
        return (
            student.Id.toLowerCase().includes(searchValue) ||
            student.Name.toLowerCase().includes(searchValue) ||
            student.Age.toString().toLowerCase().includes(searchValue)
        );
    });

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
            <tr class="search-result">
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
    appTitle.textContent = "Danh sách sinh viên (Chế độ sáng)";
}

// Hàm thiết lập chế độ tối
function setDarkMode() {
    document.body.classList.add("dark-mode");
    document.getElementById("dark-mode-button").disabled = true;
    document.getElementById("light-mode-button").disabled = false;
    var appTitle = document.getElementById("app-title");
    appTitle.textContent = "Danh sách sinh viên (Chế độ tối)";
}

// Khởi tạo ứng dụng và hiển thị dữ liệu ban đầu
render();


function updateClock() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const timeString = `${hours}:${minutes}:${seconds}`;
    document.getElementById('clock').textContent = timeString;
}

function updateCalendar() {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const calendarString = now.toLocaleDateString('en-US', options);
    document.getElementById('calendar').textContent = calendarString;
}

// Cập nhật đồng hồ và lịch mỗi giây
setInterval(updateClock, 1000);
updateClock();
updateCalendar();