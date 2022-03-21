const cityForm = document.querySelector("form");

const card = document.querySelector(".card");
const details = document.querySelector(".details");

const time = document.querySelector("img.time");
const icon = document.querySelector(".icon img");

const updateUI = (data) => {
  // const cityDets = data.cityDets;
  // const weather = data.weather;
  //update details

  //destructrung
  const { cityDets, weather } = data;

  details.innerHTML = `
  <h5 class="my-3">${cityDets.EnglishName}</h5>
          <div class="my-3">${weather.WeatherText}</div>
          <div class="display-4 my-4">
            <span>${weather.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
          </div>
  `;

  //update day and night images / icons

  const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
  icon.setAttribute("src", iconSrc);

  let timeSrc = weather.IsDayTime ? "img/day.svg" : "img/night.svg";
  // if (weather.IsDayTime) {
  //   timeSrc = "img/day.svg";
  // } else {
  //   timeSrc = "img/night.svg";
  // }

  time.setAttribute("src", timeSrc);

  //remove the d-none class if present
  if (card.classList.contains("d-none")) {
    card.classList.remove("d-none");
  }
};

const updateCity = async (city) => {
  console.log(city);

  const cityDets = await getCity(city);
  const weather = await getWeather(cityDets.Key);

  return { cityDets, weather };
};

cityForm.addEventListener("submit", (e) => {
  e.preventDefault();
  //get city
  const city = cityForm.city.value.trim();
  cityForm.reset();
  //update the ui with new city
  updateCity(city)
    .then((data) => {
      console.log(data);
      updateUI(data);
    })
    .catch((err) => console.log(err));
});
