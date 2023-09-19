function dateCurrent(date) {
  const currentDate = new Date();
  if (date === "day") {
    const currentDay = currentDate.getDay();
    return currentDay;
  } else if (date === "month") {
    const currentMonth = currentDate.getMonth() + 1;
    return currentMonth;
  } else if (date === "year") {
    const currentYear = currentDate.getFullYear();
    return currentYear;
  } else if (date === "current") {
    return currentDate;
  }
}

function birthDay(date) {
  const birthDay = document.querySelector(`.${date}-number`).value;
  return birthDay;
}

function inputError() {
  const inputError = document.querySelectorAll(".input-error");
  inputError.forEach((error) => {
    error.classList.add("error-border");
  });
}

function redError(date) {
  const errorOne = document.querySelector(`.${date}-error-js`);
  const errorTwo = document.querySelector(`.${date}-number`);
  const errorThree = document.querySelector(`.${date}-error`);
  errorOne.classList.add("js-error");
  errorTwo.classList.add("error-border");
  errorThree.classList.add("js-error");
}

function removeError(date) {
  const errorOne = document.querySelector(`.${date}-error-js`);
  const errorTwo = document.querySelector(`.${date}-number`);
  const errorThree = document.querySelector(`.${date}-error`);
  errorOne.classList.remove("js-error");
  errorTwo.classList.remove("error-border");
  errorThree.classList.remove("js-error");
}

function changeText(date) {
  const changeText = document.querySelector(`.${date}-error`);
  changeText.innerHTML = `must be a valid ${date}`;
  redError(date);
}

function outputAge(date) {
  if (date === "year") {
    if (!birthDay(date)) {
      const output = (document.querySelector(`.output-${date}`).innerHTML =
        "--");
      redError(date);
      return output;
    } else if (birthDay(date) > dateCurrent(date)) {
      changeText(date);
    } else {
      removeError(date);
      const output = (document.querySelector(`.output-${date}`).innerHTML = `${
        dateCurrent(date) - birthDay(date) - 1
      }`);
      return output;
    }
  }
  if (date === "month") {
    if (!birthDay(date)) {
      const output = (document.querySelector(
        `.output-${date}`
      ).innerHTML = `--`);
      redError(date);

      return output;
    } else if (birthDay("month") > 12) {
      changeText(date);
    } else {
      removeError(date);
      const output = (document.querySelector(`.output-${date}`).innerHTML = `${
        dateCurrent(date) - birthDay(date) + 11
      }`);

      return output;
    }
  }

  if (date === "day") {
    const output = document.querySelector(`.output-${date}`);
    redError(date);

    if (!birthDay(date)) {
      const output1 = (output.innerHTML = "--");

      return output1;
    } else if (birthDay("day") > 31) {
      changeText(date);
    } else {
      removeError(date);
      const dayError = document.querySelector(`.js-${date}-error`);

      const bday = new Date(
        dateCurrent("year"),
        birthDay("month") - 1,
        birthDay(date)
      );

      if (dateCurrent("current").getTime() > bday.getTime()) {
        bday.setFullYear(bday.getFullYear() + 1);
      }

      const diff = bday.getTime() - dateCurrent("current").getTime();

      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      console.log(`day: ${d}`);

      const output1 = (output.innerHTML = `${d}`);

      return output1;
    }
  }
}

const button = document.querySelector(".icon-arrow");
button.addEventListener("click", () => {
  if (
    birthDay("day") <= 31 &&
    birthDay("month") <= 12 &&
    birthDay("year") <= dateCurrent("year")
  ) {
    console.log(outputAge("year"));
    console.log(outputAge("month"));
    console.log(outputAge("day"));
  }

  if (birthDay("day") > 31) {
    outputAge("day");
  }

  if (birthDay("month") > 12) {
    outputAge("month");
  }

  if (birthDay("year") > dateCurrent("year")) {
    outputAge("year");
  }
});
