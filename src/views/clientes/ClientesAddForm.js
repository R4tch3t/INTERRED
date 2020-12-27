import React from "react";
import ReactDOM from 'react-dom';
import {
  PDFViewer,
  Page,
  Text,
  Document,
  Font,
  StyleSheet,
  View,
  Image
} from "@react-pdf/renderer";
import {
  MobileView,
  isMobile
} from "react-device-detect";
import ip from 'variables/ip';
import { MobilePDFReader } from "react-read-pdf";
import Button from "components/CustomButtons/Button.js";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import LogoI from "assets/img/INTERRED.jpg";
/*import LogoC from "../Icons/LOGOI.jpeg";
import marca from "../Icons/marcagua.png";
import LogoD from "../Icons/LOGOD.jpeg";
import cintillo from "../../assets/img/cintillo.jpeg";*/
import RobI from "../Typography/Roboto-Italic.ttf";
import RobB from "../Typography/Roboto-Bold.ttf";
import RobBI from "../Typography/Roboto-BoldItalic.ttf";
import CustomInput from "components/CustomInput/CustomInput";
import spellNumber from "views/Dashboard/spellNumber";
//import Calendar from "react-calendar";
import {Calendar} from "views/calendar"
import {addCliente, editCliente} from "./methods"
import WN from "@material-ui/icons/Warning"
//import spellNumber from "./spellNumber";
//import InformeM from "./InformeM";
// reactstrap components
import {
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Label,
  FormGroup,
  Input,
  Table,
  Row,
  Col,
} from "reactstrap";

Font.register({
  family: 'Roboto',
  fonts: [{
    src: RobI,
    fontStyle: 'italic',
    fontWeight: 50
  }, {
    src: RobB,
    fontWeight: 'bold'
  }, {
    src: RobBI,
    fontStyle: 'italic',
    fontWeight: 'bold'
  }]
  
});

class App extends React.Component {
  constructor(props){
    super(props);
    this.state={
     idCliente: props.idCliente,
     idRecibo: props.idRecibo,
     nombre: props.nombre,
     ubi: props.ubi,
     telefono: props.telefono,
     velocidad: "10 MEGAS",
     idVelocidad: 0,
     monto: 0,
     difDate: 0,
     bandSucces: false,
     setMsg: props.setMsg,
     setColor: props.setColor,
     bandEdit: props.bandEdit,
     fechaSI: props.fechaSI,
     fechaSF: props.fechaSF,
     fechaPago: props.fechaPago
    }
    
  }

