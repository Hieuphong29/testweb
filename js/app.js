// ==========================================
// APP.JS - TRẠM ĐIỀU KHIỂN TRUNG TÂM (ROUTER)
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
  // Lấy tất cả các nút điều hướng trên Menu có thuộc tính data-page
  const navButtons = document.querySelectorAll("[data-page]");

  // Lắng nghe sự kiện click trên từng nút bấm
  navButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const page = button.getAttribute("data-page");

      // Gọi hàm load tương ứng theo trang được bấm
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
        default:
          console.warn("Trang không tồn tại:", page);
      }
    });
  });

  // Mặc định nạp Trang chủ khi vừa mở web
  if (typeof loadHome === "function") {
    loadHome();
  }
});
