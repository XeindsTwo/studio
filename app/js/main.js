import {setupMobileMenu} from "./mobileMenu.js";

setupMobileMenu();

document.addEventListener("DOMContentLoaded", function () {
  const video = document.querySelector(".home__video");
  video.removeAttribute("controls");

  setTimeout(function () {
    const iframe = document.getElementById("mapFrame");
    iframe.src = iframe.getAttribute("data-src");
    iframe.style.display = "block";
  }, 3000);
});

function scrollToSection(event) {
  event.preventDefault();
  const targetId = event.target.getAttribute('href').slice(1);
  const targetElement = document.getElementById(targetId);

  let targetOffset;

  targetOffset = targetElement.offsetTop - 30;
  window.scrollTo({top: targetOffset, behavior: 'smooth'});
}

const menuLinks = document.querySelectorAll('.desktop');

menuLinks.forEach((menuLink) => {
  menuLink.addEventListener('click', scrollToSection);
});

new Swiper('.benefits__swiper', {
  autoplay: true,
  loop: true,
  breakpoints: {
    960: {
      slidesPerView: 3,
      spaceBetween: 15,
    },
    520: {
      slidesPerView: 2,
      spaceBetween: 15
    },
    280: {
      autoHeight: true,
      slidesPerView: 1,
      spaceBetween: 20,
    }
  },
  pagination: {
    el: '.swiper-pagination'
  }
});

new Swiper('.services__swiper', {
  navigation: {
    nextEl: '.services__btn--next',
    prevEl: '.services__btn--prev',
  },
  keyboard: {
    enabled: true,
    onlyInViewport: false
  },
  breakpoints: {
    1040: {
      slidesPerView: 3,
      spaceBetween: 15,
    },
    520: {
      slidesPerView: 2,
      spaceBetween: 15
    },
    280: {
      autoHeight: true,
      slidesPerView: 1,
      spaceBetween: 20,
    }
  }
});

new Swiper('.reviews__swiper', {
  navigation: {
    nextEl: '.reviews__btn--next',
    prevEl: '.reviews__btn--prev',
  },
  breakpoints: {
    1100: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    580: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    280: {
      slidesPerView: 1,
      spaceBetween: 20,
    }
  }
});

const today = new Date();
const threeMonthsFromNow = new Date(today.getFullYear(), today.getMonth() + 3, today.getDate());

flatpickr("#date", {
  dateFormat: "d F Y",
  minDate: today,
  maxDate: threeMonthsFromNow,
  disableMobile: true,
  locale: {
    firstDayOfWeek: 1,
    weekdays: {
      shorthand: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
      longhand: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота']
    },
    months: {
      shorthand: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
      longhand: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']
    }
  }
});

flatpickr("#time_from", {
  enableTime: true,
  noCalendar: true,
  dateFormat: "H:i",
  disableMobile: true,
  time_24hr: true,
  onChange: function(selectedDates) {
    const timeFrom = selectedDates[0];

    const minTime = new Date(timeFrom.getTime() + 30 * 60000);
    flatpickr("#time_to", {
      enableTime: true,
      noCalendar: true,
      dateFormat: "H:i",
      time_24hr: true,
      disableMobile: true,
      minTime: minTime,
    });
  }
});

flatpickr("#time_to", {
  enableTime: true,
  noCalendar: true,
  disableMobile: true,
  dateFormat: "H:i",
  time_24hr: true,
});