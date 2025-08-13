// گرفتن المان‌ها از DOM
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
const forecastDataCard = document.querySelector("#forecast-data");

// آرایه‌ای برای ذخیره دماهای پیش‌بینی (هر کارت یک آبجکت c, f, k)
let forecastTemps = [];
let currentTempUnit = "celsius"; // واحد فعلی دما

// متغیرهای دمای اصلی
let celsius, min_celsius, max_celsius;
let fahrenheit, min_fahrenheit, max_fahrenheit;
let kelvin, min_kelvin, max_kelvin;

// رویداد ارسال فرم
form.addEventListener("submit", (e) => {
  e.preventDefault(); // جلوگیری از رفرش صفحه
  const city = formInput.value.trim();

  if (city === "") {
    alert("لطفا شهر مد نظر را وارد کنید.");
    return;
  } else {
    getweather(city); // دریافت اطلاعات آب و هوا
  }
});

// تابع تغییر واحد دما (کلیک روی دمای اصلی یا کارت‌ها)
function convertTemp() {
  if (!celsius) return; // اگر دما موجود نبود کاری انجام نده

  if (currentTempUnit === "celsius") {
    // تبدیل به فارنهایت
    tempMain.textContent = ` دما: °F ${fahrenheit.toFixed(2)}`;
    tempMin.textContent = `حداقل دما: °F ${min_fahrenheit.toFixed(2)}`;
    tempMax.textContent = `حداکثر دما: °F ${max_fahrenheit.toFixed(2)}`;

    // تغییر دمای پیش‌بینی‌ها
    document.querySelectorAll(".forecast-temp").forEach((el, index) => {
      el.textContent = `🌡️ ${forecastTemps[index].f.toFixed(2)}°F`;
    });

    currentTempUnit = "fahrenheit";
  } else if (currentTempUnit === "fahrenheit") {
    // تبدیل به کلوین
    tempMain.textContent = ` دما: °K ${kelvin.toFixed(2)}`;
    tempMin.textContent = `حداقل دما: °K ${min_kelvin.toFixed(2)}`;
    tempMax.textContent = `حداکثر دما: °K ${max_kelvin.toFixed(2)}`;

    // تغییر دمای پیش‌بینی‌ها
    document.querySelectorAll(".forecast-temp").forEach((el, index) => {
      el.textContent = `🌡️ ${forecastTemps[index].k.toFixed(2)}°K`;
    });

    currentTempUnit = "kelvin";
  } else {
    // تبدیل به سلسیوس
    tempMain.textContent = ` دما: °C ${celsius.toFixed(2)}`;
    tempMin.textContent = `حداقل دما: °C ${min_celsius.toFixed(2)}`;
    tempMax.textContent = `حداکثر دما: °C ${max_celsius.toFixed(2)}`;

    // تغییر دمای پیش‌بینی‌ها
    document.querySelectorAll(".forecast-temp").forEach((el, index) => {
      el.textContent = `🌡️ ${forecastTemps[index].c.toFixed(2)}°C`;
    });

    currentTempUnit = "celsius";
  }
}

// اضافه کردن کلیک برای تغییر واحد دما
tempMain.addEventListener("click", convertTemp);

// تابع دریافت اطلاعات آب و هوا برای یک شهر
async function getweather(city) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=926dd4ca9cf4413b3e5164f432004851&units=metric`
    );
    if (!response.ok) throw new Error(`HTTP Error! status:${response.status}`);

    const data_weather = await response.json();
    console.log(data_weather);

    // دما به سلسیوس
    celsius = data_weather.main.temp;
    min_celsius = data_weather.main.temp_min;
    max_celsius = data_weather.main.temp_max;

    // تبدیل سلسیوس به فارنهایت
    fahrenheit = celsius * 1.8 + 32;
    min_fahrenheit = min_celsius * 1.8 + 32;
    max_fahrenheit = max_celsius * 1.8 + 32;

    // تبدیل سلسیوس به کلوین
    kelvin = celsius + 273.15;
    min_kelvin = min_celsius + 273.15;
    max_kelvin = max_celsius + 273.15;

    // نمایش اطلاعات
    temperatureSection.classList.remove("hidden");
    cityName.innerHTML = `${data_weather.name}`;
    degree.innerHTML = `${data_weather.weather[0].main}`;
    degreeDesc.innerHTML = `${data_weather.weather[0].description}`;
    degreeIcon.innerHTML = `<img src="https://openweathermap.org/img/wn/${data_weather.weather[0].icon}@2x.png" alt="آیکون آب و هوا">`;

    // نمایش اولیه دما به سلسیوس
    tempMain.innerHTML = `دما: °C ${celsius.toFixed(2)}`;
    tempMin.innerHTML = `<p>دما: °C ${min_celsius.toFixed(2)}</p>`;
    tempMax.innerHTML = `<p>دما: °C ${max_celsius.toFixed(2)}</p>`;
    currentTempUnit = "celsius"; // ریست واحد دما

    getForecast(city); // دریافت پیش‌بینی چند ساعت آینده
  } catch (error) {
    console.log("City not found", error);
    alert("شهر پیدا نشد یا مشکلی در دریافت اطلاعات وجود دارد.");
  }
}

// اگر ورودی خالی شد، بخش دما را مخفی کن
formInput.addEventListener("input", () => {
  if (formInput.value === "") {
    temperatureSection.classList.add("hidden");
  }
});

// دریافت پیش‌بینی وضعیت چند ساعت آینده
async function getForecast(city) {
  try {
    const city = formInput.value.trim();

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=926dd4ca9cf4413b3e5164f432004851&units=metric`
    );
    if (!response.ok) throw new Error(`HTTP Error! status:${response.status}`);

    const forecastData = await response.json();
    console.log(forecastData.list);

    // پاک کردن پیش‌بینی‌های قبلی
    forecastDataCard.innerHTML = "";
    forecastTemps = []; // ریست آرایه دماها

    // نمایش 6 پیش‌بینی اول
    forecastData.list.slice(0, 6).forEach((card) => {
      let c = card.main.temp;
      let f = c * 1.8 + 32;
      let k = c + 273.15;

      forecastTemps.push({ c, f, k }); // ذخیره در آرایه

      const timestamp = card.dt; // زمان بر حسب ثانیه
      const date = new Date(timestamp * 1000); // تبدیل به میلی‌ثانیه
      const dateStr = date.toLocaleDateString(); // رشته تاریخ
      const timeStr = date.toLocaleTimeString(); // رشته زمان
      const description = card.weather[0].description;
      const icon = card.weather[0].icon;

      // ایجاد کارت پیش‌بینی
      const cardItem = `<div class="forecast-card">
              <p>📅 ${dateStr}</p>
              <p>🕒 ${timeStr}</p>
              <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}" />
              <p class="forecast-temp">🌡️ ${c.toFixed(2)}°C</p>
              <p>${description}</p>
            </div>`;

      forecastDataCard.innerHTML += cardItem;
    });

    // کلیک روی دمای پیش‌بینی هم کل دماها را تبدیل می‌کند
    document.querySelectorAll(".forecast-temp").forEach((item) => {
      item.addEventListener("click", convertTemp);
    });
  } catch (error) {
    console.log("error!", error);
  }
}
