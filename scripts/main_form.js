document.addEventListener("DOMContentLoaded", () => {
  const searchHotelForm = document.querySelector("form");
  const sendFormBtn = document.querySelector("form button");
  const formInputs = searchHotelForm.querySelectorAll("input");

  const destinationField = document.getElementById("destination");
  const destinationFieldValueList = document.getElementById("destination-list");
  const destinationsFieldValues = [];

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

  destinationField.addEventListener("input", () => {
    const value = destinationField.value.trim();
    const isValid = /^[a-zA-Zа-яА-Я0-\9s,.-]+$/.test(value);

    if (!isValid) {
      inputIncorrect(destinationField);
    } else {
      inputCorrect(destinationField);
    }
  });

  const destination_List = [
    "Москва, ул. Тверская, 13",
    "Москва, Новинский бульвар, 8",
    "Санкт-Петербург, Невский пр., 28",
    "Санкт-Петербург, Дворцовая набережная, 32",
    "Новосибирск, ул. Ленина, 54",
    "Новосибирск, ул. Красный проспект, 11",
    "Екатеринбург, ул. Малышева, 45",
    "Екатеринбург, ул. Вайнера, 27",
    "Казань, ул. Баумана, 2",
    "Казань, ул. Петербургская, 14",
    "Нижний Новгород, пл. Минина и Пожарского, 1",
    "Нижний Новгород, ул. Белинского, 60",
    "Челябинск, ул. Кирова, 100",
    "Челябинск, ул. Цвиллинга, 39",
    "Омск, ул. Ленина, 26",
    "Омск, ул. Мира, 11",
    "Ростов-на-Дону, ул. Будённовский, 2",
    "Ростов-на-Дону, ул. Темерницкая, 45",
    "Уфа, ул. Карла Маркса, 123",
    "Уфа, ул. Октябрьская, 10",
  ];

  destination_List.forEach((destination) => {
    const li = document.createElement("li");
    li.classList.add("input-li");
    li.textContent = destination;
    li.setAttribute("data-value", destination);
    destinationFieldValueList.appendChild(li);
    destinationsFieldValues.push(li);
  });

  function openDestinationsList(event) {
    event.stopPropagation();
    destinationFieldValueList.classList.remove("h-0");
    destinationFieldValueList.classList.add("h-60");
  }

  function closeDestinationsList() {
    destinationFieldValueList.classList.remove("h-60");
    destinationFieldValueList.classList.add("h-0");
  }

  destinationsFieldValues.forEach((elem) => {
    elem.onclick = () => {
      destinationField.value = elem.dataset.value;
      closeDestinationsList();
    };
  });

  destinationField.onclick = (event) => {
    formBlackBG(event);
    openDestinationsList(event);
    closeGuestsList();
  };

  function inputCorrect(elem) {
    elem.classList.remove("border-red-500");
    elem.classList.add("border-white");
  }

  function inputIncorrect(elem) {
    elem.classList.remove("border-white");
    elem.classList.add("border-red-500");
  }

  function errorInInput(elem) {
    inputIncorrect(elem);
    elem.oninput = () => inputCorrect(elem);
  }

  function checkFormInputs() {
    formInputs.forEach((input) => {
      if (input.value === "") {
        checkForm = false;
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
    closeDestinationsList();
  };

  const dateInputs = document.querySelectorAll("input[type='date']");

  dateInputs.forEach((input) => {
    input.addEventListener("click", () => {
      input.showPicker();
    });
  });

  const checkInDateInput = dateInputs[0];
  const checkOutDateInput = dateInputs[1];

  function validateDates() {
    const checkInDate = new Date(checkInDateInput.value);
    const checkOutDate = new Date(checkOutDateInput.value);

    if (checkInDate >= checkOutDate) {
      console.error("Дата въезда не может быть позднее или равна дате выезда.");
      return false;
    }

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

  ////////////////

  document.onclick = (event) => {
    formBlackBG(event);
    if (
      !document.getElementById("guests").contains(event.target) ||
      !document.querySelector(".destinations").contains(event.target)
    ) {
      closeGuestsList();
      closeDestinationsList();
    }
  };

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeDestinationsList();
      closeGuestsList();
    }
  });
});
