// ==========================================
// SANLUONG.JS
// Trang Phiếu ghi nhận sản lượng (Đã có tính năng thêm dòng)
// ==========================================

function loadProduction() {
  const app = document.getElementById("app");

  app.innerHTML = `
    <style>
      .production-page {
        max-width: 900px;
        margin: 20px auto;
        padding: 0 15px;
      }

      .card {
        background: #ffffff;
        border-radius: 12px;
        padding: 28px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
        border: 1px solid #e2e8f0;
      }

      .page-header {
        margin-bottom: 20px;
        border-bottom: 2px solid #f1f5f9;
        padding-bottom: 12px;
      }

      .page-header h1 {
        font-size: 22px;
        color: #1e293b;
        font-weight: 700;
      }

      /* Khối thông tin dùng chung cho toàn phiếu (Ví dụ Khách hàng) */
      .general-info {
        margin-bottom: 24px;
        background: #f8fafc;
        padding: 16px;
        border-radius: 8px;
        border: 1px dashed #cbd5e1;
      }

      .form-group {
        display: flex;
        flex-direction: column;
        gap: 6px;
      }

      .form-group label {
        font-size: 13px;
        font-weight: 600;
        color: #475569;
      }

      .form-control {
        width: 100%;
        padding: 9px 12px;
        border: 1px solid #cbd5e1;
        border-radius: 6px;
        font-size: 14px;
        outline: none;
        transition: all 0.2s;
        background-color: #ffffff;
      }

      .form-control:focus {
        border-color: #ff6f00;
        box-shadow: 0 0 0 3px rgba(255, 111, 0, 0.15);
      }

      /* Danh sách các dòng Nhân viên */
      .employee-list {
        display: flex;
        flex-direction: column;
        gap: 16px;
        margin-bottom: 24px;
      }

      /* Mỗi dòng nhân viên */
      .employee-row {
        display: grid;
        grid-template-columns: 2fr 2fr 1.5fr 40px;
        gap: 12px;
        align-items: end;
        background: #ffffff;
        padding: 12px;
        border-radius: 8px;
        border: 1px solid #e2e8f0;
        box-shadow: 0 2px 4px rgba(0,0,0,0.02);
        animation: fadeIn 0.3s ease;
      }

      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(-5px); }
        to { opacity: 1; transform: translateY(0); }
      }

      /* Nút xóa dòng */
      .btn-delete {
        background: #fee2e2;
        color: #ef4444;
        border: none;
        border-radius: 6px;
        height: 38px;
        cursor: pointer;
        font-size: 16px;
        transition: all 0.2s;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .btn-delete:hover {
        background: #fca5a5;
        color: #991b1b;
      }

      /* Nút bấm hành động */
      .action-buttons {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 12px;
        padding-top: 16px;
        border-top: 1px solid #f1f5f9;
      }

      .btn {
        padding: 10px 20px;
        border-radius: 8px;
        font-weight: 600;
        font-size: 14px;
        cursor: pointer;
        transition: all 0.2s ease;
        border: none;
      }

      .btn-secondary {
        background-color: #e2e8f0;
        color: #334155;
      }

      .btn-secondary:hover {
        background-color: #cbd5e1;
      }

      .btn-primary {
        background-color: #ff6f00;
        color: #ffffff;
        box-shadow: 0 2px 8px rgba(255, 111, 0, 0.3);
      }

      .btn-primary:hover {
        background-color: #e66400;
      }

      /* Responsive cho màn hình nhỏ */
      @media (max-width: 640px) {
        .employee-row {
          grid-template-columns: 1fr;
        }
        .btn-delete {
          height: 32px;
        }
      }
    </style>

    <section class="production-page">
      <div class="card">
        <div class="page-header">
          <h1>📋 Phiếu Ghi Nhận Sản Lượng</h1>
        </div>

        <!-- 1. THÔNG TIN CHUNG -->
        <div class="general-info">
          <div class="form-group">
            <label for="customer">Khách hàng</label>
            <select id="customer" class="form-control">
              <option value="">-- Chọn khách hàng --</option>
              <option value="KH001">KH001 - Công ty Á Châu</option>
              <option value="KH002">KH002 - Tập đoàn Hòa Phát</option>
              <option value="KH003">KH003 - Logistics Đại Nam</option>
            </select>
          </div>
        </div>

        <!-- 2. DANH SÁCH DÒNG NHÂN VIÊN & SẢN LƯỢNG -->
        <div id="employeeList" class="employee-list">
          <!-- Các dòng sẽ tự động được Javascript thêm vào đây -->
        </div>

        <!-- 3. NÚT THAO TÁC -->
        <div class="action-buttons">
          <button type="button" class="btn btn-secondary" id="btnAddEmployee">
            ➕ Thêm nhân viên
          </button>

          <button type="button" class="btn btn-primary" id="btnSaveProduction">
            💾 Lưu toàn bộ phiếu
          </button>
        </div>
      </div>
    </section>
  `;

  // Khởi tạo các sự kiện và tự động tạo 1 dòng mặc định ban đầu
  initProductionApp();
}

