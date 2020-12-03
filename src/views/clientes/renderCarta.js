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
//import spellNumber from "./spellNumber";
//import InformeM from "./InformeM";

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
  state = { url: null , dia: null, mes: null, año: null, renderPDF: null};
  constructor(props){
    super(props);
    const d = new Date();
    this.state={
      url:null,
      dia: d.getDate(),
      mes: d.getMonth(),
      año: d.getFullYear(),
      urbanoI: 0,
      CTA: props.CTA,
      nombre: props.nombre,
      ubi: props.ubi,
      tp: props.tp,
      añoI: props.añoI,
      añoF: props.añoF,
      totalA: spellNumber(parseInt(props.añoF) - parseInt(props.añoI)).replace('PESOS', '').replace('PESO', '')
    }
    
  }


  onRender = ({ blob }) => {
    this.setState({ url: URL.createObjectURL(blob) });
    console.log(blob)
    console.log(isMobile)
    if (isMobile){
      let pdfview = document.getElementById("pdfView");
      let mobilePdf = document.getElementById('mobilePdf');
      let h = window.devicePixelRatio<2?960:360 //window.screen.availHeight;
      mobilePdf.style.height=`${h}px`;
      pdfview.style.display='none';
      ReactDOM.unmountComponentAtNode(mobilePdf)
      ReactDOM.render(<MobilePDFReader url={this.state.url} />, mobilePdf);
    }
  };
  
  handdleUp = (e) => {
    const añoI = document.getElementById('añoI').value
    const añoF = document.getElementById('añoF').value
    const totalA = spellNumber(parseInt(añoF) - parseInt(añoI)).replace('PESOS', '').replace('PESO', '')
    const ubi = document.getElementById('ubi').value

    this.setState({ubi, añoI, añoF, totalA})
  }

  handdleU = (e) => {
    const ubi = document.getElementById('ubi').value
    this.setState({ubi})
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

  handleUpperN = e => {
    if (e.which === 13) {
      this.handdleUp()
    }
  }
  componentDidMount(){
   // InformeM(this.props.dateSI, this.props.dateSF, this)
  }

  styles = StyleSheet.create({
    logoI: {
      position: "absolute",
      width: 125,
      height: 125,
      left: 20,
      top: 20
    },
    logoC: {
      position: "absolute",
      width: 150,
      height: 50,
      left: 230,
      top: 40
    },
    logoD: {
      position: "absolute",
      width: 125,
      height: 50,
      right: 15,
      top: 30
    },
    logoB: {
      position: "absolute",
      width: 600,
      opacity: 0.7,
      height: 500,
      left: 40,
      top: 150
    },
    cintillo: {
      position: "absolute",
      width: '95%',
      height: 30,
      right: 15,
      left: 15,
      bottom: 60
    },
    headV: {
      textAlign: 'left',
      top: 20,
      left: 160
    },
    headT: {
      fontFamily: "Roboto",
      fontWeight: 'bold',
      color: "white",
      left: 230,
      top: 70,
      paddingLeft: 40,
      backgroundColor: 'black',
      width: 170
    },
    headO: {
      fontFamily: "Roboto",
      fontWeight: 'bold',
    },
    labelR: {
      fontFamily: "Roboto",
      fontStyle: 'italic',
      fontWeight: 'bold'
    },
    table: { 
      position:'relative',
      display: "table", 
      width: "40%", 
      left: 30,
      top: 30,
      borderStyle: "solid", 
      borderWidth: 1, 
      borderRightWidth: 0, 
      borderBottomWidth: 0 
    },
    tableRow: { 
      margin: "auto",
      height: 20, 
      flexDirection: "row" 
    }, 
    tableCol: { 
      width: "100%", 
      borderStyle: "solid", 
      borderWidth: 0.5, 
      borderLeftWidth: 0, 
      borderTopWidth: 0 
    },
    tableCol2: {
      width: "50%",
      borderStyle: "solid",
      borderWidth: 1,
      borderLeftWidth: 0,
      borderTopWidth: 0
    },
    tableCol3: {
      width: "50%",
      borderStyle: "solid",
      borderWidth: 1,
      borderLeftWidth: 0,
      borderTopWidth: 0
    },
    tableCell: { 
      marginLeft: 0, 
      marginTop: 2,
      marginBottom: 1,
      fontSize: 8,
      textAlign: 'center',
      paddingVertical: 3
    },
    tableCell2: { 
      marginLeft: 0, 
      marginTop: 2,
      marginBottom: 1,
      fontSize: 6,
      textAlign: 'center',
      paddingVertical: 3
    }

  });

  render() {
    const {classes} = this.props
    const {dia, CTA, nombre, ubi, tp, mes, año, añoI, añoF, totalA} = this.state
    const nDoc = `CARTA_INVITACION_CTA_${CTA}_${dia}_${mes}_${año}`

    return (
      <CardIcon>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardBody>
              <React.Fragment>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={5}>
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
                      <CustomInput
                        labelText="AÑO INICIAL:"
                        id="añoI"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: "number",
                          defaultValue: añoI,
                          onKeyUp: this.handleUpperN,
                         // onMouseUp: this.handdleUp
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3}>
                      <CustomInput
                        labelText="AÑO FINAL:"
                        id="añoF"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: "number",
                          defaultValue: añoF,
                          onKeyUp: this.handleUpperN,
                         // onMouseUp: this.handdleUp
                        }}
                      />
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <Button color="primary" 
                      style={{
                        display: "flex",
                        flex: 1,
                        alignItems: "center"
                      }} 
                      onClick={this.handdleUp}
                      >
                        Cargar DATOS
                      </Button>
                  </GridContainer>
                  <GridContainer>
                    <a style={{color: 'white',
                      display: "flex",
                      flex: 1,
                      alignItems: "center"}} href={this.state.url} download={`${nDoc}.pdf`}>  
                      <Button color="success" 
                      style={{
                        display: "flex",
                        flex: 1,
                        alignItems: "center"
                      }} >
                        Descargar PDF
                      </Button>
                    </a>  
                  </GridContainer>  
                  <MobileView>
                    <div id='mobilePdf' style={{ position: 'relative', top: 20, width: '100%' }} ></div>
                    
                  </MobileView>

                  <PDFViewer id='pdfView' style={{ width: '100%', height: 1180 }}  >
                  <Document shallow onRender={this.onRender} title={`${nDoc}.pdf`} >
                    <Page size="letter" wrap>
                      <Image src={LogoI} style={this.styles.logoI} />
                      <View style={this.styles.headV} >
                        <Text style={[this.styles.headO,{position: "relative", top: 10, fontSize: 10}]} >
                          INTERRED
                        </Text>
                        <Text style={[this.styles.headO,{position: "relative", top: 10, fontSize: 10}]} >
                          INTERNET POR CABLE E INALAMBRICO
                        </Text>
                        <Text style={[{position: "absolute", top: 10, left: 220, fontSize: 7}]} >
                          CORREO ELECTRÓNICO: CASMORNEZA@GMAIL.COM 
                        </Text>
                        <Text style={[{position: "absolute", top: 20, left: 220, fontSize: 7}]} >
                          DIRECCIÓN: CALLE DEL CAMPESINO S/N.
                        </Text>
                        <Text style={[{position: "absolute", top: 30, left: 220, fontSize: 7}]} >
                          COLONIA EMILIANO ZAPATA.
                        </Text>
                        
                      </View>
                     <View style={this.styles.headT} >
                      <Text style={[{ fontSize: 12}]} >
                          RECIBO DE PAGO
                      </Text>
                     </View>
                     <View style={[this.styles.table, {top: 75, left: 320}]}> 
                        <View style={this.styles.tableRow}> 
                          <View style={[this.styles.tableCol,{width: '50%', borderColor: 'white', backgroundColor: 'black'}]}>  
                            <Text style={[this.styles.tableCell,this.styles.headO,{paddingVertical: 2, color: 'white'}]}>RECIBO NÚMERO</Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '50%', borderColor: 'white', backgroundColor: 'black'}]}>  
                            <Text style={[this.styles.tableCell,this.styles.headO,{paddingVertical: 2, color: 'white'}]}>FECHA DE PAGO</Text> 
                          </View> 
                        </View>
                        <View style={this.styles.tableRow}> 
                          <View style={[this.styles.tableCol,{width: '50%'}]}>  
                            <Text style={[this.styles.tableCell,this.styles.headO,{paddingVertical: 2}]}>0</Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '50%'}]}>  
                            <Text style={[this.styles.tableCell,this.styles.headO,{paddingVertical: 2}]}>12-11-03</Text> 
                          </View> 
                        </View>
                      </View>
                      <View style={[this.styles.table, {top: 85, left: 443, width: '20%'}]}> 
                        
                        <View style={this.styles.tableRow}> 
                          <View style={[this.styles.tableCol,{width: '50%'}]}>  
                            <Text style={[this.styles.tableCell,this.styles.headO,{paddingVertical: 2}]}>CANTIDAD:</Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '50%'}]}>  
                            <Text style={[this.styles.tableCell,this.styles.headO,{paddingVertical: 2, textAlign: 'left'}]}>$ 0</Text> 
                          </View> 
                        </View>
                      </View>  

                      <View style={[this.styles.table, {top: 100, left: 20, width: '90%'}]}> 
                        <View style={this.styles.tableRow}> 
                          <View style={[this.styles.tableCol,{width: '30%', borderColor: 'white', backgroundColor: 'black'}]}>  
                            <Text style={[this.styles.tableCell,this.styles.headO,{paddingVertical: 2, color: 'white', textAlign: 'left'}]}>NOMBRE DEL CLIENTE:</Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '70%'}]}>  
                            <Text style={[this.styles.tableCell,this.styles.headO,{paddingVertical: 2}]}></Text> 
                          </View> 
                        </View>
                        <View style={this.styles.tableRow}> 
                          <View style={[this.styles.tableCol,{width: '30%', borderColor: 'white', backgroundColor: 'black'}]}>  
                            <Text style={[this.styles.tableCell,this.styles.headO,{paddingVertical: 2, color: 'white', textAlign: 'left'}]}>UBICACIÓN:</Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '70%'}]}>  
                            <Text style={[this.styles.tableCell,this.styles.headO,{paddingVertical: 2}]}></Text> 
                          </View> 
                        </View>
                        <View style={this.styles.tableRow}> 
                          <View style={[this.styles.tableCol,{width: '30%', borderColor: 'white', backgroundColor: 'black'}]}>  
                            <Text style={[this.styles.tableCell,this.styles.headO,{paddingVertical: 2, color: 'white', textAlign: 'left'}]}>MENSUALIDAD A CUBRIR:</Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '70%'}]}>  
                            <Text style={[this.styles.tableCell,this.styles.headO,{paddingVertical: 2}]}></Text> 
                          </View> 
                        </View>
                      </View>
                      <View style={[this.styles.table, {top: 120, left: 20, width: '40%'}]}> 
                        
                        <View style={this.styles.tableRow}> 
                          <View style={[this.styles.tableCol,{width: '30%'}]}>  
                            <Text style={[this.styles.tableCell,this.styles.headO,{paddingVertical: 2}]}>RECIBIDO POR:</Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '70%'}]}>  
                            <Text style={[this.styles.tableCell,this.styles.headO,{paddingVertical: 2, textAlign: 'left'}]}></Text> 
                          </View> 
                        </View>
                      </View>
                      <View style={[this.styles.headV, {top: 150, left: 20}]} >
                        <Text style={[this.styles.headO,{position: "relative", fontSize: 10, width: '90%'}]} >
                          Le recordamos realizar su pago, antes de su fecha límite, sí tu mensualidad se venció y no cuentas con el servicio, al realizar tu pago tendrá que esperar un aproximado de 24 horas para que su señal vuelva a reactivarse INTERRED AGRADECE TU PREFERENCIA Navega más rápido...............................................................................
                        </Text>
                        
                      </View>
                      <Image src={LogoI} style={[this.styles.logoI, {top: 400}]} />
                      <View style={[this.styles.headV, {top: 180}]} >
                        <Text style={[this.styles.headO,{position: "relative", top: 10, fontSize: 10}]} >
                          INTERRED
                        </Text>
                        <Text style={[this.styles.headO,{position: "relative", top: 10, fontSize: 10}]} >
                          INTERNET POR CABLE E INALAMBRICO
                        </Text>
                        <Text style={[{position: "absolute", top: 10, left: 220, fontSize: 7}]} >
                          CORREO ELECTRÓNICO: CASMORNEZA@GMAIL.COM 
                        </Text>
                        <Text style={[{position: "absolute", top: 20, left: 220, fontSize: 7}]} >
                          DIRECCIÓN: CALLE DEL CAMPESINO S/N.
                        </Text>
                        <Text style={[{position: "absolute", top: 30, left: 220, fontSize: 7}]} >
                          COLONIA EMILIANO ZAPATA.
                        </Text>
                        
                      </View>
                     <View style={[this.styles.headT,{top: 220}]} >
                      <Text style={[{ fontSize: 12}]} >
                          RECIBO DE PAGO
                      </Text>
                     </View>
                     <View style={[this.styles.table, {top: 225, left: 320}]}> 
                        <View style={this.styles.tableRow}> 
                          <View style={[this.styles.tableCol,{width: '50%', borderColor: 'white', backgroundColor: 'black'}]}>  
                            <Text style={[this.styles.tableCell,this.styles.headO,{paddingVertical: 2, color: 'white'}]}>RECIBO NÚMERO</Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '50%', borderColor: 'white', backgroundColor: 'black'}]}>  
                            <Text style={[this.styles.tableCell,this.styles.headO,{paddingVertical: 2, color: 'white'}]}>FECHA DE PAGO</Text> 
                          </View> 
                        </View>
                        <View style={this.styles.tableRow}> 
                          <View style={[this.styles.tableCol,{width: '50%'}]}>  
                            <Text style={[this.styles.tableCell,this.styles.headO,{paddingVertical: 2}]}>0</Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '50%'}]}>  
                            <Text style={[this.styles.tableCell,this.styles.headO,{paddingVertical: 2}]}>12-11-03</Text> 
                          </View> 
                        </View>
                      </View>
                      <View style={[this.styles.table, {top: 235, left: 443, width: '20%'}]}> 
                        
                        <View style={this.styles.tableRow}> 
                          <View style={[this.styles.tableCol,{width: '50%'}]}>  
                            <Text style={[this.styles.tableCell,this.styles.headO,{paddingVertical: 2}]}>CANTIDAD:</Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '50%'}]}>  
                            <Text style={[this.styles.tableCell,this.styles.headO,{paddingVertical: 2, textAlign: 'left'}]}>$ 0</Text> 
                          </View> 
                        </View>
                      </View>  

                      <View style={[this.styles.table, {top: 255, left: 20, width: '90%'}]}> 
                        <View style={this.styles.tableRow}> 
                          <View style={[this.styles.tableCol,{width: '30%', borderColor: 'white', backgroundColor: 'black'}]}>  
                            <Text style={[this.styles.tableCell,this.styles.headO,{paddingVertical: 2, color: 'white', textAlign: 'left'}]}>NOMBRE DEL CLIENTE:</Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '70%'}]}>  
                            <Text style={[this.styles.tableCell,this.styles.headO,{paddingVertical: 2}]}></Text> 
                          </View> 
                        </View>
                        <View style={this.styles.tableRow}> 
                          <View style={[this.styles.tableCol,{width: '30%', borderColor: 'white', backgroundColor: 'black'}]}>  
                            <Text style={[this.styles.tableCell,this.styles.headO,{paddingVertical: 2, color: 'white', textAlign: 'left'}]}>UBICACIÓN:</Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '70%'}]}>  
                            <Text style={[this.styles.tableCell,this.styles.headO,{paddingVertical: 2}]}></Text> 
                          </View> 
                        </View>
                        <View style={this.styles.tableRow}> 
                          <View style={[this.styles.tableCol,{width: '30%', borderColor: 'white', backgroundColor: 'black'}]}>  
                            <Text style={[this.styles.tableCell,this.styles.headO,{paddingVertical: 2, color: 'white', textAlign: 'left'}]}>MENSUALIDAD A CUBRIR:</Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '70%'}]}>  
                            <Text style={[this.styles.tableCell,this.styles.headO,{paddingVertical: 2}]}></Text> 
                          </View> 
                        </View>
                      </View>
                      <View style={[this.styles.table, {top: 275, left: 20, width: '40%'}]}> 
                        
                        <View style={this.styles.tableRow}> 
                          <View style={[this.styles.tableCol,{width: '30%'}]}>  
                            <Text style={[this.styles.tableCell,this.styles.headO,{paddingVertical: 2}]}>RECIBIDO POR:</Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '70%'}]}>  
                            <Text style={[this.styles.tableCell,this.styles.headO,{paddingVertical: 2, textAlign: 'left'}]}></Text> 
                          </View> 
                        </View>
                      </View>
                      <View style={[this.styles.headV, {top: 305, left: 20}]} >
                        <Text style={[this.styles.headO,{position: "relative", fontSize: 10, width: '90%'}]} >
                          Le recordamos realizar su pago, antes de su fecha límite, sí tu mensualidad se venció y no cuentas con el servicio, al realizar tu pago tendrá que esperar un aproximado de 24 horas para que su señal vuelva a reactivarse INTERRED AGRADECE TU PREFERENCIA Navega más rápido...............................................................................
                        </Text>
                        
                      </View>
                    </Page>
                  </Document>
                  </PDFViewer>
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