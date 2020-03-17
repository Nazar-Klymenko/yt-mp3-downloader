const userLang = navigator.language || navigator.userLanguage;
const englishBtn = document.querySelector(".english");
const russianBtn = document.querySelector(".russian");
const URL = document.querySelector(".video-url");
const btn = document.querySelector(".video-btn");
const english = {
  header: "YouTube mp3 downloader",
  cover: "Enter the video link in the field above to see the preview",
  error:
    "Sorry, something went wrong there. Please check the link and try again.",
  cred: "© 2020 YouTube mp3 Downloader, by",
  name: " Nazar Klymenko",
  download: "download"
};
const russian = {
  header: "YouTube mp3 Агент",
  cover: "Введите ссылку в поле сверху что бы увидеть предосмотр",
  error:
    "Извините, что-то пошло не так. Пожалуйста проверьте ссылку и попробуйте еще раз.",
  cred: "© 2020 YouTube mp3 Агент, создал ",
  name: " Назар Клименко",
  download: "скачать"
};
window.addEventListener("load", () => {
  if (userLang === "ru") {
    setLanguage(russian);
    russianBtn.classList.add("chosen");
    englishBtn.classList.remove("chosen");
    URL.placeholder = "Пожалуйса вставте ссылку сдесь";
  } else if (userLang.slice(0, 2) === "en") {
    setLanguage(english);
    englishBtn.classList.add("chosen");
    russianBtn.classList.remove("chosen");
    URL.placeholder = "Please enter the video link here";
  } else {
    englishBtn.classList.add("chosen");
  }
});

englishBtn.addEventListener("click", () => {
  setLanguage(english);
  englishBtn.classList.add("chosen");
  russianBtn.classList.remove("chosen");
  URL.placeholder = "Please enter the video link here";
});

russianBtn.addEventListener("click", () => {
  setLanguage(russian);
  russianBtn.classList.add("chosen");
  englishBtn.classList.remove("chosen");
  URL.placeholder = "Пожалуйса вставте ссылку сдесь";
});

function setLanguage(language) {
  document.querySelector(".header-main").innerHTML = language.header;
  document.querySelector(".video-cover--text").innerHTML = language.cover;
  document.querySelector(".error").innerHTML = language.error;
  document.querySelector(".cred").innerHTML = language.cred;
  document.querySelector(".name").innerHTML = language.name;
  document.querySelector(".download-span").innerHTML = language.download;
}
document.querySelector(".video-format").addEventListener("click", () => {
  console.log(document.querySelector(".please").value);
});
btn.addEventListener("click", () => {
  console.log(`The URL: ${URL.value}`);
  btn.classList.add("clicked");
  setTimeout(removeBtnStyle, 250);
  if (!btn.classList.contains("blocked")) {
    sendUrl(URL.value);
    removeError();
  } else {
    showError();
  }
});

function removeBtnStyle() {
  btn.classList.remove("clicked");
}

function sendUrl(URL) {
  location.href = `http://localhost:4000/download?URL=${URL}`;
}

const iframe = document.createElement("iframe");
document.querySelector(".video-frame--wrapper").appendChild(iframe);
iframe.classList.add("video-frame");

URL.addEventListener("input", () => {
  const URLval = URL.value;
  if (URLval.includes("embed/")) {
    showFrame(URLval);
    removeError();
  } else if (URLval.includes("watch?v=")) {
    let URLstring = URLval.match(/.*watch\?v=.{11}/);
    if (URLstring && URLstring.length) {
      let URLnormal = URLstring[0];
      let URLid = URLnormal.slice(URLnormal.length - 11);
      let URLembed = `https://www.youtube.com/embed/${URLid}`;
      console.log(URLembed);
      showFrame(URLembed);
      removeError();
    } else {
      showError();
    }
  } else if (URLval.includes("youtu.be/")) {
    let URLstring = URLval.match(/.*youtu\.be\/.{11}/);
    if (URLstring && URLstring.length) {
      let URLnormal = URLstring[0];
      let URLid = URLnormal.slice(URLnormal.length - 11);
      let URLembed = `https://www.youtube.com/embed/${URLid}`;
      showFrame(URLembed);
      removeError();
    } else {
      console.log("yup");
    }
  } else if (URLval === "" || URLval.length === 0) {
    showError();
  } else {
    showError();
  }
});

function showError() {
  const error = document.querySelector(".error");
  error.style.opacity = 1;
  btn.classList.add("blocked");
}

function removeError() {
  const error = document.querySelector(".error");
  error.style.opacity = 0;
}

function showFrame(link) {
  iframe.src = link;
  iframe.style.opacity = 1;
  btn.classList.remove("blocked");
}

function removeFrame() {
  iframe.style.opacity = 0;
}
