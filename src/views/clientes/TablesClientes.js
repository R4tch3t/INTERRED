import React from 'react';
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import MenuList from "@material-ui/core/MenuList";
import {isMobile} from "react-device-detect"; 
//import Accessibility from "@material-ui/icons/Accessibility";
//import BugReport from "@material-ui/icons/BugReport";
//import Code from "@material-ui/icons/Code";
//import Cloud from "@material-ui/icons/Cloud";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js"; 
import TableClientes from "components/Table/TableClientes.js";
import classNames from "classnames";
import Grow from "@material-ui/core/Grow";
import MenuItem from "@material-ui/core/MenuItem";
//import Tasks from "components/Tasks/Tasks.js";
//import CustomTabs from "components/CustomTabs/CustomTabs.js";
//import Danger from "components/Typography/Danger.js";
//import Card from "components/Card/Card.js";
//import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
//import CardBody from "components/Card/CardBody.js";
import CustomInput from "components/CustomInput/CustomInput.js";
//import Button from "components/CustomButtons/Button.js";
import Search from "@material-ui/icons/Search";
import Poppers from "@material-ui/core/Popper";
import ip from 'variables/ip';
import { Line, Bar } from "react-chartjs-2";

// reactstrap components
import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
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
  UncontrolledTooltip
} from "reactstrap";


export default class TableRender extends React.Component {
state={
    dataTable: [],
    classes: null,
    openDash: null,
    setOpenDash: null,
    labelB: null
}
tipoB = 1
handleCloseDash = () => {
 // setOpenDash(null);
 //const {setOpenDash} = this.state
 this.setState({openDash: null})
};
constructor(props){
    super(props);
    this.state = {
        dataTable: [],
        classes: props.classes,
        classesM: props.classesM,
        openDash: null,
        setOpenDash: null,
        labelB: 'NOMBRE'
    };
    
}

round = (num, decimales = 2)=>{
  var signo = (num >= 0 ? 1 : -1);
  num = num * signo;
  if (decimales === 0) //con 0 decimales
    return signo * Math.round(num);
  // round(x * 10 ^ decimales)
  num = num.toString().split('e');
  num = Math.round(+(num[0] + 'e' + (num[1] ? (+num[1] + decimales) : decimales)));
  // x * 10 ^ (-decimales)
  num = num.toString().split('e');
  return signo * (num[0] + 'e' + (num[1] ? (+num[1] - decimales) : -decimales));
}

allClientes=async(cliente)=>{
    try {

       //const sendUri = "http://34.66.54.10:3015/";
       const sendUri = `${ip("2000")}clientes/get`;
       // const sendUri = "http://localhost:3015/";
        //const sendUri = "http://192.168.1.74:3015/";
       const bodyJSON = {
         cliente: cliente,
         tipoB: this.tipoB
       }
        const response = await fetch(sendUri, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(bodyJSON)
        });
        console.log(bodyJSON)
        const responseJson = await response.json().then(r => {
              console.log(`Response1:`)
              console.log(r)
            let data = [];
            if (r.clientes) {
             r.clientes.forEach(e => {
                data.push({
                  key: `${e.idCliente}u`,
                  cliente: e.cliente,
                  telefono: e.telefono,
                  ubi: e.ubi,
                  fechaPago: e.fechaPago,
                  monto: e.monto,
                  velocidad: e.velocidad,
                })
             })

            }
            
            this.setState({dataTable: data});
            /*else if (r.error.name === "error01") {
                       this.removeCookies()
                       confirmAlert({
                         title: "¡Error!",
                         message: "La contraseña es incorrecta.",
                         buttons: [{
                           label: "Aceptar",
                           onClick: () => {
                             this.props.history.push("/entrar");
                           }
                         }]
                       });
                     }*/
        });
    } catch (e) {
        console.log(`Error: ${e}`);
    }
}

getParameterByName=(name, url) => {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url);
  if (!results) return '';
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}


changeDash = event => {
  const {openDash} = this.state;
  if (openDash && openDash.contains(event.target) ) {
    //setOpenDash(null);
    this.setState({openDash: null});
  } else {
    //setOpenDash(event.currentTarget);
    this.setState({openDash: event.currentTarget});
  }
}

