import React, { useState } from "react";
import { useEffect } from "react";
import 'react-lightbox-component/build/css/index.css';
import ListContent from './ListContent';
import { getDate, getDateFromAPI } from './utils'

import Carousel from 'react-bootstrap/Carousel'
import { createMuiTheme } from '@material-ui/core'
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from "@date-io/date-fns";
import { deepPurple } from '@material-ui/core/colors'
import { useStyles } from '../utils'

import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

// const api_key = process.env.REACT_APP_NASA_KEY;
const api_key = "55gWSlDn1f5YKdU7TSVRTeFlYch1ZTUdtLxNaiOW"
const NUM_TEST = /^-?\d+$/

const customTheme = createMuiTheme({
    palette: {
        primary: {
            main: deepPurple[500],
            light: deepPurple[500],
            dark: deepPurple[500],
        },
        secondary: {
            main: deepPurple[500],
        },
    },
})


function ListView() {
    const [photoDataList, setPhotoDataList] = useState(null);
    const [todayData, setTodayData] = useState(null);
    const [yesterdayData, setYesterdayData] = useState(null);
    const [b4yesData, setB4yesData] = useState(null);
    const [selStartDate, setSelStartDate] = useState(new Date('2016-06-03'));
    const [selEndDate, setSelEndDate] = useState(new Date('2016-06-07'));
    const [start_date, setStartDate] = useState('2016-06-03')
    const [end_date, setEndDate] = useState('2016-06-07')
    const [count, setCount] = useState('')
    const [order, setOrder] = useState(null)
    const [error, setError] = useState('')

    // handle count change
    const handleCountChange = (event) => {
        setCount(event.target.value)
    }

    // handle start date change
    const handleStartChange = (date, value) => {
        setStartDate(value)
        setSelStartDate(date)
    }

    // handle end date change
    const handleEndChange = (date, value) => {
        setEndDate(value)
        setSelEndDate(date)
    }

    // handle count submit
    const handleCountSubmit =  (event) => {
        event.preventDefault()
        if (NUM_TEST.test(count) === false) {
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

    // handle date change submit
    const handleDateSubmit =  (event) => {
        event.preventDefault()
        const [start_date_list, start_yyyy, start_mm, start_dd] = getDate(start_date);
        const [end_date_list, end_yyyy, end_mm, end_dd] = getDate(end_date);
        console.log(start_date_list)
        console.log(end_date_list)
        if (start_date_list.length !==3 || start_yyyy.length !== 4 || 
            start_mm.length !== 2 || start_dd.length !== 2 ||
            end_date_list.length !== 3 || end_yyyy.length !== 4 || 
            end_mm.length !== 2 || end_dd.length !== 2) {
            setError('Needs in form yyyy-mm-dd')
            return
        }

        if (NUM_TEST.test(start_yyyy) === false || NUM_TEST.test(start_mm) === false 
            || NUM_TEST.test(start_dd) === false || NUM_TEST.test(end_yyyy) === false 
            || NUM_TEST.test(end_mm) === false || NUM_TEST.test(end_dd) === false) {
            setError('Needs in form yyyy-mm-dd with integers')
            return
        }
        

        if (end_yyyy < start_yyyy || (end_yyyy === start_yyyy && end_mm < start_mm)
            || (end_yyyy === start_yyyy && end_mm === start_mm && end_dd < start_dd)) {
            setError('Start date should before end dates')
            return
        }

        let today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth()+1;
        let yyyy = today.getFullYear();

        if (end_yyyy > yyyy || (end_yyyy === yyyy && end_mm > mm)
            || (end_yyyy === yyyy && end_mm === mm && end_dd > dd)) {
            setError('Needs a valid date input')
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

    // Handle Order Change
    const handleOrderChange = (event) => {
        setOrder(event.target.value)
        if (event.target.value === 'asc') {
            const dataList = photoDataList.sort((a, b) => {
                const [, a_year, a_month, a_day] = getDate(a.date)
                const [, b_year, b_month, b_day] = getDate(b.date)
                if (a_year === b_year) {
                    if (a_month === b_month) {
                        return a_day - b_day;
                    }
                    return a_month - b_month;
                }
                return a_year - b_year;
            });
            setPhotoDataList(dataList);
        } else {
            const dataList = photoDataList.sort((a, b) => {
                const [, a_year, a_month, a_day] = getDate(a.date)
                const [, b_year, b_month, b_day] = getDate(b.date)
                if (a_year === b_year) {
                    if (a_month === b_month) {
                        return b_day - a_day;
                    }
                    return b_month - a_month;
                }
                return b_year - a_year;
            });
            setPhotoDataList(dataList);
        }
    }
    
    const classes = useStyles();

    useEffect(() => {
        fetchPhoto();
        async function fetchPhoto() {
            // today's image
            const today = await fetch(
                `https://api.nasa.gov/planetary/apod?api_key=${api_key}`
            );
            const today_data = await today.json();
            setTodayData(today_data);
            
            // yeseterday's image
            const date2 = new Date();
            date2.setDate(date2.getDate() - 1);
            const yesterday_date = getDateFromAPI(date2)
            const yesterday = await fetch(
                `https://api.nasa.gov/planetary/apod?api_key=${api_key}&date=${yesterday_date}`
            );
            const yesterday_data = await yesterday.json();
            setYesterdayData(yesterday_data)
            
            // the day before yesterday's image
            const date3 = new Date();
            date3.setDate(date3.getDate() - 7);
            const b4yes_date = getDateFromAPI(date3)
            const b4yes = await fetch(
                `https://api.nasa.gov/planetary/apod?api_key=${api_key}&date=${b4yes_date}`
            );
            const b4yes_data = await b4yes.json();
            setB4yesData(b4yes_data)
            
            // init photoDataList
            console.log('start_date ' + String(start_date))
            const res = await fetch(
                `https://api.nasa.gov/planetary/apod?api_key=${api_key}&start_date=${start_date}&end_date=${end_date}`
            );
            const data = await res.json();
            setPhotoDataList(data);
        }
    }, [])

    const menuProps = {
        classes: {
            paper: classes.paper,
            list: classes.list
        },
        anchorOrigin: {
            vertical: "bottom",
            horizontal: "left"
        },
        transformOrigin: {
            vertical: "top",
            horizontal: "left"
        },
        getContentAnchorEl: null
    };

    if (!photoDataList) return <div />

    
    return (
        <div style={{ 
            backgroundImage: "url(/bg.jpg)", 
            backgroundPosition: 'center',
            backgroundSize: 'cover',
          }} >  
          {/* Three-image Carousel */}
            <Carousel fade>
                <Carousel.Item>
                    <Carousel.Caption>
						<h3> {todayData.date} </h3>
					</Carousel.Caption>
                    <div className={classes.form}>
                        <img 
                            className="d-block w-90"
                            src={todayData.url} 
                            alt={todayData.title} />
                    </div>
                    
                </Carousel.Item>
                <Carousel.Item>
                    <div className={classes.form}>
                        <img 
                            className="d-block w-90"
                            src={yesterdayData.url} 
                            alt={yesterdayData.title} />
                    </div>
                    <Carousel.Caption>
						<h3> {yesterdayData.date} </h3>
					</Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <div className={classes.form}>
                        <img 
                            className="d-block w-90"
                            src={b4yesData.url} 
                            alt={b4yesData.title} />
                    </div>
                    <Carousel.Caption>
						<h3> {b4yesData.date} </h3>
					</Carousel.Caption>
                </Carousel.Item>
            </Carousel>
            
            <div className={classes.form}>
                {/* Handle count change */}
                <div>
                    <input
                    style={{ backgroundColor: "#263238", color: "#ede7f6" }}
                    type="text"
                    value={count}
                    onChange={handleCountChange}
                    className="form-control"
                    placeholder='count number'
                    />
                </div>

                <div style={{ paddingLeft: 10 }}>
                    <button className={classes.button} onClick={handleCountSubmit}> Submit </button>
                </div>

                {/* Handle date change */}
                <div style={{ paddingLeft: 20 }}>
                    <MuiThemeProvider theme={customTheme}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                className={classes.date}
                                disableToolbar
                                variant="inline"
                                format="yyyy-MM-dd"
                                paddingLeft='20'
                                id="date-picker-inline"
                                label="start date"
                                value={selStartDate}
                                onChange={(date, value) => { handleStartChange(date, value); }}
                                KeyboardButtonProps={{
                                    className: classes.input,
                                    "aria-label": "change date"
                                }}
                            />
                        </MuiPickersUtilsProvider>
                    </MuiThemeProvider>
                    </div>

                    <div style={{ paddingLeft: 20 }}>
                    <MuiThemeProvider theme={customTheme}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                className={classes.date}
                                disableToolbar
                                variant="inline"
                                format="yyyy-MM-dd"
                                paddingLeft='10'
                                id="date-picker-inline"
                                label="end date"
                                value={selEndDate}
                                onChange={(date, value) => { handleEndChange(date, value); }}
                                KeyboardButtonProps={{
                                    className: classes.input,
                                    "aria-label": "change date"
                                }}
                            />
                        </MuiPickersUtilsProvider>
                    </MuiThemeProvider>
                </div>

                <div style={{ paddingLeft: 10 }}>
                    <button className={classes.button} onClick={handleDateSubmit}> Submit </button>
                </div>

                {/* Handle order change */}
                <div style={{ paddingLeft: 20 }}>
                <FormControl>
                    <Select
                        disableUnderline
                        classes={{ root: classes.select }}
                        MenuProps={menuProps}
                        value={order}
                        onChange={handleOrderChange}
                    >
                        <MenuItem value={'asc'}>Ascending</MenuItem>
                        <MenuItem value={'desc'}>Descending</MenuItem>
                    </Select>
                </FormControl>
                </div>
                
            </div>

            {/* Handle error display */}
            <div className={classes.error}>
                <p>{error}</p>
            </div>
            
            {/* Handle photoDataList display */}
            <div className={classes.form}>
                <ListContent photoDataList={photoDataList} />
            </div>
        </div>
    )
}

export default ListView;