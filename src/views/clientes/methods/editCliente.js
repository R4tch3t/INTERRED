import ip from "variables/ip"
export default async (c,nombre,telefono,ubi,idVelocidad, monto, difDate, fechaSI, fechaSF, fechaPago) => {
    try{
        const {idCliente, idRecibo} = c.state;
        c.setState({bandSucces: true});

        const {setMsg, setColor} = c.state
        const sendUri = `${ip("2000")}clientes/editCliente`;
        const bodyJSON = {
          idCliente,idRecibo,nombre,telefono,ubi,idVelocidad, monto, difDate, fechaSI, fechaSF, fechaPago
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
            setMsg("")
            setMsg("El Cliente se actualizó con éxito...")
            setColor("success")
            if(r.exito){
                c.setState({bandSucces: false});
            }
        });
    }catch(e){
        console.log(e)
    }
}