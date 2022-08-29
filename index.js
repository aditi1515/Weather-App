
const tempField = document.querySelector(".weather1");
const cityField = document.querySelector(".weather2 p");
const dateField = document.querySelector(".weather2 span");
const picField = document.querySelector(".weather3 img");
const conditionField = document.querySelector(".weather3 span");
const searchBox = document.querySelector(".searchBox");
const form = document.querySelector("form");

let target = "delhi";
const fetchData = async (target) => {
  try {
    const url = `https://api.weatherapi.com/v1/current.json?key=d8406276831d4fd0b51122949222508&q=${target}`;

    const response = await fetch(url);
    const data = await response.json();
    const {
      current: {
        temp_c,
        condition: { text, icon },
      },
      location: { name, localtime },
    } = data;

    updateDOM(temp_c, name, localtime, icon, text);
  } catch (error) {
    alert("Location not found");
  }
};
fetchData(target);
function updateDOM(temp, city, time, pic, condition) {
  tempField.innerText = temp + "°";
  cityField.innerText = city;
  let exactDate = time.split(" ")[0];
  let exactTime = time.split(" ")[1];
  let exactDay = new Date(exactDate).getDay();
  let day = getDay(exactDay);
  dateField.innerText = `${exactTime} - ${day}, ${exactDate}`;
  picField.src = pic;
  conditionField.innerText = condition;
}
function getDay(exactDay) {
  switch (exactDay) {
    case 0:
      return "Sunday";
    case 1:
      return "Monday";
    case 2:
      return "Tuesday";
    case 3:
      return "Wednesday";
    case 4:
      return "Thursday";
    case 5:
      return "Friday";
    case 6:
      return "Saturday";
    default:
      return "Unknown";
  }
}
const search = (e) => {
  e.preventDefault();
  target = searchBox.value;
  fetchData(target);
};
form.addEventListener("submit", search);
