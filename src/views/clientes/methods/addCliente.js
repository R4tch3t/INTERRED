import ip from "variables/ip"
export default async (c,nombre,telefono,ubi) => {
    try{
        c.setState({bandSucces: true});
    const {setMsg,setColor} = c.state
    const sendUri = `${ip("2000")}clientes/addCliente`;
    const bodyJSON = {
          nombre,telefono,ubi
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
        setMsg("El Cliente se registró con éxito...")
        setColor("success")
            if(r.exito){
                c.setState({bandSucces: false});
            }
    });
    }catch(e){
        console.log(e)
    }
}