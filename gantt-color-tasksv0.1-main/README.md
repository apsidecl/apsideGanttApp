![logo-dark](https://user-images.githubusercontent.com/58343999/124029514-3a022000-d9c3-11eb-8e40-1f4ee5774f3f.png)
# gantt-color-tasksApp
## App para comparar pagos contra asignaciones 
 ```
 Disclaimer: todavía se sigue trabajando en el projecto, bugs de funcionamiento y estética son esperables
 ```
## Uso
```
Esta carta Gantt toma sus datos de la tabla PxA del Airtable correspondiente a la empresa e imprime en pantalla 
las asignaciones con sus pagos respectivos
```

### Parametros iniciales
```
dentro de useAir.js, se encuentra el llamado a la API de airtable, la cuál retorna los valores que luego serán formateados 

```
![image](https://user-images.githubusercontent.com/58343999/127672338-c20286b9-883a-482d-8055-dd453df4e444.png)
![image](https://user-images.githubusercontent.com/58343999/127674782-e6722376-c7ad-4876-9c4f-eac3bfba6c4a.png)
![image](https://user-images.githubusercontent.com/58343999/127399941-8622ab15-3bec-44ad-9feb-39c62b7841ba.png)

```
El objeto data será el que tenga la información que se enviará mediante mounted()
parámetros de las funciones: la data traída desde useAir() y formateada en , correspondiente al array con 
los datos correspondientes a las columnas de la tabla PxA
```

![image](https://user-images.githubusercontent.com/58343999/127517772-4245a47d-8624-4fb9-8115-325797bc1ada.png)

```
La finalidad de las funciones itemsAsignacion(), itemsAsignacionReal(), itemsPagoAsignacion() es la de "limpiar"
los datos que llegan desde useAir() para formatearlos de forma que el html de la página peda imprimirlos de forma optima
```


