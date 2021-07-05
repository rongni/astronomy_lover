
import {
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    Typography,
    Grid,
    TextField,
    CardHeader,

} from '@material-ui/core';
import { useState, useEffect, } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadUser } from '../actions/auth';
import Font from 'react-font'



export let useremail = '';
const useStyles = makeStyles((theme) => ({
    editCard: {
        paddingTop: '40'
    },
    profile: {
        display: 'block',
        margin: 'auto',
        width: '60%',
        color: "#5e35b1"
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


function UserProfile({ auth: { token }, loadUser }, props) {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('auth-token', token);


    const [user, setUser] = useState('')
    const [values, setValues] = useState({ username: '', password: '', avatar: '' });
    const classes = useStyles();


    const handleChange = (event) => {

        setValues({
            ...values,
            [event.target.name]: event.target.value
        });
    };
    const handleDeleteUser = (event) => {
        event.preventDefault();
        DeleteUser()
        async function DeleteUser() {
            const res = await fetch(

                '/api/user/me', {
                method: 'Delete',

                headers: myHeaders,

            }

            );
            const data = await res.json();
            if (data) {
                alert("Delete Success!")
            }
        }

    }


    async function getData(url, methods, headers, bodys) {

        const res = await fetch(url, {
            method: methods,
            headers: headers,
            body: bodys
        }
        );
        const data = await res.json()
        setUser(data)
        useremail = data.email
    }
    // }
    const handleSumbit = (evt) => {
        evt.preventDefault();
        if (values.username) {
            getData('/api/user/me/username', 'PUT', myHeaders, JSON.stringify({ 'name': values.username }))
            alert("name change success")
        }
        if (values.password) {
            getData('/api/user/me/password', 'PUT', myHeaders, JSON.stringify({ 'password': values.password }))
            alert("password change success")
        }
        if (values.avatar) {
            getData('/api/user/me/avatar', 'PUT', myHeaders, JSON.stringify({ 'avatar': values.avatar }))
            alert("avatar change success")
        }

    }




    useEffect(() => {
        getData('/api/user/me', 'GET', myHeaders, null)
    }, []);


    return (

        <div align='center' style={{
            backgroundImage: "url(/bg.jpg)", backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            width: '100vw',
            height: '100vh',
        }}>

            <div className={classes.profile}>
                <Card {...props} >
                    <CardContent className={classes.profile}>
                        <Box
                            sx={{
                                alignItems: 'center',
                                display: 'flex',
                                flexDirection: 'column'
                            }}
                        >
                            <Avatar
                                src={user.avatar}
                            />
                            <Font family='Zen Dots'>
                                {user.name}

                            </Font>
                            <Typography
                                color="textSecondary"
                                variant="body1"
                            >
                                {`${user.email}`}
                            </Typography>
                            <Typography
                                color="textSecondary"
                                variant="body1"
                            >
                                {` ${user.date}`}
                            </Typography>
                        </Box>
                    </CardContent>
                </Card>

            </div>
            <div className={classes.editCard}>
                <form
                    autoComplete="off"
                    noValidate
                    {...props}
                >
                    <Card className={classes.profile}>
                        <CardHeader
                            subheader="The information can be edited"
                            title={
                                <Font family='Zen Dots' >
                                    Profile
                                </Font>


                            }

                        />

                        <CardContent>
                            <Grid
                                container
                                spacing={2}
                            >
                                <Grid
                                    item
                                    md={4}
                                    xs={12}
                                >
                                    <TextField
                                        fullWidth
                                        label="user name"
                                        name="username"
                                        onChange={handleChange}
                                        required
                                        value={values.username}
                                        variant="outlined"
                                    />
                                </Grid>



                                <Grid
                                    item
                                    md={4}
                                    xs={12}
                                >
                                    <TextField
                                        fullWidth
                                        label="Chaneg Password"
                                        name="password"
                                        onChange={handleChange}
                                        value={values.state}
                                        variant="outlined"
                                    >
                                    </TextField>
                                </Grid>
                                <Grid
                                    item
                                    md={4}
                                    xs={12}
                                >
                                    <TextField
                                        fullWidth
                                        label="Chaneg avatar"
                                        helperText="Please enter valid url"
                                        name="avatar"
                                        onChange={handleChange}
                                        value={values.state}
                                        variant="outlined"
                                    >
                                    </TextField>
                                </Grid>
                            </Grid>

                        </CardContent>

                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                                p: 2
                            }}
                        >
                            <Button className={classes.profile}

                                onClick={handleSumbit}
                            >
                                <Font family='Zen Dots' >
                                    Save details
                                </Font>

                            </Button>
                        </Box>
                    </Card>
                </form>
            </div>
            <div style={{ paddingTop: 20 }}>
                <button className={classes.button} onClick={handleDeleteUser}>
                    <Font family='Zen Dots' >
                        Delete
                    </Font>
                </button>
            </div>
        </div>
    );


}
UserProfile.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth
});


export default connect(mapStateToProps, { loadUser })(UserProfile);

