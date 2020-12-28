import React, { useState, useEffect } from 'react';
import { fetchDailyData } from '../../api/indexApi';
import { Line, Bar } from 'react-chartjs-2';
import styles from './Chart.module.css';

const Chart = ({data:{confirmed,recovered,deaths}, country}) => {
    const [dailyData, setDailyData] = useState([]);

    useEffect(() => {
        const fetchAPI = async () => {
            const dailyData = await fetchDailyData();
            setDailyData(dailyData);
        }
        //console.log(dailyData);
        fetchAPI();
    },[]);

    const lineChart = (
        //ternary condition
        //instead of dailyData.length != 0 we can write below
        //because if length is is 0 value is 0 and 0 is treated as false
        dailyData.length ? (
            <Line data={{
                labels: dailyData.map(({date}) => date),
                datasets: [{
                    data: dailyData.map(({ confirmed }) => confirmed),
                    label: 'Infected',
                    borderColor: '#3333ff',
                    fill: true,
                }, {
                    data: dailyData.map(({ deaths }) => deaths),
                    label: 'Deaths',
                    borderColor: 'red',
                    backgroundColor: 'rgba(255,0,0,0.5)',
                    fill: true,
                }],
            }}
            />) : null

    );

    const barChart = (
        confirmed ?
        (<Bar 
            data={{
                labels: ['Infected', 'Recovered', 'Deaths'],
                datasets:[{
                    lable: 'People',
                    backgroundColor:[
                        'rgba(0,0,255,0.5)',
                        'rgba(0,255,0,0.5)',
                        'rgba(255,0,0,0.5)',
                    ],
                    data: [confirmed.value, recovered.value, deaths.value]
                }]
            }}
            options={{
                legend: { display : false},
                title : { display : true, text:`Current state in ${country}`},
            }}
        />)
        :null
    );

    return (
        <div className={styles.container}>
            
            {country ? barChart : lineChart}
        </div>
    )
}

export default Chart;