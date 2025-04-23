export function formatDate(date) {
  let dd = date.getDate();
  let mm = date.getMonth() + 1;
  let yyyy = date.getFullYear();
  return `${yyyy}-${mm < 10 ? "0" + mm : mm}-${dd < 10 ? "0" + dd : dd}`;
}

export function initDatePicker(dateInput, onChange) {
  const today = new Date();
  const sixDaysFromNow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 6);

  dateInput.value = formatDate(today);

  flatpickr(dateInput, {
    dateFormat: "d F Y",
    minDate: today,
    maxDate: sixDaysFromNow,
    disableMobile: true,
    locale: {
      firstDayOfWeek: 1,
      weekdays: {
        shorthand: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
        longhand: ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"]
      },
      months: {
        shorthand: ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"],
        longhand: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"]
      }
    },
    defaultDate: today,
    onChange: (selectedDates) => {
      if (selectedDates.length > 0) {
        onChange(formatDate(selectedDates[0]));
      } else {
        onChange(formatDate(today));
      }
    }
  });
}

export function convertToISO(dateStr) {
  const [day, monthName, year] = dateStr.split(' ');

  const monthMap = {
    'Январь': '01', 'Февраль': '02', 'Март': '03', 'Апрель': '04', 'Май': '05', 'Июнь': '06',
    'Июль': '07', 'Август': '08', 'Сентябрь': '09', 'Октябрь': '10', 'Ноябрь': '11', 'Декабрь': '12'
  };

  const month = monthMap[monthName];

  if (!month) {
    console.error("Ошибка конвертации даты:", dateStr);
    return null;
  }

  return `${year}-${month}-${day.padStart(2, '0')}`;
}