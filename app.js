window.addEventListener("load", () => {
  import { v1 } from 'uuid'; // Esto solo funciona en módulos ES6
  let lon;
  let lat;

  let temperaturaValor = document.getElementById("temperatura-valor");
  let temperaturaDescripcion = document.getElementById("temperatura-descripcion");
  let ubicacion = document.getElementById("ubicacion");
  let vientoVelocidad = document.getElementById("viento-velocidad");
  let iconoAnimado = document.getElementById("icono-animado");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((posicion) => {
      lon = posicion.coords.longitude;
      lat = posicion.coords.latitude;

      const weatherApiKey = "9871a8423e7fb66f6871bd793896494c";
      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=Ecuador&lang=es&units=metric&appid=${weatherApiKey}`;

      fetch(weatherUrl)
        .then(response => response.json())
        .then(data => {
          let temp = Math.round(data.main.temp);
          temperaturaValor.textContent = `${temp} °C`;

          let desc = data.weather[0].description;
          temperaturaDescripcion.textContent = desc.toUpperCase();
          ubicacion.textContent = data.name;

          vientoVelocidad.textContent = `${data.wind.speed} m/s`;

          switch (data.weather[0].main) {
            case "Thunderstorm":
              iconoAnimado.src = "animated/thunder.svg";
              break;
            case "Drizzle":
              iconoAnimado.src = "animated/rainy-2.svg";
              break;
            case "Rain":
              iconoAnimado.src = "animated/rainy-7.svg";
              break;
            case "Snow":
              iconoAnimado.src = "animated/snowy-6.svg";
              break;
            case "Clear":
              iconoAnimado.src = "animated/day.svg";
              break;
            case "Atmosphere":
              iconoAnimado.src = "animated/weather.svg";
              break;
            case "Clouds":
              iconoAnimado.src = "animated/cloudy-day-1.svg";
              break;
            default:
              iconoAnimado.src = "animated/cloudy-day-1.svg";
          }
        })
        .catch(error => console.error(error));
    });

    // Obtener la IP del usuario
    fetch('https://ipgeolocation.abstractapi.com/v1?api_key=YOUR_API_KEY')
      .then(response => response.json())
      .then(ipData => {
        console.log(ipData);

        // Validación de correo
        const emailUrl = "https://emailvalidation.abstractapi.com/v1/?api_key=5e44a69f672f4e35b71963dcbe452694&email=sabenalcazarm@uce.edu.ec";
        
        fetch(emailUrl)
          .then(response => response.json())
          .then(emailData => {
            console.log(emailData);
          })
          .catch(err => console.error(err));
      })
      .catch(err => console.error(err));
  }
});