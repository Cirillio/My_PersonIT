document.addEventListener("DOMContentLoaded", () => {
  const burgerButton = document.querySelector(".burger-button");
  let lines = document.querySelectorAll(".btn-line");
  let menuList = document.querySelector(".menu-list");
  let burgerToggle = false;
  burgerButton.addEventListener("click", () => {
    burgerToggle === false
      ? (lines[1].style.opacity = 0)
      : (lines[1].style.opacity = 1);
    [lines[0], lines[2]].forEach((line) => {
      line.classList.toggle("active-line");
    });
    // menuList.classList.toggle("active-menu");

    burgerToggle = !burgerToggle;
  });

  //////

  const searchHotelForm = document.querySelector("form");
  const sendFormBtn = document.querySelector("form button");
  const formInputs = searchHotelForm.querySelectorAll("input");

  // Количество посетителей
  const guestsField = document.querySelector("#guests input");
  const guestsFieldValueList = document.querySelector("#guests ul");
  const guestsFieldValues = guestsFieldValueList.querySelectorAll("li");

  function formBlackBG(event) {
    const isTargetInForm =
      event.target === searchHotelForm ||
      Array.from(formInputs).some((input) => event.target === input) ||
      Array.from(guestsFieldValues).some((item) => event.target === item) ||
      event.target === sendFormBtn;

    searchHotelForm.style.backgroundColor = isTargetInForm
      ? "black"
      : "var(--main-input)";
  }

  searchHotelForm.onclick = formBlackBG;

  let checkForm = true;

  function inputCorrect(elem) {
    elem.classList.remove("border-red-500");
    elem.classList.add("border-white");
  }

  function inputIncorrect(elem) {
    elem.classList.remove("border-white");
    elem.classList.add("border-red-500");
  }

  function errorInInput(elem) {
    checkForm = false;
    inputIncorrect(elem);
    elem.oninput = () => inputCorrect(elem);
  }

  function checkFormInputs() {
    formInputs.forEach((input) => {
      if (input.value === "") {
        errorInInput(input);
      }
    });

    if (!checkForm) return;
    checkForm = true;
  }

  sendFormBtn.addEventListener("click", (event) => {
    formBlackBG(event);
    event.preventDefault();
    checkFormInputs();
  });

  guestsFieldValues.forEach((elem) => {
    elem.onclick = () => {
      guestsField.value = elem.dataset.value;
      closeGuestsList();
    };
  });

  function openGuestsList(event) {
    event.stopPropagation();
    guestsFieldValueList.classList.remove("h-0");
    guestsFieldValueList.classList.add("h-40");
  }

  function closeGuestsList() {
    guestsFieldValueList.classList.remove("h-40");
    guestsFieldValueList.classList.add("h-0");
  }

  guestsField.onclick = (event) => {
    formBlackBG(event);
    openGuestsList(event);
  };

  document.onclick = (event) => {
    formBlackBG(event);
    if (!document.getElementById("guests").contains(event.target)) {
      closeGuestsList();
    }
  };

  const dateInputs = document.querySelectorAll("input[type='date']");

  dateInputs.forEach((input) => {
    input.addEventListener("click", () => {
      input.showPicker();
    });
  });

  // Получаем инпуты даты въезда и выезда
  const checkInDateInput = dateInputs[0];
  const checkOutDateInput = dateInputs[1];

  // Функция для проверки дат
  function validateDates() {
    const checkInDate = new Date(checkInDateInput.value);
    const checkOutDate = new Date(checkOutDateInput.value);

    // Проверяем, что дата въезда не позднее даты выезда
    if (checkInDate >= checkOutDate) {
      console.error("Дата въезда не может быть позднее или равна дате выезда.");
      return false;
    }

    // Проверяем, что разница между датами не менее дня и не более 90 дней
    const dayDifference = (checkOutDate - checkInDate) / (1000 * 60 * 60 * 24);
    if (dayDifference < 1) {
      console.error("Разница между датами должна быть не менее одного дня.");
      return false;
    }
    if (dayDifference > 90) {
      console.error("Разница между датами не должна превышать 90 дней.");
      return false;
    }

    inputCorrect(checkInDateInput);
    inputCorrect(checkOutDateInput);

    return true;
  }

  // Добавляем обработчики событий для проверки дат при изменении
  checkInDateInput.addEventListener("change", (e) => {
    if (!validateDates()) {
      errorInInput(e.target);
    }
  });
  checkOutDateInput.addEventListener("change", (e) => {
    if (!validateDates()) {
      errorInInput(e.target);
    }
  });
});
