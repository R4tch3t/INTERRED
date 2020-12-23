import React, { useState } from 'react'
import { es } from 'date-fns/locale'
import { DateRangePicker, START_DATE, END_DATE, DatePicker } from 'react-nice-dates'
import 'react-nice-dates/build/style.css'
export default function DateRangePickerExample(props) {
  const {c,bandRange} = props
  const [startDate, setStartDate] = useState()
  const [endDate, setEndDate] = useState()
  const [date, setDate] = useState();
  c.dateSI=startDate
  c.dateSF=endDate

  console.log(startDate)
  if(bandRange)
  return(
    <DatePicker
      date={date} onDateChange={(date)=>{
        c.setState({fechaPago: date});
        setDate(date);
        
      }}
      format='dd MMM yyyy'
      locale={es}
    >
      {({ inputProps, focused }) => (
        <input
          className={'input' + (focused ? ' -focused' : '')}
          {...inputProps}
          value={c.state.fechaPago!=="undefined"?c.state.fechaPago:(date?date:"")}
          onMouseUp={()=>{
            const fechaPagoH = document.getElementById("fechaPagoH");
            const calendar = fechaPagoH.nextElementSibling.firstChild.nextElementSibling;
            
            calendar.style.position='absolute'
            calendar.style.right=0
          }}
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
        const {idVelocidad} = c.state;
        while(dateA<dateB){
          dateA.setMonth(dateA.getMonth()+1);
          difDate++;
        }
        console.log(`idVelocidad: ${idVelocidad}`)
        switch(idVelocidad){
          case 1: 
            pagar = 250 * difDate
          break;
          case 2: 
            pagar = 300 * difDate
          break;
          default:
            pagar = 150 * difDate
          break
        }
        const monto = pagar
        if(c.bandWrappCalendar){
          c._setState({monto,difDate,fechaSI: startDate.toISOString(), fechaSF: date.toISOString(), bandLock: false});
        }else{
          c.setState({monto,difDate,fechaSI: startDate.toISOString(), fechaSF: date.toISOString()});
        }
        console.log(c.state.fechaSI)
        console.log(c.state.fechaSF)
        console.log(date)
        setEndDate(date);
      }}
      //minimumDate={new Date()}
      //minimumLength={1}
      format='dd MMM yyyy'
      locale={es}
    >
      {({ startDateInputProps, endDateInputProps, focus }) => (
        <div className='date-range'>
          <input
            className={'input' + (focus === START_DATE ? ' -focused' : '')}
            {...startDateInputProps}
            placeholder='Fecha inicial'
            style={{marginRight: 20}}
            value={c.state.fechaSI!=="undefined"?c.state.fechaSI:(startDate?startDate:"")}
            disabled={c.state.bandLock}
          />
           {">"}
          <input
            className={'input' + (focus === END_DATE ? ' -focused' : '')}
            {...endDateInputProps}
            placeholder='Fecha final'
            style={{marginLeft: 20}}
            value={c.state.fechaSF!=="undefined"?c.state.fechaSF:(endDate?endDate:"")}
            disabled={c.state.bandLock}
          />
        </div>
      )}
    </DateRangePicker>
  )
}