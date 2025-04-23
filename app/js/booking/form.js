import {getBookingData} from './booking.js';

document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".contacts__form");
  const submitButton = form.querySelector("button[type='submit']");
  const modal = document.getElementById("modal-success");
  const body = document.body;
  const modalClose = modal.querySelector(".modal__close");
  const errorMessage = document.getElementById("contacts-error");
  const html = document.documentElement;

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = new FormData(form);
    const bookingData = getBookingData();

    if (bookingData.date && bookingData.start_time && bookingData.end_time) {
      formData.append("date", bookingData.date);
      formData.append("start_time", bookingData.start_time);
      formData.append("end_time", bookingData.end_time);
    }

    let isValid = true;

    for (let value of formData.values()) {
      if (!value.trim()) {
        isValid = false;
        break;
      }
    }

    if (!isValid) {
      showError();
      return;
    }

    submitButton.disabled = true;

    fetch("php/form.php", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          document.cookie = "redirected=true; path=/";
          window.location.href = "/thanks/";
        } else {
          showError(data.message || "Ошибка при отправке формы!");
        }
      })
      .catch(() => {
        showError("Ошибка соединения с сервером!");
      })
      .finally(() => {
        submitButton.disabled = false;
      });
  });

  function showError(message = "Пожалуйста, заполните все поля") {
    errorMessage.textContent = message;
    errorMessage.style.display = "block";
    submitButton.disabled = true;

    setTimeout(() => {
      errorMessage.style.display = "none";
      submitButton.disabled = false;
    }, 2500);
  }

  modalClose.addEventListener("click", function () {
    closeModal();
  });

  function closeModal() {
    modal.classList.remove("active");
    body.classList.remove("modal-active");
    html.classList.remove("active");
  }
});