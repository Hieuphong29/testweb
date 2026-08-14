// ==========================================
// SANLUONG.JS
// Trang Phiếu ghi nhận sản lượng
// ==========================================

function loadProduction() {
  const app = document.getElementById("app");

  app.innerHTML = `
    <!-- NHÚNG STYLE RIÊNG CHO TRANG SẢN LƯỢNG -->
    <style>
      .production-page {
        max-width: 800px;
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
        margin-bottom: 24px;
        border-bottom: 2px solid #f1f5f9;
        padding-bottom: 12px;
      }

      .page-header h1 {
        font-size: 22px;
        color: #1e293b;
        font-weight: 700;
      }

      /* Bố cục Form dạng Lưới (Grid) */
      .form-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: 20px;
        margin-bottom: 24px;
      }

      .form-group {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .form-group label {
        font-size: 14px;
        font-weight: 600;
        color: #475569;
      }

      .form-control {
        width: 100%;
        padding: 10px 14px;
        border: 1px solid #cbd5e1;
        border-radius: 8px;
        font-size: 14px;
        outline: none;
        transition: all 0.2s ease;
        background-color: #f8fafc;
      }

      .form-control:focus {
        border-color: #ff6f00;
        background-color: #ffffff;
        box-shadow: 0 0 0 3px rgba(255, 111, 0, 0.15);
      }

      /* Vùng chọn đơn vị tính dạng Pill */
      .unit-section {
        margin-bottom: 28px;
      }

      .unit-section p {
        font-size: 14px;
        font-weight: 600;
        color: #475569;
        margin-bottom: 10px;
      }

      .unit-group {
        display: flex;
        gap: 12px;
        flex-wrap: wrap;
      }

      .unit-option {
        display: flex;
        align-items: center;
        gap: 8px;
        background: #f1f5f9;
        padding: 8px 16px;
        border-radius: 20px;
        cursor: pointer;
        font-size: 14px;
        font-weight: 500;
        color: #334155;
        border: 1px solid transparent;
        transition: all 0.2s ease;
      }

      .unit-option:hover {
        background: #e2e8f0;
      }

      .unit-option input[type="radio"] {
        accent-color: #ff6f00;
      }

      /* Nhóm nút hành động */
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
        transform: translateY(-1px);
      }
    </style>

    <section class="production-page">
      <div class="card">
        <!-- TIÊU ĐỀ -->
        <div class="page-header">
          <h1>📋 Phiếu Ghi Nhận Sản Lượng</h1>
        </div>

        <!-- FORM CÁC TRƯỜNG THÔNG TIN -->
        <div class="form-grid">
          <!-- Mã số nhân viên -->
          <div class="form-group">
            <label for="employee">Mã số nhân viên</label>
            <select id="employee" class="form-control">
              <option value="">-- Chọn nhân viên --</option>
              <option value="NV001">NV001 - Nguyễn Văn A</option>
              <option value="NV002">NV002 - Trần Thị B</option>
              <option value="NV003">NV003 - Lê Văn C</option>
            </select>
          </div>

          <!-- Khách hàng -->
          <div class="form-group">
            <label for="customer">Khách hàng</label>
            <select id="customer" class="form-control">
              <option value="">-- Chọn khách hàng --</option>
              <option value="KH001">KH001 - Công ty Á Châu</option>
              <option value="KH002">KH002 - Tập đoàn Hòa Phát</option>
              <option value="KH003">KH003 - Logistics Đại Nam</option>
            </select>
          </div>

          <!-- Sản lượng -->
          <div class="form-group">
            <label for="production">Sản lượng nhập</label>
            <input
              type="text"
              id="production"
              class="form-control"
              placeholder="Nhập số hoặc biểu thức (VD: 10 + 5 * 2)"
            />
          </div>
        </div>

        <!-- ĐƠN VỊ TÍNH -->
        <div class="unit-section">
          <p>Đơn vị tính</p>
          <div class="unit-group">
            <label class="unit-option">
              <input type="radio" name="unit" value="tan" checked />
              Tấn
            </label>

            <label class="unit-option">
              <input type="radio" name="unit" value="cbm" />
              CBM
            </label>

            <label class="unit-option">
              <input type="radio" name="unit" value="moc-treo" />
              Móc treo
            </label>
          </div>
        </div>

        <!-- CÁC NÚT THAO TÁC -->
        <div class="action-buttons">
          <button type="button" class="btn btn-secondary" id="btnAddEmployee">
            + Thêm nhân viên
          </button>

          <button type="button" class="btn btn-primary" id="btnSaveProduction">
            💾 Lưu phiếu
          </button>
        </div>
      </div>
    </section>
  `;

  // KHỞI TẠO SỰ KIỆN NÚT BẤM
  initProductionEvents();
}

// Hàm khởi tạo các sự kiện cho trang sản lượng
function initProductionEvents() {
  const btnSave = document.getElementById("btnSaveProduction");
  const btnAdd = document.getElementById("btnAddEmployee");

  btnSave?.addEventListener("click", () => {
    alert("Đã lưu dữ liệu thành công!");
  });

  btnAdd?.addEventListener("click", () => {
    alert("Chức năng thêm dòng nhân viên sẽ được phát triển sau!");
  });
}
