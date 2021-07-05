import ReactFullpage from '@fullpage/react-fullpage';
import { Grid, Collapse, IconButton, CardMedia } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { mdiGitlab, mdiLinkedin, mdiGithub, mdiLinkVariant } from '@mdi/js';
import Icon from '@mdi/react';
import React from 'react';
import clsx from 'clsx';
import Font from 'react-font'

import {
    CardHeader,
} from '@material-ui/core/';



const useStyles = makeStyles(theme => ({

    contactCard: {
        display: 'block',
        margin: 'auto',
        width: '80%',
        [theme.breakpoints.down('xs')]: {
            margin: '2.5%',
            width: '95%',
        }
    },
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
    textcolor: {
        color: "#5e35b1"
    },

    contactCardContent: {
        paddingLeft: '8%',
        paddingRight: '8%',
    },
    media: {

        height: 200,

    },

    introSpace: {
        display: 'flex',
        flexGrow: 1,
        marginLeft: '10%',
        marginRight: '10%',
        [theme.breakpoints.down('xs')]: {
            display: 'flex',

        },
        paddingLeft: '8%',
        paddingRight: '8%',
        alignItems: 'center',
    },

    section1: {

        display: 'flex',
        flexGrow: 1,
        height: '100vh',

        [theme.breakpoints.down('xs')]: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        },

    },


    section2: {

        display: 'flex',
        flexGrow: 1,
        [theme.breakpoints.down('xs')]: {
            display: 'block',
            alignItems: 'center',
            justifyContent: 'center'
        },

    },


    section3: {

        display: 'flex',
        flexGrow: 1,
        height: '100vh',
        alignItems: 'center',
        paddingLeft: '10%',
        paddingRight: '10%',
        [theme.breakpoints.down('xs')]: {
            display: 'flex',
            flexGrow: 1,
            alignItems: 'center',
            paddingLeft: '2.5%',
            paddingRight: '2.5%',
        },
    },



    paragraphcolor: {
        color: "#cbccb8",
    },


}));

