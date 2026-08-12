// ==========================================
// TÀI KHOẢN TEST
// ==========================================

const TEST_USERNAME = "test";
const TEST_PASSWORD = "123456";

// ==========================================
// LẤY ELEMENT
// ==========================================

const loginForm = document.getElementById("loginForm");

const usernameInput = document.getElementById("username");

const passwordInput = document.getElementById("password");

const rememberInput = document.getElementById("remember");

const errorMessage = document.getElementById("errorMessage");

const loginButton = document.getElementById("loginButton");

const loginButtonText = document.getElementById("loginButtonText");

const togglePassword = document.getElementById("togglePassword");

const forgotPassword = document.getElementById("forgotPassword");

// ==========================================
// HIỆN / ẨN MẬT KHẨU
// ==========================================

togglePassword.addEventListener("click", function () {
  if (passwordInput.type === "password") {
    passwordInput.type = "text";

    togglePassword.textContent = "Ẩn";
  } else {
    passwordInput.type = "password";

    togglePassword.textContent = "Hiện";
  }
});

// ==========================================
// HIỆN LỖI
// ==========================================

function showError(text) {
  errorMessage.textContent = text;

  errorMessage.style.display = "block";
}

// ==========================================
// ẨN LỖI
// ==========================================

function hideError() {
  errorMessage.textContent = "";

  errorMessage.style.display = "none";
}

// ==========================================
// XỬ LÝ LOGIN
// ==========================================

loginForm.addEventListener("submit", function (event) {
  // Không cho trình duyệt reload trang
  event.preventDefault();

  hideError();

  const username = usernameInput.value.trim();

  const password = passwordInput.value;

  // -------------------------------
  // Kiểm tra username
  // -------------------------------

  if (username === "") {
    showError("Vui lòng nhập tên đăng nhập.");

    usernameInput.focus();

    return;
  }

  // -------------------------------
  // Kiểm tra password
  // -------------------------------

  if (password === "") {
    showError("Vui lòng nhập mật khẩu.");

    passwordInput.focus();

    return;
  }

  // -------------------------------
  // Hiệu ứng đăng nhập
  // -------------------------------

  loginButton.disabled = true;

  loginButtonText.textContent = "Đang đăng nhập...";

  // -------------------------------
  // KIỂM TRA TÀI KHOẢN TEST
  // -------------------------------

  if (username === TEST_USERNAME && password === TEST_PASSWORD) {
    // Lưu trạng thái đăng nhập
    sessionStorage.setItem("isLoggedIn", "true");

    // Lưu username
    sessionStorage.setItem("username", username);

    // Nếu chọn ghi nhớ
    if (rememberInput.checked) {
      localStorage.setItem("rememberLogin", "true");
    } else {
      localStorage.removeItem("rememberLogin");
    }

    // Chuyển sang trang sản lượng
    window.location.href = "sanluong.html";

    return;
  }

  // -------------------------------
  // ĐĂNG NHẬP SAI
  // -------------------------------

  showError("Tên đăng nhập hoặc mật khẩu không đúng.");

  loginButton.disabled = false;

  loginButtonText.textContent = "Log In";
});

// ==========================================
// QUÊN MẬT KHẨU
// ==========================================

forgotPassword.addEventListener("click", function (event) {
  event.preventDefault();

  alert("Chức năng Quên mật khẩu sẽ được bổ sung sau.");
});
