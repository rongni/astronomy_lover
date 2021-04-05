import React, { useState } from "react";
import { useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import 'react-lightbox-component/build/css/index.css';

import ListContent from './ListContent';
import Order from './Order';
import DateSelect from './DateSelect';
import CountForm from './CountForm';

// const api_key = process.env.NASA_KEY;
const api_key = "55gWSlDn1f5YKdU7TSVRTeFlYch1ZTUdtLxNaiOW"

function ListView() {
    const [photoDataList, setPhotoDataList] = useState(null);
    const [todayData, setTodayData] = useState(null);
    const [start_date, setStartDate] = useState('')
    const [end_date, setEndDate] = useState('')
    const [count, setCount] = useState('')
    const [order, setOrder] = useState(null)
    const [error, setError] = useState('')

    const handleCountChange = (event) => {
        setCount(event.target.value)
    }

    const handleStartChange = (event) => {
        setStartDate(event.target.value)
    }

    const handleEndChange = (event) => {
        setEndDate(event.target.value)
    }

    const handleCountSubmit =  (event) => {
        event.preventDefault()
        if (/^-?\d+$/.test(count) === false) {
            setError('Needs an integer')
            return
        }
        setError('')
        fetchPhoto();
        async function fetchPhoto() {
            const res = await fetch(
                `https://api.nasa.gov/planetary/apod?api_key=${api_key}&count=${count}`
            );
            const data = await res.json();
            setPhotoDataList(data);
        }
        setCount('')
    }

    const handleDateSubmit =  (event) => {
        event.preventDefault()
        const start_date_list = start_date.split('-')
        const end_date_list = end_date.split('-')
        if (start_date_list.length !==3 || start_date_list[0].length !== 4 || 
            start_date_list[1].length !== 2 || start_date_list[2].length !== 2 ||
            end_date_list.length !== 3 || end_date_list[0].length !== 4 || 
            end_date_list[1].length !== 2 || end_date_list[2].length !== 2) {
                setError('Needs in form yyyy-mm-dd')
                return
        }

        if (/^-?\d+$/.test(start_date_list[0]) === false || /^-?\d+$/.test(start_date_list[1]) === false 
            || /^-?\d+$/.test(start_date_list[2]) === false || /^-?\d+$/.test(end_date_list[0]) === false 
            || /^-?\d+$/.test(end_date_list[1]) === false || /^-?\d+$/.test(end_date_list[2]) === false) {
                setError('Needs in form yyyy-mm-dd with integers')
                return
        }
        setError('')
        fetchPhoto();
        async function fetchPhoto() {
            const res = await fetch(
                `https://api.nasa.gov/planetary/apod?api_key=${api_key}&start_date=${start_date}&end_date=${end_date}`
            );
            const data = await res.json();
            setPhotoDataList(data);
        }
        setStartDate('')
        setEndDate('')
    }

    const useStyles = makeStyles({
        today: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        form: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        content: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        error: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'red'
        }
    });
    const classes = useStyles();

    useEffect(() => {
        fetchPhoto();
        async function fetchPhoto() {
            const today = await fetch(
                `https://api.nasa.gov/planetary/apod?api_key=${api_key}`
            );
            const today_data = await today.json();
            setTodayData(today_data);


            const res = await fetch(
                `https://api.nasa.gov/planetary/apod?api_key=${api_key}&start_date=2000-02-21&end_date=2000-02-24`
            );
            const data = await res.json();
            setPhotoDataList(data);
        }
    }, [])

    if (!photoDataList) return <div />

    
    return (
        <>  
            <div className={classes.today}>
                <img src={todayData.url} alt={todayData.title} />
            </div>
            
            <div className={classes.form}>
                
                <CountForm count={count} 
                    handleCountChange={handleCountChange} 
                    handleCountSubmit={handleCountSubmit} />
                
                <DateSelect 
                    start_date={start_date} 
                    end_date={end_date} 
                    handleDateSubmit={handleDateSubmit} 
                    handleStartChange={handleStartChange} 
                    handleEndChange={handleEndChange} />

                <Order 
                    order={order}
                    photoDataList={photoDataList}
                    setPhotoDataList={setPhotoDataList}
                    setOrder={setOrder} />
            </div>
            <div className={classes.error}>
                <p>{error}</p>
            </div>
            <div className={classes.content}>
                <ListContent photoDataList={photoDataList} />
            </div>
        </>
    )
}

export default ListView;