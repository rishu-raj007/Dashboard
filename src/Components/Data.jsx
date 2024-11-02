import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import * as _ from 'lodash'
import { Bar } from 'react-chartjs-2';
import BarChart from './BarChart';
import LineChart from './LineChart';
import EVModelChart from './CityEv';
import EvSalesvsRangeChart from './evSalesvsRange';
import './style.css'
import evData from '../data/Electric_Vehicle_Population_Data.csv'

function Data() {
  const [data, setData] = useState([]);
  const [bg, setBg] = useState("white");
  console.log(bg)
  console.log(data)
  const cityCounts = _.mapValues(_.groupBy(data, 'City'), members => members.length);
  console.log(cityCounts)
  const makersCount = _.mapValues(_.groupBy(data, 'Make'), makers => makers.length)
  const evType = _.mapValues(_.groupBy(data, 'Electric Utility'), makers => makers.length)

  useEffect(() => {
    // Fetch the CSV file from the public directory
        // Parse the CSV data
        const csvFilePath = evData; // Path to your CSV file (e.g., in the public folder)

        fetch(csvFilePath)
          .then((response) => {
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text();
          })
          .then((csvText) => {
            Papa.parse(csvText, {
              header: true,
              skipEmptyLines: true,
              complete: function (result) {
                setData(result.data);
                setBg('black'); // Set background color
              },
            });
          })
          .catch((error) => console.error('Error loading CSV file:', error));
  }, []);

  console.log(evType)
  console.log(makersCount)
  // Filter unique models
  const uniqueCarsModels = data.map(car => {
    const make = car['Make'];
    const model = car['Model'];
    const year = car['Model Year']
    const range = car['Electric Range']

    const name = `${make} ${model} ${year}`
    return { name, range }  // Tesla Model Y 2018 > milaeegae > sale
  })
  const nameRangeSales = _(uniqueCarsModels).filter(item => parseInt(item.range, 10) !== 0)
    .groupBy('name').map((items, name) => ({
      name: name,
      range: items[0].range, // Assuming range is the same for each grouped name
      countOfName: items.length
    })).orderBy('countOfName', 'desc') // Sort by countOfName in descending order
    .take(10) // Take only the top 10 results
    .value();
  console.log(nameRangeSales)



  // Group by city, then by model, and count occurrences
  const groupedCarCounts = _.mapValues(
    _.groupBy(data, 'City'),
    cityCars => _.mapValues(_.groupBy(cityCars, 'Model'), modelCars => modelCars.length)
  );

  console.log(groupedCarCounts);

  // Step 2: Transform cityModelCounts to an array, order by total count of models, and take top 10 cities
  const topCities = _(groupedCarCounts)
    .map((models, city) => ({
      city,
      models: _(models)
        .toPairs()
        .orderBy([1], ['desc'])  // Sort models by count descending
        .slice(0, 10)            // Take top 10 models in each city
        .fromPairs()
        .value()
    }))
    .orderBy(cityData => _.sum(Object.values(cityData.models)), ['desc']) // Order cities by total model counts
    .slice(0, 10)  // Take top 10 cities
    .value();
  console.log(topCities)


  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: function (result) {
          setData(result.data);
          setBg("black")

        },
      });
    }
  };

  return (
    <>
      {/* <input type="file" accept=".csv" onChange={handleFileChange} /> */}
      {data.length ? <div className='container' style={{backgroundColor:bg}}>
        <div className='graph-container' ><BarChart cityData={cityCounts} /></div>
        <div className='graph-container'>
           <LineChart makerData={makersCount} />
        </div>
        <div className='graph-container'>
           <EVModelChart data={topCities} />
        </div>
        <div className='graph-container'>
           <EvSalesvsRangeChart carData={uniqueCarsModels} />
        </div>
      </div>: ""}

    </>
  );
}

export default Data;
