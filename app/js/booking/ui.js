export function openModal(button, modal, dateInput, loadSlots) {
  button.addEventListener("click", function () {
    modal.classList.add("active");
    document.body.classList.add("modal-active");
    document.documentElement.classList.add("active");

    const todayFormatted = dateInput.value;
    loadSlots(todayFormatted);
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeModal(modal);
    }
  });

  const closeModalButton = document.getElementById("closeModal");
  closeModalButton.addEventListener("click", function () {
    closeModal(modal);
  });
}

export function closeModal(modal) {
  modal.classList.remove("active");
  document.body.classList.remove("modal-active");
  document.documentElement.classList.remove("active");
  setTimeout(() => {
    modal.scrollTop = 0;
  }, 250)
}