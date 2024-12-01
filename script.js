document.addEventListener("DOMContentLoaded", () => {
  // Кнопка переключения звука фоновой музыки
  const music = document.querySelector("#ambient-music"),
    ambient = document.getElementById("ambient"),
    ambientBtn = document.querySelector("#ambient-btn");
  music.volume = 0.05;

  ambientBtn.addEventListener("click", function (e) {
    e.preventDefault();
    music.muted = !music.muted;
    music.muted
      ? (ambient.src = "src/ambientOff.svg")
      : (ambient.src = "src/ambientOn.svg");
  });

  // Кнопка переключения меню
  const menuButton = document.querySelector(".header__logo--btn");

  menuButton.addEventListener("click", () => {
    const menu = document.querySelector(".menu");
    menu.classList.toggle("menu--active");
  });

  // Слайдер
  document.querySelectorAll(".container__block--slider").forEach((slider) => {
    const slides = slider.querySelector(".container__block--slides");
    const slideCount = slider.querySelectorAll(
      ".container__block--slide"
    ).length;
    let currentIndex = 0;

    slider.querySelector(".slider-next").addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % slideCount;
      slides.classList.add("slide-transition"); // Класс для плавности прокрутки
      updateSlider();
    });

    slider.querySelector(".slider-back").addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + slideCount) % slideCount;
      slides.classList.add("slide-transition");
      updateSlider();
    });

    function updateSlider() {
      const sliderWidth = slider.clientWidth; // Текущая ширина слайдера
      const offset = -currentIndex * sliderWidth;
      slides.style.transform = `translateX(${offset}px)`;
    }
    window.addEventListener("resize", () => {
      slides.classList.remove("slide-transition"); // убираю класс чтобы изображение подстраивалось незаметно
      updateSlider(); // Пересчитываю положение текущего слайда
    });
  });
});
