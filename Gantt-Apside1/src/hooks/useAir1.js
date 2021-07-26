import { onMounted,ref} from "vue";


export function useAir1(url){
    let array = ref([])
    const arrayFiltrado=ref([]);
    const arrayFiltrado1=ref([]);
    // const arrayCompleto=ref([]);
     onMounted(async()=>{
        try {
            let swich = 0
            let ofset=""
            // console.log(url+`${array.value.offset}`)
            while(swich === 0 ){
                let res = await fetch(url+`${ofset}`);   
                let data = await res.json();
                array.value=data;
                ofset=array.value.offset
                array.value.records.forEach(element => {
                    if(element.fields["Name (from Contrapartes) (from Nombre Hito)"] !== undefined){
                        arrayFiltrado.value.push(element.fields["Name (from Contrapartes) (from Nombre Hito)"][0])
                        
                    }
                    
                });

                if(array.value.offset === undefined){
                    swich = 1
                    // console.log("sali")
                }
                // console.log("entre")              
            }
            // console.log(arrayFiltrado.value)
            arrayFiltrado1.value=arrayFiltrado.value.filter((el,index)=> arrayFiltrado.value.indexOf(el) === index)
            // console.log(arrayFiltrado1.value)
            // console.log(arrayCompleto.value)
        } catch (error) {
            console.log(error);
        }
    })
    return{array,arrayFiltrado1}

    // const array = ref([])
    // const arrayFiltrado=ref([]);
    // onMounted(async()=>{
    //     try {
    //         const res = await fetch(url);   
    //         const data = await res.json();
    //         array.value=data;
    //         // console.log(data.records)
    //         // console.log(array.value.records[0].fields["Name"]);

    //         data.records.forEach(element =>{
    //             arrayFiltrado.value.push(element.fields["Name"])
    //         })
    //         console.log(arrayFiltrado)

    //     } catch (error) {
    //         console.log(error);
    //     }
    // })
    // return{array,arrayFiltrado}
       
}