import React from 'react'

const COLOR_1 = 'rgb(255, 99, 132)'
const POINT_COLOR_1 = 'rgba(255, 99, 132, 0.5)'

const COLOR_2 = '#1976D2'
const POINT_COLOR_2 = '#1976D290'

const COLOR_3 = '#4CAF50'
const POINT_COLOR_3 = '#4CAF5090'

const COLOR_4 = '#9C27B0'
const POINT_COLOR_4 = '#9C27B090'

const COLOR_5 = '#FFEB3B'
const POINT_COLOR_5 = '#FFEB3B90'


export const useCode = () => {


    const getBinary = (msj, isOdd = false, isSync = false) => {
        let aux = msj.trim()
        const result = aux.split('').map( c => {
            const bit = c.charCodeAt(0).toString(2).split('');
            const isEven = isOdd ? (bit.filter( n => n === '1').length % 2 !== 0) : (bit.filter( n => n === '1').length % 2 === 0);
            const parity = isEven ? '0' : '1'
            const start = '1'
            const end = '0'
            const res = isSync ? (start + " | " + bit.join('') + parity + " | " + end + " - " ) : (bit.join('') + parity + ' ')
            return  res;   
        })
        return result;
    }

    const getDataGraph = (data = [], option) => {
        const trimData = data.map(d => d.trim())
        const characters = trimData.map(s => s.split('').map(e => parseInt(e)))
        const values = characters.flat(1)

        switch (option) {
            case 'UNRZ':
                return {
                    labels: values.map(() => ''),
                    datasets: [
                      { label: 'UNRZ',
                        data: values,
                        borderColor: COLOR_1,
                        backgroundColor: POINT_COLOR_1,
                        stepped: true}
                    ]
                }
            case 'NRZL':
                const str2 = JSON.stringify(values).replaceAll('0', '-1')
                const fdata2 = JSON.parse(str2)
                return {
                    labels: fdata2.map(() => ''),
                    datasets: [
                      { label: 'NRZL',
                        data: fdata2,
                        borderColor: COLOR_2,
                        backgroundColor: POINT_COLOR_2,
                        stepped: true}
                    ]
                }
            case 'NRZI':
                let fdata3 = values
                console.log("🚀 ~ file: useCode.js ~ line 68 ~ getDataGraph ~ fdata3", fdata3)
                for (let i = 0; i < values.length; i++) {
                  const siguiente = values[i + 1];
                  if (values[0] === 1) {
                    fdata3[0] = -1;
                  } else {
                    fdata3[0] = 1;
                  }
                  if (values[i] === 1) {
                    fdata3[i + 1] = siguiente === 1 ? -1 : 1;
                  } else if (values[i] === 0) {
                    fdata3[i] = -1;
                  }
                }
               
                return {
                    labels: fdata3.map(() => ''),
                    datasets: [
                      { label: 'NRZI',
                        data: fdata3,
                        borderColor: COLOR_3,
                        backgroundColor: POINT_COLOR_3,
                        stepped: true}
                    ]
                }
            case 'RZ':
                let fdata4 = values

                return {
                    labels: values.map(() => ''),
                    datasets: [
                      { label: 'RZ',
                        data: fdata4,
                        borderColor: COLOR_4,
                        backgroundColor: POINT_COLOR_4,
                        stepped: true}
                    ]
                }
            case 'Manchester':
                return {
                    labels: values.map(() => ''),
                    datasets: [
                      { label: 'Manchester',
                        data: values,
                        borderColor: COLOR_5,
                        backgroundColor: POINT_COLOR_5,
                        stepped: true}
                    ]
                }
            default:
                console.log('ups...')
                return;
        }

    }


  return {
    getBinary,
    getDataGraph,
  }
}
