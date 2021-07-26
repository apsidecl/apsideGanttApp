export const useAir = async () => {
  let array = [];
  let arrayFiltrado = [];
  let arrayFiltrado1 = [];
  let arrayCompleto = [];
  try {
    let swich = 0;
    let ofset = '';
    // console.log(url+`${array.value.offset}`)
    while (swich === 0) {
      let res = await fetch(
        `https://api.airtable.com/v0/appNA0tXvNNmYEmuM/tblbtRgd0nTCteORY?api_key=key7WdLNou7tR5fdR&maxRecords=1030&offset=${ofset}`
        // `https://api.airtable.com/v0/appNA0tXvNNmYEmuM/tblbtRgd0nTCteORY?api_key=key7WdLNou7tR5fdR&fields%5B%5D=Id+Asignacion+(from+Id+Asignacion)&fields%5B%5D=Inicio+(from+Id+Asignacion)&fields%5B%5D=Name+(from+Persona)+(from+Id+Asignacion)&fields%5B%5D=Name+(from+Proyecto)+2+(from+Nombre+Hito)&fields%5B%5D=Termino+(from+Id+Asignacion)&fields%5B%5D=Porcentaje&maxRecords=1030&offset=${ofset}`
      );
      let data = await res.json();
      array = data;
      ofset = array.offset;
      // console.log(array.records[0].fields['Inicio (from Id Asignacion)'][0].includes(2019))
      array.records.forEach((element) => {
        if(element.fields["Id Asignacion (from Id Asignacion)"] !== undefined ){
          // arrayCompleto.push(element.fields["Id Asignacion (from Id Asignacion)"],["Inicio (from Id Asignacion)"],["Termino (from Id Asignacion)"]);
          arrayCompleto.push(element.fields);
          // arrayCompleto.push(element.fields["Inicio (from Id Asignacion)"]);
          // arrayCompleto.push(element.fields["Termino (from Id Asignacion)"]);

        }
        [] 
      });
      // console.log(arrayCompleto)
      array.records.forEach((element) => {
        if (
          element.fields['Name (from Contrapartes) (from Nombre Hito)'] !==
          undefined
        ) {
          arrayFiltrado.push(
            element.fields['Name (from Contrapartes) (from Nombre Hito)'][0]
          );
        }
      });
      

      if (array.offset === undefined) {
        swich = 1;
      }
    }
    // eslint-disable-next-line no-const-assign
    arrayFiltrado1 = arrayFiltrado.filter(
      (el, index) => arrayFiltrado.indexOf(el) === index
    );
    // console.log(arrayCompleto);
    
  } catch (error) {
    console.log(error);
  }

  return { array, arrayFiltrado1, arrayCompleto };
};
