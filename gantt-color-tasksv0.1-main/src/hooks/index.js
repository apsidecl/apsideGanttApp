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
      );
      let data = await res.json();
      array = data;
      ofset = array.offset;
      array.records.forEach((element) => {
        if (element.fields !== undefined) {
          arrayCompleto.push(element.fields);
        }
      });
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
    
  } catch (error) {
    console.log(error);
  }

  return { array, arrayFiltrado1, arrayCompleto };
};
