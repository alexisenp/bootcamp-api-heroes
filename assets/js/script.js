$(document).ready(function () {
  $('#form-buscar').on('submit', function (event) {
    event.preventDefault();

    let valor = capturaDeInformacion();
    if (valor.trim() !== '') {
      consultaALaApi(valor);
    }
  });

  $('#boton-buscar-nuevo').on('click', function (event) {
    $('.search-section').removeClass('d-none');
    $('.result-section').addClass('d-none');
  });

  //Capturar la información ingresada mediante eventos del DOM con jQuery.
  function capturaDeInformacion() {
    let valorABuscar = $('#valor-a-buscar').val();
    if (esNumero(valorABuscar)) {
      return valorABuscar;
    } else {
      alert('El valor ingresado no es un numero, intentelo nuevamente.');
      $('#valor-a-buscar').val('');
      return '';
    }
  }

  function esNumero(valor) {
    var regex = /^-?\d+(\.\d+)?$/;
    return regex.test(valor);
  }

  function consultaALaApi(id) {
    $.ajax({
      url: `https://www.superheroapi.com/api.php/7548dea7ff56f439af1280bb229aca72/${id}`,
      method: 'GET',
      success: function (data) {
        
        mostrarDatosHero(data);
        generaGraficoHero(data.powerstats, data.name);
      },
      error: function () {
        alert('Error al obtener la información del héroe.'); // Alerta si la solicitud falla.
      },
    });
  }

  function mostrarDatosHero(data){
    $('.result-section').removeClass('d-none');
    $('.search-section').addClass('d-none');
    $('#nombre-heroe').text(data.name);
    $('#card-image').attr('src', data.image.url);
    $('#conexiones').text(
      'Conexiones: ' + data.connections['group-affiliation']
    );
    $('#publicado-por').text('Publicado por: ' + data.biography.publisher);
    $('#ocupacion').text('Ocupación: ' + data.work.occupation);
    $('#primera-aparicion').text('Primera aparición: ' + data.biography["first-appearance"]);
    $('#altura').text('Altura: ' + data.appearance.height);
    $('#peso').text('Peso: ' + data.appearance.weight);
    $('#alianzas').text('Alianzas: ' + data.biography.aliases);
  }

  function generaGraficoHero(powerstats, name){

    var chart = new CanvasJS.Chart("grafico-hero", {
        theme: "dark2", // "light1", "light2", "dark1", "dark2"
        animationEnabled: true,
        title: {
            text: `Estadísticas de poder para ${name}`
        },
        data: [{
            type: "pie",
            startAngle: 25,
            toolTipContent: "<b>{label}</b>: {y}%",
            showInLegend: "true",
            legendText: "{label}",
            indexLabelFontSize: 16,
            indexLabel: "{label} - {y}%",
            dataPoints: [
                {y: parseInt(powerstats.intelligence), label: "Inteligencia"},
                {y: parseInt(powerstats.strength), label: "Fuerza"},
                {y: parseInt(powerstats.speed), label: "Velocidad"},
                {y: parseInt(powerstats.durability), label: "Durabilidad"},
                {y: parseInt(powerstats.power), label: "Poder"},
                {y: parseInt(powerstats.combat), label: "Combate"}
            ],
        }]
    });
    chart.render();
  }
});
