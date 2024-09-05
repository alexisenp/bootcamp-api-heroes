$(document).ready(function () {
  // Evento que se ejecuta cuando se envía el formulario de búsqueda
  $('#form-buscar').on('submit', function (event) {
    event.preventDefault(); // Previene que la página se recargue

    let valor = capturaDeInformacion(); // Captura el valor ingresado
    if (valor.trim() !== '') {
      // Si el valor no está vacío, llama a la API
      consultaALaApi(valor);
    }
  });

  // Evento que se ejecuta al hacer clic en el botón "Buscar otro héroe"
  $('#boton-buscar-nuevo').on('click', function () {
    $('.search-section').removeClass('d-none'); // Muestra la sección de búsqueda
    $('.result-section').addClass('d-none'); // Oculta la sección de resultados
    $('#valor-a-buscar').val(''); // Limpia el campo de búsqueda
  });

  // Función para capturar y validar la información ingresada en el campo de búsqueda
  function capturaDeInformacion() {
    let valorABuscar = $('#valor-a-buscar').val(); // Obtiene el valor del input
    if (esNumero(valorABuscar)) {
      // Si es un número válido, lo retorna
      return valorABuscar;
    } else {
      // Si no es un número, muestra una alerta y limpia el campo
      alert('El valor ingresado no es un número, inténtelo nuevamente.');
      $('#valor-a-buscar').val('');
      return ''; // Retorna vacío si no es válido
    }
  }

  // Función para validar si el valor ingresado es un número
  function esNumero(valor) {
    var regex = /^-?\d+(\.\d+)?$/; // Expresión regular para validar números
    return regex.test(valor); // Retorna true si es un número
  }

  // Función para consultar la API de SuperHéroes
  function consultaALaApi(id) {
    $.ajax({
      url: `https://www.superheroapi.com/api.php/7548dea7ff56f439af1280bb229aca72/${id}`, // URL de la API con el ID del héroe
      method: 'GET', // Método de la solicitud
      success: function (data) {
        // Si la solicitud es exitosa, se muestran los datos del héroe
        mostrarDatosHero(data);
        // Genera el gráfico con las estadísticas de poder del héroe
        generaGraficoHero(data.powerstats, data.name);
      },
      error: function () {
        // Si hay un error en la solicitud, muestra una alerta
        alert('Error al obtener la información del héroe.');
      },
    });
  }

  // Función para mostrar los datos del héroe en el DOM
  function mostrarDatosHero(data) {
    $('.result-section').removeClass('d-none'); // Muestra la sección de resultados
    $('.search-section').addClass('d-none'); // Oculta la sección de búsqueda
    $('#nombre-heroe').text(data.name); // Muestra el nombre del héroe
    $('#card-image').attr('src', data.image.url); // Muestra la imagen del héroe
    $('#conexiones').text(
      'Conexiones: ' + data.connections['group-affiliation'] // Muestra las conexiones del héroe
    );
    $('#publicado-por').text('Publicado por: ' + data.biography.publisher); // Muestra el editor
    $('#ocupacion').text('Ocupación: ' + data.work.occupation); // Muestra la ocupación
    $('#primera-aparicion').text(
      'Primera aparición: ' + data.biography['first-appearance']
    ); // Primera aparición del héroe
    $('#altura').text('Altura: ' + data.appearance.height); // Muestra la altura
    $('#peso').text('Peso: ' + data.appearance.weight); // Muestra el peso
    $('#alianzas').text('Alianzas: ' + data.biography.aliases); // Muestra las alianzas
  }

  // Función para generar el gráfico de estadísticas de poder del héroe
  function generaGraficoHero(powerstats, name) {
    var chart = new CanvasJS.Chart('grafico-hero', {
      theme: 'dark2', // Tema oscuro del gráfico
      animationEnabled: true, // Habilita la animación del gráfico
      title: {
        text: `Estadísticas de poder para ${name}`, // Título del gráfico
      },
      data: [
        {
          type: 'pie', // Tipo de gráfico (pastel)
          startAngle: 25, // Ángulo inicial
          toolTipContent: '<b>{label}</b>: {y}%', // Contenido del tooltip
          showInLegend: 'true', // Muestra la leyenda
          legendText: '{label}', // Texto de la leyenda
          indexLabelFontSize: 16, // Tamaño de la fuente de las etiquetas
          indexLabel: '{label} - {y}%', // Etiquetas del gráfico
          dataPoints: [
            { y: parseInt(powerstats.intelligence), label: 'Inteligencia' }, // Muestra la inteligencia
            { y: parseInt(powerstats.strength), label: 'Fuerza' }, // Muestra la fuerza
            { y: parseInt(powerstats.speed), label: 'Velocidad' }, // Muestra la velocidad
            { y: parseInt(powerstats.durability), label: 'Durabilidad' }, // Muestra la durabilidad
            { y: parseInt(powerstats.power), label: 'Poder' }, // Muestra el poder
            { y: parseInt(powerstats.combat), label: 'Combate' }, // Muestra el combate
          ],
        },
      ],
    });
    chart.render(); // Renderiza el gráfico
  }
});
