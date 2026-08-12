function loadProduction() {
  app.innerHTML = `

        <section class="production-page">

            <h1>
                Phiếu ghi nhận sản lượng
            </h1>


            <div class="employee-row">

                <label>
                    Mã số nhân viên
                </label>

                <select id="employee">
                    <option>NV001</option>
                    <option>NV002</option>
                    <option>NV003</option>
                </select>


                <label>
                    Khách hàng
                </label>

                <select id="customer">
                    <option>KH001</option>
                    <option>KH002</option>
                    <option>KH003</option>
                </select>


                <label>
                    Sản lượng
                </label>

                <input
                    type="text"
                    id="production"
                    placeholder="Ví dụ: 10 + 5 * 2"
                >

            </div>


            <div class="unit">

                <label>
                    <input
                        type="checkbox"
                    >
                    Tấn
                </label>


                <label>
                    <input
                        type="checkbox"
                    >
                    CBM
                </label>


                <label>
                    <input
                        type="checkbox"
                    >
                    Móc treo
                </label>

            </div>


            <button>
                Thêm nhân viên
            </button>


            <button>
                Lưu
            </button>

        </section>

    `;
}
