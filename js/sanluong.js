/* ==========================================
   DANH SÁCH NHÂN VIÊN
========================================== */

const employees = [
  { id: "NV001", name: "Nguyễn Văn A" },
  { id: "NV002", name: "Nguyễn Văn B" },
  { id: "NV003", name: "Nguyễn Văn C" },
  { id: "NV004", name: "Nguyễn Văn D" },
  { id: "NV005", name: "Nguyễn Văn E" },
];

/* ==========================================
   DANH SÁCH KHÁCH HÀNG
========================================== */

const customers = [
  { id: "KH001", name: "Khách hàng A" },
  { id: "KH002", name: "Khách hàng B" },
  { id: "KH003", name: "Khách hàng C" },
  { id: "KH004", name: "Khách hàng D" },
];

/* ==========================================
   DOM
========================================== */

const employeeTable = document.getElementById("employeeTable");
const addEmployeeButton = document.getElementById("addEmployeeButton");
const saveButton = document.getElementById("saveButton");
const message = document.getElementById("message");
const savedInfo = document.getElementById("savedInfo");
const savedContent = document.getElementById("savedContent");

/* ==========================================
   TẠO OPTION NHÂN VIÊN
========================================== */

function createEmployeeOptions() {
  let html = `
        <option value="">-- Chọn nhân viên --</option>
    `;

  employees.forEach((employee) => {
    html += `
            <option value="${employee.id}">
                ${employee.id} - ${employee.name}
            </option>
        `;
  });

  return html;
}

/* ==========================================
   TẠO OPTION KHÁCH HÀNG
========================================== */

function createCustomerOptions() {
  let html = `
        <option value="">-- Chọn khách hàng --</option>
    `;

  customers.forEach((customer) => {
    html += `
            <option value="${customer.id}">
                ${customer.name}
            </option>
        `;
  });

  return html;
}

/* ==========================================
   THÊM DÒNG NHÂN VIÊN
========================================== */

function addEmployee() {
  const row = document.createElement("tr");

  row.innerHTML = `
        <td>
            <select class="employee">
                ${createEmployeeOptions()}
            </select>
        </td>

        <td>
            <select class="customer">
                ${createCustomerOptions()}
            </select>
        </td>

        <td>
            <input
                type="text"
                class="formula"
                placeholder="Ví dụ: 10*2+5">
            </div>
        </td>

        <td>
            <div class="unit-group">

                <label class="unit">
                    <input
                        type="checkbox"
                        class="unit-checkbox"
                        value="Tấn"
                    >
                    Tấn
                </label>

                <label class="unit">
                    <input
                        type="checkbox"
                        class="unit-checkbox"
                        value="CBM"
                    >
                    CBM
                </label>

                <label class="unit">
                    <input
                        type="checkbox"
                        class="unit-checkbox"
                        value="Móc treo"
                    >
                    Móc treo
                </label>

            </div>
        </td>

        <td>
            <button type="button" class="btn-delete">
                Xóa
            </button>
        </td>
    `;

  employeeTable.appendChild(row);
}

/* ==========================================
   TÍNH SẢN LƯỢNG
========================================== */

function calculate(input) {
  const resultElement = input.parentElement.querySelector(".result span");

  const formula = input.value.trim();

  if (formula === "") {
    resultElement.textContent = "0";
    return;
  }

  /* Chỉ cho phép số và phép tính */
  if (!/^[0-9+\-*/().\s]+$/.test(formula)) {
    resultElement.textContent = "Công thức không hợp lệ";
    return;
  }

  try {
    const result = Function(`"use strict"; return (${formula})`)();

    if (Number.isFinite(result)) {
      resultElement.textContent = result;
    } else {
      resultElement.textContent = "Công thức không hợp lệ";
    }
  } catch (error) {
    resultElement.textContent = "Công thức không hợp lệ";
  }
}

/* ==========================================
   XÓA DÒNG
========================================== */

function deleteRow(button) {
  if (employeeTable.rows.length <= 1) {
    showMessage("Phải có ít nhất một nhân viên.", "error");
    return;
  }

  button.closest("tr").remove();
}

