// Función para buscar el clima de una ciudad
function buscarClima() {
  // Obtiene el valor de la ciudad ingresado en el input
  var ciudad = document.getElementById("inputCiudad").value;

  // Define la URL de la API para obtener datos meteorológicos (puedes usar OpenWeatherMap)
  var apiKey = "38aec58d143e3f356748c1ac05cc9d99";
  var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${apiKey}&units=metric`;

  // Hace una solicitud HTTP con Fetch
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      // Llama a la función para mostrar la información del clima
      mostrarInformacionClima(data);
    })
    .catch(error => {
      // En caso de error, muestra un mensaje de error
      console.error("Error al obtener datos meteorológicos:", error);
      mostrarError();
    });
}

// Función para mostrar la información del clima
function mostrarInformacionClima(data) {
  // Obtiene la temperatura, descripción y el icono del clima
  var temperaturaCelsius = data.main.temp;
  var descripcion = data.weather[0].description;
  var iconoClima = data.weather[0].icon;

  // Convierte la temperatura a Fahrenheit
  var temperaturaFahrenheit = (temperaturaCelsius * 9/5) + 32;

  // Crea un mensaje con la información del clima
  var climaInfo = `Temperatura: ${temperaturaCelsius.toFixed(2)}°C / ${temperaturaFahrenheit.toFixed(2)}°F, Condición: ${descripcion}`;

  // Muestra la información en el div con id "clima-info"
  document.getElementById("clima-info").innerText = climaInfo;

  // Muestra la imagen correspondiente al clima
  mostrarImagenClima(iconoClima);
}

// Función para mostrar la imagen correspondiente al clima
function mostrarImagenClima(iconoClima) {
  var imagen = document.getElementById("imagen-clima");

  // Lógica para asignar la imagen según el icono del clima
  switch (iconoClima) {
    case "01d":
      imagen.src = "./imagenes/Soleado.png"; // Cielos despejados durante el día
      break;
    case "01n":
      imagen.src = "./imagenes/noche-despejada.png"; // Cielos despejados durante la noche
      break;
    case "02d":
      imagen.src = "./imagenes/parcialmente-nublado-dia.png"; // Nublado parcial durante el día
      break;
    case "02n":
      imagen.src = "./imagenes/parcialmente-nublado-noche.webp"; // Nublado parcial durante la noche
      break;
    case "03d":
    case "03n":
      imagen.src = "./imagenes/nublado.png"; // Nublado durante el día o la noche
      break;
    case "04d":
    case "04n":
      imagen.src = "./imagenes/nublado-gris.webp"; // Nublado gris durante el día o la noche
      break;
    case "09d":
    case "09n":
      imagen.src = "./imagenes/lluvia.png"; // Lluvia durante el día o la noche
      break;
    case "10d":
    case "10n":
      imagen.src = "./imagenes/lluvia-sol.png"; // Lluvia con sol durante el día o la noche
      break;
    case "11d":
    case "11n":
      imagen.src = "./imagenes/tormenta.png"; // Tormenta durante el día o la noche
      break;
    case "13d":
    case "13n":
      imagen.src = "./imagenes/nieve.png"; // Nieve durante el día o la noche
      break;
    default:
      imagen.src = "./imagenes/desconocido.png"; // Imagen por defecto en caso de icono desconocido
      break;
  }
}

// Función para mostrar un mensaje de error en caso de problemas con la solicitud
function mostrarError() {
  document.getElementById("clima-info").innerText = "Error al obtener datos meteorológicos.";
}

// Función para cambiar el fondo según la hora del día
function cambiarFondoSegunHora() {
  var fecha = new Date();
  var hora = fecha.getHours();

  // Define las horas para considerar como día y noche (ajústalas según tu ubicación)
  var horaDiaInicio = 7;
  var horaDiaFin = 18;

  // Agrega/elimina la clase para cambiar el fondo según la hora
  if (hora >= horaDiaInicio && hora < horaDiaFin) {
    document.body.classList.remove("fondo-noche");
    document.body.classList.add("fondo-dia");
  } else {
    document.body.classList.remove("fondo-dia");
    document.body.classList.add("fondo-noche");
  }
}

// Ejecuta la función para cambiar el fondo al cargar la página
cambiarFondoSegunHora();
