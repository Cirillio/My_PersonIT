let slideIndex = 1,
  slides = document.querySelectorAll(".slider__item"),
  dotsWrapper = document.querySelector(".slider-dots"),
  dots = document.querySelectorAll(".dot"),
  prev = document.querySelector(".prev"),
  next = document.querySelector(".next");

// Показ слайда

ShowSlides(1);

function ShowSlides(slide) {
  if (slide > slides.length) {
    slideIndex = 1;
  }

  if (slide < 1) {
    slideIndex = slides.length;
  }

  slides.forEach((s) => {
    s.style.display = "none";
  });

  dots.forEach((d) => {
    d.classList.remove("dot-active");
  });

  slides[slideIndex - 1].style.display = "flex";
  dots[slideIndex - 1].classList.add("dot-active");
}

function plusSlides(slide) {
  ShowSlides((slideIndex += slide));
}

function currentSlide(slide) {
  ShowSlides((slideIndex = slide));
}

prev.addEventListener("click", function () {
  plusSlides(-1);
});

next.addEventListener("click", function () {
  plusSlides(1);
});

dotsWrapper.addEventListener("click", (e) => {
  for (let i = 0; i < dots.length + 1; i++) {
    if (e.target.classList.contains("dot") && e.target == dots[i - 1]) {
      currentSlide(i);
    }
  }
});
