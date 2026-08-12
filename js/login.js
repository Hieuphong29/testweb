// ==========================================
// LOGIN.JS
// Trang đăng nhập
// ==========================================

// ==========================================
// TÀI KHOẢN TEST
// ==========================================

const TEST_USERNAME = "test";
const TEST_PASSWORD = "123456";

// ==========================================
// HIỂN THỊ TRANG LOGIN
// ==========================================

function loadLogin() {
  app.innerHTML = `

        <section class="login-page">

            <div class="login-container">

                <!-- LOGO -->

                <div class="logo">
                    T&B Logistics
                </div>


                <!-- TIÊU ĐỀ -->

                <h1 class="login-title">
                    Đăng nhập
                </h1>


                <p class="login-subtitle">
                    Đăng nhập để tiếp tục
                </p>


                <!-- THÔNG BÁO -->

                <div
                    id="loginMessage"
                    class="message error-message"
                ></div>


                <!-- FORM -->

                <form
                    id="loginForm"
                    class="login-form"
                >


                    <!-- USERNAME -->

                    <div class="form-group">

                        <label for="loginUsername">
                            Tên đăng nhập
                        </label>


                        <input
                            type="text"
                            id="loginUsername"
                            placeholder="Nhập tên đăng nhập"
                            autocomplete="username"
                        >

                    </div>


                    <!-- PASSWORD -->

                    <div class="form-group">

                        <label for="loginPassword">
                            Mật khẩu
                        </label>


                        <div class="password-wrapper">

                            <input
                                type="password"
                                id="loginPassword"
                                placeholder="Nhập mật khẩu"
                                autocomplete="current-password"
                            >


                            <button
                                type="button"
                                id="togglePassword"
                                class="toggle-password"
                            >
                                Hiện
                            </button>

                        </div>

                    </div>


                    <!-- OPTIONS -->

                    <div class="login-options">

                        <label class="remember">

                            <input
                                type="checkbox"
                                id="rememberLogin"
                            >

                            <span>
                                Ghi nhớ đăng nhập
                            </span>

                        </label>


                        <button
                            type="button"
                            id="forgotPassword"
                            class="forgot-password"
                        >
                            Quên mật khẩu?
                        </button>

                    </div>


                    <!-- BUTTON LOGIN -->

                    <button
                        type="submit"
                        id="loginButton"
                        class="login-button"
                    >
                        Đăng nhập
                    </button>

                </form>


                <!-- TÀI KHOẢN TEST -->

                <div class="test-account">

                    <div class="test-title">
                        Tài khoản TEST
                    </div>


                    <div class="test-info">

                        <span>
                            Username:
                        </span>

                        <strong>
                            test
                        </strong>

                    </div>


                    <div class="test-info">

                        <span>
                            Password:
                        </span>

                        <strong>
                            123456
                        </strong>

                    </div>

                </div>


                <!-- QUAY LẠI HOME -->

                <button
                    type="button"
                    id="backHome"
                    class="back-home"
                >
                    ← Quay lại trang chủ
                </button>

            </div>

        </section>

    `;

  // ======================================
  // KHỞI TẠO CHỨC NĂNG LOGIN
  // ======================================

  initLogin();
}

// ==========================================
// KHỞI TẠO LOGIN
// ==========================================

function initLogin() {
  const loginForm = document.getElementById("loginForm");

  const usernameInput = document.getElementById("loginUsername");

  const passwordInput = document.getElementById("loginPassword");

  const rememberInput = document.getElementById("rememberLogin");

  const loginButton = document.getElementById("loginButton");

  const togglePassword = document.getElementById("togglePassword");

  const forgotPassword = document.getElementById("forgotPassword");

  const backHome = document.getElementById("backHome");

  // ======================================
  // HIỆN / ẨN MẬT KHẨU
  // ======================================

  togglePassword.addEventListener("click", function () {
    if (passwordInput.type === "password") {
      passwordInput.type = "text";

      togglePassword.textContent = "Ẩn";
    } else {
      passwordInput.type = "password";

      togglePassword.textContent = "Hiện";
    }
  });

  // ======================================
  // SUBMIT LOGIN
  // ======================================

  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const username = usernameInput.value.trim();

    const password = passwordInput.value;

    // Xóa thông báo cũ

    hideLoginMessage();

    // ==================================
    // KIỂM TRA USERNAME
    // ==================================

    if (username === "") {
      showLoginMessage("Vui lòng nhập tên đăng nhập.");

      usernameInput.focus();

      return;
    }

    // ==================================
    // KIỂM TRA PASSWORD
    // ==================================

    if (password === "") {
      showLoginMessage("Vui lòng nhập mật khẩu.");

      passwordInput.focus();

      return;
    }

    // ==================================
    // ĐANG ĐĂNG NHẬP
    // ==================================

    loginButton.disabled = true;

    loginButton.textContent = "Đang đăng nhập...";

    // ==================================
    // KIỂM TRA TÀI KHOẢN TEST
    // ==================================

    if (username === TEST_USERNAME && password === TEST_PASSWORD) {
      // ------------------------------
      // LƯU TRẠNG THÁI ĐĂNG NHẬP
      // ------------------------------

      sessionStorage.setItem("isLoggedIn", "true");

      // ------------------------------
      // LƯU USERNAME
      // ------------------------------

      sessionStorage.setItem("username", username);

      // ------------------------------
      // GHI NHỚ ĐĂNG NHẬP
      // ------------------------------

      if (rememberInput.checked) {
        localStorage.setItem("rememberLogin", "true");
      } else {
        localStorage.removeItem("rememberLogin");
      }

      // ------------------------------
      // ĐĂNG NHẬP THÀNH CÔNG
      // ------------------------------

      loginButton.textContent = "Đăng nhập thành công";

      // ------------------------------
      // CHUYỂN SANG SẢN LƯỢNG
      // ------------------------------

      setTimeout(function () {
        loadProduction();
      }, 300);

      return;
    }

    // ==================================
    // SAI TÀI KHOẢN
    // ==================================

    showLoginMessage("Tên đăng nhập hoặc mật khẩu không đúng.");

    loginButton.disabled = false;

    loginButton.textContent = "Đăng nhập";
  });

  // ======================================
  // QUÊN MẬT KHẨU
  // ======================================

  forgotPassword.addEventListener("click", function () {
    alert("Chức năng Quên mật khẩu sẽ được bổ sung sau.");
  });

  // ======================================
  // QUAY VỀ HOME
  // ======================================

  backHome.addEventListener("click", function () {
    loadHome();
  });
}

// ==========================================
// HIỂN THỊ THÔNG BÁO LỖI
// ==========================================

function showLoginMessage(message) {
  const messageElement = document.getElementById("loginMessage");

  messageElement.textContent = message;

  messageElement.style.display = "block";
}

// ==========================================
// ẨN THÔNG BÁO
// ==========================================

function hideLoginMessage() {
  const messageElement = document.getElementById("loginMessage");

  messageElement.textContent = "";

  messageElement.style.display = "none";
}
