# Exchange Rate App

Esta aplicación permite realizar el calculo de las tazas de cambio del Peso Mexicano, respecto a otras monedas.

## Tecnologías

La aplicación esta desarrollada con HTML, CSS, Javascript y la libreria React.
La información de las tasas de cambio es consumida desde la api https://fixer.io/ con el plan gratuito.
Para no sobrepasar el limite de uso de la API, la información se almacena y consulta desde el localstorage, y se actualiza caada dia para tener la ultimainformación de las tasas de cambio.

### Librerias

- **Bulma** - Framework de CSS Moderno
- **C3js** - Librería para generar graficas
- **Moment** - Libreria para manejar fechas
- **Sass** - Preprocesador de CSS
- **Axios** - CLiente para realizar peticiones HTTP
- **dotenv** - Libreria para gestionar variables de entorno

## Requisitos para ejecutar la aplicación

Antes de comenzar con la descarga y ejecución de la aplicación, es necesario tener instalado en el equipo las siguientes aplicaciones:

- **git**
- **Node.js**

Adicional a esto, se recomienda la instalación de **Visual Studio Code** para la edición de código fuente.

## Descarga de repositorio

El código fuente de la API se encuentra versionado con git y está alojado en el repositorio GIT https://github.com/gopichardo/front-exchange.git, en la rama master.

para descargar la solución del proyecto basta con clonar el repositorio con el siguiente comando:

```sh
git clone https://github.com/gopichardo/front-exchange.git
```

## Instalar dependencias

Antes de iniciar la aplicación es necesario instalar las dependencias de la aplicación

```
npm install
```

## Configuración Inicial

A aplicación hace uso de la variable de entorno REACT_APP_FIXERKEY, la cual contiene el valor de la llave de la API https://fixer.io/ . Es posible cofigurar esta variable y poder hacer uso de otra llave con un plan asociado.

## Iniciar Aplicación

Para iniciar la aplicación basta con situarse dentro del directorio raíz de la solución, y ejecutar el siguiente comando

```
npm start
```

automáticamente se levantará un servidor web y la aplicación estará disponible en la url http://localhost:3000

## Funcionamiento de la palicación

La aplicación es muy facil de usar, basta con elegir de los controles la moneda origen y destino y automaticamente se realizará la conversión, y se mostrará una gráfica con el historial de la tasa de cambio de los ultimos 7 dias.

la aplicación esta diseñada para adaptarse a dispositivos moviles y pantallas mas grandes de manera responsiva.

## Limitaciones

Debido a que la aplicación utiliza el plan gratuito de la API https://fixer.io/ solo se pueden realizar 100 peticiones al mes en el pan gratuito, por lo que puede no obtener la información de manera correcta hasta que se renueve el plan. Ademas de que solo están disponobles las siguientes conversiones:

- USD: "United States Dollar",
- AUD: "Australian Dollar",
- CAD: "Canadian Dollar",
- PLN: "Polish Zloty",
- MXN: "Mexican Peso",
- EUR: "Euro",

Desarrollado por **César González**  
Correo: gopichardoces@gmail.com  
LinkedIn: https://www.linkedin.com/in/gopichardoces/