/* ==========================================
   LƯU PHIẾU
========================================== */

function saveData() {
  const rows = document.querySelectorAll("#employeeTable tr");

  const data = [];
  let hasError = false;

  rows.forEach((row) => {
    const employee = row.querySelector(".employee").value;

    const customer = row.querySelector(".customer").value;

    const formula = row.querySelector(".formula").value.trim();

    const result = row.querySelector(".result span").textContent;

    const checkedUnits = row.querySelectorAll(".unit-checkbox:checked");

    const units = [];

    checkedUnits.forEach((checkbox) => {
      units.push(checkbox.value);
    });

    if (employee === "") {
      hasError = true;
      return;
    }

    if (customer === "") {
      hasError = true;
      return;
    }

    if (formula === "" || result === "Công thức không hợp lệ") {
      hasError = true;
      return;
    }

    if (units.length === 0) {
      hasError = true;
      return;
    }

    data.push({
      employee,
      customer,
      formula,
      quantity: Number(result),
      units,
    });
  });

  if (hasError) {
    showMessage("Vui lòng nhập đầy đủ thông tin trước khi lưu.", "error");
    return;
  }

  const invoice = {
    savedAt: new Date().toLocaleString("vi-VN"),
    data,
  };

  localStorage.setItem("productionInvoice", JSON.stringify(invoice));

  showMessage("✓ Phiếu đã được lưu thành công!", "success");

  showSavedData(invoice);
}

/* ==========================================
   HIỂN THỊ THÔNG BÁO
========================================== */

function showMessage(text, type) {
  message.textContent = text;
  message.className = "message " + type;
}

/* ==========================================
   HIỂN THỊ DỮ LIỆU ĐÃ LƯU
========================================== */

function showSavedData(invoice) {
  let html = `
        <p>
            <strong>Thời gian lưu:</strong>
            ${invoice.savedAt}
        </p>

        <p>
            <strong>Số nhân viên:</strong>
            ${invoice.data.length}
        </p>

        <hr>
    `;

  invoice.data.forEach((item, index) => {
    html += `
            <p>
                <strong>
                    ${index + 1}. ${item.employee}
                </strong>
                - ${item.customer}
                - ${item.quantity}
                (${item.units.join(", ")})
            </p>
        `;
  });

  savedContent.innerHTML = html;
  savedInfo.hidden = false;
}

/* ==========================================
   KHÔI PHỤC DỮ LIỆU KHI MỞ TRANG
========================================== */

function loadSavedData() {
  const saved = localStorage.getItem("productionInvoice");

  if (!saved) {
    addEmployee();
    return;
  }

  try {
    const invoice = JSON.parse(saved);

    showSavedData(invoice);

    invoice.data.forEach((item) => {
      addEmployee();

      const rows = document.querySelectorAll("#employeeTable tr");

      const row = rows[rows.length - 1];

      row.querySelector(".employee").value = item.employee;

      row.querySelector(".customer").value = item.customer;

      const formulaInput = row.querySelector(".formula");

      formulaInput.value = item.formula;

      calculate(formulaInput);

      const checkboxes = row.querySelectorAll(".unit-checkbox");

      checkboxes.forEach((checkbox) => {
        checkbox.checked = item.units.includes(checkbox.value);
      });
    });
  } catch (error) {
    console.error("Không thể đọc dữ liệu đã lưu", error);

    addEmployee();
  }
}

/* ==========================================
   SỰ KIỆN
========================================== */

addEmployeeButton.addEventListener("click", addEmployee);

saveButton.addEventListener("click", saveData);

/*
   Event delegation:
   xử lý input công thức và nút Xóa
   cho cả những dòng được tạo sau này.
*/

employeeTable.addEventListener("input", (event) => {
  if (event.target.classList.contains("formula")) {
    calculate(event.target);
  }
});

employeeTable.addEventListener("click", (event) => {
  if (event.target.classList.contains("btn-delete")) {
    deleteRow(event.target);
  }
});

/* ==========================================
   KHỞI ĐỘNG
========================================== */

loadSavedData();
