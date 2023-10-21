async function getWeather(city) {
    const API = 'b4dc4d55c9654819a9b135617231710';
    try {
        const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${API}&q=${city}&aqi=yes`, { mode: 'cors' });
        const data = await response.json();

        return data;
    } catch(err) {
        console.log(err);
        return;
    }
}

function weatherInfo(data) {
    const place = `${data.location.name}, ${data.location.region}, ${data.location.country}`;
    const temp = {'c': data.current.temp_c + '°C', 'f': data.current.temp_f + 'F'};
    const wind = data.current.wind_kph + 'kph';
    const humidity = data.current.humidity + '%';
    const desc = data.current.condition.text; 
    const icon = data.current.condition.icon;
    
    const forecast = {
        'place': place,
        'temp': temp,
        'wind': wind,
        'humidity': humidity,
        'desc': desc,
        'icon': icon
    };

    return forecast;
}

function display(forecast) {
    const placeDiv = document.createElement('div');
    placeDiv.className = 'place';
    placeDiv.textContent = forecast['place'];

    const tempDiv = document.createElement('div');
    tempDiv.className = 'temp';
    tempDiv.classList.add('c');
    tempDiv.textContent = forecast['temp']['c'];
    tempDiv.addEventListener('click',(e) => {
        if (tempDiv.classList[1] == 'c') {
            tempDiv.textContent = forecast['temp']['f'];
            tempDiv.classList.replace('c','f');
        } else {
            tempDiv.textContent = forecast['temp']['c'];
            tempDiv.classList.replace('f','c');
        }
    });
    
    const windDiv = document.createElement('div');
    windDiv.className = 'wind';
    windDiv.textContent = forecast['wind'];

    const humidityDiv = document.createElement('div');
    humidityDiv.className = 'humidity';
    humidityDiv.textContent = forecast['humidity'];

    const descDiv = document.createElement('div');
    descDiv.className = 'desc';
    descDiv.textContent = forecast['desc'];

    const iconDiv = document.createElement('div');
    iconDiv.className = 'icon-container';

    const iconImg = document.createElement('img');
    iconImg.className = 'icon';
    iconImg.src = forecast['icon'];

    iconDiv.appendChild(iconImg);

    body = document.body;

    body.appendChild(placeDiv);
    body.appendChild(tempDiv);
    body.appendChild(windDiv);
    body.appendChild(humidityDiv);
    body.appendChild(descDiv);
    body.appendChild(iconDiv);

}

function reset() {
    const elements = document.querySelectorAll('div');
    elements.forEach((element) => {
        element.remove();
    });
}

var flag = 0;

const form = document.getElementById('form');
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    flag = 1;

    const city = document.getElementById('location').value;
    const data = await getWeather(city);
    const forecast = weatherInfo(data);

    if (flag == 1) reset();
     
    display(forecast);

    console.log(forecast);
});