const popup = document.getElementById(`popupContainer`);
const popupButton = document.getElementById(`closePopup`);
const userInput = document.querySelector(`.input-box`);
const cityNames = document.getElementById(`cityNames`);
const disible = document.getElementById(`disible`);

const toggleSwitch = document.querySelector(
    '.theme-switch input[type="checkbox"]'
);

// get APi

let mainObject = {
    apiKey: `2611daabfb4e44475366e861cddbee50`,
    getWeather: function(city) {
        fetch(
                "https://api.openweathermap.org/data/2.5/weather?q=" +
                city +
                "&units=metric&appid=" +
                this.apiKey
            )
            .then((giveResponse) => giveResponse.json())
            .then((data) => {
                this.showWeather(data);
                disible.innerText = `sunsrise and sunset time of ${data.name} (from your Location )`;
            })
            .catch((err) => {
                controllPopup();
            });
    },

    showWeather: function(data) {
        const { name } = data;
        const { icon, description } = data.weather[0];

        const { temp, humidity } = data.main;
        const { speed } = data.wind;

        document.querySelector(`.city`).innerText = "weather in : " + name;
        document.querySelector(`.temp`).innerText = `The Tepmerature is : ${temp}°`;

        document.querySelector(".Weather-Icon").src =
            "https://openweathermap.org/img/wn/" + icon + ".png";

        document.querySelector(
            `.temp`
        ).innerText = `The Tepmerature is : ${temp}°C`;

        document.querySelector(
            `.type-of-weather`
        ).innerText = `Weather Description: ${description}`;
        document.querySelector(`.himidity`).innerText = ` Humidity :  ${humidity}%`;
        document.querySelector(
            `.wind-speed`
        ).innerText = ` wind-speed :  ${speed} KM/H`;
        //  display city and country names
        const country = data.sys.country;
        cityNames.innerText = `${name}, ${country}`;

        // display sunrise time
        const dataSunrise = data.sys.sunrise;
        const sunriseData = new Date(dataSunrise * 1000);
        const hrs = sunriseData.getHours();
        const munite = sunriseData.getMinutes();
        const sunRise = document.getElementById(`sunRise`);

        // display sunset time
        const sunset = data.sys.sunset;
        const sunsetData = new Date(sunset * 1000);
        const sunsetHrs = sunsetData.getHours();
        const SunsetMenutes = sunsetData.getMinutes();
        const sunsetID = document.getElementById(`sunset`);

        let checkHours;
        if (sunsetHrs >= 12) {
            let temp = sunsetHrs - 12;
            checkHours = temp;
        }
        // add 0 on single digit
        if (SunsetMenutes.toString().length === 1) {
            sunsetID.innerText = `${checkHours} : 0${SunsetMenutes} PM`;
        } else {
            sunsetID.innerText = `${checkHours} : ${SunsetMenutes} PM`;
        }
        // add 0 on single digit
        if (munite.toString().length === 1) {
            sunRise.innerText = `${hrs} : 0${munite} AM`;
        } else {
            sunRise.innerText = `${hrs} : ${munite} AM`;
        }

        // // daynamic time
        // const lattitude = data.coord.lon;
        // const long = data.coord.lat;

        // fetch(`https://api.sunrise-sunset.org/json?lat=${lattitude}&lng=
        // ${long}&callback=mycallback`)
        //     .then((resolve) => {
        //         console.log(resolve);
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //     });
    },
    search: function() {
        this.getWeather(document.querySelector(`.input-box`).value);
    },
};

// event dialogete version
const elementList = document.getElementsByClassName("list");
for (const lists of elementList) {
    lists.addEventListener(`click`, () => {
        userInput.value = lists.innerText;
        mainObject.search();
        controllPopup();
    });
}

// search bar
document.querySelector(`.search-button`).addEventListener(`click`, function() {
    mainObject.search();
});
document
    .querySelector(`.input-box`)
    .addEventListener(`keyup`, function(event) {
        if (event.key == `Enter`) {
            mainObject.search();
        }
    });

// erorr popup

function controllPopup() {
    popup.classList.toggle(`controllOpacity`);
}

// theme handeler

function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute("data-theme", "dark");
    } else {
        document.documentElement.setAttribute("data-theme", "light");
    }
}

toggleSwitch.addEventListener("change", switchTheme, false);

popupButton.addEventListener(`click`, () => {
    popup.style.transform = `scale(0)`;
});