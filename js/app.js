// ==========================================
// APP.JS - ROUTER CÓ ĐỔI ĐUÔI LINK (URL)
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
  const navButtons = document.querySelectorAll("[data-page]");

  // 1. Hàm chuyển trang và cập nhật thanh địa chỉ URL
  function navigateTo(page, updateHistory = true) {
    switch (page) {
      case "login":
        if (typeof loadLogin === "function") loadLogin();
        break;
      case "home":
        if (typeof loadHome === "function") loadHome();
        break;
      case "about":
        if (typeof loadAbout === "function") loadAbout();
        break;
      case "career":
        if (typeof loadCareer === "function") loadCareer();
        break;
      case "contact":
        if (typeof loadContact === "function") loadContact();
        break;
      case "sanluong":
        if (typeof loadProduction === "function") loadProduction();
        break;
      default:
        if (typeof loadHome === "function") loadHome();
        page = "home";
    }

    // Cập nhật đuôi link trên thanh địa chỉ trình duyệt mà không reload
    if (updateHistory) {
      history.pushState({ page: page }, "", `/${page}`);
    }
  }

  // 2. Lắng nghe sự kiện click trên thanh Menu
  navButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const page = button.getAttribute("data-page");
      navigateTo(page);
    });
  });

  // 3. Xử lý khi người dùng bấm nút Back / Forward trên trình duyệt
  window.addEventListener("popstate", (event) => {
    if (event.state && event.state.page) {
      navigateTo(event.state.page, false);
    } else {
      // Đọc URL hiện tại nếu nhấn Back về đầu
      const path = window.location.pathname.replace("/", "");
      navigateTo(path || "home", false);
    }
  });

  // 4. Kiểm tra URL khi vừa truy cập trang web lần đầu
  const currentPath = window.location.pathname.replace("/", "");
  navigateTo(currentPath || "home", false);
});
