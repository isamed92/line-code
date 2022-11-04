import React from 'react'

export const useGraph = () => {


    // Funcion que trae los valores a graficar
    const traerValores = (aux, A, f, df = 0, faux = 0) => {
        let x = [];
        let y = [];
        let a = -3;
        let c = 0;
        for (let i = 0; i <= 7000; i++) {
            if (aux == 1) {
                c = A * Math.sin(2 * Math.PI * f * a)
            } else if (aux == 2) {
                c = A * Math.cos(2 * Math.PI * f * a)
            } else if (aux == 3) {
                c = A * Math.cos((2 * Math.PI * f) * a + df * Math.sin(2 * Math.PI * faux * a))
            } else {
                c = A * Math.cos((2 * Math.PI * f) * a + df * Math.cos(2 * Math.PI * faux * a))
            }
            x.push(a)
            y.push(c)
            a += 0.001;
        }
        const valores = [{ x }, { y }]
        return valores;
    }

    // Funcion que trae los valores a graficar en el diagrama de pulsos
    const getValoresASCII = (cod,tasaBit) => {
        let decimal = cod.charCodeAt(0);
        let bin = decimal.toString(2);
        let binario = [];
        let ejeX =[0,tasaBit,2*tasaBit,3*tasaBit,4*tasaBit,5*tasaBit,6*tasaBit,7*tasaBit];
        let auxB = 0

        if(bin.length < 8){
            auxB = 8- bin.length;
            for (let i = 0; i < auxB; i++) {
                binario.push(0);
            }
        } 

        for (let i = 0; i < bin.length; i++) {
            binario.push(parseInt(bin[i]));
        }
        return [{binario},{ejeX}]
    }

    const datosASK = (cod,tb) => {
        let auxbin=[];
        const valores = getValoresASCII(cod,tb)[0].binario;
        for (let i = 0; i < valores.length; i++) {
        if (valores[i]) {
            auxbin[i]=1
        } else {
            auxbin[i]=-1
        }
        }   
        return auxbin;
    }


    const traerdatosASK = (ascii,tiempoBit,amplitud,frecuencia) => {
        const valores = datosASK(ascii,tiempoBit);
        let x = [];
        let y = [];
        let a = 0;
        let b = 0;
        const len = tiempoBit*8000;
        let pru=len/valores.length;
        let auxpru=pru;
        let c = 0
        for (let i = 0; i < parseInt(len); i++) {
            if (i === parseInt(pru)) {
                pru+=auxpru;
                b++
            }
            c=(1+valores[b])*((amplitud/2)*Math.cos(2*Math.PI*frecuencia*a));
            x.push(a)
            y.push(c)
            a += 0.001;
        }
        return [{ x }, { y }]
    }

    const traerdatosFSK = (ascii,tiempoBit,amplitud,frecuencia,desviacion) => {
        const valores = datosASK(ascii,tiempoBit);
        let x = [];
        let y = [];
        let a = 0;
        let b = 0;
        const len = tiempoBit*8000;
        let pru=len/valores.length;
        let auxpru=pru;
        let c = 0
        for (let i = 0; i < parseInt(len); i++) {
            if (i === parseInt(pru)) {
                pru+=auxpru;
                b++
            }
            c=amplitud*Math.cos(2*Math.PI*(frecuencia + valores[b]*desviacion) * a);
            x.push(a)
            y.push(c)
            a += 0.001;
        }
        return [{ x }, { y }]
    }

    const traerdatosBPSK = (ascii, tiempoBit, frecuencia) => {
        const valores=datosASK(ascii,tiempoBit);
        let x = [];
        let y = [];
        let a = 0;
        let b = 0;
        const len =8000*tiempoBit;
        let pru = len/valores.length;
        let auxpru = pru;
        let c = 0
        for (let i = 0; i < parseInt(len); i++) {
            if (i === parseInt(pru)) {
                pru+=auxpru;
                b++
            }
            c=valores[b]*Math.sin(2*Math.PI*a*frecuencia);
            x.push(a)
            y.push(c)
            a += 0.001;
        }
        return [{ x }, { y }]
    }

    const traerdatosQPSK = (ascii, frecuencia, tiempoBit) => {
        const valores = datosASK(ascii,tiempoBit);
        let x = [];
        let y = [];
        let a = 0;
        let b = 0;
        const len= 4000 * tiempoBit;
        let pru=len/4;
        let auxpru=pru;
        let c = 0
        for (let i = 0; i < parseInt(len); i++) {
            if ( i === parseInt(pru)) {
                pru+=auxpru;
                b+=2;
            }
            c=Math.sin(2*Math.PI*a*frecuencia)*valores[b+1]+Math.cos(2*Math.PI*a*frecuencia)*valores[b];
            x.push(a)
            y.push(c)
            a += 0.001;
        }
        return [{ x }, { y }]
    }


    const getGraficaPortadora = (amplitud, frecuencia) => {
        const valores = traerValores(2, amplitud, frecuencia)
        const datos = {
            x: valores[0].x,
            y: valores[1].y,
            mode: 'lines'
        };
        const data = [datos];
        const layout = {
            title: 'Señal Portadora',
            xaxis: {
                title: 'Tiempo [seg]',
                titlefont: {
                    color: 'black',
                    size: 12
                },
                rangemode: 'tozero'
            },
            yaxis: {
                title: 'Vc [V]',
                titlefont: {
                    color: 'black',
                    size: 12
                }
            }
        };

        return {data, layout}
    }

    const getASCIIData = (character, bitTime) => {
        const valores = getValoresASCII(character,bitTime);
        const graphData = {
            x: valores[1].ejeX,
            y: valores[0].binario,
            type: 'scatter',
            name: 'HVH Shape',
            line: {
                shape: 'hvh',
                color: 'rgb(255, 99, 132)',
                width: 5,
            }
        };
        const data = [graphData];
        const layout = {
            title: 'Diagrama de Pulsos del codigo ASCII',
            xaxis: {
                title: 'Tiempo[s]',
                titlefont: {
                    color: 'black',
                    size: 12
                },
                rangemode: 'tozero'
            },
            yaxis: {
                title: 'Amplitud[V]',
                titlefont: {
                    color: 'black',
                    size: 12
                }
            }
        };
        return {data, layout}
    }

    const getASKData = (ascii,amplitud,frecuencia,tiempoBit) => {
        const valores = traerdatosASK(ascii,tiempoBit,amplitud,frecuencia)

        const datos = {
            x: valores[0].x,
            y: valores[1].y,
            mode: 'lines'
        };
        const data = [datos];
        const layout = {
            title: 'Señal Modulada en ASK',
            xaxis: {
                title: 'Tiempo [s]',
                titlefont: {
                    color: 'black',
                    size: 12
                },
                rangemode: 'tozero'
            },
            yaxis: {
                title: 'Vc [V]',
                titlefont: {
                    color: 'black',
                    size: 12
                }
            }
        };

        return {data, layout}
    }

    const getFSKData = (ascii,amplitud,frecuencia,tiempoBit, desviacion) => {
        const valores = traerdatosFSK(ascii,tiempoBit,amplitud,frecuencia,desviacion)
        const datos = {
            x: valores[0].x,
            y: valores[1].y,
            mode: 'lines'
        };
        const data = [datos];
        const layout = {
            title: 'Señal Modulada en FSK',
            xaxis: {
                title: 'Tiempo [s]',
                titlefont: {
                    color: 'black',
                    size: 12
                },
                rangemode: 'tozero'
            },
            yaxis: {
                title: 'Vc [V]',
                titlefont: {
                    color: 'black',
                    size: 12
                }
            }
        };
        return {data, layout}
    }

    const getBPSKData = (ascii, tiempoBit, frecuencia) => {
        const valores = traerdatosBPSK(ascii,tiempoBit,frecuencia)
        const datos = {
            x: valores[0].x,
            y: valores[1].y,
            mode: 'lines'
        };
        const data = [datos];
        const layout = {
            title: 'Señal Modulada en BPSK',
            xaxis: {
                title: 'Tiempo [s]',
                titlefont: {
                    color: 'black',
                    size: 12
                },
                rangemode: 'tozero'
            },
            yaxis: {
                title: 'Vc [V]',
                titlefont: {
                    color: 'black',
                    size: 12
                }
            }
        };
        return {data, layout}
    }

    const getBPSKConstelationData = (ascii, tiempoBit) => {
        const valores = datosASK(ascii,tiempoBit);
        let vu =[];
        let vc =[];
        
        for (let i = 0; i < valores.length; i++) {
            if (valores[i]==1) {
              vu.push(1)  
            }else{
              vc.push(-1)
            }
        }
        const trace1 = {
            x: vu,
            y: [0,0,0,0,0,0,0,0],
            mode: 'markers',
            type: 'scatter',
            name: '-SEN( wc * t )',
            text: ['180°','180°','180°','180°','180°','180°','180°','180°'],
            marker: { size: 12 }
          };
          
        const trace2 = {
            x: vc,
            y: [0,0,0,0,0,0,0,0],
            mode: 'markers',
            type: 'scatter',
            name: 'SEN( wc * t )',
            text: ['0°','0°','0°','0°','0°','0°','0°','0°'],
            marker: { size: 12 }
          };
          
        const data = [ trace1,trace2];
          
        const layout = {
            title:'Diagrama de Constelación BPSK'
          };
        return {data, layout}
    }

    const getQPSKData = (ascii, frecuencia, tiempoBit) => {
        const valores = traerdatosQPSK(ascii, frecuencia, tiempoBit)
        const datos = {
            x: valores[0].x,
            y: valores[1].y,
            mode: 'lines'
        };
        const data = [datos];
        const layout = {
            title: 'Señal Modulada en QPSK',
            xaxis: {
                title: 'Tiempo [s]',
                titlefont: {
                    color: 'black',
                    size: 12
                },
                rangemode: 'tozero'
            },
            yaxis: {
                title: 'Vc [V]',
                titlefont: {
                    color: 'black',
                    size: 12
                }
            }
        };
        return {data, layout}
    }

    const getQPSKConstelationData = (ascii, tiempoBit) => {
        const valores= datosASK(ascii,tiempoBit);
        let vpos=[{x:null,y:null}];
        let vneg=[{x:null,y:null}];
        let vposneg=[{x:null,y:null}];
        let vnegpos=[{x:null,y:null}];
        for (let i = 0; i < valores.length-1; i++) {
            if (valores[i]==-1 && valores[i+1]==-1) {
                vneg[0]={x:-1,y:-1}
            } else if(valores[i]==-1 && valores[i+1]==1){
                vnegpos[0]={x:1,y:-1}
            }else if (valores[i]==1 && valores[i+1]==-1) {
                vposneg[0]={x:-1,y:1}
            }else{
                vpos[0]={x:1,y:1}
            }
            i++;
        }
        const trace1 = {
            x: [vneg[0].x],
            y: [vneg[0].y],
            mode: 'markers',
            type: 'scatter',
            name: 'sen(wc*t-135°)',
            text: ['00'],
            marker: { size: 12 }
          };
          
        const trace2 = {
            x: [vpos[0].x],
            y: [vpos[0].y],
            mode: 'markers',
            type: 'scatter',
            name: 'sen(wc*t+45°)',
            text: ['11'],
            marker: { size: 12 }
          };
    
        const trace3 = {
            x: [vposneg[0].x],
            y: [vposneg[0].y],
            mode: 'markers',
            type: 'scatter',
            name: 'sen(wc*t+135°)',
            text: ['10'],
            marker: { size: 12 }
          };
    
        const trace4 = {
            x: [vnegpos[0].x],
            y: [vnegpos[0].y],
            mode: 'markers',
            type: 'scatter',
            name: 'sen(wc*t-45°)',
            text: ['01'],
            marker: { size: 12 }
          };
          
        const data = [ trace1,trace2,trace3,trace4];
          
        const layout = {
            title:'Diagrama de Constelación QPSK'
          };
        return {data, layout}
    }


    return {
        getGraficaPortadora,
        getASCIIData,
        getASKData,
        getFSKData,
        getBPSKData, 
        getBPSKConstelationData, 
        getQPSKData, 
        getQPSKConstelationData, 
        getValoresASCII,
    }
}
