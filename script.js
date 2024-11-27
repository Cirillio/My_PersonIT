document.addEventListener("DOMContentLoaded", () => {
  // Подгоняю фоновое видео под экран
  const bg = document.querySelector(".background");
  window.addEventListener("resize", () => {
    if (window.innerHeight / window.innerWidth > 0.75) {
      bg.classList.add("vh100");
      bg.classList.remove("vw100");
    } else {
      bg.classList.add("vw100");
      bg.classList.remove("vh100");
    }
  });

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
});
