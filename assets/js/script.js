'use strict';



/**
 * add event on element
 */

const addEventOnElem = function (elem, type, callback) {
  if (elem.length > 1) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else {
    elem.addEventListener(type, callback);
  }
}



/**
 * navbar toggle
 */

const navbar = document.querySelector("[data-navbar]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");
const navToggler = document.querySelector("[data-nav-toggler]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  this.classList.toggle("active");
}

addEventOnElem(navToggler, "click", toggleNavbar);

const closeNavbar = function () {
  navbar.classList.remove("active");
  navToggler.classList.remove("active");
}

addEventOnElem(navbarLinks, "click", closeNavbar);



/**
 * search bar toggle
 */

const searchBar = document.querySelector("[data-search-bar]");
const searchTogglers = document.querySelectorAll("[data-search-toggler]");
const overlay = document.querySelector("[data-overlay]");

const toggleSearchBar = function () {
  searchBar.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("active");
}

addEventOnElem(searchTogglers, "click", toggleSearchBar);


// ...your existing code above...

// Telegram upload form code here 👇
const uploadForm = document.getElementById("uploadForm");
const toast = document.getElementById("toast");

if (uploadForm) {
  uploadForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const fileInput = document.getElementById("fileInput");
    if (!fileInput.files.length) {
      showToast("⚠️ Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", fileInput.files[0]);

    const backendURL = "https://telegram-file-uploader-hy9e.onrender.com/upload";

    try {
      const res = await fetch(backendURL, {
        method: "POST",
        body: formData,
      });

      const result = await res.json();

      if (result.status === "success") {
        showToast("✅ File sent to Telegram!");
        uploadForm.reset();
      } else {
        showToast("❌ Upload failed.");
      }
    } catch (err) {
      console.error(err);
      showToast("❌ Something went wrong.");
    }
  });
}

function showToast(message) {
  toast.textContent = message;
  toast.style.visibility = "visible";
  toast.style.opacity = "1";
  toast.style.bottom = "50px";

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.bottom = "30px";
    setTimeout(() => {
      toast.style.visibility = "hidden";
    }, 500);
  }, 3000);
}

