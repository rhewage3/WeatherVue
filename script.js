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

document.querySelector('input[type="text"]').addEventListener('keyup', debounceSearch);