import React from 'react'

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


  return {
    getBinary
  }
}
