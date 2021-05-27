import React, { useState } from 'react'
import { es } from 'date-fns/locale'
import { DateRangePicker, START_DATE, END_DATE, DatePicker } from 'react-nice-dates'
import 'react-nice-dates/build/style.css';
import toSpanishDate from 'views/calendar/toSpanishDate'

export default function DateRangePickerExample(props) {
  const {c,bandRange} = props
  const [startDate, setStartDate] = useState()
  const [endDate, setEndDate] = useState()
  const [date, setDate] = useState();
  c.dateSI=startDate
  c.dateSF=endDate
  
  //console.log(startDate)
  if(bandRange)
  return(
    <DatePicker
      date={date} onDateChange =
      {
        (date)=>{
        
          if(c.bandWrappCalendar){
            const {fechaSI, fechaSF, monto, difDate, velocidad, television, bandLock} = c.state
            c.state.fechaPago=date;          
            c._setState({fechaSI, fechaSF, monto, difDate, velocidad, television, bandLock});
          }else{
            c.setState({fechaPago: date});
          }
          setDate(date);
        
        }
    }
      format='dd MMM yyyy'
      locale={es}
    >
      {({ inputProps, focused }) => (
        <input
          className={'input' + (focused ? ' -focused' : '')}
          {...inputProps}
          value={c.state.fechaPago!=="undefined"?(toSpanishDate(c.state.fechaPago+"")):(date?toSpanishDate(date+""):"")}
          onMouseUp={()=>{
            const fechaPagoH = document.getElementById("fechaPagoH");
            const calendar = fechaPagoH.nextElementSibling.firstChild.nextElementSibling;
            
            calendar.style.position='absolute'
            calendar.style.right=0
          }}
          style={stylesCell.inputBox}
          disabled={c.state.bandLock}
        />
      )}
    </DatePicker>
  )
  else
  return (
    <DateRangePicker
      startDate={startDate}
      endDate={endDate}
      onStartDateChange={(date)=>{
        //const pagarH = document.getElementById("pagar")
        //pagarH.value="250"
        //c.setState({pagar: 250})
        //c.setState({fechaSI: date})
        if(c.bandWrappCalendar){
          c.state.fechaSI = date;

        }
        setStartDate(date);
      }}
      onEndDateChange={(date)=>{
        let difDate = 0
        let pagar = 0;
        const dateA = new Date(startDate);
        const dateB = new Date(date);
        const {idCliente,velocidad,television,monto} = c.state;
        let vel = "";
        while(dateA<dateB){
          dateA.setMonth(dateA.getMonth()+1);
          difDate++;
        }
     //   console.log(`idVelocidad: ${idVelocidad}`)
        /*switch(idVelocidad){
          case 1: 
            pagar = 250 * difDate;
            vel="20 MEGAS";
          break;
          case 2: 
            pagar = 300 * difDate
            vel="30 MEGAS";
          break;
          default:
            pagar = 150 * difDate
            vel="10 MEGAS";
          break
        }*/
        //pagar = velocidad * difDate;
        //const monto = pagar
        if(c.bandWrappCalendar){
          //          document.getElementById(`row.velocidad[${idCliente}]`).innerHTML=vel;
          document.getElementById(`row.monto[${idCliente}]`).innerHTML=monto;
          c.state.velocidad=vel;
          //          const { fechaSF, idVelocidad, bandLock} = v
          const fechaSI = startDate;
          const fechaSF = date;
          const v = {fechaSI, fechaSF, monto, difDate, velocidad, television, bandLock:false}
          c._setState(v);
        }else{
          c.setState({monto,difDate,fechaSI: startDate, fechaSF: date});
        }
      //  console.log(c.state.fechaSI)
       // console.log(c.state.fechaSF)
       // console.log(date)
        setEndDate(date);
      }}
      //minimumDate={new Date()}
      //minimumLength={1}
      format='dd MMM yyyy'
      locale={es}
    >
      {({ startDateInputProps, endDateInputProps, focus }) => (
        <div className='date-range'>
          {<input
            className={'input' + (focus === START_DATE ? ' -focused' : '')}
            {...startDateInputProps}
            placeholder='Fecha inicial'
            style={stylesCell.inputBoxTop}
            value={c.state.fechaSI!=="undefined"?toSpanishDate(c.state.fechaSI):(startDate?toSpanishDate(startDate):"")}
            disabled={c.state.bandLock}
          />}
           {">"}
          <input
            className={'input' + (focus === END_DATE ? ' -focused' : '')}
            {...endDateInputProps}
            placeholder='Fecha final'
            style={stylesCell.inputBox}
            value={c.state.fechaSF!=="undefined"?toSpanishDate(c.state.fechaSF):(endDate?toSpanishDate(endDate):"")}
            disabled={c.state.bandLock}
          />
        </div>
      )}
    </DateRangePicker>
  )
}

const stylesCell={
  inputBox: {
    borderRadius: 10, 
    textAlign:'center', 
    boxShadow: "4px 4px 2px 1px rgba(1, 1, 1, 0.2)",  
    borderWidth: '1px 0px 0px 0px',   
    borderColor: 'black', 
    elevation: 2, 
    backgroundColor: 'transparent'
  },
  inputBoxTop: {
    marginBottom: 10,
    borderRadius: 10, 
    textAlign:'center', 
    boxShadow: "4px 4px 2px 1px rgba(1, 1, 1, 0.2)",  
    borderWidth: '1px 0px 0px 0px',   
    borderColor: 'black', 
    elevation: 2, 
    backgroundColor: 'transparent'
  }
}