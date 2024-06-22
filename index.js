const formContainer = document.querySelector(".formContainer");
const inputText = document.querySelector(".inputText");
const card = document.querySelector(".card");

formContainer.addEventListener("submit", async (event) => {
  event.preventDefault();
  const city = inputText.value;
  if (city) {
    try {
      const fetchedDate = await getWeatherData(city);
      displayWeatherInfo(fetchedDate);
    } catch (error) {
      console.error(error);
      displayError(error);
    }
  } else {
    displayError("Please Enter City");
  }
});

async function getWeatherData(city) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${"24ab193a5cde5462868eb34a19dca387"}`
  );

  if (response.ok) {
    const data = await response.json();

    return data;
  } else {
    throw new Error("Could Not Fetch Weather Data");
  }
}

function displayWeatherInfo(data) {
  let {
    name: City,
    main: { temp, humidity },
    weather: [{ id, description }],
  } = data;
  card.style.display = "flex";
  card.textContent = "";

  const displayCity = document.createElement("h1");
  const displaytemp = document.createElement("p");
  const displayhumidity = document.createElement("p");
  const displaydescription = document.createElement("p");

  displayCity.textContent = City;
  displaytemp.textContent = `${(temp - 273.15).toFixed(1)}°C`;
  displayhumidity.textContent = humidity + "%";
  displaydescription.textContent = description;

  displayCity.classList.add("displayCity");
  displaytemp.classList.add("displayTemp");
  displayhumidity.classList.add("displayHumidity");
  displaydescription.classList.add("displayDescription");

  card.appendChild(displayCity);
  card.appendChild(displaytemp);
  card.appendChild(displayhumidity);
  card.appendChild(displaydescription);

  displayEmoji(id);
}

function displayEmoji(code) {
  const displayimg = document.createElement("img");

  displayimg.classList.add("displayEmoji");

  switch (true) {
    case code >= 200 && code < 300:
      displayimg.src = "assets/thunderstorm-svgrepo-com.svg";
      break;
    case code >= 300 && code < 400:
      displayimg.src = "assets/drizzle-svgrepo-com.svg";
      break;
    case code >= 500 && code < 600:
      displayimg.src = "assets/rain-2-svgrepo-com.svg";
      break;
    case code >= 600 && code < 700:
      displayimg.src = "assets/snow-alt-1-svgrepo-com.svg";
      break;
    case code >= 700 && code < 800:
      displayimg.src = "assets/clouds-1274-svgrepo-com.svg";
      break;
    case code === 800:
      displayimg.src = "assets/sun.svg";
      break;
    case code >= 801 && code < 8012:
      displayimg.src = "assets/clouds-1274-svgrepo-com.svg";
      break;
    default:
      displayimg.src = "assets/question-mark-svgrepo-com.svg";
  }

  card.appendChild(displayimg);
}
function displayError(message) {
  const displayerror = document.createElement("p");
  card.style.display = "flex";
  card.textContent = "";

  displayerror.textContent = message;

  displayerror.classList.add("displayError");

  card.appendChild(displayerror);
  setTimeout(() => {
    card.style.display = "none";
    inputText.value = "";
  }, 5000);
}
