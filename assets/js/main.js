/**
 * Template Name: Personal
 * Updated: Jan 09 2024 with Bootstrap v5.3.2
 * Template URL: https://bootstrapmade.com/personal-free-resume-bootstrap-template/
 * Author: BootstrapMade.com
 * License: https://bootstrapmade.com/license/
 */
(function () {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim();
    if (all) {
      return [...document.querySelectorAll(el)];
    } else {
      return document.querySelector(el);
    }
  };

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all);

    if (selectEl) {
      if (all) {
        selectEl.forEach((e) => e.addEventListener(type, listener));
      } else {
        selectEl.addEventListener(type, listener);
      }
    }
  };

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /**
   * Mobile nav toggle
   */
  on("click", ".mobile-nav-toggle", function (e) {
    select("#navbar").classList.toggle("navbar-mobile");
    this.classList.toggle("bi-list");
    this.classList.toggle("bi-x");
  });

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on(
    "click",
    "#navbar .nav-link",
    function (e) {
      let section = select(this.hash);
      if (section) {
        e.preventDefault();

        let navbar = select("#navbar");
        let header = select("#header");
        let sections = select("section", true);
        let navlinks = select("#navbar .nav-link", true);

        navlinks.forEach((item) => {
          item.classList.remove("active");
        });

        this.classList.add("active");

        if (navbar.classList.contains("navbar-mobile")) {
          navbar.classList.remove("navbar-mobile");
          let navbarToggle = select(".mobile-nav-toggle");
          navbarToggle.classList.toggle("bi-list");
          navbarToggle.classList.toggle("bi-x");
        }

        if (this.hash == "#header") {
          header.classList.remove("header-top");
          sections.forEach((item) => {
            item.classList.remove("section-show");
          });
          return;
        }

        if (!header.classList.contains("header-top")) {
          header.classList.add("header-top");
          setTimeout(function () {
            sections.forEach((item) => {
              item.classList.remove("section-show");
            });
            section.classList.add("section-show");
          }, 350);
        } else {
          sections.forEach((item) => {
            item.classList.remove("section-show");
          });
          section.classList.add("section-show");
        }

        scrollto(this.hash);
      }
    },
    true
  );

  /**
   * Activate/show sections on load with hash links
   */
  window.addEventListener("load", () => {
    if (window.location.hash) {
      let initial_nav = select(window.location.hash);

      if (initial_nav) {
        let header = select("#header");
        let navlinks = select("#navbar .nav-link", true);

        header.classList.add("header-top");

        navlinks.forEach((item) => {
          if (item.getAttribute("href") == window.location.hash) {
            item.classList.add("active");
          } else {
            item.classList.remove("active");
          }
        });

        setTimeout(function () {
          initial_nav.classList.add("section-show");
        }, 350);

        scrollto(window.location.hash);
      }
    }
  });
})();

// $("#contactform").submit((e) => {
//   e.preventDefault();

//   // Get the values of required fields
//   let name = $("#name").val();
//   let email = $("#email").val();
//   let phone = $("#phone").val();
//   let message = $("#message").val();

//   // Check if required values are null or empty
//   if (!name || !email || !phone || !message) {
//     alert("Please fill all required fields.");
//   } else {
//     $.ajax({
//       url: "https://script.google.com/macros/s/AKfycbz8tjiQk1mILpCTKEe8FGuto0J0GoZj61WYPK0o6eFyFdXyu6AoXfPPXQ7-5KUTQrR4cQ/exec",
//       data: $("#contactform").serialize(),
//       method: "post",
//       success: function (response) {
//         alert("Form submitted successfully");
//         $("#contactform")[0].reset();

//         // Reset the flags
//         nameAlertShown = false;
//         phoneAlertShown = false;
//         emailAlertShown = false;

//         window.location.href = "#contact";
//       },
//       error: function (err) {
//         alert("Something went wrong. Please try again later.");
//       },
//     });
//   }
// });

$("#contactform").submit((e) => {
  e.preventDefault();

  // Get the values of required fields
  let name = $("#name").val();
  let email = $("#email").val();
  let phone = $("#phone").val();
  let message = $("#message").val();

  // Check if required values are null or empty
  if (!name || !email || !phone || !message) {
    alert("Please fill all required fields.");
  } else {
    $.ajax({
      url: "https://script.google.com/macros/s/AKfycbw4bXzSLeQd2JqqWopLScmWBwpTgBDOl6lNo7gvbw1mrqSFt-yGArCJE0vHinYYn8oAGw/exec",
      data: $("#contactform").serialize(),
      method: "post",
      success: function (response) {
        alert("Form submitted successfully");
        $("#contactform")[0].reset();

        // Reset the flags
        nameAlertShown = false;
        phoneAlertShown = false;
        emailAlertShown = false;

        window.location.href = "#contact";
      },
      error: function (err) {
        alert("Something went wrong. Please try again later.");
      },
    });
  }
});
$(document).ready(function () {
  // Flags to track whether alerts have been shown
  let validationFlags = {
    nameAlertShown: false,
    phoneAlertShown: false,
    emailAlertShown: false,
  };

  $("#contactform").validate({
    rules: {
      name: {
        required: true,
        minlength: 4,
      },
      phone: {
        required: true,
      },
      email: {
        required: true,
      },
      message: {
        required: true,
      },
    },
  });

  document.getElementById("phone").addEventListener("blur", function (event) {
    validateField(
      event,
      /^[0-9+ ]+$/,
      "Please enter only numbers.",
      "phoneAlertShown"
    );
  });

  document.getElementById("email").addEventListener("blur", function (event) {
    validateField(
      event,
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Please enter a valid email address.",
      "emailAlertShown"
    );
  });

  document.getElementById("name").addEventListener("blur", function (event) {
    validateField(
      event,
      /^[ a-zA-Z]+$/,
      "Please enter a proper name.",
      "nameAlertShown"
    );
  });

  function validateField(event, regex, errorMessage, flag) {
    // Get the input value
    let inputValue = event.target.value;

    // Check if the input matches the regular expression
    if (!regex.test(inputValue) && !validationFlags[flag]) {
      alert(errorMessage);

      // Clear the input or take other actions as needed
      event.target.value = ""; // Clear the input for demonstration, replace with your logic

      // Set the flag to true only after validation fails
      validationFlags[flag] = true;
    } else {
      // If the input is valid, reset the flag
      validationFlags[flag] = false;
    }
  }
});
