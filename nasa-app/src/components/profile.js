
import {
    Avatar,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Divider,
    Typography,
    Grid,
    TextField,
    CardHeader,

} from '@material-ui/core';
import { useState, useEffect, } from "react";
const auth_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjA3YTQ5NjY5MWE0OTBhMjE1Yzc0NzU3In0sImlhdCI6MTYxODYyNjkxOCw"
    + "iZXhwIjoxNjE5MDU4OTE4fQ.uf2gfb7hcqlvWfl6iw5f_JLUu8SmBvfUeiQzglAshsE"

const myHeaders = new Headers();
myHeaders.append('Content-Type', 'application/json');
myHeaders.append('auth-token', auth_token);
export let useremail = '';



export default function UserProfile(props) {


    const [user, setUser] = useState('')
    const [values, setValues] = useState({ username: '', password: '' });


    const handleChange = (event) => {

        setValues({
            ...values,
            [event.target.name]: event.target.value
        });
    };


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
                    <CardActions>
                        <Button
                            color="primary"
                            fullWidth
                            variant="text"
                        >
                            Upload picture
          </Button>
                    </CardActions>
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
                                        helperText="Please specify the first name"
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
        </div>
    );


}

