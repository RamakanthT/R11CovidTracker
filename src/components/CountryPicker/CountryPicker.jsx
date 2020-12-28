import React, {useState, useEffect} from 'react';
import { NativeSelect, FormControl} from '@material-ui/core';
import styles from './CountryPicker.module.css';
import {fetchCountries} from '../../api/indexApi';


const CountryPicker = ({handleCountryChange}) => {
    const [fetchedCountries, setFetchedCountries] = useState([]);
    
    useEffect(() => {
        const fetchApiCountries = async () => {
            setFetchedCountries(await fetchCountries());
        }

        fetchApiCountries();
    },[setFetchedCountries]);//useEffect will update continuously but we mentioned setFetchedCountries
    //here so it updates only if there is change in setFetchedCountries

    //console.log(fetchedCountries)

    return(
        <FormControl className={styles.formControl}>
            <NativeSelect defaultValue="" onChange={(e)=>handleCountryChange(e.target.value)}>
                <option value="">Global</option>
                {fetchedCountries.map((country, i) => <option key={i} value={country}>{country}</option>)};
            </NativeSelect>
        </FormControl>
    )
}

export default CountryPicker;