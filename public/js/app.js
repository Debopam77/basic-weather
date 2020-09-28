const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const outputDiv = document.querySelector('#output');
const tempDiv = document.querySelector('#temperature');
const errorDiv = document.querySelector('#error');
var weatherImg = document.querySelector('#weatherImg');
weatherForm.addEventListener('submit', (e)=> {
    outputDiv.textContent = 'Loading...';
    errorDiv.textContent = '';
    e.preventDefault();
    const location = search.value;
    fetch(`/weather?address=${location}`).then((response) => {
    response.json().then((data)=> {
        if(data.error) {
            errorDiv.textContent = data.error;
        }else {
            outputDiv.textContent = `In ${data.location}, ${data.country} its currently ${data.description}`;
            tempDiv.textContent = `${data.temperature}\u00B0 C`;
            weatherImg.src = `${data.icon}`;
        }
    });
    });

});