export default function AboutUS() {
    const classes = useStyles();
    const data = [
        {
            name: "Peiyi Chen", imageUrl: "/peiyi.png",
            description: "Pursuing a Bachelor degree in Computer Science from the University of Illinois at Urbana-Champaign." +
                " Passionate about Machine Learning, Computer Vision,Data Science, and Software Developmentwith some courses "
                + " and projects' experience. Skilled in Python, Javascript, C/C++, Java etc.",
            linkedinLink: "https://linkedin.com/in/peiyichen", githubLink: "https://github.com/peiyic2"
        },
        {
            name: "Rongxin Ni", imageUrl: "/rni4.jpg",
            description: "Pursuing a Bachelor degree in Computer Science from the University of Illinois at Urbana-Champaign."
                + "Passionate about Software Engineering,  I’ve gained a deep understanding of both frontend"
                + "and backend through my courses and experiences. Skilled in Database System, Python, Java, C++, Javascript, etc.",


            linkedinLink: "https://www.linkedin.com/in/rongxin-ni-a817b8187",
            githubLink: "https://github.com/rongni"

        },
    ]
    const [expandedIdx, setExpandedIdx] = React.useState(-1);

    const handleExpandClick = (idx) => {
        if (expandedIdx === idx) {
            setExpandedIdx(-1);
        } else {
            setExpandedIdx(idx);
        }
    };
    const TeamCard = (elem, idx) => (
        <Grid key={idx} item md={4} sm={6} xs={12}>
            <Card>
                <CardHeader
                    className={classes.textcolor}
                    title={
                        <Font family='Satisfy' >
                            {elem.name}
                        </Font>


                    }
                />
                <CardMedia
                    align="center"
                    className={classes.media}
                    image={elem.imageUrl}
                />
                <CardActions>
                    <Grid container alignItems="center"
                        justify="space-around"
                        marginTop="22"
                        flex-direction="row"
                        spacing={2}
                    >

                        <Button className={classes.textcolor} size="medium" onClick={() => { window.open(elem.linkedinLink, '_blank') }} >
                            <Icon path={mdiLinkedin} size={1} />

                        </Button>

                        <Button className={classes.textcolor} size="medium" onClick={() => { window.open(elem.githubLink, '_blank') }}>
                            <Icon path={mdiGithub} size={1} />

                        </Button>
                        <IconButton
                            className={clsx(classes.expand, {
                                [classes.expandOpen]: expandedIdx === idx,
                            })}
                            onClick={() => handleExpandClick(idx)}
                            aria-expanded={expandedIdx === idx}
                            aria-label='show more'
                        >
                            <ExpandMoreIcon />
                        </IconButton>

                    </Grid>
                </CardActions>
                <Collapse in={expandedIdx === idx} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography paragraph>{`${elem.description}`}</Typography>
                    </CardContent>
                </Collapse>
            </Card>
        </Grid>
    );


    return (
        <div style={{
            backgroundImage: "url(/bg.jpg)", backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            width: '100vw',
            height: '100vh'
        }}>
            <ReactFullpage

                continuousVertical={true}
                fadingEffect={true}
                navigation={true}
                normalScrollElements={'.teamSection'}
                parallax={true}
                render={({ state, fullpageApi }) => {
                    return (

                        <Grid
                            container
                            alignItems="center"
                            justify="space-evenly"
                            spacing={4}
                        >

                            <div className="section">
                                <div className={classes.section1}>
                                    <Grid item className={classes.introSpace} justify="space-evenly" sm={12} xs={12}>
                                        <div>
                                            <Font family='Zen Dots'>
                                                <h1 align="center" className={classes.textcolor}>About This Website</h1>
                                                <br />
                                                <br />
                                                <h4 align="center" className={classes.textcolor}>Why We Build It ?</h4>


                                                <p className={classes.paragraphcolor}>
                                                    There's few web apps built for astronomy lovers, it is hard for astronomy
                                                    amateurs to find some interesting pictures to learn about the universe they love. We want to
                                                    build an easy-to-use web app for astronomy amateurs to browsing interesting astronomy pictures.
                                                </p>

                                                <h4 align="center" className={classes.textcolor}>How To Use It ?</h4>
                                                <p className={classes.paragraphcolor}>
                                                    Users are able to create their own accounts to save their personl information like email, avatar, description and so on. After successfully login in, User can easily looking for some interesting beautiful astronomy pictures as well as some photos collected by Mars rovers.
                                                    They can also collect the pictures they like into their collection page.
      </p>


                                                <p className={classes.paragraphcolor}>Enjoy !!!</p>

                                                <p align="right">
                                                    <Button variant="outlined" className={classes.textcolor}
                                                        onClick={() => {
                                                            fullpageApi.moveSectionUp();
                                                        }}>
                                                        <Font family='Zen Dots' >
                                                            Contact Us
                                                        </Font>

                                                    </Button>
                                                </p>
                                            </Font>
                                        </div>
                                    </Grid>
                                </div>
                            </div>


                            <div className="section">
                                <div className={classes.section2}>
                                    <h1 align="center" className={classes.textcolor}>
                                        <Font family='Zen Dots' >
                                            OUR TEAM
                                        </Font>

                                    </h1>
                                    <Grid container alignItems="center" direction="row" justify="space-evenly" spacing={1}>
                                        {data.map(TeamCard)}
                                    </Grid>
                                </div>
                            </div>


                            <div className="section">
                                <div className={classes.section3}>
                                    <Grid item className={classes.contactCard} style={{ justifyContent: 'center' }} xs={12}>
                                        <Card className={classes.contactCard} >
                                            <div className='tooltipBoundary'>
                                                <CardActionArea>
                                                    <CardContent className={classes.contactCardContent}>
                                                        <Typography align="center" className={classes.textcolor} component="h2" gutterBottom="true" variant="h5">
                                                            CONTACT US
          </Typography>
                                                        <Typography align="left" className={classes.textcolor} component="p" variant="body2">
                                                            If you have any question about this website, feel free to send email to "test@gmail.com" we will get back to you soon! <br /><br />
                                                        </Typography>
                                                        <Typography align="center" className={classes.textcolor} component="p" variant="body2">
                                                            Need More Info? Click Link Below !
          </Typography>
                                                    </CardContent>
                                                </CardActionArea>

                                                <CardActions>
                                                    <Grid container alignItems="center"
                                                        justify="space-around"
                                                        flex-direction="row"
                                                        spacing={1}
                                                    >

                                                        <Button className={classes.textcolor} size="medium"
                                                            onClick={() => { window.open('https://www.nasa.gov/') }} >
                                                            <Icon path={mdiLinkVariant} size={1.5} />
                                                               NASA Website
                            </Button>

                                                        <Button className={classes.textcolor} size="medium"
                                                            onClick={() => { window.open('https://gitlab.engr.illinois.edu/rni4/sp21-cs242-project') }} >
                                                            <Icon path={mdiGitlab} size={1.5} />
                                                               source code
                            </Button>

                                                    </Grid>
                                                </CardActions>
                                            </div>

                                        </Card>
                                    </Grid>
                                </div>
                            </div >
                        </Grid >

                    );
                }}
                scrollOverflow={true}
            />
        </div>
    );
}