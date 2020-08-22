Skip to content
Search or jump to…

Pull requests
Issues
Marketplace
Explore
 
@akshatrastogi25 
prog-hammer
/
corona-tracker
1
01
Code
Issues
Pull requests
Actions
Projects
Wiki
Security
Insights
corona-tracker/src/components/chart/index.js /
@prog-hammer
prog-hammer getting country wise barchart
Latest commit ab38ffd on 8 Jun
 History
 1 contributor
77 lines (67 sloc)  2.02 KB
  
import React ,{useState,useEffect} from 'react'
import {Line ,Bar} from 'react-chartjs-2'
import './styleSheet.css'

import {fetchDailyData,fetchData} from '../../api/index'

const Chart=({data,country})=>{
    const confirmed=data.confirmed;
    const recovered=data.recovered;
    const deaths=data.deaths;
    const lastUpdate=data.lastUpdate

    
    const [dailyData,setDailyData]=useState([])
    useEffect(() => {
        const getData = async () => {
          const initialDailyData = await fetchDailyData();
          setDailyData(initialDailyData);
        };
    
        getData();
      }, []);
    
    const barChart=(
        confirmed?(
            <Bar
            data={{
            labels: ['Infected', 'Recovered', 'Deaths'],
            datasets: [
                {
                label: 'People',
                backgroundColor: ['rgba(0, 0, 255, 0.5)', 'rgba(0, 255, 0, 0.5)', 'rgba(255, 0, 0, 0.5)'],
                data: [confirmed.value, recovered.value, deaths.value],
                },
            ],
            }}
            options={{
            legend: { display: false },
            title: { display: true, text: `Current state in ${country}` },
            }}
        />
        )
        :"Loading.."
    )   
     

    const lineChart = (
        dailyData[0] ? (
          <Line
            data={{
              labels: dailyData.map(({ date }) => date),
              datasets: [{
                data: dailyData.map((data) => data.confirmed),
                label: 'Infected',
                borderColor: '#3333ff',
                fill: true,
              }, {
                data: dailyData.map((data) => data.deaths),
                label: 'Deaths',
                borderColor: 'red',
                backgroundColor: 'rgba(255, 0, 0, 0.5)',
                fill: true,
              },
              ],
            }}
          />
        ) : "Loading"
      );

    return(
        <div className="chart-container">
            {country ? barChart : lineChart}
        </div>
    )
}

export default Chart;
© 2020 GitHub, Inc.
Terms
Privacy
Security
Status
Help
Contact GitHub
Pricing
API
Training
Blog
About
