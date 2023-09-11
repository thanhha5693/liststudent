var data = [];
var currentPage = 1;
var itemsPerPage = 3;
var editingIndex = -1;

function save() {
    var item_id = document.getElementById("id").value;
    var item_name = document.getElementById("name").value;
    var item_age = document.getElementById("age").value;

    var item = {
        Id: item_id,
        Name: item_name,
        Age: item_age
    };
    data.push(item);
    render();
}

// Kiểm tra xem localStorage có dữ liệu không
var storedData = localStorage.getItem("studentData");
if (storedData) {
    // Nếu có dữ liệu, chuyển nó thành mảng và gán cho biến data
    data = JSON.parse(storedData);
}

function save() {
    var item_id = document.getElementById("id").value;
    var item_name = document.getElementById("name").value;
    var item_age = document.getElementById("age").value;

    var item = {
        Id: item_id,
        Name: item_name,
        Age: item_age
    };
    data.push(item);
    saveDataToLocalStorage(); // Lưu dữ liệu vào localStorage
    render();
}

v// ...

function edit(index) {
    var result = confirm("Bạn chắc chắn muốn sửa vậy ư?");
    if (result) {
        var item_id = document.getElementById("edit-id").value;
        var item_name = document.getElementById("edit-name").value;
        var item_age = document.getElementById("edit-age").value;

        data[editingIndex].Id = item_id;
        data[editingIndex].Name = item_name;
        data[editingIndex].Age = item_age;
        saveDataToLocalStorage();
        render();
        closeEditModal();
    }
}

// ...

// ...


function remove(index) {
    var result = confirm("Có nhất thiết phải xóa không?");
    if (result) {
        data.splice(index, 1);
        saveDataToLocalStorage(); // Lưu dữ liệu vào localStorage sau khi xóa
        render();
    }
}

// Hàm lưu dữ liệu vào localStorage
function saveDataToLocalStorage() {
    localStorage.setItem("studentData", JSON.stringify(data));
}

// Khởi tạo ứng dụng
render();


function search() {
    var searchValue = document.getElementById("search").value.toLowerCase();
    var filteredData = data.filter(function (item) {
        return (
            item.Id.toString().includes(searchValue) ||
            item.Name.toLowerCase().includes(searchValue) ||
            item.Age.toString().includes(searchValue)
        );
    });
    render(filteredData);
}

function render(dataToRender) {
    var studentList = document.getElementById("studentList");
    studentList.innerHTML = "";

    var dataToDisplay = dataToRender || data;
    var startIndex = (currentPage - 1) * itemsPerPage;
    var endIndex = startIndex + itemsPerPage;

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

    var pageTotal = Math.ceil(dataToDisplay.length / itemsPerPage);
    var pageInfo = document.getElementById("page-info");
    pageInfo.textContent = `Trang ${currentPage} / ${pageTotal}`;
}

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        render();
    }
}

function nextPage() {
    var pageTotal = Math.ceil(data.length / itemsPerPage);
    if (currentPage < pageTotal) {
        currentPage++;
        render();
    }
}

function openEditModal(index) {
    editingIndex = index;
    var studentToEdit = data[index];
    document.getElementById("edit-id").value = studentToEdit.Id;
    document.getElementById("edit-name").value = studentToEdit.Name;
    document.getElementById("edit-age").value = studentToEdit.Age;
    var editModal = document.getElementById("edit-modal");
    editModal.style.display = "block";
}

function closeEditModal() {
    editingIndex = -1;
    document.getElementById("edit-id").value = "";
    document.getElementById("edit-name").value = "";
    document.getElementById("edit-age").value = "";
    var editModal = document.getElementById("edit-modal");
    editModal.style.display = "none";
}

function cancelDelete() {
    var deleteModal = document.getElementById("delete-modal");
    deleteModal.style.display = "none";
}

function confirmDelete() {
    remove(editingIndex);
    var deleteModal = document.getElementById("delete-modal");
    deleteModal.style.display = "none";
}

function toggleDarkMode() {
    var body = document.body;
    body.classList.toggle("dark-mode");
    var appTitle = document.getElementById("app-title");
    if (body.classList.contains("dark-mode")) {
        appTitle.textContent = "Quản lý sinh viên ";
    } else {
        appTitle.textContent = "Quản lý sinh viên ";
    }
}

// Khởi tạo ứng dụng
render();

function setLightMode() {
    document.body.classList.remove("dark-mode");
    document.getElementById("light-mode-button").disabled = true;
    document.getElementById("dark-mode-button").disabled = false;
    var appTitle = document.getElementById("app-title");
    appTitle.textContent = "Quản lý sinh viên ";
}

function setDarkMode() {
    document.body.classList.add("dark-mode");
    document.getElementById("dark-mode-button").disabled = true;
    document.getElementById("light-mode-button").disabled = false;
    var appTitle = document.getElementById("app-title");
    appTitle.textContent = "Quản lý sinh viên ";
}

// Khởi tạo ứng dụng
render();
