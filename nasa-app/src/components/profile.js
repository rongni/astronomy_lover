
import {
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    Divider,
    Typography,
    Grid,
    TextField,
    CardHeader,

} from '@material-ui/core';
import { useState, useEffect, } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors'
const auth_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjA3YTQ5NjY5MWE0OTBhMjE1Yzc0NzU3In0sImlhdCI6MTYxODYyNjkxOCw"
    + "iZXhwIjoxNjE5MDU4OTE4fQ.uf2gfb7hcqlvWfl6iw5f_JLUu8SmBvfUeiQzglAshsE"


const myHeaders = new Headers();
myHeaders.append('Content-Type', 'application/json');
myHeaders.append('auth-token', auth_token);
export let useremail = '';
const useStyles = makeStyles((theme) => ({

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


export default function UserProfile(props) {


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

        <div>

            <div>
                <Card {...props}>
                    <CardContent>
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
                            <Typography
                                color="textPrimary"
                                gutterBottom
                                variant="h3"
                            >
                                {user.name}
                            </Typography>
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
                    <Divider />
                </Card>

            </div>
            <div>
                <form
                    autoComplete="off"
                    noValidate
                    {...props}
                >
                    <Card>
                        <CardHeader
                            subheader="The information can be edited"
                            title="Profile"
                        />
                        <Divider />
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
                        <Divider />
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                                p: 2
                            }}
                        >
                            <Button
                                color="primary"
                                variant="contained"
                                onClick={handleSumbit}
                            >
                                Save details
                            </Button>
                        </Box>
                    </Card>
                </form>
            </div>
            <div style={{ paddingTop: 20 }}>
                <button className={classes.button} onClick={handleDeleteUser}> Delete </button>
            </div>
        </div>
    );


}

