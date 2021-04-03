import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import Grid from "@material-ui/core/Grid";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";
import ListSubheader from '@material-ui/core/ListSubheader';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import {slice, concat} from 'lodash';
// import SaveIcon from "@material-ui/icons/SaveAlt";
// import Dialog from "@material-ui/core/Dialog";
// import CloseIcon from "@material-ui/icons/Close";
// import Typography from "@material-ui/core/Typography";
// import LinearProgress from "@material-ui/core/LinearProgress";
// import InfiniteScroll from "react-infinite-scroller";
const LENGTH = 48;
const LIMIT = 10;
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: '70%',
    height: '70%',
    transform: 'translateZ(0)',
  },
  titleBar: {
    background:
      'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
      'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  icon: {
    color: 'white',
  },
}));

export default function Gallery() {
  
  const apiKey = process.env.REACT_APP_NASA_KEY;
  const [photoData, setPhotoData] = useState(null);
  const classes = useStyles();
  const [firstLoad,setFirstlLoad] = useState(true);
  const [showMore,setShowMore] = useState(true);
  const [list,setList] = useState(slice(photoData, 0, LIMIT));
  const [index2,setIndex] = useState(0);
  useEffect(() => {
    fetchPhoto();

    async function fetchPhoto() {
      const res = await fetch(
                // we'll update the KEYHERE soon!
        `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?api_key=${apiKey}&earth_date=2016-6-5 `
      );
      const data = await res.json();
      setPhotoData(data[['photos']]);
    }
  }, [apiKey, photoData]);

  if (!photoData) return <div />;

  
  const loadMore = () =>{
    const newIndex = index2 + LIMIT;
    const newShowMore = newIndex < (LENGTH - 1);
    const newList = concat(list, slice(photoData, index2, newIndex));
    setIndex(newIndex);
    setList(newList);
    setShowMore(newShowMore);
    setFirstlLoad(false)
  }
  
  return (
    <div className="Gallery">
      <div className={classes.root}>
        <GridList cellHeight={200} spacing={1} cols= {4}className={classes.gridList}>
          {Object.entries(firstLoad? photoData.slice(0,LIMIT): list).map((image, index) => (
          <GridListTile key={index}>
            <img src={image[1].img_src} alt={image[1].id} />
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