import React, { useEffect, useState } from 'react'
import { useCode } from '../hooks/useCode'
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

export const Home = () => {


  return (
    <div className='container my-5'>
      
        <div className='d-flex justify-content-between my-4'>
          <div className='input-group w-75'>
            <input
              type='text'
              className='form-control'
              placeholder='Ingresar un mensaje'
              onChange={() => {}}
              // value={mensaje}
            />

          </div>
            <button type="button" className="btn btn-danger" onClick={()=>{}}>Convertir</button>
        </div>
   
    </div>
  )
}
