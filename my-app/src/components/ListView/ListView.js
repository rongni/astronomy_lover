import React, { useState } from "react";
import { useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import 'react-lightbox-component/build/css/index.css';

import ListContent from './ListContent';
import Order from './Order';
import DateSelect from './DateSelect';
import CountForm from './CountForm';

const api_key = process.env.NASA_KEY;

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
        const start_yyyy = start_date_list[0];
        const start_mm = start_date_list[1];
        const start_dd = start_date_list[2];
        const end_date_list = end_date.split('-')
        const end_yyyy = end_date_list[0];
        const end_mm = end_date_list[1];
        const end_dd = end_date_list[2];
        if (start_date_list.length !==3 || start_yyyy.length !== 4 || 
            start_mm.length !== 2 || start_dd.length !== 2 ||
            end_date_list.length !== 3 || end_yyyy.length !== 4 || 
            end_mm.length !== 2 || end_dd.length !== 2) {
                setError('Needs in form yyyy-mm-dd')
                return
        }

        if (/^-?\d+$/.test(start_yyyy) === false || /^-?\d+$/.test(start_mm) === false 
            || /^-?\d+$/.test(start_dd) === false || /^-?\d+$/.test(end_yyyy) === false 
            || /^-?\d+$/.test(end_mm) === false || /^-?\d+$/.test(end_dd) === false) {
                setError('Needs in form yyyy-mm-dd with integers')
                return
        }
        

        if (end_yyyy < start_yyyy || (end_yyyy === start_yyyy && end_mm < start_mm)
            || (end_yyyy === start_yyyy && end_mm === start_mm && end_dd < start_dd)) {
            setError('Needs a valid input')
        }

        let today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth()+1;
        let yyyy = today.getFullYear();

        if (end_yyyy > yyyy || (end_yyyy === yyyy && end_mm > mm)
            || (end_yyyy === yyyy && end_mm === mm && end_dd > dd)) {
            setError('Needs a valid input')
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