function loadLogin() {
  app.innerHTML = `

        <section class="login-page">

            <div class="login-container">

                <h1>
                    Đăng nhập
                </h1>

                <input
                    type="text"
                    id="username"
                    placeholder="Tên đăng nhập"
                >

                <input
                    type="password"
                    id="password"
                    placeholder="Mật khẩu"
                >

                <button
                    onclick="login()"
                >
                    Log In
                </button>

                <p id="loginError"></p>

            </div>

        </section>

    `;
}
function login() {
  const username = document.getElementById("username").value;

  const password = document.getElementById("password").value;

  if (username === "test" && password === "123456") {
    sessionStorage.setItem("isLoggedIn", "true");

    loadProduction();
  } else {
    document.getElementById("loginError").textContent =
      "Sai tài khoản hoặc mật khẩu.";
  }
}
