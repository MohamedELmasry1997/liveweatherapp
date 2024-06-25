let cityInput = document.getElementById("cityInput");
let findBtn = document.getElementById("findBtn");

cityInput.addEventListener("input", function () {
  getApi(cityInput.value);
  getTomorow(cityInput.value);
});

let dataArray = [];

getApi("cairo");
getTomorow("cairo");
async function getApi(city) {
  let myApi = await fetch(
    `http://api.weatherapi.com/v1/current.json?key=05e0e257cc9c4b898ec161008242306&q=${city}
  `
  );

  let data = await myApi.json();

  dataArray = [data];
  dipslayData();
  //   console.log(dataArray);
}

function dipslayData() {
  let cartona = "";
  for (let i = 0; i < dataArray.length; i++) {
    cartona += `
      <div class="col-md-4 rounded rounded-3">
            <div
              class="header text-secondary d-flex justify-content-between p-3"
            >
              <span>${new Date(dataArray[i].location.localtime).toLocaleString(
                "en-us",
                { weekday: "long" }
              )}</span>
              <span>${new Date(
                dataArray[i].location.localtime
              ).toDateString()}</span>
            </div>

            <div class="body py-3">
              <p class="p-4 text-secondary">${dataArray[i].location.name}</p>
              <div class="d-flex justify-content-evenly align-items-center">
                <h4 class="h2 text-light">${dataArray[i].current.temp_c}°C</h4>
                <img src="${
                  dataArray[i].current.condition.icon
                }"width='50px' alt="Weather Icon">
              </div>
              <p class="text-primary p-4">${
                dataArray[i].current.condition.text
              }</p>

              <div class="d-flex align-items-center py-5 text-light">
                <i class="fa-solid fa-umbrella p-3"></i> <span>${
                  dataArray[i].current.precip_mm
                } mm</span>
                <i class="fa-solid fa-wind p-3"></i> <span>${
                  dataArray[i].current.wind_kph
                } km/h</span>
                <i class="fa-solid fa-bullseye p-3"></i> <span>${
                  dataArray[i].current.wind_dir
                }</span>
              </div>
            </div>
          </div>


          
      `;
  }
  document.getElementById("rowCard").innerHTML = cartona;
}

let tomorwArray = [];

async function getTomorow(city) {
  let tomorow = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=05e0e257cc9c4b898ec161008242306&q=${city}07112&days=3`
  );
  let data = await tomorow.json();
  tomorwArray = [data];
  console.log(tomorwArray);
  displayTomorow();
}

function displayTomorow() {
  dipslayData();
  let cartona = "";
  for (let i = 0; i < tomorwArray.length; i++) {
    cartona += `
      <div class="col-md-4 rounded-3">
              <div
                class="header text-secondary d-flex justify-content-center p-3"
              >
                <span class=''>${new Date(
                  tomorwArray[i].forecast.forecastday[i + 1].date
                ).toLocaleString("en-us", { weekday: "long" })}</span>
              </div>

              <div class="body py-3">
                <div
                  class="d-flex justify-content-center flex-column align-items-center"
                >
                  <img src="${
                    tomorwArray[i].forecast.forecastday[i].day.condition.icon
                  }"width='50px' alt="Weather Icon" class='py-5'>
                  <h4 class="h2 text-light">${
                    tomorwArray[i].forecast.forecastday[i].day.maxtemp_c
                  }°C</h4>
                  <p class="text-primary py-4">${
                    tomorwArray[i].forecast.forecastday[i].day.condition.text
                  }</p>
                  <br /><br /><br /><br />
                </div>
              </div>
            </div>




          <div class="col-md-4 rounded-3">
              <div
                class="header text-secondary d-flex justify-content-center p-3"
              >
                <span>${new Date(
                  tomorwArray[i].forecast.forecastday[i + 2].date
                ).toLocaleString("en-us", { weekday: "long" })}</span>
              </div>

              <div class="body py-3">
                <div
                  class="d-flex justify-content-center flex-column align-items-center"
                >
                  <img src="${
                    tomorwArray[i].forecast.forecastday[i].day.condition.icon
                  }"width='50px' alt="Weather Icon" class='py-5'>
                  <h4 class="h2 text-light">${
                    tomorwArray[i].forecast.forecastday[i + 2].day.maxtemp_c
                  }°C</h4>
                  <p class="text-primary p-4">${
                    tomorwArray[i].forecast.forecastday[i + 2].day.condition
                      .text
                  }</p>
                  <br /><br /><br /><br />
                </div>
              </div>
            </div>
          
      `;
  }
  document.getElementById("rowCard").innerHTML += cartona;
}

displayTomorow("cairo");

// var today = new Date();
// var tomorow = new Date();
// tomorow.setDate(today.getDate() + 1);
// console.log(tomorow);
