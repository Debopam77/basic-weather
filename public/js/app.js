const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const outputDiv = document.querySelector('#output');
const errorDiv = document.querySelector('#error');
var weatherImg = document.querySelector('#weatherImg');
weatherForm.addEventListener('submit', (e)=> {
    outputDiv.textContent = 'Loading...';
    errorDiv.textContent = '';
    e.preventDefault();
    const location = search.value;
    fetch(`http://localhost:3000/weather?address=${location}`).then((response) => {
    response.json().then((data)=> {
        if(data.error) {
            errorDiv.textContent = data.error;
        }else {
            outputDiv.textContent = `In ${data.location}, ${data.country} its currently ${data.description}`;
            weatherImg.src = `${data.icon}`;
        }
    });
    });

});