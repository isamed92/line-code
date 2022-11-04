import React, { useEffect, useState } from 'react'
import { useForm } from '../hooks';
import { Grafico } from './Grafico'


const empty = {
  labels: ['', '', '', '', '', '', ''],
  datasets: [
    {
      label: 'NRZ',
      // data: [0,1,0,-1,0,1,0].map(e => e),
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
      stepped: true,
    },
  ],
};
const CLOCK_DATA = {
  labels: ['', '', '', '', '', '', ''],
  datasets: [
    {
      label: 'clock',
      data: [0, 1, 0, 1, 0, 1, 0, 1],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
      stepped: true,
    },
  ],
};

const formData = {
  carrierAmplitude: '',
  carrierFreq: '',
  ascii: '',
  bitFreq: '',
  devSens: '',
}


export const Home = () => {
  const { carrierAmplitude, carrierFreq, ascii, bitFreq, devSens, onInputChange,} = useForm(formData)



  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({carrierAmplitude, carrierFreq, ascii, bitFreq, devSens})
  }
  return (
    <div className='container my-5'>
      
      <form onSubmit={handleSubmit}>
        <div className="container">
          <div className="row">
            <div className="col-6">
              <h4>Carrier Signal:</h4>
              <hr/>
              <div className="mb-3">
                <label htmlFor="carrier-amplitude" className="form-label">Amplitude [V]</label>
                <input type="number" className="form-control" id="carrier-amplitude" placeholder='Carrier Amplitude [Hz]' onChange={onInputChange} name='carrierAmplitude' value={carrierAmplitude}/>
              </div>
              <div className="mb-3">
                <label htmlFor="carrier-frequency" className="form-label">Frequency [Hz]</label>
                <input type="number" className="form-control" id="carrier-frequency" placeholder='Carrier Frequency [Hz]' onChange={onInputChange} name='carrierFreq' value={carrierFreq}/>
              </div>
            </div>
            <div className="col-6">
              <h4>ASCII Data:</h4>
              <hr/>
              <div className="mb-3">
                <label htmlFor="ascii" className="form-label">Character ASCII:</label>
                <input type="text" className="form-control" id="ascii" placeholder='ASCII' onChange={onInputChange} name='ascii' value={ascii}/>
              </div>
              <div className="mb-3">
                <label htmlFor="bit-freq" className="form-label">bit Frequency [Hz]</label>
                <input type="number" className="form-control" id="bit-freq" placeholder='bit Frequency [Hz]' onChange={onInputChange} name='bitFreq' value={bitFreq}/>
              </div>
              <div className="mb-3">
                <label htmlFor="sensibility" className="form-label"> Deviation Sensitivity [HZ]</label>
                <input type="number" className="form-control" id="sensibility" placeholder='Deviation Sensitivity [Hz]' onChange={onInputChange} name='devSens' value={devSens}/>
              </div>
            </div>
            <button type="submit" className="btn btn-primary">Calculate</button>
          </div>
        </div>
      </form>
   
    </div>
  )
}
