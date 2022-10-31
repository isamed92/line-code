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

  export const options = {
    responsive: true,
    interaction: {
        intersect: false,
        axis: 'x'
    },
  };

  const labels = ['0', '1', '2', '3', '4', '5', '6'];


  export const data = {
    labels,
    datasets: [
      {
        label: 'NRZ',
        data: labels.map(() => faker.datatype.number({ min: -1, max: 1 })),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        stepped: true,
      }
    ],
  };


export const Grafico = () => {
  return (
   <Line options={options} data={data}/>
  )
}
