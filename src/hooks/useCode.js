import React from 'react'

const COLOR_1 = 'rgb(255, 99, 132)'
const POINT_COLOR_1 = 'rgba(255, 99, 132, 0.5)'

const COLOR_2 = '#1976D2'
const POINT_COLOR_2 = '#1976D290'

const COLOR_3 = '#4CAF50'
const POINT_COLOR_3 = '#4CAF5090'

const COLOR_4 = '#9C27B0'
const POINT_COLOR_4 = '#9C27B090'

const COLOR_5 = '#FE9953'
const POINT_COLOR_5 = '#CB7A4290'



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
                let fdata3 = [...values]
                if(values[0] === 1)
                  fdata3[0]= -1;
                else
                  fdata3[0]= 1;
                for (let i = 1; i < values.length; i++) {
                  if(values[i] === 1){
                      fdata3[i]= -fdata3[i-1];
                  }
                  else{
                      fdata3[i]= fdata3[i-1];
                  }
                }
               
                return {
                    labels: values.map(() => ''),
                    datasets: [
                      { label: 'NRZI',
                        data: fdata3,
                        borderColor: COLOR_3,
                        backgroundColor: POINT_COLOR_3,
                        stepped: true}
                    ]
                }
            case 'RZ':
                let fdata4 = [...values]
                let j = 0;
                for (let i = 0; i < values.length; i++) {
                  if(values[i] === 1) {
                    fdata4[j] = 1;
                  } else {
                    fdata4[j] = -1;
                  }
                  fdata4[j+1] = 0;
                  j += 2;
                }

                return {
                    labels: fdata4.map(() => ''),
                    datasets: [
                      { 
                        label: 'RZ',
                        data: fdata4,
                        borderColor: COLOR_4,
                        backgroundColor: POINT_COLOR_4,
                        stepped: true
                      },
                    ]
                }
            case 'Manchester':
                let fdata5 = [...values]
                let l = 0;
                for (let i = 0; i < values.length; i++) {
                  if(values[i] === 1) {
                    fdata5[l] = 1;
                  } else {
                    fdata5[l] = -1;
                  }
                  fdata5[l+1] = -1;
                  l += 2;
                }
                return {
                    labels: fdata5.map(() => ''),
                    datasets: [
                      { label: 'Manchester',
                        data: fdata5,
                        borderColor: COLOR_5,
                        backgroundColor: POINT_COLOR_5,
                        stepped: true}
                    ]
                }

          case 'DManchester':
            let fdata6 = [...values]
            let k = 2;

            if (values[0] === 1) {
                fdata6[0] = 1;
            } else if (values[0] === 0) {
                fdata6[0] = -1;
            }
            fdata6[1] = fdata6[0] * (-1);
            for (let i = 1; i < values.length; i++) {
              if (values[i] === 1) {
                    fdata6[k] = fdata6[k - 1];
                } else {
                    fdata6[k] = fdata6[k - 1]*(-1);
                }
                fdata6[++k] = fdata6[k - 1]*(-1);
                k++;
            }
            return {
                labels: fdata6.map(() => ''),
                datasets: [
                  { label: 'Differential Manchester',
                    data: fdata6,
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
