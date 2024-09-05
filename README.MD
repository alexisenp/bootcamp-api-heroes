# Ver Live Demo

[Ver Live Demo Aquí](https://alexisenp.github.io/bootcamp-api-heroes/)


# SuperHero Finder

Esta aplicación permite buscar información detallada de superhéroes utilizando la [SuperHero API](https://www.superheroapi.com/). El objetivo es que los usuarios puedan ingresar el ID de un superhéroe y obtener información relevante sobre el mismo, presentada de forma dinámica y visual.

## Requisitos

- HTML5
- jQuery
- Bootstrap
- CanvasJS
- SuperHero API (Requiere una clave de acceso)

## Funcionalidades

1. **Formulario de búsqueda**: Un formulario donde los usuarios pueden ingresar el número del superhéroe que desean consultar.
   
2. **Validación de entrada**: Verifica que el valor ingresado sea un número. Si no es válido, se muestra una alerta al usuario.

3. **Consulta a la API**: Se realiza una consulta a la SuperHero API utilizando AJAX con jQuery para obtener la información del héroe de manera asíncrona.

4. **Renderización dinámica**: La información obtenida de la API se presenta dinámicamente utilizando tarjetas (cards) de Bootstrap.

5. **Gráficos interactivos**: La aplicación muestra información relevante del héroe utilizando gráficos de pastel generados con CanvasJS.

6. **Alertas**: Se generan alertas cuando ocurren errores en la búsqueda, como héroes no encontrados o entradas inválidas.