// ==========================================
// LOGIC XỬ LÝ SỰ KIỆN VÀ THÊM DÒNG
// ==========================================

function initProductionApp() {
  const employeeList = document.getElementById("employeeList");
  const btnAdd = document.getElementById("btnAddEmployee");
  const btnSave = document.getElementById("btnSaveProduction");

  // Hàm tạo HTML cho 1 dòng nhập dữ liệu Nhân viên
  function createEmployeeRow() {
    const rowDiv = document.createElement("div");
    rowDiv.className = "employee-row";

    rowDiv.innerHTML = `
      <!-- Chọn nhân viên -->
      <div class="form-group">
        <label>Nhân viên</label>
        <select class="form-control emp-select">
          <option value="">-- Chọn NV --</option>
          <option value="NV001">NV001 - Nguyễn Văn A</option>
          <option value="NV002">NV002 - Trần Thị B</option>
          <option value="NV003">NV003 - Lê Văn C</option>
        </select>
      </div>

      <!-- Nhập sản lượng -->
      <div class="form-group">
        <label>Sản lượng</label>
        <input type="text" class="form-control emp-production" placeholder="VD: 10 + 5 * 2" />
      </div>

      <!-- Chọn đơn vị -->
      <div class="form-group">
        <label>Đơn vị</label>
        <select class="form-control emp-unit">
          <option value="Tấn">Tấn</option>
          <option value="CBM">CBM</option>
          <option value="Móc treo">Móc treo</option>
        </select>
      </div>

      <!-- Nút xóa dòng -->
      <button type="button" class="btn-delete" title="Xóa dòng này">🗑️</button>
    `;

    // Sự kiện xóa dòng khi bấm nút 🗑️
    const btnDelete = rowDiv.querySelector(".btn-delete");
    btnDelete.addEventListener("click", () => {
      // Đảm bảo phải còn ít nhất 1 dòng
      if (employeeList.children.length > 1) {
        rowDiv.remove();
      } else {
        alert("Phiếu ghi nhận phải có ít nhất 1 nhân viên!");
      }
    });

    return rowDiv;
  }

  // 1. Mặc định tạo sẵn 1 dòng khi mở trang
  employeeList.appendChild(createEmployeeRow());

  // 2. Bắt sự kiện khi người dùng bấm nút "+ Thêm nhân viên"
  btnAdd.addEventListener("click", () => {
    const newRow = createEmployeeRow();
    employeeList.appendChild(newRow);
  });

  // 3. Bắt sự kiện Bấm nút "Lưu" (Gom toàn bộ dữ liệu lại)
  btnSave.addEventListener("click", () => {
    const customer = document.getElementById("customer").value;

    if (!customer) {
      alert("Vui lòng chọn Khách hàng!");
      return;
    }

    // Thu thập dữ liệu từ tất cả các dòng nhân viên
    const rows = employeeList.querySelectorAll(".employee-row");
    const resultData = [];

    rows.forEach((row, index) => {
      const empCode = row.querySelector(".emp-select").value;
      const production = row.querySelector(".emp-production").value;
      const unit = row.querySelector(".emp-unit").value;

      resultData.push({
        dong: index + 1,
        maNhanVien: empCode,
        sanLuong: production,
        donVi: unit,
      });
    });

    console.log("Dữ liệu thu thập được:", {
      khachHang: customer,
      danhSachNhanVien: resultData,
    });

    alert("Đã ghi nhận thành công cho " + resultData.length + " nhân viên!");
  });
}
