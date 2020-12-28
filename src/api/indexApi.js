import axios from 'axios';

const url = "https://covid19.mathdro.id/api";

export const fetchData = async (country) => {
    let changeableUrl = url;
    if(country){
        changeableUrl = `${url}/countries/${country}`;

    }
    try {
        //const response = await axios.get(url);
        //1 we can use above line to get total response
        //2 to get destructured data we use below
        /* const {data} = await axios.get(url);
        const modifiedData = {
            confirmed: data.confirmed,
            recovered: data.recovered,
            deaths: data.deaths,
            lastUpdate: data.lastUpdate
        };
        return modifiedData; */
        //3 more reduced code below
        /* const {data:{confirmed, recovered, deaths, lastUpdate}} = await axios.get(url);
        const modifiedData = {
            confirmed: confirmed,
            recovered: recovered,
            deaths: deaths,
            lastUpdate: lastUpdate
        };
        return modifiedData; */
        //4 still simpler
        /* const {data:{confirmed, recovered, deaths, lastUpdate}} = await axios.get(url);
        const modifiedData = {confirmed,recovered,deaths,lastUpdate};
        //instead of confirmed : confirmed we can just write confirmed
        return modifiedData; */
        //5 simplest
        const { data: { confirmed, recovered, deaths, lastUpdate } } = await axios.get(changeableUrl);
        return { confirmed, recovered, deaths, lastUpdate };

    } catch (error) {
        console.log(error);
    }
}

export const fetchDailyData = async () => {
    try{
        const {data} = await axios.get(`${url}/daily`);
        // console.log(response);
        const modifiedData = data.map((dailyData) => ({
            confirmed: dailyData.confirmed.total,
            deaths: dailyData.deaths.total,
            date: dailyData.reportDate,
        }));
        return modifiedData;

    }catch(error){

    }
}

export const fetchCountries = async () => {
    try{
        const {data:{countries}} = await axios.get(`${url}/countries`);
        //console.log(response);
        return countries.map((country)=> country.name);
    }catch(error){
        console.log(error);
    }
}

