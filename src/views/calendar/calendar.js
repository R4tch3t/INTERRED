import React, { useState } from 'react'
import { es } from 'date-fns/locale'
import { DateRangePicker, START_DATE, END_DATE } from 'react-nice-dates'
import 'react-nice-dates/build/style.css'
export default function DateRangePickerExample(props) {
  const {c} = props
  const [startDate, setStartDate] = useState()
  const [endDate, setEndDate] = useState()
  c.dateSI=startDate
  c.dateSF=endDate

  console.log(startDate)
  return (
    <DateRangePicker
      startDate={startDate}
      endDate={endDate}
      onStartDateChange={(date)=>{
        //const pagarH = document.getElementById("pagar")
        //pagarH.value="250"
        //c.setState({pagar: 250})
        setStartDate(date);}}
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
        c.setState({pagar,difDate})
        setEndDate(date);}}
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
            value={c.state.fechaSI!=="undefined"?c.state.fechaSI:""}
          />
           {">"}
          <input
            className={'input' + (focus === END_DATE ? ' -focused' : '')}
            {...endDateInputProps}
            placeholder='Fecha final'
            style={{marginLeft: 20}}
            value={c.state.fechaSF!=="undefined"?c.state.fechaSF:""}
          />
        </div>
      )}
    </DateRangePicker>
  )
}