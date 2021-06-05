const API_URL = "https://api.openweathermap.org/data/2.5/weather";

let currentCity = "London";
let WEATHER_DATA = {};
callAPI = null

const error404 = document.querySelector('.error-404')

const fetchWeatherData = async (city) => {
  error404.style.visibility = "hidden"
  WEATHER_DATA = {};
  try {
    const response = await axios.get(API_URL, {
      params: {
        q: `${city}`,
        appid: "1bb1e8cf24b562fc0096e92f1092a3ab",
        units: "metric",
      },
    })
    WEATHER_DATA = { ...response.data };
  } catch (error) {
    if(error404.style.visibility == 'hidden'){
      error404.style.visibility = "visible";
    }
  }
  showResult()
};

const updateSearch = (e) => {
  clearTimeout(callAPI)
  callAPI = setTimeout(() => {
    currentCity = e.target.value;
    fetchWeatherData(currentCity)
  }, 900);
};

const inputSearch = document.querySelector("#search-form__input");

inputSearch.addEventListener("input", updateSearch);
// inputSearch.value = currentCity;

const cardBody = document.querySelector("#card-body");

const showResult = () => {
  if (Object.keys(WEATHER_DATA).length > 0) {
    cardBody.innerHTML = `
      <div class="card-weather">
        <div class="pure-g">
          <div class="pure-u-1 fadeInAnimationF">${WEATHER_DATA.weather[0].description}</div>
        </div>
        <div class="pure-g">
          <div class="pure-u-1 fadeInAnimation location">${WEATHER_DATA.name.toUpperCase()}, ${WEATHER_DATA.sys.country}</div>
        </div>
        <div class="pure-g relevant-parameters">
          <div class="pure-u-1-3 fadeInAnimationT temperature">${Math.floor(WEATHER_DATA.main.temp)}°</div>
          <div class="pure-u-1-3" style="text-align:center; font-size: 5rem;">|</div>
          <div class="pure-u-1-3 show-relevant fadeInAnimation">
            <span >Feels like ${Math.floor(WEATHER_DATA.main.feels_like)}°</span>
            <span>Wind: ${WEATHER_DATA.wind.speed}</span>
            <span>Humidity ${WEATHER_DATA.main.humidity}%</span>
          </div>
        </div>
      </div>
    `;
  } else {
    cardBody.innerHTML = `
    <div class="card-weather" id="loading-spinner">
      <i class="fas fa-spinner fa-pulse spinning-icon" aria-hidden="true"></i>
    </div>
    `;
  }
}

fetchWeatherData(currentCity)
showResult()
