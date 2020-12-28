import React from 'react';

import {Cards, Chart, CountryPicker} from './components/indexComponent';
//we can mention ./components and it searches for them automatically
import styles from './App.module.css';
import {fetchData} from './api/indexApi';
//we can mention ./api and it searches for fetchData automatically
import covidImg from './images/image.png';
class App extends React.Component{
    state = {
        data:{},
        country: '',
    }
    //instead of constructor(){this.state={data:{},}} we can write above line

    async componentDidMount(){
        //for other components we do it like - function async (){..}
        //for componentDidMount we can write - async componentDidMount () {..}
        const fetchedData = await fetchData();
        //console.log(data); //enable it to print api data in console of browser in f12
        this.setState({data : fetchedData});
    }

    handleCountryChange = async (country) => {
        //console.log(country);
        
        //fetch data
        const fetchedData = await fetchData(country);
        //set the state
        this.setState({ data: fetchedData, country: country });

    }
    render(){
        const {data, country}=this.state; //destructuring data from state

        return (
            <div className={styles.container}>
                <img className={styles.image} src={covidImg} alt="covid19"/>
                <Cards data={data}/> 
                {/* instead of this.state.data, it is destructured above and using data directly here */}

                <CountryPicker handleCountryChange={this.handleCountryChange}/>
                <Chart data={data} country={country}/>
            </div>
        );
    }
}

export default App;