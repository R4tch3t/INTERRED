import ip from "variables/ip"
export default async (c, nombre, ubi, monto, fechaPago, fechaSI, fechaSF) => {
    try{
    const {idCliente,difDate} = c.state
    const sendUri = `${ip("2000")}clientes/genRecibo`;
    /*const dateA = new Date(fechaSI)
    const dateB = new Date(fechaSF)
    let difDate = 0;
    while(dateA<dateB){
        dateA.setMonth(dateA.getMonth()+1)
        difDate++
    }*/
    
    console.log(difDate)
    console.log("cDate: "+difDate)
   // if()
    //difDate = (new Date(fechaSI).getMonth()+1) - (difDate.getMonth()+1)
      
    const bodyJSON = {
          idCliente: idCliente,
          ubi,
          monto,
          fechaPago, 
          dateI: fechaSI,
          dateF: fechaSF,
          difDate

    }
    const response = await fetch(sendUri, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(bodyJSON)
    });

    const responseJson = await response.json().then(r => {
        //alert(r.exito)
            if(r.exito){
                c.setState({nombre, ubi, pagar:monto,fechaPago, fechaSI, fechaSF});
            }
    });
    }catch(e){
        console.log(e)
    }
}