handleClickDash = event => {
  this.changeDash(event);
};
selectionStartNombre = null
selectionEndNombre = null
handleUpper = e => {
  if(!isMobile){
    if (e.which === 32 || e.which > 39) {
      this.selectionStartNombre = e.target.selectionStart
      this.selectionEndNombre = e.target.selectionEnd
      e.target.value = e.target.value.toUpperCase()
      e.target.setSelectionRange(this.selectionStartNombre, this.selectionEndNombre);
    }
  }
  //if (e.target.value === '') {
    this.allClientes(e.target.value)
  //}
}

buscarCTA = (key) => (event) => {
  const CTAnombre = document.getElementById('CTANM').value;
  //const checkU = document.getElementById('check0');
  this.tipoB = key
  const labelB = key===0?'CTA':'NOMBRE'
  this.setState({labelB})
  //if (CTAnombre !== '') {
  this.allClientes(CTAnombre)    
 // }
}


componentDidMount(){
  this.allClientes('')
}

render() {
  const {
    dataTable,
    classes,
    classesM,
    openDash,
    labelB
  } = this.state;
  const headCells = [
    { id: 'cliente', numeric: false, disablePadding: true, label: 'Cliente' },
    { id: 'tel', numeric: false, disablePadding: false, label: 'Telefono' },
    { id: 'ubi', numeric: false, disablePadding: false, label: 'Ubicación del servicio' },
    { id: 'fechaPago', numeric: false, disablePadding: false, label: 'Fecha de pago' },
    { id: 'montoPagar', numeric: true, disablePadding: false, label: 'Monto a pagar' },
    { id: 'velocidad', numeric: false, disablePadding: false, label: 'Velocidad' },
   // { id: 'construccion', numeric: true, disablePadding: false, label: 'Construccion' },
  ]
  return (
   <>
        <div className="content">
   <Row>
            <Col xs="12">
              <Card>
               
                <CardBody>
                  <div >
                     <CustomInput
                      formControlProps={{
                        className: classes.margin + " " + classes.search
                      }}
                      id="CTANM"
                      inputProps={{
                        placeholder: labelB,
                        type: "text",
                        onKeyUp: this.handleUpper,
                        onMouseUp: this.handleUpper,
                        //value: idUsuario,

                        inputProps: {
                          "aria-label": "Search"
                        }
                      }}
                    />
                    <Button
                      color="white"
                      onClick={this.handleClickDash}
                      aria-label="edit"
                      aria-owns={openDash ? "profile-menu-list-grow" : null}
                      aria-haspopup="true"
                      justIcon
                      round
                    >
                      <Search />
                    </Button>
                    <Poppers
                      open={Boolean(openDash)}
                      anchorEl={openDash}
                      transition
                      disablePortal
                      className={
                        classNames({ [classesM.popperClose]: !openDash }) +
                        " " +
                        classesM.popperNav
                      }
                      style={{ zIndex: 9999 }}
                    >
                      {({ TransitionProps, placement }) => (
                        <Grow
                          {...TransitionProps}
                          id="profile-menu-list-grow"
                          style={{
                            transformOrigin:
                              placement === "bottom" ? "center top" : "center bottom"
                          }}
                        >
                          <Paper>
                            <ClickAwayListener onClickAway={this.handleCloseDash}>
                              <MenuList role="menu">
                                <MenuItem
                                  key={"cuenta"}
                                  className={classesM.dropdownItem}
                                  onClick={this.buscarCTA(0)}
                                >
                                  Por CTA.
                                </MenuItem>
                                <MenuItem
                                  key={"nombre"}
                                  className={classesM.dropdownItem}
                                  onClick={this.buscarCTA(1)}
                                >
                                  Por nombre
                                </MenuItem>
                              </MenuList>
                            </ClickAwayListener>
                          </Paper>
                        </Grow>
                      )}
                    </Poppers>
                  </div>
                  <TableClientes
                tableHeaderColor="warning"
                tableHead={headCells}
                tableData={dataTable}
              />
                </CardBody>
              </Card>
            </Col>
          </Row>
          </div>
          </>
  )
}

}