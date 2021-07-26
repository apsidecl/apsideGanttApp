<template>
  <div class="wrapper" :style="{ $numDays: 90 }">
    <h2>Filtros</h2>
    <div class="filtros">

      <h3>Contrapartes:</h3>
      <select v-model="cliente">
        <option value="undefined" selected>TODOS</option>
        <option v-for="(contraparte,index) in arrayFiltrado1" :key="index">
          {{ contraparte.toUpperCase() }}
        </option>
      </select>

      <h3>Años:</h3>
      <!-- <select v-model="seleccionado" v-bind:value="filtrarXfechas(seleccionado)"> -->
      <select v-model="seleccionado">
        <option value="undefined" selected @click="filtrarXfechas(seleccionado)">TODOS</option>
        <option v-for="(año,index) in años" :key="index" @click="filtrarXfechas(seleccionado)">
          {{ año }}
        </option>
        
      </select>
    </div>

    <!-- <p>hola:{{seleccionado}}</p> -->

    <div class="gantt">
      <div class="gantt__row gantt__row--months">
        <div class="gantt__row-first"></div>
        <div
          v-for="(item, index) in months"
          :key="index"
          :style="`grid-column: ${item.start}/${item.end}`"
          class="item"
        >
          <span>{{ item.name }}</span>
          <div class="item-circle"></div>
        </div>
      </div>
      <div class="gantt__row gantt__row--days">
        <div class="gantt__row-first"></div>
        <span
          v-for="(item, index) in days"
          :key="index"
          :class="{
            'selected-day': selectedDay === index + 1,
            holiday: index + 1 === 16,
          }"
          >{{ item }}</span
        >
      </div>

      <div class="body">
        <div class="gantt__row gantt__row--lines">
          <div class="gantt__row-first"></div>
          <div
            class="selected-day-line"
            :style="`grid-column: ${selectedDay + 1}/${selectedDay + 1};`"
          ></div>
          <span
            v-for="(item, index) in days.length"
            :key="index"
            :class="{ 'holiday-line': index + 1 === 16 }"
          ></span>
        </div>
        <div class="gantt__wrapp" v-for="item in ganttFiltrada" :key="item.id">
          <div class="gantt__row">
            <div class="gantt__row-first"></div>
            <div class="gantt__row-border"></div>
          </div>
          <div class="gantt__row">
            <div class="gantt__row-first nombre-responsable">
              {{ item.name }}
            </div>
            <ul class="gantt__row-bars"></ul>
          </div>
          <div
            class="gantt__row margin-row"
            v-for="el in item.sections"
            :key="el.id"
          >
            <div class="gantt__row-first">
              {{ el.name }}
              <!-- holas -->
            </div>
            <ul class="gantt__row-bars">
              <li
                v-for="l in el.items"
                :key="l.id"
                :style="
                  `grid-column: ${l.start}/${l.end};background: ${l.color};`
                "
              >
                <span v-html="l.description" ></span>
                <ul
                  class="gantt__row-bars"
                  :style="
                    `grid-template-columns: repeat(${l.end -
                      l.start}, 1fr);margin-top:8px;`
                  "
                  v-if="l.sub_sections.length > 0"
                >
                  <li
                    v-for="li in l.sub_sections"
                    :key="li.id"
                    :style="
                      `grid-column: ${li.start}/${li.end};background: ${li.color};padding-top: 0; padding-bottom: 0`
                    "
                  >
                    <span v-html="li.description"></span>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
        <div class="gantt__row">
          <div class="gantt__row-first"></div>
          <div class="gantt__row-border"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity';
