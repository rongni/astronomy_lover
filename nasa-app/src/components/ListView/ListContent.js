import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, List } from '@material-ui/core';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Lightbox from 'react-lightbox-component';

const ListContent = ({ photoDataList }) => {

    const useStyles = makeStyles({
        root: {
          maxWidth: 1500,
        },
        list: {
            width: '100%',
            maxWidth: 1500,
            alignItems: 'center',
            justifyContent: 'center',
        },
        content: {
            paddingLeft: 30
        },
    });
    const classes = useStyles();

    return (
        <List className={classes.list} >
            {photoDataList.map(photoData => (
                <Card className={classes.root}>
                <CardActionArea>
                    <Lightbox images={[{ src: photoData.url, title: photoData.date, description: photoData.explanation}]} />
                    <CardContent style={ {paddingLeft: 200} }>
                        <Typography gutterBottom variant="h5" component="h2">
                            {photoData.date}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {photoData.explanation}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                </Card>
            ))}
        </List>
    )
}

export default ListContent
