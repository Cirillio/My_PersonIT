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

let orderMen = document.querySelector("#order-men"),
  orderPhotos = document.querySelector("#order-photos"),
  orderGenre = document.querySelector("#order-genre"),
  orderCalc = document.querySelector("#order-calc");

let persons = 0,
  photos = 0,
  total = 0;

let genres = [
  {
    genre: "Черно-белая",
    price: 1000,
  },
  {
    genre: "Цветная",
    price: 1500,
  },
  {
    genre: "Минимализм",
    price: 2000,
  },
];

let lastPersons = 0,
  lastPhotos = 0,
  lastTotal = 0;

orderCalc.value = "0";

orderMen.addEventListener("keydown", (e) => {
  if (
    e.key === "Backspace" ||
    e.key === "Delete" ||
    e.key === "ArrowLeft" ||
    e.key === "ArrowRight" ||
    e.key === "Home" ||
    e.key === "End" ||
    (e.ctrlKey &&
      (e.key === "a" ||
        e.key === "c" ||
        e.key === "x" ||
        e.key === "v" ||
        e.key === "z" ||
        e.key === "y"))
  ) {
    return;
  }
  if (!/\d/.test(e.key)) {
    e.preventDefault();
  }
});

orderMen.addEventListener("paste", (e) => {
  const clipboardData = e.clipboardData || window.clipboardData;

  const pastedText = clipboardData.getData("Text");

  if (!/^\d+$/.test(pastedText)) {
    e.preventDefault();
  }
});

orderPhotos.addEventListener("keydown", (e) => {
  if (
    e.key === "Backspace" ||
    e.key === "Delete" ||
    e.key === "ArrowLeft" ||
    e.key === "ArrowRight" ||
    e.key === "Home" ||
    e.key === "End" ||
    (e.ctrlKey &&
      (e.key === "a" ||
        e.key === "c" ||
        e.key === "x" ||
        e.key === "v" ||
        e.key === "z" ||
        e.key === "y"))
  ) {
    return;
  }
  if (!/\d/.test(e.key)) {
    e.preventDefault();
  }
});

orderPhotos.addEventListener("paste", (e) => {
  const clipboardData = e.clipboardData || window.clipboardData;

  const pastedText = clipboardData.getData("Text");

  if (!/^\d+$/.test(pastedText)) {
    e.preventDefault();
  }
});

orderMen.addEventListener("input", function () {
  persons = this.value;
  if (lastPersons === persons) {
    return;
  }
  lastPersons = persons;

  total = persons * photos * genres[orderGenre.value - 1].price;

  if (orderPhotos.value === "" || orderMen.value === "") {
    orderCalc.value = 0;
  } else {
    orderCalc.value = total;
  }
});

orderPhotos.addEventListener("input", function () {
  photos = this.value;
  if (lastPhotos === photos) {
    return;
  }
  lastPhotos = photos;

  total = persons * photos * genres[orderGenre.value - 1].price;

  if (orderPhotos.value === "" || orderMen.value === "") {
    orderCalc.value = 0;
  } else {
    orderCalc.value = total;
  }
});

orderGenre.addEventListener("input", function () {
  total = persons * photos * genres[this.value - 1].price;

  if (orderMen.value === "" || orderPhotos.value === "") {
    orderCalc.value = 0;
  } else {
    orderCalc.value = total;
  }
});
