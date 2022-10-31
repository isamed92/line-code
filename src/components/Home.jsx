import React, { useState } from 'react'
import { useCode } from '../hooks/useCode'
import { Grafico } from './Grafico'

export const Home = () => {

  const [mensaje, setMensaje] = useState('')
  const [bin, setBin] = useState('')
  const [parity, setParity] = useState(false)


  const { getBinary } = useCode()


  const handleConvert = () => {
    if(mensaje === '') return;
    const data = getBinary(mensaje, parity)
    setBin(data)
  }
  return (
    <div className='container mt-3'>
       <div className="form-check form-switch">
        <input className="form-check-input" type="checkbox" role="switch" id="paridad" onChange={() => setParity(p => !p)} checked={parity}/>
        <label className="form-check-label" htmlFor="paridad">Paridad Par - Impar</label>
      </div>
        <div className='d-flex justify-content-between my-4'>
          <div className='input-group w-75'>
            <input
              type='text'
              className='form-control'
              placeholder='Ingresar un mensaje'
              onChange={(e) => setMensaje(e.target.value)}
              value={mensaje}
            />

          </div>
            <button type="button" className="btn btn-danger" onClick={handleConvert}>Convertir</button>
        </div>

         <h5>Binary:</h5>
         <hr/>
         <div className='fs-3 text-break alert alert-info'> {bin} </div>
        <hr/>
        <h5>Grafico:</h5>
        <Grafico/>

        <Botonera options={['NRZ', 'RZ', 'AMI']}/>
    </div>
  )
}


const Botonera = ({options}) => {
    return (
      <div className='btn-toolbar' role='toolbar'>
        <div className="container mt-2 btn-group" role="group">
            { 
            options.length > 0 &&
            options.map( (opt, id) => <Option key={id} opt={opt} id={id}/>)
          }
        </div>
      </div>
    )
}

const Option = ({opt, id}) => {
  return (
    <>
      <input type="radio" className="btn-check" name="btnradio" id={`btnRadio${id}`}/>
      <label key={id}  className="btn btn-outline-primary" htmlFor={`btnRadio${id}`}>{opt}</label>
    </>
  )
}
