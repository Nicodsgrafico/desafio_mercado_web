// Importar los módulos necesarios
import express from 'express';
import exphbs from 'express-handlebars';
import path from 'path';
import fs from 'fs';

// Crear una instancia de Express
const app = express();

// Definir el puerto
const PORT = 3000;

// Definir la ruta del directorio base
const __dirname = path.resolve();

// Leer los datos del archivo JSON de productos
let productos;
fs.readFile('productos.json', 'utf8', (err, data) => {
  if (err) {
    console.error('Error al leer el archivo JSON:', err);
    return;
  }
  productos = JSON.parse(data); // Convertir los datos del archivo JSON a un objeto JavaScript
});

// Configurar Handlebars como motor de plantillas
app.set('view engine', 'hbs');

app.engine( //app.engine() es un método que permite configurar el motor de plantillas
    'hbs', //nombre del motor de plantillas 
    exphbs.engine({ //exphbs.engine() es un método que permite configurar el motor de plantillas Handlebars
        layoutsDir: __dirname + '/views', //Directorio de los layouts
        extname: '.hbs',//Extensión de los archivos de plantillas
    })
);
// Middleware para servir archivos estáticos (Bootstrap y jQuery)
app.use('/bootstrap', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/jquery', express.static(path.join(__dirname, 'node_modules/jquery/dist')));

// Ruta para renderizar main.hbs en la raíz '/'
app.get('/', (req, res) => {
  res.render('main', { productos }); // Renderizar main.hbs y pasar los datos de productos
});

// Iniciar el servidor
app.listen(PORT, () => console.log(`El servidor está corriendo en el puerto ${PORT}`));