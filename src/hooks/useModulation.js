import React, { useEffect, useState } from 'react'

export const useModulation = (modulationData) => {
    const { carrierAmplitude, carrierFreq, ascii, bitFreq, devSens } = modulationData
    const [desviacionMaximaFrecuencia, setDesviacionMaximaFrecuencia] = useState(0);
    const [sensibilidadDesviacion, setSensibilidadDesviacion] = useState(0);
    const [indiceModulacion, setIndiceModulacion] = useState(0);
    const [frecuenciaMarca, setFrecuenciaMarca] = useState(0);
    const [frecuenciaEspacio, setFrecuenciaEspacio] = useState(0);
    const [tiempoBit, setTiempoBit] = useState(0);
    const [anchoBandaASK, setAnchoBandaASK] = useState(0);
    const [anchoBandaFSK, setAnchoBandaFSK] = useState(0);
    const [anchoBandaBPSK, setAnchoBandaBPSK] = useState(0);
    const [anchoBandaQPSK, setAnchoBandaQPSK] = useState(0);
    const [cantidadMAriaFSK, setCantidadMAriaFSK] = useState(0);
    const [cantidadMAriaBPSK, setCantidadMAriaBPSK] = useState(0);
    const [cantidadMariaQPSK, setCantidadMariaQPSK] = useState(0);


    const calculateAll = () => {
         //desviacion maxima de frecuencia
         const desviacionMaxima = getDesviacion(devSens,carrierAmplitude);
         setDesviacionMaximaFrecuencia(desviacionMaxima);
         //sensibilidad a la desviacion
         setSensibilidadDesviacion(devSens)
         //indice modulacion
         const indice = getIndiceMod(desviacionMaxima, bitFreq)
         setIndiceModulacion(indice);
         // frecuencia de marca
         const marca = getfMarca(carrierFreq, devSens)
         setFrecuenciaMarca(marca)
         // frecuencia de espacio
         const freqSpace = getfEspacio(carrierFreq, devSens)
         setFrecuenciaEspacio(freqSpace)
         // tiempo de bit
         const tiempoBit = getTiempoBit(bitFreq);
         setTiempoBit(tiempoBit)
         //b ask
         setAnchoBandaASK(bitFreq)
         //b fsk
         const bfsk = getAnchoBandaMinimoFSK(bitFreq, desviacionMaxima)
         setAnchoBandaFSK(bfsk)
         //b bpsk
         setAnchoBandaBPSK(bitFreq)
         //b qpsk
         const bqpsk = getAnchoBandaMinimoQPSK(bitFreq)
         setAnchoBandaQPSK(bqpsk)
         //m aria harcodeados jajaj
         setCantidadMAriaFSK(2);
         setCantidadMAriaBPSK(2);
         setCantidadMariaQPSK(4);
    }


    //Funcion que retorna la Desviación máxima de frecuencia
    const getDesviacion = (sensibilidad, amplitud) => sensibilidad*amplitud;
    // Frecuencia de marca
    const getfMarca = (frecuencia, sensibilidad) =>  frecuencia-sensibilidad;
    //Funcion que retorna el Indice de Modulación
    const getIndiceMod = (desviacion,bit) => desviacion/(bit/2)
    //Frecuencia de Espacio
    const getfEspacio = (frecuencia, sensibilidad) => frecuencia+sensibilidad;
    //Funcion que retorna tb
    const getTiempoBit = (Fb) => 1/Fb;
    //Funcion que retorna el ancho de manda minimo para FSK
    const getAnchoBandaMinimoFSK = (Fb,des) => 2*(Fb+des)
    //Funcion que retorna el ancho de manda minimo para QPSK
    const getAnchoBandaMinimoQPSK = (Fb) => Fb/2



    useEffect( () => calculateAll(), [modulationData])
    
  return {
    desviacionMaximaFrecuencia,
    sensibilidadDesviacion,
    indiceModulacion,
    frecuenciaMarca,
    frecuenciaEspacio,
    tiempoBit,
    anchoBandaASK,
    anchoBandaFSK, 
    anchoBandaBPSK,
    anchoBandaQPSK, 
    cantidadMAriaFSK,
    cantidadMAriaBPSK,
    cantidadMariaQPSK,
    calculateAll,
  }
}
