const form = document.querySelector("form");
const submitBtn = document.querySelector(".btn");
const spinner = document.querySelector(".spinner");
const fnameField = document.querySelector("#fname");
const snameField = document.querySelector("#sname");
const percentageField = document.querySelector("#percentage-field");
const resultField = document.querySelector("#result-field");
const emojiField = document.querySelector("#emoji-field");
const resultCard = document.querySelector(".result-card");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  submitBtn.style.display = "none";
  spinner.style.display = "block";
  const fname = fnameField.value;
  const sname = snameField.value;

  const response = await fetch(
    `https://love-calculator.p.rapidapi.com/getPercentage?sname=${sname}&fname=${fname}`,
    {
      headers: {
        "X-RapidAPI-Key": "733fb13d07msh04e090d22baed6ep1cbf26jsn8f647c56a6aa",
        "X-RapidAPI-Host": "love-calculator.p.rapidapi.com",
      },
    }
  );

  const data = await response.json();
  percentageField.textContent = `${data.percentage} %`;
  resultField.textContent = data.result;
  const emoji = {
    sad: "fa-face-sad-cry",
    happy: "fa-face-smile-wink",
  };
  emojiField.innerHTML = `<i class="fa-solid ${
    data.percentage >= 50 ? emoji.happy : emoji.sad
  }"></i>`;
  percentageField.style.color = ` ${data.percentage >= 50 ? "green" : "red"}`;
  emojiField.style.color = ` ${data.percentage >= 50 ? "green" : "skyblue"}`;
  fnameField.textContent = "";
  snameField.textContent = "";
  resultCard.style.opacity = 1;
  resultCard.style.transform = "translateY(0)";
  submitBtn.style.display = "flex";
  spinner.style.display = "none";
});
