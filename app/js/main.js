import {setupMobileMenu} from "./mobileMenu.js";

setupMobileMenu();

document.addEventListener("DOMContentLoaded", function () {
  const video = document.querySelector(".home__video");
  video.removeAttribute("controls");
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