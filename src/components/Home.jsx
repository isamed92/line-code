import React, { useEffect, useState } from 'react';
import { useForm, useGraph } from '../hooks';
import { useModulation } from '../hooks/useModulation';
import Plot from 'react-plotly.js';

const formData = {
  carrierAmplitude: '',
  carrierFreq: '',
  ascii: '',
  bitFreq: '',
  devSens: '',
};

export const Home = () => {
  const {
    carrierAmplitude,
    carrierFreq,
    ascii,
    bitFreq,
    devSens,
    onInputChange,
  } = useForm(formData);

  const [carrierData, setCarrierData] = useState({})
  const [bin, setBin] = useState('')
  const [asciiData, setAsciiData] = useState({})
  const [askData, setAskData] = useState({})
  const [fskData, setFskData] = useState({})
  const [BPSKData, setBPSKData] = useState({})
  const [BPSKConstelationData, setBPSKConstelationData] = useState({})
  const [QPSKData, setQPSKData] = useState({})
  const [QPSKConstelationData, setQPSKConstelationData] = useState({})

  const { desviacionMaximaFrecuencia, sensibilidadDesviacion, indiceModulacion, frecuenciaMarca, frecuenciaEspacio, tiempoBit, anchoBandaASK, anchoBandaFSK,  anchoBandaBPSK, anchoBandaQPSK,  cantidadMAriaFSK, cantidadMAriaBPSK, cantidadMariaQPSK,} = useModulation({carrierAmplitude, carrierFreq, ascii, bitFreq, devSens})
  
  const { getGraficaPortadora, getASCIIData, getASKData, getFSKData, getBPSKData, getBPSKConstelationData, getQPSKData, getQPSKConstelationData, getValoresASCII  } = useGraph()


  const handleSubmit = (event) => {
    event.preventDefault();
    if(carrierAmplitude === '' || carrierFreq === '' || ascii === '' || bitFreq === '' || devSens === '') return
    console.log({ carrierAmplitude, carrierFreq, ascii, bitFreq, devSens });
  };

  useEffect(() => {
    if(carrierAmplitude === '' || carrierFreq === '') return;
    const {data, layout} = getGraficaPortadora(parseFloat(carrierAmplitude), parseFloat(carrierFreq))
    setCarrierData({data, layout})
  }, [carrierAmplitude, carrierFreq])
  
  useEffect(() => {
    if(ascii === '' || tiempoBit === '') return;
    const {data, layout} = getASCIIData(ascii, parseFloat(tiempoBit))
    setAsciiData({data, layout})
  }, [ascii, tiempoBit])
  
  useEffect(() => {
    if(ascii === '' || carrierAmplitude === '' || carrierFreq === '' || tiempoBit === '') return;
    const {data, layout} = getASKData(ascii, parseFloat(carrierAmplitude), parseFloat(carrierFreq), parseFloat(tiempoBit))
    setAskData({data, layout})
  }, [ascii, carrierAmplitude, carrierFreq, tiempoBit,])

  useEffect(() => {
    if(ascii === '' || carrierAmplitude === '' || carrierFreq === '' || tiempoBit === ''|| desviacionMaximaFrecuencia === '') return;
    
    const {data, layout} = getFSKData(ascii, parseFloat(carrierAmplitude), parseFloat(carrierFreq), parseFloat(tiempoBit), parseFloat(desviacionMaximaFrecuencia))
    setFskData({data, layout})
  }, [ascii, carrierAmplitude, carrierFreq, tiempoBit,desviacionMaximaFrecuencia])
  
  useEffect(() => {
    if(ascii === '' || carrierFreq === '' || tiempoBit === '') return;
    
    const {data, layout} = getBPSKData(ascii, parseFloat(tiempoBit), parseFloat(carrierFreq))
    setBPSKData({data, layout})
  }, [ascii, carrierFreq, tiempoBit])

  useEffect(() => {
    if(ascii === '' || tiempoBit === '') return;
    
    const {data, layout} = getBPSKConstelationData(ascii, parseFloat(tiempoBit))
    setBPSKConstelationData({data, layout})
  }, [ascii, tiempoBit])

  useEffect(() => {
    if(ascii === '' || carrierFreq === ''|| tiempoBit === '') return;
    
    const {data, layout} = getQPSKData(ascii, parseFloat(carrierFreq),parseFloat(tiempoBit))
    setQPSKData({data, layout})
  }, [ascii, carrierFreq, tiempoBit])

  useEffect(() => {
    if(ascii === '' || tiempoBit === '') return;
    
    const {data, layout} = getQPSKConstelationData(ascii, parseFloat(tiempoBit))
    setQPSKConstelationData({data, layout})
  }, [ascii, tiempoBit])

  useEffect(() => {
    if(ascii === '') return;
    const binario = getValoresASCII(ascii)[0].binario
    setBin(binario)
  }, [ascii])



  return (
    <div className='container my-5'>
      <form onSubmit={handleSubmit}>
        <div className='container'>
          <div className='row'>
            <div className='col-6'>
              <h4>Carrier Signal:</h4>
              <hr />
              <div className='mb-3'>
                <label htmlFor='carrier-amplitude' className='form-label'>
                  Amplitude [V]
                </label>
                <input
                  type='number'
                  className='form-control'
                  id='carrier-amplitude'
                  placeholder='Carrier Amplitude [Hz]'
                  onChange={onInputChange}
                  name='carrierAmplitude'
                  value={carrierAmplitude}
                />
              </div>
              <div className='mb-3'>
                <label htmlFor='carrier-frequency' className='form-label'>
                  Frequency [Hz]
                </label>
                <input
                  type='number'
                  className='form-control'
                  id='carrier-frequency'
                  placeholder='Carrier Frequency [Hz]'
                  onChange={onInputChange}
                  name='carrierFreq'
                  value={carrierFreq}
                />
              </div>
            </div>
            <div className='col-6'>
              <h4>ASCII Data:</h4>
              <hr />
              <div className='mb-3'>
                <label htmlFor='ascii' className='form-label'>
                  Character ASCII:
                </label>
                <input
                  type='text'
                  className='form-control'
                  id='ascii'
                  placeholder='ASCII'
                  onChange={onInputChange}
                  name='ascii'
                  value={ascii}
                />
              </div>
              <div className='mb-3'>
                <label htmlFor='bit-freq' className='form-label'>
                  bit Frequency [Hz]
                </label>
                <input
                  type='number'
                  className='form-control'
                  id='bit-freq'
                  placeholder='bit Frequency [Hz]'
                  onChange={onInputChange}
                  name='bitFreq'
                  value={bitFreq}
                />
              </div>
              <div className='mb-3'>
                <label htmlFor='sensibility' className='form-label'>
                  Deviation Sensitivity [HZ]
                </label>
                <input
                  type='number'
                  className='form-control'
                  id='sensibility'
                  placeholder='Deviation Sensitivity [Hz]'
                  onChange={onInputChange}
                  name='devSens'
                  value={devSens}
                />
              </div>
            </div>
            <button type='submit' className='btn btn-primary'>
              Calculate
            </button>
          </div>
        </div>
      </form>
      {(carrierAmplitude > 0,
      carrierFreq > 0,
      ascii > 0,
      bitFreq > 0,
      devSens > 0) && (
        <div className='container'>
          {/* resultados */}
          <h3 className='mt-5'>Resultados: {bin}</h3>
          <hr />
          <div className='container mt-5'>
            <div className='row'>
              <div className='col-4'>
                <h5 className='result-title'>
                  Desviación máxima de frecuencia
                </h5>
                <p className='result'>Δf = { desviacionMaximaFrecuencia } Hz</p>
                {/* <div>Formula? </div> */}
              </div>
              <div className='col-4'>
                <h5 className='result-title'>Sensibilidad a la desviación</h5>
                <p className='result'>K = { sensibilidadDesviacion } Hz</p>
                {/* <div>Formula? </div> */}
              </div>
              <div className='col-4'>
                <h5 className='result-title'>Índice de modulación</h5>
                <p className='result'>m = {indiceModulacion}</p>
                {/* <div>Formula? </div> */}
              </div>
            </div>
            <div className='row'>
              <div className='col-4'>
                <h5 className='result-title'>Frecuencia de marca</h5>
                <p className='result'>Fm = { frecuenciaMarca } Hz</p>
                {/* <div>Formula? </div> */}
              </div>
              <div className='col-4'>
                <h5 className='result-title'>Frecuencia de espacio</h5>
                <p className='result'>Fs = { frecuenciaEspacio } Hz</p>
                {/* <div>Formula? </div> */}
              </div>
              <div className='col-4'>
                <h5 className='result-title'>Tiempo de bit</h5>
                <p className='result'>fb = {tiempoBit} bps</p>
                {/* <div>Formula? </div> */}
              </div>
            </div>
            <div className='row'>
              <div className='col-4'>
                <h5 className='result-title'>Ancho de banda en ASK</h5>
                <p className='result'>B = {anchoBandaASK} Hz</p>
                {/* <div>Formula? </div> */}
              </div>
              <div className='col-4'>
                <h5 className='result-title'>Ancho de banda en FSK</h5>
                <p className='result'>B = {anchoBandaFSK } Hz</p>
                {/* <div>Formula? </div> */}
              </div>
              <div className='col-4'>
                <h5 className='result-title'>Ancho de banda en BPSK</h5>
                <p className='result'>B = {anchoBandaBPSK} Hz</p>
                {/* <div>Formula? </div> */}
              </div>
            </div>
            <div className='row'>
              <div className='col-4'>
                <h5 className='result-title'>Ancho de banda en QPSK</h5>
                <p className='result'>B = {anchoBandaQPSK} Hz</p>
                {/* <div>Formula? </div> */}
              </div>
              <div className='col-4'>
                <h5 className='result-title'>cantidad M-aria en FSK</h5>
                <p className='result'>M = {cantidadMAriaFSK}</p>
                {/* <div>Formula? </div> */}
              </div>
              <div className='col-4'>
                <h5 className='result-title'>cantidad M-aria en BPSK</h5>
                <p className='result'>M = {cantidadMAriaBPSK}</p>
                {/* <div>Formula? </div> */}
              </div>
              <div className='col-4'>
                <h5 className='result-title'>cantidad M-aria en QPSK</h5>
                <p className='result'>M = {cantidadMariaQPSK}</p>
                {/* <div>Formula? </div> */}
              </div>
            </div>
          </div>

          {/* GRAFICOS */}

          <div className='container'>
            <div className='row'>
              <div className='col-6'>
                <Plot data={carrierData.data} layout={carrierData.layout}/>
              </div>
              <div className='col-6'>
                <Plot data={asciiData.data} layout={asciiData.layout}/>
              </div>
            </div>
            <div className='row'>
              <div className='col-6'>
                <Plot data={askData.data} layout={askData.layout}/>
              </div>
              <div className='col-6'>
                <Plot data={fskData.data} layout={fskData.layout}/>
              </div>
            </div>
            <div className='row'>
              <div className='col-6'>
                <Plot data={BPSKData.data} layout={BPSKData.layout}/>
              </div>
              <div className='col-6'>
                <Plot data={BPSKConstelationData.data} layout={BPSKConstelationData.layout}/>
              </div>
            </div>
            <div className='row'>
              <div className='col-6'>
                <Plot data={QPSKData.data} layout={QPSKData.layout}/>
              </div>
              <div className='col-6'>
                <Plot data={QPSKConstelationData.data} layout={QPSKConstelationData.layout}/>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
