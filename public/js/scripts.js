document.addEventListener('DOMContentLoaded', function(event) { 
    const form = document.querySelector('form');
    const input = form.querySelector('input');
    const [ forecastOne, forecastTwo ] = document.querySelectorAll('.forecast');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let address = input.value;

        forecastOne.textContent = 'Loading weather forecast...';
        
        fetch(`/weather?address=${address}`).then(data => {
            data.json().then((data) => {
                input.value = '';
                if (data.error) {
                    return forecastOne.textContent = data.error;
                }
                forecastOne.textContent = `Location: ${data.location}`;
                forecastTwo.textContent = `Forecast: ${data.forecastData}`;
                console.log(data);
            })
        }).catch(e => e) ;

    });
});

