![logo-dark](https://user-images.githubusercontent.com/58343999/124029514-3a022000-d9c3-11eb-8e40-1f4ee5774f3f.png)
# gantt-color-tasksv0.1
## A simple way to make a gantt chart for any purpose
 ```
 Disclaimer: everything inside the source ciode is merely an example
 ```
## Usage
```
Just go to the folder "components", copy and paste Gantt.vue into your Vue project
Remember: your project has to be SCSS support
```

### Parameters and how to setup this component
```
inside Gantt.vue, in the data, there gonna be something like this: 

```
![image](https://user-images.githubusercontent.com/58343999/124028959-9add2880-d9c2-11eb-8e64-a10746a38293.png)
### Here's an explanation for what's inside
```
clientes(customers): an array of objects that will go as option into the select box 
dataGantt: the data that's going to be inside the gantt chart
items: what's gonna be the name, assignment and real time spent on a given task,
it has nested items that will be explained in detail
```

![image](https://user-images.githubusercontent.com/58343999/124146061-61a4c700-da5b-11eb-88a1-fa8c72400abe.png)
```
id: the id of the current employee/item
name: the name of the employee/item
cliente_id: the id of the client that will be binded to the employee/item
sections: what's gonna be inside the gantt table
```
### subitems
![image](https://user-images.githubusercontent.com/58343999/124158715-3e344900-da68-11eb-893c-925172bebe9e.png) 
```
the first subitem is the tasks that's gonna be blue in the browser, representing the task 
that's gonna be executed by the person
as you can see, two items means two tasks
start/end: the time in the given task start and ends(goin from 2 to 367)
```
![image](https://user-images.githubusercontent.com/58343999/124167404-fca89b80-da71-11eb-8706-c89cab06c7ba.png)

```
here you can see and set the real asignemnt time for the task given, also there's color
swapping for different tasks

```
### Boilerplate example
![image](https://user-images.githubusercontent.com/58343999/124185714-4fda1880-da89-11eb-85d1-7e5ecbc984d6.png)

