import React, {useState} from 'react';
import {Avatar, Button, IconButton, makeStyles, TextField, FormControl} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Link from 'next/link';
import { useRouter } from 'next/router'
import auth from './auth';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';


const useStyles = makeStyles(theme => ({
    main: {
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    wrapper: {
        height: 500,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 2px 4px rgb(0 0 0 / 10%)',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        padding: 35,
        '&>*': {
            margin: 15,
            width: 400,
        }
    },
    link: {
        display: 'flex',
        justifyContent: 'center'
    },
    lockIcon: {
        marginTop: 40,
        backgroundColor: theme.palette.primary.main,
    }
}))


export default function Signin() {
    const router = useRouter();
    const classes = useStyles();

    const [email, setEmail] = useState("");
    const [values, setValues] = React.useState({
        password: '',
        showPassword: false,
    });
    const [loginData, setLogindata] = useState({message:"", email: "", password: "", status:""  })

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };


    const handleButtonClick = async (event) => {
        event.preventDefault();
       // console.log(email, password);

        const res = await fetch(
            'api/login',
            {
                body: JSON.stringify({email: `${email}`, password: `${values.password}` }),
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST'
            }
        )

        let result = await res.json();
        console.log("result", result);
        setLogindata(result);
        console.log("message", result.message)
;
        auth.login(() => {
            if (email === result.email && values.password === result.password) {
                router.push("/");
            }
        })

    }

    return(<>
            <div className={classes.main}>
                <div className={classes.wrapper}>
                    <Avatar className={classes.lockIcon}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <form className={classes.form} method="POST">
                        <TextField
                            id="outlined-basic"
                            label="Email"
                            type="email"
                            autoComplete="current-email"
                            variant="outlined"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                        />
                        <FormControl variant="outlined" required>
                            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={values.showPassword ? "text" : "password"}
                                value={values.password}
                                onChange={handleChange("password")}
                                endAdornment={
                                    <InputAdornment position="end" variant="filled">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            edge="end"
                                            size="small"
                                        >
                                            {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                labelWidth={125}
                            />
                        </FormControl>
                        <Button variant="contained" color="primary" onClick={handleButtonClick}>Sign In</Button>
                        <div className={classes.link}>
                            <Link href="/signup">
                                Don't have an account? Sign Up
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
 </>)
}
