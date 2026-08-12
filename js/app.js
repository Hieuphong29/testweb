const app = document.getElementById("app");

// ==========================================
// CÁC NÚT MENU
// ==========================================

const navButtons = document.querySelectorAll(".nav-button, .login-button");

// ==========================================
// XỬ LÝ CLICK
// ==========================================

navButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    const page = button.dataset.page;

    loadPage(page);
  });
});

// ==========================================
// LOAD PAGE
// ==========================================

function loadPage(page) {
  switch (page) {
    case "home":
      loadHome();

      break;

    case "about":
      loadAbout();

      break;

    case "career":
      loadCareer();

      break;

    case "contact":
      loadContact();

      break;

    case "login":
      loadLogin();

      break;

    default:
      loadHome();
  }
}

// ==========================================
// TRANG MẶC ĐỊNH
// ==========================================

loadPage("home");
