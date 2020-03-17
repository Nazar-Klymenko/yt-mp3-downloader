document.querySelector(".bad-button").addEventListener("click", () => {
  location.href = `http://localhost:4000/`;
});
const userLang = navigator.language || navigator.userLanguage;
console.log(`The language is:${userLang}`);
const englishBtn = document.querySelector(".english");
const russianBtn = document.querySelector(".russian");

const english = {
  header:
    "Sorry, something went wrong there. Please check the link and try again.",
  button: "Home"
};
const russian = {
  header:
    "Извините, что-то пошло не так. Пожалуйста проверьте ссылку и попробуйте еще раз.",
  button: "Вернуться на Главную"
};
window.addEventListener("load", () => {
  if (userLang === "ru") {
    setLanguage(russian);
    russianBtn.classList.add("chosen");
    englishBtn.classList.remove("chosen");
  } else if (userLang.slice(0, 2) === "en") {
    setLanguage(english);
    englishBtn.classList.add("chosen");
    russianBtn.classList.remove("chosen");
  } else {
    englishBtn.classList.add("chosen");
  }
});
englishBtn.addEventListener("click", () => {
  setLanguage(english);
  englishBtn.classList.add("chosen");
  russianBtn.classList.remove("chosen");
});

russianBtn.addEventListener("click", () => {
  setLanguage(russian);
  russianBtn.classList.add("chosen");
  englishBtn.classList.remove("chosen");
});

function setLanguage(language) {
  document.querySelector(".bad-button").innerHTML = language.button;
  document.querySelector(".wrong-header").innerHTML = language.header;
}
