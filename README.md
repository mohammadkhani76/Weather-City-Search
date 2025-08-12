# Weather Forecast Web App

A simple web application that displays the weather status of a city using the OpenWeatherMap API.

---

## Features

- Search by city name
- Display current temperature, minimum and maximum temperatures in Celsius, Fahrenheit, and Kelvin (click on the temperature to toggle units)
- Show general weather condition with description and icon
- 3-hourly weather forecast for the next 18 hours
- Responsive and user-friendly design with glassmorphism style

---

## How to Use

1. Open the project on a local web server or any hosting service.
2. Enter the desired city name in the search input.
3. Click the "Search" button.
4. Weather information for the city will be displayed.
5. Click on the temperature to cycle between Celsius, Fahrenheit, and Kelvin units.

---

## Requirements

- A browser that supports ES6 and the Fetch API (e.g., Chrome, Firefox, Edge)
- Internet connection to fetch data from the API

---

## API Key

You need an API key from [OpenWeatherMap](https://openweathermap.org/api) to use this app.

Replace your API key in the following URLs:

```js
https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=YOUR_API_KEY&units=metric
https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=YOUR_API_KEY&units=metric

---

## Notes
- An alert will show if the city name is empty or invalid.
- Temperature is displayed in Celsius by default and changes unit on click.
- Forecast is shown for 6 time slots of 3 hours each (total 18 hours).

---

## Development & Improvements
- Add ability to save searched cities
- Display city map using other APIs
- Add support for multiple languages and more units
- Optimize the user interface

---

##Contact
Feel free to reach out:

GitHub: https://github.com/mohammadkhani76/Weather-City-Search
Email: nazanin.khani2@gmail.com

Thank you for visiting my project!

