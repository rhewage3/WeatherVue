const key = '330e6d0c2c8ae7d2baf0eb5ad25b5135';


async function search(ev){
    const phrase = document.querySelector('input[type="text"]').value;
    const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${phrase}&limit=5&appid=${key}`)
    const data = await response.json();
    // console.log(data);

    //place name drop down fetched from the api 
    const ul = document.querySelector('form ul');
    ul.innerHTML = '';

    for(let i = 0; i < data.length; i++){
        const {name,lat,lon,country} = data[i];
        
        ul.innerHTML += `<li 
            data-lat="${lat}"
            data-lon="${lon}"
            data-name="${name}">
            ${name}<span>${country}</span></li>`;
    }
}

const debounceSearch = _.debounce(() => {search();}, 600);

//getting weather data of the specific lon, lat and name from the API
async function showWeather (lat, lon,name){
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=metric&`);
    const data = await response.json();
    // console.log(data);


    //getting all the data that given to vars
    const temp = Math.round(data.main.temp);
    const feelsLike = Math.round(data.main.feels_like);
    const humidity = Math.round(data.main.humidity);
    const wind = Math.round(data.wind.speed);
    const icon = data.weather[0].icon;
    // console.log({temp, feelsLike,humidity,wind,icon,data})

    document.getElementById('city').innerHTML = name;
    document.getElementById('degrees').innerHTML = temp + '&#8451;';
    document.getElementById('feelsLikeValue').innerHTML = feelsLike + '<span>&#8451;</span>';
    document.getElementById('windValue').innerHTML = wind + '<span>km/h</span>';
    document.getElementById('humidityValue').innerHTML = humidity + '<span>%</span>';
    document.getElementById('icon').src = `https://openweathermap.org/img/wn/${icon}@4x.png`;
    document.querySelector('form').style.display = 'none';
    document.getElementById('weather').style.display = 'block';


}

document.querySelector('input[type="text"]').addEventListener('keyup', debounceSearch);


document.body.addEventListener('click', ev =>{
    // console.log(ev);
    const li = ev.target;
    const {lat, lon, name} = li.dataset;
    if(!lat){
        return;
    }
    showWeather(lat, lon, name);
});


document.getElementById('change').addEventListener('clic', () => {
    document.getElementById('weather').style.display= 'none';
    document.querySelector('form').style.display = 'block';
});