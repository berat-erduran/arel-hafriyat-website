document.addEventListener("DOMContentLoaded", function () {
  var scrollTopBtn = document.querySelector(".scroll-top-btn");

  if (!scrollTopBtn) {
    return;
  }

  window.addEventListener("scroll", function () {
    if (window.scrollY > 300) {
      scrollTopBtn.classList.add("show");
    } else {
      scrollTopBtn.classList.remove("show");
    }
  });

  scrollTopBtn.addEventListener("click", function (e) {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
});
