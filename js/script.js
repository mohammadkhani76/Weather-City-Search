const form = document.querySelector("#form");
const formInput = document.querySelector("#input");
const temperatureSection = document.querySelector("#temperature-section");
const cityName = document.querySelector("#city-name");
const degree = document.querySelector("#degree");
const degreeDesc = document.querySelector("#degree-desc");
const degreeIcon = document.querySelector("#icon");
const tempMain = document.querySelector("#temp-main");
const tempMin = document.querySelector("#temp-min");
const tempMax = document.querySelector("#temp-max");
let currentTempUnit = "celsius";

// متغیرها برای ذخیره دماها
let celsius, min_celsius, max_celsius;
let fahrenheit, min_fahrenheit, max_fahrenheit;
let kelvin, min_kelvin, max_kelvin;
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const city = formInput.value.trim();

  if (city === "") {
    alert("لطفا شهر مد نظر را وارد کنید.");
    return;
  } else {
    getweather(city);
  }
});

// تبدیل دماها بهم
tempMain.addEventListener("click", function () {
  if (celsius === undefined || celsius === null) return; // اگر دماها هنوز تنظیم نشده‌اند کاری نکن
  if (currentTempUnit === "celsius") {
    tempMain.textContent = ` دما: °F ${fahrenheit.toFixed(2)}`;
    tempMin.textContent = `حداقل دما: °F ${min_fahrenheit.toFixed(2)}`;
    tempMax.textContent = `حداکثر دما: °F ${max_fahrenheit.toFixed(2)}`;
    currentTempUnit = "fahrenheit";
  } else if (currentTempUnit === "fahrenheit") {
    tempMain.textContent = ` دما: °K ${kelvin.toFixed(2)}`;
    tempMin.textContent = `حداقل دما: °K ${min_kelvin.toFixed(2)}`;
    tempMax.textContent = `حداکثر دما: °K ${max_kelvin.toFixed(2)}`;
    currentTempUnit = "kelvin";
  } else {
    tempMain.textContent = ` دما: °C ${celsius.toFixed(2)}`;
    tempMin.textContent = `حداقل دما: °C ${min_celsius.toFixed(2)}`;
    tempMax.textContent = `حداکثر دما: °C ${max_celsius.toFixed(2)}`;
    currentTempUnit = "celsius";
  }
});
async function getweather(city) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=926dd4ca9cf4413b3e5164f432004851&units=metric`
    );
    if (!response.ok) {
      throw new Error(`HTTP Error! status:${response.status}`);
    }

    const data_weather = await response.json();
    console.log(data_weather);
    //  دما به سلسیوس
    celsius = data_weather.main.temp;
    min_celsius = data_weather.main.temp_min;
    max_celsius = data_weather.main.temp_max;

    //  تبدیل سلسیوس به فارنهایت
    fahrenheit = celsius * 1.8 + 32;
    min_fahrenheit = min_celsius * 1.8 + 32;
    max_fahrenheit = max_celsius * 1.8 + 32;

    //  تبدیل سلسیوس به کلوین

    kelvin = celsius + 273.15;
    min_kelvin = min_celsius + 273.15;
    max_kelvin = max_celsius + 273.15;

    temperatureSection.classList.remove("hidden");

    cityName.innerHTML = `${data_weather.name}`;
    degree.innerHTML = `${data_weather.weather[0].main}`;
    degreeDesc.innerHTML = `${data_weather.weather[0].description}`;
    degreeIcon.innerHTML = `<img src="https://openweathermap.org/img/wn/${data_weather.weather[0].icon}@2x.png" alt="آیکون آب و هوا">`;
    // نمایش اولیه دما به سلسیوس
    tempMain.innerHTML = `<p>دما: °C ${celsius.toFixed(2)}</p>`;
    tempMin.innerHTML = `<p>دما: °C ${min_celsius.toFixed(2)}</p>`;
    tempMax.innerHTML = `<p>دما: °C ${max_celsius.toFixed(2)}</p>`;
    currentTempUnit = "celsius"; // ریست واحد دما بعد از هر بار درخواست
  } catch (error) {
    console.log("City not found", error);
    alert("شهر پیدا نشد یا مشکلی در دریافت اطلاعات وجود دارد.");
  }
}
formInput.addEventListener("input", () => {
  if (formInput.value === "") {
    temperatureSection.classList.add("hidden");
  }
});
