import React, { useState, useEffect, useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import Grid from "@material-ui/core/Grid";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";
import ListSubheader from '@material-ui/core/ListSubheader';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { slice, concat } from 'lodash';
import { deepPurple, red } from '@material-ui/core/colors'
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Typography from '@material-ui/core/Typography';
import { photos } from "./photos";
// import Lightbox from "react-awesome-lightbox";
// You need to import the CSS only once
import Lightbox from 'react-lightbox-component';
import 'react-lightbox-component/build/css/index.css';

// import SaveIcon from "@material-ui/icons/SaveAlt";
// import Dialog from "@material-ui/core/Dialog";
// import CloseIcon from "@material-ui/icons/Close";
// import Typography from "@material-ui/core/Typography";
// import LinearProgress from "@material-ui/core/LinearProgress";
// import InfiniteScroll from "react-infinite-scroller";
const LIMIT = 9;
const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: 50,
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: '80%',
    height: '70%',
    transform: 'translateZ(0)',
  },
  titleBar: {
    background:
      'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
      'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  icon2: {
    color: 'white',
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

  icon: {
    color: deepPurple[300],
    right: 12,
    position: 'absolute',
    userSelect: 'none',
    pointerEvents: 'none'
  },
  paper: {
    borderRadius: 12,
    marginTop: 8
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
  root2: {
    maxWidth: 345,
  },
  // media: {
  //   height: 200,
  //   // paddingTop: '56.25%', // 16:9
  // },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export const NASAGallery = () => {

  const apiKey = process.env.REACT_APP_NASA_KEY;
  const [photoData, setPhotoData] = useState(null);
  const classes = useStyles();
  const [firstLoad, setFirstlLoad] = useState(true);
  const [showMore, setShowMore] = useState(true);
  const [list, setList] = useState(slice(photoData, 0, LIMIT));
  const [index2, setIndex] = useState(0);
  const [Length, setLength] = useState(0);
  const [val, setVal] = useState('fhaz');
  const [rover, setRover] = useState('curiosity');
  // const [datalist, setDataList] = useState([])
  // const [currentImage, setCurrentImage] = useState(0);
  // const [viewerIsOpen, setViewerIsOpen] = useState(false);
  // const openLightbox = useCallback((event, { photo, index }) => {
  //   setCurrentImage(index);
  //   setViewerIsOpen(true);
  // }, []);
  useEffect(() => {
    fetchPhoto();

    async function fetchPhoto() {
      const res = await fetch(
        // we'll update the KEYHERE soon!
        `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?api_key=${apiKey}&earth_date=2016-6-3 `
      );
      const data = await res.json();
      setLength(Object.keys(data[['photos']]).length);
      setPhotoData(data[['photos']]);
    }
  }, []);


  const handleSumbit = (evt) => {
    evt.preventDefault();
    fetchPhoto();

    async function fetchPhoto() {
      const res = await fetch(
        // we'll update the KEYHERE soon!
        `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=1000&&camera=${val}&api_key=${apiKey} `
      );
      const data = await res.json();
      setLength(Object.keys(data[['photos']]).length);
      setPhotoData(data[['photos']]);
    }
    // setVal('');
    // setRover('');
  };


  if (!photoData) return <div />;
  var tempList = [];
  photoData.forEach(function (entry) {
    var singObj = {}
    singObj['src'] = entry.img_src
    singObj['thumbnail'] = entry.img_src
    singObj['thumbnailWidth'] = 200
    singObj['thumbnailHeight'] = 200
    tempList.push(singObj)
  });
  console.log(tempList)

  const loadMore = () => {
    const newIndex = index2 + LIMIT;
    const newShowMore = newIndex < (Length - 1);
    const newList = concat(list, slice(photoData, index2, newIndex));
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
  // const handleSumbit = () => {
  //   console.log('submit')
  // }
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




  return (
    <div className="Gallery">
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
      <button onClick={handleSumbit}> Submit </button>
      <div className={classes.root}>
        <GridList cellHeight={150} spacing={1} cols={3} className={classes.gridList}>
          {Object.entries(firstLoad ? photoData.slice(0, LIMIT) : list).map((image, index) => (
            <GridListTile key={index}>
              <Lightbox images={[{ src: image[1].img_src, title: concat(image[1].rover.name, image[1].camera.full_name) }]} />
              <GridListTileBar
                title={image[1].rover.name}
                titlePosition="top"
                actionIcon={
                  <IconButton aria-label={`star ${image[1].rover.name}`} className={classes.icon}>
                    <StarBorderIcon />
                  </IconButton>
                }
                actionPosition="left"
                className={classes.titleBar}
              />


            </GridListTile>
          ))}
        </GridList>
      </div>
      {showMore && <button onClick={loadMore}> Load More </button>}
    </div>
  );
}