import {convertToISO} from "./date.js";
import {closeModal} from "./ui.js";

let bookingData = {};

export function submitBooking(getStart, getEnd, getDate, submitButton, modal) {
  submitButton.addEventListener("click", function () {
    const selectedStart = getStart();
    const selectedEnd = getEnd();
    const date = getDate();

    console.log("Выбранная дата перед обработкой:", date); // Отладка

    if (!date) {
      alert("Ошибка: Дата не выбрана");
      return;
    }

    const dateISO = date.includes("-") ? date : convertToISO(date); // Проверяем формат
    if (!dateISO) {
      alert("Ошибка при обработке даты");
      return;
    }

    if (selectedStart && selectedEnd && dateISO) {
      bookingData = {
        date: dateISO,
        start_time: selectedStart,
        end_time: selectedEnd,
      };

      console.log("Данные о бронировании сохранены:", bookingData);
      updateSelectedDateTime(dateISO, selectedStart, selectedEnd);
      closeModal(modal);
    } else {
      alert("Выберите время и дату!");
    }
  });
}

export function getBookingData() {
  return bookingData;
}

function updateSelectedDateTime(date, start, end) {
  const contactsDates = document.querySelector('.contacts__dates');
  const dateElement = document.getElementById("selectDateDay");
  const timeElement = document.getElementById("selectDateTime");

  if (!dateElement || !timeElement) {
    console.error("Элементы для вывода даты и времени не найдены!");
    return;
  }

  const monthNames = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];

  const match = date.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) {
    console.error("Некорректный формат даты:", date);
    return;
  }

  const [, year, month, day] = match;
  const formattedDate = `${parseInt(day)} ${monthNames[parseInt(month) - 1]}`;

  dateElement.textContent = `Выбранный день: ${formattedDate}`;
  timeElement.textContent = `Выбранное время: ${start} - ${end}`;

  contactsDates.style.display = "flex";
}