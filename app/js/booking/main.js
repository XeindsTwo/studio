import {initDatePicker, formatDate, convertToISO} from './date.js';
import {renderSlots, highlightIntermediateSlots, clearIntermediateHighlights} from './slots.js';
import {submitBooking} from './booking.js';
import {openModal, closeModal} from './ui.js';

document.addEventListener("DOMContentLoaded", function () {
  const button = document.getElementById("buttonSelectTime");
  const modal = document.getElementById("timeModal");
  const slotsContainer = document.getElementById("slotsContainer");
  const submitButton = document.getElementById("submitBooking");
  const closeModalButton = document.getElementById("closeModal");
  const dateInput = document.getElementById("date");

  let selectedStart = null;
  let selectedEnd = null;
  let bookedSlotsData = [];

  const loadSlots = (date) => {
    if (!date) {
      console.error("Некорректная дата:", date);
      return;
    }

    const formattedDate = formatDate(new Date(date));
    console.log("Загружаем слоты для даты:", formattedDate);

    fetch(`php/functions/get_slots.php?date=${formattedDate}`)
      .then(response => response.json())
      .then(data => {
        if (data && Array.isArray(data)) {
          bookedSlotsData = data;
          console.log("Занятые слоты:", bookedSlotsData);
          renderSlots(bookedSlotsData, slotsContainer, selectSlot);
        } else {
          console.error("Ошибочные данные от сервера");
        }
      })
      .catch(error => console.error("Ошибка загрузки слотов", error));
  };

  function isOverlappingWithBookedSlots(start, end) {
    return bookedSlotsData.some(slot =>
      (start >= slot.start_time && start < slot.end_time) ||
      (end > slot.start_time && end <= slot.end_time) ||
      (start <= slot.start_time && end >= slot.end_time)
    );
  }

  function selectSlot(time, index, element) {
    if (selectedStart === null) {
      selectedStart = time;
      element.classList.add("selected");
    } else if (selectedEnd === null) {
      selectedEnd = time;

      if (compareTimes(selectedStart, selectedEnd) > 0) {
        [selectedStart, selectedEnd] = [selectedEnd, selectedStart];
      }

      if (isOverlappingWithBookedSlots(selectedStart, selectedEnd)) {
        alert("Выбранный интервал пересекается с уже забронированным!");
        clearSelection();
        return;
      }

      element.classList.add("selected");
      highlightIntermediateSlots(slotsContainer.children, selectedStart, selectedEnd);
    } else {
      clearSelection();
      selectedStart = time;
      selectedEnd = null;
      element.classList.add("selected");
    }
  }

  function clearSelection() {
    document.querySelectorAll(".selected").forEach(el => el.classList.remove("selected"));
    clearIntermediateHighlights();
    selectedStart = null;
    selectedEnd = null;
  }

  function compareTimes(startTime, endTime) {
    const [startHour, startMinute] = startTime.split(":").map(Number);
    const [endHour, endMinute] = endTime.split(":").map(Number);
    return (startHour * 60 + startMinute) - (endHour * 60 + endMinute);
  }

  initDatePicker(dateInput, loadSlots);
  loadSlots(formatDate(new Date()));

  button.addEventListener('click', () => {
    if (!dateInput.value) {
      dateInput.value = formatDate(new Date());
    }
    const isoDate = convertToISO(dateInput.value);
    loadSlots(isoDate);
  });

  openModal(button, modal);
  closeModal(closeModalButton, modal);
  submitBooking(() => selectedStart, () => selectedEnd, () => dateInput.value, submitButton, modal);
});