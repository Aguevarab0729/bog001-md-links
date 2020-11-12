# Markdown Links

## 1. Preámbulo

Markdown es un lenguaje de marcado
ligero muy popular entre developers. Es usado en muchísimas plataformas que
manejan texto plano (GitHub, foros, blogs, ...), y es muy común
encontrar varios archivos en ese formato en cualquier tipo de repositorio
(empezando por el tradicional `README.md`).

Estos archivos `Markdown` normalmente contienen _links_ (vínculos/ligas) que
muchas veces están rotos o ya no son válidos y eso perjudica mucho el valor de
la información que se quiere compartir.

Me puse como reto crear una herramienta usando [Node.js](https://nodejs.org/),
que lea y analice archivos en formato `Markdown`, para verificar los links que 
contengan y reportar algunas estadísticas de su funcionamiento 

## 2. Resumen del proyecto

En este proyecto nos alejamos un poco del navegador para construir un programa
que se ejecute usando Node.js, donde aprenderemos sobre cómo interactuar con el
sistema archivos, con el entorno (_proceso_, _env_, _stdin/stdout/stderr_), ...

En este proyecto creamos una herramienta de línea de comando (CLI) y una librería
propia (o biblioteca - library) en JavaScript.

## 3. Diagrama de Flujo 

![diagrama] (https://github.com/Aguevarab0729/bog001-md-links/blob/master/diagrama%20de%20flujo.jpg)

## 4. Instalación
$ npm install -g Aguevarab0729/bog001-md-links

### Comandos 

--validate 

--stats 

--validate --stats 
