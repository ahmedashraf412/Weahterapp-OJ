const weatherForm = document.querySelector('.inputForm');
const cityInput = document.querySelector('.cityInput');
const appData = document.querySelector('.appData');
//d862c2a079ab7f67130ca8fe7236d62b

weatherForm.addEventListener("submit", async event => {

    event.preventDefault();
    const city = cityInput.value;

    if(city){
        try{
            if(cityInput){
            const weatherData = await getWeatherData(city);
            console.log(weatherData);
            displayWeatherInfo(weatherData);
            }
        }
        catch(error){
            console.error(error);
            displayError(error);
        }
    }
    else{
        displayError("Please enter a city");
    }
});
async function getWeatherData(city){
    const apiKey = 'd862c2a079ab7f67130ca8fe7236d62b';
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
    if(!response.ok){
        throw new Error('Could not find city !');
    }
    const data = await response.json();
    return data;

}


function displayWeatherInfo(weatherData){
    const data = weatherData
    
    appData.innerHTML ="";
    appData.style.display="flex";
    cityName = document.createElement("p");
    temp = document.createElement("p");
    humidity = document.createElement('p');
    emoji = document.createElement("div");
    desc = document.createElement("p");

    cityName.textContent = data.name;
    temp.textContent = `🌡 ${(data.main.temp-273.15).toFixed(1)} °C`;
    humidity.textContent = `💧 ${data.main.humidity} %`;
    emoji.innerHTML = `<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png"/>`;
    desc.textContent = data.weather[0].description;
    
    appData.appendChild(cityName);
    appData.appendChild(temp);
    appData.appendChild(humidity);
    appData.appendChild(emoji);
    appData.appendChild(desc);

    cityName.classList.add('cityName');
    temp.classList.add('temp');
    humidity.classList.add('humidity');
    emoji.classList.add('emoji');
    desc.classList.add('desc');

    

}

function displayError(error){
    appData.textContent = "";
    appData.style.display="flex";
    e = document.createElement('h1');
    e.textContent = error;
    appData.appendChild(e);
    e.classList.add('error');
    


}


