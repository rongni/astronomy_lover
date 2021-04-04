import React from 'react';
import { useState, useEffect } from "react";
import Gallery from 'react-grid-gallery';
import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors'
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import { slice, concat } from 'lodash';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
const LIMIT = 20;
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    list: {
        paddingTop: 0,
        paddingBottom: 0,
        background: 'white',
        "& li": {
            fontWeight: 200,
            paddingTop: 12,
            paddingBottom: 12,
        },
        "& li:hover": {
            background: deepPurple[100]
        },
        "& li.Mui-selected": {
            color: 'white',
            background: deepPurple[400]
        },
        "& li.Mui-selected:hover": {
            background: deepPurple[500]
        }
    },
    select: {
        minWidth: 200,
        background: 'white',
        color: deepPurple[500],
        fontWeight: 200,
        borderStyle: 'none',
        borderWidth: 2,
        borderRadius: 12,
        paddingLeft: 24,
        paddingTop: 14,
        paddingBottom: 15,
        boxShadow: '0px 5px 8px -3px rgba(0,0,0,0.14)',
        "&:focus": {
            borderRadius: 12,
            background: 'white',
            borderColor: deepPurple[100]
        },
    },
    button: {
        minWidth: 100,
        background: 'white',
        color: deepPurple[500],
        fontWeight: 300,
        borderStyle: 'none',
        borderWidth: 2,
        borderRadius: 12,
        paddingLeft: 14,
        paddingTop: 14,
        paddingBottom: 15,
        boxShadow: '0px 5px 8px -3px rgba(0,0,0,0.14)',
        "&:focus": {
            borderRadius: 12,
            background: 'white',
            borderColor: deepPurple[500]
        },
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },

}));
export default function NASAGallery() {
    const apiKey = process.env.REACT_APP_NASA_KEY;
    const [imagesList, setImageList] = useState([])
    const classes = useStyles();
    const [firstLoad, setFirstlLoad] = useState(true);
    const [showMore, setShowMore] = useState(true);
    const [list, setList] = useState(slice(imagesList, 0, LIMIT));
    const [index2, setIndex] = useState(0);
    const [Length, setLength] = useState(0);
    const [val, setVal] = useState('fhaz');
    const [rover, setRover] = useState('curiosity');

    const captionStyle = {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        maxHeight: "240px",
        overflow: "hidden",
        position: "absolute",
        bottom: "0",
        width: "100%",
        color: "white",
        padding: "2px",
        fontSize: "90%"
    };
    function setData(data) {
        var tempList = [];
        data.forEach(function (entry) {
            var singObj = {}
            singObj['src'] = entry.img_src
            singObj['thumbnail'] = entry.img_src
            singObj['thumbnailWidth'] = 320
            singObj['thumbnailHeight'] = 174
            var caption = 'rover: ' + entry.rover.name + ', landing_date: ' + entry.rover.landing_date + ', launch_date: ' + entry.rover.launch_date
            singObj['tags'] = [{ value: entry.camera.name, title: 'camera name' }]
            singObj['caption'] = caption
            tempList.push(singObj)
        });
        var imagesTest = tempList.map((i) => {
            i.customOverlay = (
                <div style={captionStyle}>
                    <div>{i.caption}</div>
                    {i.hasOwnProperty('tags') &&
                        setCustomTags(i)}
                </div>);
            return i;
        });
        setImageList(imagesTest)
        // setImageList(tempList)
        console.log(imagesList)
    }

    useEffect(() => {
        fetchPhoto();

        async function fetchPhoto() {
            const res = await fetch(
                // we'll update the KEYHERE soon!
                `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?api_key=${apiKey}&earth_date=2016-6-3 `
            );
            const data = await res.json();
            setLength(Object.keys(data[['photos']]).length);
            // setPhotoData(data[['photos']]);
            setData(data[['photos']])
        }

    }, []);


    const handleSumbit = (evt) => {
        evt.preventDefault();
        fetchPhoto();
        setImageList([])

        async function fetchPhoto() {
            const res = await fetch(
                // we'll update the KEYHERE soon!
                `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=1000&&camera=${val}&api_key=${apiKey} `
            );
            const data = await res.json();
            setLength(Object.keys(data[['photos']]).length);
            setData(data[['photos']])
        }
    };
    const customTagStyle = {
        wordWrap: "break-word",
        display: "inline-block",
        backgroundColor: "black",
        height: "auto",
        fontSize: "75%",
        fontWeight: "600",
        lineHeight: "1",
        padding: ".2em .6em .3em",
        borderRadius: ".25em",
        color: "yellow",
        verticalAlign: "baseline",
        margin: "2px"
    };


    function setCustomTags(i) {
        return (
            i.tags.map((t) => {
                return (<div
                    key={t.title}
                    style={customTagStyle}>
                    {t.value}
                </div>);
            })
        );
    }
    const loadMore = () => {
        const newIndex = index2 + LIMIT;
        const newShowMore = newIndex < (Length - 1);
        const newList = concat(list, slice(imagesList, index2, newIndex));
        setIndex(newIndex);
        setList(newList);
        setShowMore(newShowMore);
        setFirstlLoad(false)
    }
    const handleChange = (event) => {
        event.preventDefault();
        setVal(event.target.value);
    };
    const handleChangeRover = (event) => {
        event.preventDefault();
        setRover(event.target.value);

    };

    const iconComponent = (props) => {
        return (
            <ExpandMoreIcon className={props.className + " " + classes.icon} />
        )
    };
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
    function onSelectImage(index, image) {
        var images = this.state.images.slice();
        var img = images[index];
        if (img.hasOwnProperty("isSelected"))
            img.isSelected = !img.isSelected;
        else
            img.isSelected = true;

        this.setState({
            images: images
        });
    }



    return (
        <div className="Test">
            <FormControl>
                <Select
                    disableUnderline
                    classes={{ root: classes.select }}
                    MenuProps={menuProps}
                    IconComponent={iconComponent}
                    value={rover}
                    onChange={handleChangeRover}
                >
                    <MenuItem value={'curiosity'}>Curiosity</MenuItem>
                    <MenuItem value={'opportunity'}>Opportunity</MenuItem>
                    <MenuItem value={'spirit'}>Spirit</MenuItem>
                </Select>
            </FormControl>
            <FormControl>
                <Select
                    disableUnderline
                    classes={{ root: classes.select }}
                    MenuProps={menuProps}
                    IconComponent={iconComponent}
                    value={val}
                    onChange={handleChange}
                >
                    <MenuItem value={'fhaz'}>Front Hazard Avoidance Camera</MenuItem>
                    <MenuItem value={'rhaz'}>Rear Hazard Avoidance Camera</MenuItem>
                    <MenuItem value={'navcam'}>Navigation Camera</MenuItem>
                </Select>
            </FormControl>
            <div style={{ paddingLeft: 20 }}>
                <button className={classes.button} onClick={handleSumbit}> Submit </button>
            </div>


            <div style={{
                paddingTop: 50,
                paddingLeft: 200,
                paddingRight: 200,
                // position: 'absolute', left: '50%', top: '35%',
                // transform: 'translate(-50%, -50%)',
                display: "block",
                // display: 'flex',
                // justifyContent: 'center',
                // alignItems: 'center',
                // height: '100vh',
                overflow: "auto",
                minHeight: "1px",
                width: "100%",
                // border: "1px solid #ddd",
                // overflow: "auto",
                // textAlign: "center",
                // background: "white"
            }}>
                <Gallery images={firstLoad ? imagesList.slice(0, LIMIT) : list} showLightboxThumbnails onSelectImage={onSelectImage} />
            </div>
            <div style={{ paddingTop: 20 }}>
                {showMore && <button onClick={loadMore}> Load More </button>}
            </div>
        </div>


    );

}