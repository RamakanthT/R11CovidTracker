import axios from 'axios';

//covid19.mathdro.id is offline, so we use disease.sh and map its response to the same shape
const url = "https://disease.sh/v3/covid-19";

export const fetchData = async (country) => {
    let changeableUrl = `${url}/all`;
    if(country){
        changeableUrl = `${url}/countries/${encodeURIComponent(country)}`;

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
        const { data: { cases, recovered, deaths, updated } } = await axios.get(changeableUrl);
        return {
            confirmed: { value: cases },
            recovered: { value: recovered },
            deaths: { value: deaths },
            lastUpdate: updated
        };

    } catch (error) {
        console.log(error);
    }
}

export const fetchDailyData = async () => {
    try{
        const {data:{cases, deaths}} = await axios.get(`${url}/historical/all?lastdays=all`);
        // console.log(response);
        const modifiedData = Object.keys(cases).map((date) => ({
            confirmed: cases[date],
            deaths: deaths[date],
            date: new Date(date).toLocaleDateString(),
        }));
        return modifiedData;

    }catch(error){
        console.log(error);
        return [];
    }
}

export const fetchCountries = async () => {
    try{
        const {data} = await axios.get(`${url}/countries`);
        //console.log(response);
        return data.map((country)=> country.country);
    }catch(error){
        console.log(error);
        return [];
    }
}