import { useAir } from '../hooks';
import { useAir1 } from '../hooks/useAir1';
export default {
  setup(){
    // console.log(this.dataQuery)
    return{...useAir1('https://api.airtable.com/v0/appNA0tXvNNmYEmuM/tblbtRgd0nTCteORY?api_key=key7WdLNou7tR5fdR&maxRecords=1030&offset=')}
    
  },
  name: 'Gantt',
  computed: {
    days() {
      let days = [];
      this.months.forEach((element) => {
        for (let i = 1; i <= element.days; i++) {
          days.push(i);
        }
      });
      return days;
    },
    ganttFiltrada() {
      let listaItem = this.dataGantt;
      if (this.cliente === undefined || this.cliente === 'undefined') {
        return listaItem;
      } else {
        return listaItem.filter((e) => e.cliente_id === this.cliente);
      }
    },
    // filtrarXfechas(valor){
    //   const datosGantt1 = this.dataQuery;
    //   // let filtrado = []
    //   // console.log(valor)
    //   if(valor.toString === undefined || valor.toString === "undefined"){
    //     datosGantt1.forEach((element) => {
    //     if(element !== undefined && element !== "undefined"){
    //       datosGantt1.push(element);
    //     }
    //     return datosGantt1;
        
    //   });

    //   }else{
    //     datosGantt1.forEach((element) => {
    //     if(element !== undefined && element !== "undefined"){
    //       if(element['Inicio (from Id Asignacion)'] !== undefined && element['Inicio (from Id Asignacion)'] !== "undefined"){
    //         if (element['Inicio (from Id Asignacion)'][0].includes(valor.toString) && element['Inicio (from Id Asignacion)'][0] !== undefined && element['Inicio (from Id Asignacion)'][0] !== "undefined") {
    //             // console.log(element['Inicio (from Id Asignacion)'][0]);
    //           datosGantt1.push(element);
    //         }
    //       }
    //     }
        
        
    //     return datosGantt1;  
        
    //     });
    //   }
    //   console.log(datosGantt1);
    //   return datosGantt1;
      
      
    // }
    
  },
  data: () => ({
    años:['2021','2020','2019','2018','2017'],
    año: undefined,
    seleccionado:ref(undefined),
    cliente: undefined,
    clientes: [
      {
        id: 1,
        name: 'Alejandro Truant',
        empresa: 'CNS',
        empresa_id: 1,
      },
      {
        id: 2,
        name: 'Paola Sanchez',
        empresa: 'CNS',
        empresa_id: 1,
      },
      {
        id: 3,
        name: 'Samuel Nuñez',
        empresa: 'INDH',
        empresa_id: 2,
      },
    ],
    datita:{},
    dataGantt: {
      items: [
        {
          id: 1,
          name: 'Kendru',
          sections: [
            {
              id: 1,
              name: 'Asignación',
              items: [
                {
                  id: 1,
                  cliente_id: 2,
                  description: `<b>CCBOLSA - Sitio Privado</b> (Nombre Cliente)`,
                  color: '#015a99',
                  start: 1,
                  end: 64, //
                  sub_sections: [],
                },
              ],
            },
            {
              id: 2,
              name: 'Asignación real',
              items: [
                {
                  id: 1,
                  cliente_id: 2,
                  description: null,
                  color: 'rgba(95, 174, 231, 0.8)',
                  start: 1,
                  end: 60,
                  sub_sections: [],
                },
              ],
            },
            {
              id: 3,
              name: 'Pago',
              items: [
                {
                  id: 1,
                  cliente_id: 2,
                  description: '<b>Anexo 50</b>',
                  color: '#85BB40',
                  start: 1,
                  end: 60,
                  sub_sections: [
                    {
                      id: 1,
                      description: 'Orden de Compra <b>Nº240</b>',
                      color: '#57930A',
                      start: 1,
                      end: 32,
                    },
                    {
                      id: 2,
                      description: 'Orden de Compra <b>Nº890</b>',
                      color: '#57930A',
                      start: 32,
                      end: 64,
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          id: 2,
          name: 'Emiliano',
          sections: [
            {
              id: 1,
              name: 'Asignación',
              items: [
                {
                  id: 1,
                  cliente_id: 2,
                  description:
                    '<b>CCBOLSA - Sitio Privado</b> (Nombre Cliente)',
                  color: '#015a99',
                  start: 1,
                  end: 60,
                  sub_sections: [],
                },
                {
                  id: 2,
                  cliente_id: 3,
                  description: '<b>INDH - Mapa de la memoria</b> (Samuel)',
                  color: '#015a99',
                  start: 60,
                  end: 80,
                  sub_sections: [],
                },
              ],
            },
            {
              id: 2,
              name: 'Asignación real',
              items: [
                {
                  id: 1,
                  cliente_id: 2,
                  description: null,
                  color: 'rgba(95, 174, 231, 0.8)',
                  start: 32,
                  end: 66,
                  sub_sections: [],
                },
                {
                  id: 2,
                  cliente_id: 2,
                  description: null,
                  color: 'rgba(254, 189, 22, 0.7)',
                  start: 60,
                  end: 80,
                  sub_sections: [],
                },
              ],
            },
            {
              id: 3,
              name: 'Pago',
              items: [
                {
                  id: 1,
                  cliente_id: 2,
                  description: '<b>Anexo 50</b>',
                  color: '#85BB40',
                  start: 32,
                  end: 60,
                  sub_sections: [
                    {
                      id: 1,
                      description: 'Orden de Compra <b>Nº890</b>',
                      color: '#57930A',
                      start: 1,
                      end: 29,
                    },
                  ],
                },
                {
                  id: 2,
                  cliente_id: 2,
                  description: '<b>Anexo 80</b>',
                  color: '#85BB40',
                  start: 60,
                  end: 80,
                  sub_sections: [
                    {
                      id: 1,
                      description: 'Orden de Compra <b>Nº920</b>',
                      color: '#57930A',
                      start: 1,
                      end: 29,
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    months: [
      {
        num: 1,
        name: 'Enero',
        days: 31,
        start: 2,
        end: 33,
      },
      {
        num: 2,
        name: 'Febrero',
        days: 28,
        start: 33,
        end: 61,
      },
      {
        num: 3,
        name: 'Marzo',
        days: 31,
        start: 61,
        end: 92,
      },
      {
        num: 4,
        name: 'Abril',
        days: 30,
        start: 92,
        end: 122,
      },
      {
        num: 5,
        name: 'Mayo',
        days: 31,
        start: 122,
        end: 153,
      },
      {
        num: 6,
        name: 'Junio',
        days: 30,
        start: 153,
        end: 183,
      },
      {
        num: 7,
        name: 'Julio',
        days: 31,
        start: 183,
        end: 214,
      },
      {
        num: 8,
        name: 'Agosto',
        days: 31,
        start: 214,
        end: 245,
      },
      {
        num: 9,
        name: 'Septiembre',
        days: 30,
        start: 245,
        end: 275,
      },
      {
        num: 10,
        name: 'Octubre',
        days: 31,
        start: 275,
        end: 306,
      },
      {
        num: 11,
        name: 'Noviembre',
        days: 30,
        start: 306,
        end: 336,
      },
      {
        num: 12,
        name: 'Diciembre',
        days: 31,
        start: 336,
        end: 367,
      },
    ],
    selectedDay: 0,
    dataQuery:[],
  }),
  async created(){
    await this.obtenerDatos();
  },
  mounted() {
    this.calcularDia(new Date().getMonth() + 1);
    // this.filtrarXfechas();
    // console.log(this.seleccionado);
    // this.ganttFiltradaFecha();
  },
  methods: {
    calcularDia(value) {
      this.months.find((mes) => {
        if (mes.num === value) {
          this.selectedDay = mes.start + (new Date().getDate() - 2);
          return this.selectedDay;
        }
      });
    },
    filtrarDatos(id) {
      this.cliente = id;
    },
    UID(){
      return '_' + Math.random().toString(36).substr(2, 9);
    },
    dateToNumber(date){
    let dateNumber = 0
    let numeroAsumar = 0
    let  arrayDate = date.split("-")
    arrayDate.shift()
    switch(arrayDate[0]){
        case '01':
            numeroAsumar = 0
        break
        case '02':
            numeroAsumar = 31
        break
        case '03':
            numeroAsumar = 59
        break
        case '04':
            numeroAsumar = 90
        break
        case '05':
            numeroAsumar = 120
        break
        case '06':
            numeroAsumar = 151
        break
        case '07':
            numeroAsumar = 181
        break
        case '08':
            numeroAsumar = 212
        break
        case '09':
            numeroAsumar = 243
        break
        case '10':
            numeroAsumar = 273
        break
        case '11':
            numeroAsumar = 304
        break
        case '12':
            numeroAsumar = 334
        break
    }
    dateNumber =  parseInt(arrayDate[1]) + numeroAsumar
    return dateNumber
    },
    transformarItems(items){
        let item = {}
        let innerItem = {}
        // let obj = {}
        for(item in items){
          for(innerItem in items[item]){
            let idObj = items[item][innerItem][0]['Índice']
            let cliente_idVar = items[item][innerItem][0]['Cliente (from Nombre Hito)'][0]
            let descriptionObj1 = `${items[item][innerItem][0]['Name (from Proyecto) 2 (from Nombre Hito)']} (${items[item][innerItem][0]['Name (from Cliente) (from Proyecto) (from Nombre Hito)']})`
            let startVar =  this.dateToNumber(`${items[item][innerItem][0]['Inicio (from Id Asignacion)']}`)
            let endVar = (this.dateToNumber(`${items[item][innerItem][0]['Termino (from Id Asignacion)']}`)+1)
            let porcentajeVar = `${items[item][innerItem][0]['Porcentaje']}`
            console.log(porcentajeVar)
            // console.log('en inner item')
            // console.log(items[item][innerItem])
            let obj = {
            id: idObj,
            cliente_id: cliente_idVar,
            description: descriptionObj1,
            color: '#015a99',
            start: startVar,
            end: endVar,
            sub_sections: []
            }
            // let obj2 = {
            //   id: 2,
            //   name: 'Asignación real',
            //   items: [
            //     {
            //       id: idObj,
            //       description: descriptionObj1,
            //       color: 'rgba(95, 174, 231, 0.8)',
            //       start: startVar,
            //       end: endVar
            //     }
            //   ]
            // }
            // let obj3 = {
            //   id: 3,
            //   name: 'Pago',
            //   items: [
            //     {
            //       id: idObj,
            //       cliente_id: cliente_idVar,
            //       description: descriptionObj1,
            //       color: '#85BB40',
            //       start: startVar,
            //       end: endVar,
            //       sub_sections: [
            //         {
            //           id: 1,
            //           porcentaje: this.formatoPago(porcentajeVar),
            //           description: descriptionObj1,
            //           start:startVar,
            //           end: endVar,
            //           sub_sections:[
            //             {
            //               id:idObj,
            //               description:descriptionObj1,
            //               color: '#57930A',
            //               start:startVar,
            //               end:endVar
            //             }
            //           ]
            //         }
            //       ]
            //     }
            //   ]
            // }
          // console.log(obj)
          // console.log("obj 2") 
          // console.log(obj2)
          // console.log("obj 3") 
          // console.log(obj3)
          // let longObj = [
          //   {obj},{obj2},{obj3}
          // ]
          items[item][innerItem] = obj
          // console.log(longObj)
          // items[item][innerItem] = obj2
          // items[item][innerItem] = obj3
          }
          
          
          // console.log(obj)
          // items[item][innerItem][0] = obj
        }
      },
      transformarPagos(items){
        let item = {}
        let innerItem = {}
        // let arreglo = []
        // let obj = {}
        for(item in items){
          for(innerItem in items[item]){
            let idObj = items[item][innerItem][0]['Índice']
            let cliente_idVar = items[item][innerItem][0]['Cliente (from Nombre Hito)'][0]
            let descriptionVar = `${items[item][innerItem][0]['Name (from Proyecto) 2 (from Nombre Hito)']} (${items[item][innerItem][0]['Name (from Cliente) (from Proyecto) (from Nombre Hito)']})`
            let colorVar = '#85BB40'
            let startVar =  this.dateToNumber(`${items[item][innerItem][0]['Inicio (from Id Asignacion)']}`)
            let endVar = (this.dateToNumber(`${items[item][innerItem][0]['Termino (from Id Asignacion)']}`)+1)
            let porcentajeVar = `${items[item][innerItem][0]['Porcentaje']}`
            // arreglo.push(items[item][innerItem][0]['Porcentaje'])
            let obj = {
              id: idObj,
              cliente_id: cliente_idVar,
              description: descriptionVar,
              color: colorVar,
              start: startVar,
              end:endVar,
              sub_sections:[
                {
                  id:this.formatoPago(porcentajeVar)

                }
              ]
            }
            items[item][innerItem] = obj
          }
        }
      },
    formatoPago(item){
      const porcentaje = [];
      for(let i = 0; i < item.length; i++){
          porcentaje.push(item);
      }
      return porcentaje;
    },
    formatoPorcentajes(start,end,porcentaje,index){
      // console.log("inicio:"+start)
      // console.log("final:"+end)
      let diasTotales = end - start
      let nroDivisiones = porcentaje.length
      let diasXseleccion = Math.round((diasTotales/nroDivisiones))
      // console.log('diasXseleccion')
      console.log("Total:"+diasTotales)
      console.log(`index: ${index}`)
      return diasXseleccion

    },

    async obtenerDatos() {
      const datosGantt = await useAir();
      this.dataQuery=datosGantt.arrayCompleto
      // this.filtrarXfechas();

      // Agrupar asignaciones de proyectos por cada desarrollador
      const asignaciones = datosGantt.arrayCompleto.reduce(
      // const asignaciones = this.filtrarXfechas().reduce(
        (acum, currValue) => {
          if (currValue['Name (from Persona) (from Id Asignacion)']) {
            acum[currValue['Name (from Persona) (from Id Asignacion)'][0]] = [
              ...(acum[
                currValue['Name (from Persona) (from Id Asignacion)'][0]
              ] || []),
              currValue,
            ];
          } else {
            acum['Sin Nombre'] = [...(acum['Sin Nombre'] || []), currValue];
          }
          return acum;
        },
        {}
      );



      // Agrupar proyectos por cada asignación
      // eslint-disable-next-line no-unused-vars
      const proyectos = (arr) => arr.reduce(
        (acum, currValue) => {
          if (currValue['Name (from Proyecto) 2 (from Nombre Hito)']) {
            acum[currValue['Name (from Proyecto) 2 (from Nombre Hito)'][0]] = [
              ...(acum[
                currValue['Name (from Proyecto) 2 (from Nombre Hito)'][0]
              ] || []),
              currValue,
            ];
          } else {
            acum['Sin Proyecto'] = [...(acum['Sin Proyecto'] || []), currValue];
          }
          return acum;
        },
        {}
      );


      // console.log({asignaciones})
      // console.log({proyectos})
      // const valores =  (value) => value
      const data = Object.entries(asignaciones).map(([key,value], index) => {
        return {
          id: index + 1,
          name:key,
          sections: [{
            id:index +1,
            name:"Asignacion",
            items:[
               {
                item:proyectos(value)
               }
            ]
          },{
            id: index+2,
            name: 'Asignación real',
            items:[
              {
                items:proyectos(value)
              }
            ]
          },{
            id:index+3,
            name:'Pago',
            items:[
              {
                items:proyectos(value)
              }
            ]
          }
          ]
        }
      });
      for(let i = 0; i < data.length; i++){
        // console.log('dentro del for')
        console.log(data[i].sections[1].items[0])
        this.transformarItems(data[i].sections[0].items[0])
        this.transformarItems(data[i].sections[1].items[0])
        console.log('pasando a tranformarPago')
        this.transformarPagos(data[i].sections[2].items[0])
      }

      this.dataGantt = {data}
      console.log({data})
    },
    dataFiltrada(items){
      const asignaciones = items.reduce(
      // const asignaciones = this.filtrarXfechas().reduce(
        (acum, currValue) => {
          if (currValue['Name (from Persona) (from Id Asignacion)']) {
            acum[currValue['Name (from Persona) (from Id Asignacion)'][0]] = [
              ...(acum[
                currValue['Name (from Persona) (from Id Asignacion)'][0]
              ] || []),
              currValue,
            ];
          } else {
            acum['Sin Nombre'] = [...(acum['Sin Nombre'] || []), currValue];
          }
          return acum;
        },
        {}
      );



      // Agrupar proyectos por cada asignación
      // eslint-disable-next-line no-unused-vars
      const proyectos = (arr) => arr.reduce(
        (acum, currValue) => {
          if (currValue['Name (from Proyecto) 2 (from Nombre Hito)']) {
            acum[currValue['Name (from Proyecto) 2 (from Nombre Hito)'][0]] = [
              ...(acum[
                currValue['Name (from Proyecto) 2 (from Nombre Hito)'][0]
              ] || []),
              currValue,
            ];
          } else {
            acum['Sin Proyecto'] = [...(acum['Sin Proyecto'] || []), currValue];
          }
          return acum;
        },
        {}
      );


      console.log({asignaciones})
      console.log({proyectos})
      // const valores =  (value) => value
      const data = Object.entries(asignaciones).map(([key,value], index) => {
        return {
          id: index + 1,
          name:key,
          sections: [{
            id:index +2,
            name:"Asignacion",
            items:[
               {
                item:proyectos(value)
               }
            ]
          }]
        }
      });
      for(let i = 0; i < data.length; i++){
        // console.log('dentro del for')
        // console.log(data[i].sections[0].items[0])
        this.transformarItems(data[i].sections[0].items[0])
      }
      
      this.datita = {data}
      console.log(this.datita)
      console.log('despues de asignar la datita')
    },
    filtrarXfechas(valor){
      console.log(valor)
      const datosGantt1 = this.dataQuery;
      let filtrado = []
      // console.log(valor)
      if(valor === undefined || valor === "undefined"){
        datosGantt1.forEach((element) => {
        if(element !== undefined && element !== "undefined"){
          filtrado.push(element);
        }
        return filtrado;
        
      });

      }else{
        datosGantt1.forEach((element) => {
        if(element !== undefined && element !== "undefined"){
          if(element['Inicio (from Id Asignacion)'] !== undefined && element['Inicio (from Id Asignacion)'] !== "undefined"){
            // if (element['Inicio (from Id Asignacion)'][0].includes(valor) && element['Inicio (from Id Asignacion)'][0] !== undefined && element['Inicio (from Id Asignacion)'][0] !== "undefined") {
              if (element['Termino (from Id Asignacion)'][0].includes(valor) && element['Inicio (from Id Asignacion)'][0].includes(valor)  && element['Inicio (from Id Asignacion)'][0] !== undefined && element['Inicio (from Id Asignacion)'][0] !== "undefined") {
                // console.log(element['Inicio (from Id Asignacion)'][0]);
                // Termino (from Id Asignacion)
              filtrado.push(element);
            }
          }
        }
        
        
        return filtrado;
        
        });
      }
      this.dataFiltrada(filtrado);
      
      console.log(filtrado);
    }
    
  },
  
};
</script>

<style scoped lang="scss">
$numDays: 365;

* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

.wrapper {
  overflow: auto;
  min-height: 100%;
  padding-bottom: 24px;
}
.body {
  position: relative;
  padding-bottom: 100px;
}

.margin-row {
  margin-bottom: 4px;

  &:last-child {
    margin-bottom: 0;
  }
}

.nombre-responsable {
  font-weight: bold !important;
  font-size: 12px !important;
  line-height: 16px !important;

  color: #7c7c7c !important;
}

.selected-day-line {
  position: absolute;
  width: 3px;
  height: calc(100% + 6px);
  background: #178adc;
  box-shadow: 0px 4px 4px rgb(0 0 0 / 25%);
  border-radius: 2px;
  margin-left: 6px;
  margin-top: -6px;
  z-index: 5;
}
.selected-day {
  background: #178adc;
  border-radius: 50%;
  width: 16px;
  height: 16px;
  justify-content: center;
  align-items: center;
  display: flex;
  color: white !important;
}

.filtros {
  display: flex;
  align-items: center;
  margin: 10px;
  font-family: Open Sans;
  font-weight: bold;
  font-size: 12px;
  line-height: 16px;
  /* identical to box height, or 133% */
  span {
    margin: 10px;
  }

  select {
    width: 222px;
    height: 40px;
    margin-right: 20px;
    align-items: center;
    text-align: right;
    color: #53565a;
    background: rgba(83, 86, 90, 0.05);
    border-radius: 10px;
    border-color: transparent;
    padding: 10px;
  }

  select:focus-visible {
    outline-offset: 0px;
    outline: none;
  }
}

.gantt {
  display: grid;
  position: relative;
  border: 0;
  box-sizing: border-box;

  &__wrapp {
    padding-bottom: 16px;
    z-index: 4;
  }
  &__row {
    display: grid;
    grid-template-columns: 140px 1fr;
    align-items: center;

    &--months {
      grid-template-columns: 140px repeat($numDays, 16px);
      .item {
        margin-left: 8px;
        margin-right: 8px;
        border-bottom: 1px dashed #c4c4c4;
        position: relative;
        padding-bottom: 4px;
      }
      .item-circle {
        position: absolute;
        width: 8px;
        height: 8px;
        left: -4px;
        top: calc(100% - 4px);
        background: #178adc;
        border-radius: 50%;
      }
      span {
        font-weight: bold;
        font-size: 14px;
        line-height: 20px;

        align-items: center;

        color: #53565a;
        margin-left: -4px;
      }
    }
    &--days {
      grid-template-columns: 140px repeat($numDays, 16px);
      .holiday {
        color: #c4c4c4 !important;
      }
      span {
        font-weight: normal;
        font-size: 8px;
        line-height: 20px;

        text-align: center;

        color: #53565a;

        &:first-child {
          margin-left: 4px;
        }
        &:last-child {
          margin-right: 4px;
        }
      }
    }

    &--lines {
      position: absolute;
      height: 100%;
      width: 100%;
      background-color: transparent;
      grid-template-columns: 140px repeat($numDays, 16px);
      align-items: stretch;
      margin-top: 2px;
      span {
        display: block;
        &.holiday-line {
          background-color: #dee5ea !important;
        }
        &:not(.gantt__row-first):nth-child(odd) {
          background: rgba(83, 86, 90, 0.05);
        }
      }
      &:after {
        grid-row: 1;
        grid-column: 0;
        background-color: #1688b345;
        z-index: 2;
        height: 100%;
      }
    }

    &-first {
      font-weight: normal;
      font-size: 12px;
      line-height: 20px;
      text-align: right;

      color: #53565a;

      margin-right: 8px;
    }

    &-border {
      border-bottom: 2px dotted #c4c4c4;
      z-index: 4;
    }

    &-bars {
      list-style: none;
      display: grid;
      padding: 0;
      margin: 0;
      grid-template-columns: repeat($numDays, 16px);
      z-index: 4;

      li {
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        grid-row: 1/2;

        background: #015a99;
        border-radius: 8px;

        padding: 8px 6px;

        margin-left: 8px;
        &:first-child {
          margin-left: 0;
        }

        span {
          font-weight: normal;
          font-size: 14px;
          line-height: 20px;

          color: #ffffff;

          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        }

        &:before,
        &:after {
          content: '';
          height: 100%;
          top: 0;
          z-index: 4;
          position: absolute;
          background-color: rgba(0, 0, 0, 0.3);
        }
        &:before {
          left: 0;
        }
        &:after {
          right: 0;
        }
      }
    }
  }
}
</style>
