Proyecto: Gestor de finanzas personales - SPA

## Integrantes
- José Alfredo Centeno López
- Nombre Apellido 2
- Nombre Apellido 3
- Nombre Apellido 4

## Descripción
Aplicación web single-page para registrar y visualizar ingresos y gastos. 
Incluye un formulario con validación, una tabla de historial y resumen (saldo, ingresos, gastos). 
Diseño responsivo, SASS, Bootstrap 5 y almacenamiento en localStorage.
## Descripción
La aplicación **FinanzasApp** es un sistema web orientado a la gestión de finanzas personales. Su propósito principal es permitir al usuario registrar de forma sencilla sus ingresos y gastos, y obtener una visión clara de su estado financiero.
El flujo principal inicia con un **formulario validado** que asegura la correcta captura de los datos: descripción de la transacción, tipo (ingreso o gasto), monto, categoría y fecha. Estos registros se almacenan en el navegador utilizando **localStorage**, lo que garantiza persistencia de la información sin necesidad de una base de datos externa. De esta manera, los datos permanecen disponibles incluso tras cerrar o recargar la página.
Las transacciones se listan en un **historial dinámico**, mostrado en una tabla responsiva que permite revisar de manera ordenada cada registro y, si es necesario, eliminarlo. Paralelamente, el sistema calcula automáticamente un **resumen financiero**, mostrando en tarjetas el saldo disponible, el total de ingresos y el total de gastos. Este resumen se actualiza en tiempo real cada vez que se agregan o eliminan transacciones, facilitando un seguimiento inmediato de la situación económica.
El diseño visual está pensado para ser **moderno y adaptable**. Se emplea **CSS Grid** para la estructura principal de la página y **Flexbox** para distribuir elementos internos como menús, tarjetas y botones. Los estilos personalizados están escritos en **SASS**, aprovechando variables, mixins y anidación de reglas para mantener un código organizado y fácil de mantener. Además, se incorpora **Bootstrap 5** para aprovechar componentes predefinidos (botones, formularios, tablas, sistema de rejilla) y acelerar el desarrollo de la interfaz.
En conjunto, esta aplicación no solo ofrece un registro y consulta básica de movimientos financieros, sino que también brinda una **experiencia de usuario intuitiva, responsiva y atractiva**, convirtiéndose en una herramienta útil para el manejo cotidiano de ingresos y gastos.