  handdleUp=()=>{
    const nombre = document.getElementById("nombre").value;
    const ubi = document.getElementById("ubi").value;
    const telefono = document.getElementById("telefono").value;
    const {idVelocidad, monto, difDate, fechaSI, fechaSF, fechaPago} = this.state;
    const {bandEdit,idCliente} = this.state
    if(nombre&&telefono&&ubi){
      if(!bandEdit){
        addCliente(this,nombre,telefono,ubi,idVelocidad, monto, difDate, fechaSI, fechaSF, fechaPago);
      }else{
        editCliente(this,nombre,telefono,ubi,idVelocidad, monto, difDate, fechaSI, fechaSF, fechaPago);
      }
    }
  }
  handleUpper = e => {
    if (e.which === 32 || e.which > 39) {
      this.selectionStartNombre = e.target.selectionStart
      this.selectionEndNombre = e.target.selectionEnd
      e.target.value = e.target.value.toUpperCase()
      e.target.setSelectionRange(this.selectionStartNombre, this.selectionEndNombre);
    }else if(e.which===13){
      this.handdleUp()
    }
  }
  allClientes=async(cliente)=>{
    try {

       //const sendUri = "http://34.66.54.10:3015/";
       //const GenExpHTML = GenExpHTML
       const sendUri = `${ip("2000")}clientes/get`;
       // const sendUri = "http://localhost:3015/";
        //const sendUri = "http://192.168.1.74:3015/";
       const bodyJSON = {
         cliente: cliente,
         tipoB: 0
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
              console.log(`Response1:`)
              console.log(r)
            let data = [];
            if (r.clientes) {
             r.clientes.forEach(e => {
                //setNombre(e.cliente);
                //setTelefono(e.telefono);
               //setUbi(e.ubi);
               const nombre = document.getElementById("nombre");
               const telefono = document.getElementById("telefono");
               const ubi = document.getElementById("ubi");
               nombre.value=e.cliente;
               telefono.value=e.telefono;
               ubi.value=e.ubi;
               const idVelocidad = e.ultimoRecibo?e.ultimoRecibo.idVelocidad:e.ultimoRecibo;//e.idVelocidad;
               let velocidad = "10 MEGAS"
               const monto=e.ultimoRecibo?e.ultimoRecibo.monto:e.ultimoRecibo;
               const difDate=e.ultimoRecibo?e.ultimoRecibo.difDate:e.ultimoRecibo;
               const fechaPago=e.ultimoRecibo?e.ultimoRecibo.fechaPago:e.ultimoRecibo;
               const fechaSI=e.ultimoRecibo?e.ultimoRecibo.dateI:e.ultimoRecibo;
               const fechaSF=e.ultimoRecibo?e.ultimoRecibo.dateF:e.ultimoRecibo;
               const idRecibo=e.ultimoRecibo?e.ultimoRecibo.idRecibo:e.ultimoRecibo;
               document.getElementById("pagar").value=monto;
               switch(idVelocidad){
                  case 1:
                    velocidad="20 MEGAS"
                    break;
                  case 2:
                    velocidad="30 MEGAS"
                    break;
                  default:break;
               }
               this.setState({nombre: e.cliente,telefono: e.telefono, ubi: e.ubi, idVelocidad, velocidad, monto, difDate, fechaPago,fechaSI,fechaSF,idRecibo});
                /*data.push({
                  key: e.idCliente,
                  cliente: e.cliente,
                  telefono: e.telefono,
                  ubi: e.ubi,
                  fechaPago: null,
                  fechaDePago:  e.ultimoRecibo?e.ultimoRecibo.fechaPago:e.ultimoRecibo,
                  monto: null,
                  montor: e.ultimoRecibo?e.ultimoRecibo.monto:e.ultimoRecibo,
                  idVelocidad: e.ultimoRecibo?e.ultimoRecibo.idVelocidad:e.ultimoRecibo,
                  velocidad: e.ultimoRecibo?e.ultimoRecibo.velocidad:e.ultimoRecibo,
                  expiro: e.expiro,
                  refRow: React.createRef(),
                  dateSI:  e.ultimoRecibo?e.ultimoRecibo.dateI:e.ultimoRecibo,
                  dateSF:  e.ultimoRecibo?e.ultimoRecibo.dateF:e.ultimoRecibo,
                  difDate:  e.ultimoRecibo?e.ultimoRecibo.difDate:e.ultimoRecibo,
                  idRecibo:  e.ultimoRecibo?e.ultimoRecibo.idRecibo:e.ultimoRecibo,
                  
                });
                console.log(data) 
                if(e.expiro){
                  this.expiro=1;
                  data[data.length-1].fechaPago=<div  >
                  <GenExpHTML c={this} refRow={data[data.length-1].refRow}  /> 
                  <i style={{color: 'red'}} >{data[data.length-1].fechaDePago}</i>
                  </div>
                  data[data.length-1].monto=<><i style={{color: 'red'}} >{data[data.length-1].montor}</i></>
                //  data[data.length-1].velocidad=<i style={{color: 'red'}} >{data[data.length-1].velocidad}</i>
                }*/

             })

            }
            
        });
    } catch (e) {
        console.log(`Error: ${e}`);
    }
}
setTotal=(t,idV,v)=>{
    let {difDate} = this.state
    difDate = difDate==="undefined"?1:difDate
    console.log(`difDate: ${difDate}`)
    const monto = t * difDate
      
    
    console.log(monto)
    //c.setState({pagar})
    //console.log(difDate)
    this.setState({idVelocidad: idV,velocidad: v,monto})
}
componentDidMount(){
  const {bandEdit,idCliente} = this.state
  if(bandEdit){
    this.allClientes(idCliente);
  }
}

  render() {
    const {classes} = this.props
    const {nombre,telefono, ubi,bandSucces,bandEdit,velocidad,monto} = this.state
    const labelB = bandEdit?"ACTUALIZAR CLIENTE":"REGISTRAR CLIENTE";
    return (
      <CardIcon>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardBody>
              <React.Fragment>
                  <GridContainer>
                    
                  <GridItem xs={12} sm={12} md={3}>
                  
                      <CustomInput
                        labelText="NOMBRE:"
                        id="nombre"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: "text",
                          //value: nombre,
                          defaultValue: nombre,
                          //onBlur: this.handdleU
                          onKeyUp: this.handleUpper,
                          //onMouseUp: this.handdleU
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3}>
                      <CustomInput
                        labelText="TELEFONO:"
                        id="telefono"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: "text",
                          defaultValue: telefono,
                          //onBlur: this.handdleU
                          onKeyUp: this.handleUpper,
                          //onMouseUp: this.handdleU
                        }}
                      />
                    </GridItem>
                    
                    <GridItem xs={12} sm={12} md={3}>
                      <CustomInput
                        labelText="UBICACIÓN:"
                        id="ubi"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: "text",
                          defaultValue: ubi,
                          //onBlur: this.handdleU
                          onKeyUp: this.handleUpper,
                          //onMouseUp: this.handdleU
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3}>
                    <UncontrolledDropdown style={{position: 'relative', left: 0}}>
                      <DropdownToggle
                          caret
                          className="btn-icon"
                          color="link"
                          data-toggle="dropdown"
                          type="button"
                          style={{width: 90}}
                        >
                        VELOCIDAD: 
                        </DropdownToggle>
                        <DropdownToggle
                          caret
                          className="btn-icon"
                          color="link"
                          data-toggle="dropdown"
                          type="button"
                        >
                          <i className="tim-icons icon-settings-gear-63" />
                        </DropdownToggle>
                        <DropdownMenu aria-labelledby="dropdownMenuLink" left>
                          <DropdownItem
                           // href="#pablo"
                           style={{cursor: 'pointer'}}
                            onClick={e => {
                              /*let difDate = 0
                              let pagar = 0;
                              const {fechaSI, fechaSF} = this.state
                              const dateA = new Date(fechaSI);
                              const dateB = new Date(fechaSF);
                              //const {idVelocidad} = this.state;
                              while(dateA<dateB){
                                dateA.setMonth(dateA.getMonth()+1);
                                difDate++;
                              }*/
                              this.setTotal(150,0,e.target.innerHTML)
                            
                            }}
                          >
                            10 MEGAS
                          </DropdownItem>
                          <DropdownItem
                           // href="#pablo"
                           style={{cursor: 'pointer'}}
                            onClick={e => {
                              this.setTotal(250,1,e.target.innerHTML)
                            }}
                          >
                            20 MEGAS
                          </DropdownItem>
                          <DropdownItem
                           // href="#pablo"
                           style={{cursor: 'pointer'}}
                            onClick={e => {
                              this.setTotal(300,2,e.target.innerHTML)
                            
                            }}
                          >
                            30 MEGAS
                          </DropdownItem>
                        </DropdownMenu>
                        <div style={{height: 7}} />
                        {velocidad}
                      </UncontrolledDropdown>
                  
                    </GridItem>
                    </GridContainer>
                    <GridContainer>
                    <GridItem xs={12} sm={12} md={5}>
                      <h4 className={classes.cardTitleBlack}>
                        PERIODO DE SUBSCRIPCIÓN:
                      </h4>
                      
                       <Calendar c={this} />
                      
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3}>
                      <CustomInput
                        labelText="A PAGAR:"
                        id="pagar"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: "number",
                          defaultValue: monto!=="undefined"?monto:150
                          //value: monto!=="undefined"?monto:150
                          //onBlur: this.handdleU
                          //onKeyUp: this.handleUpper,
                          //onMouseUp: this.handdleU
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                      <h4 id="fechaPagoH" className={classes.cardTitleBlack}>
                        FECHA DE PAGO:
                      </h4>
                      
                       <Calendar c={this} bandRange={true} />
                      
                    </GridItem>
                    </GridContainer>
                    <div style={{height: 400}} ></div>
                    <GridContainer>
                    <Button id='btnAddC' color="success" 
                      style={{
                        display: "flex",
                        flex: 1,
                        alignItems: "center"
                      }} 
                      onClick={this.handdleUp}
                      disabled={bandSucces}
                      >
                        {labelB}
                      </Button>
                  </GridContainer>
                  
                    </React.Fragment>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </CardIcon>
    );
  }
}
export default App;