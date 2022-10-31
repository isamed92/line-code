import React from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Line } from 'react-chartjs-2';
  import faker from 'faker';



  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

   const opt = {
    responsive: true,
    interaction: {
        intersect: false,
        axis: 'x'
    },
  };


   const d = {
    labels: ['', '', '', '', '', '', ''],
    datasets: [
      {
        label: 'NRZ',
        data: [0,1,0,-1,0,1,0].map(e => e),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        stepped: true,
      }
    ],
  };


export const Grafico = ({options=opt, data=d}) => {
  return (
   <Line options={options} data={data}/>
  )
}
