import React, {useEffect, useState} from "react";
import {Button, FormControl, IconButton, makeStyles, TextField, Typography} from "@material-ui/core";
import auth from "./auth";
import Link from 'next/link';
import { useRouter } from 'next/router'
import Layout from '../components/layout';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
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
    signUpWrap: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 2px 4px rgb(0 0 0 / 10%)',
        margin: 15,
    },
    signUp: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: 15,
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        '&>*': {
            margin: 15,
            width: 600,
        }
    },
    names: {
        display: 'flex',
        '&>*': {
            margin:5,
            width: 600,
        }
    }
}))



export default function SignUp(props: any) {
    const classes = useStyles();
    const router = useRouter();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [values, setValues] = React.useState({
        password: '',
        showPassword: false,
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleRegisterUser = async (event) => {
event.preventDefault()
        auth.login(() => {
            router.push("/login")
        });
        const res = await fetch(
            'api/users',
            {
                body: JSON.stringify({firstName: `${firstName}`, lastName: `${lastName}`, email: `${email}`, password: `${values.password}` }),
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST'
            }
        )

        const result = await res.json()
        console.log("result", result);
    }

    return (
            <div className={classes.main}>
            <div className={classes.signUpWrap}>
                <div className={classes.signUp}>
                    <Typography component="h1" variant="h5">
                        Sign Up
                    </Typography>
                    <form className={classes.form} onSubmit={handleRegisterUser} method="POST">
                        <div className={classes.names}>
                            <FormControl variant="outlined" required>
                                <InputLabel htmlFor="firstName">First Name</InputLabel>
                                <OutlinedInput
                                id="firstName"
                                name="firstName"
                                autoFocus
                                value={firstName}
                                onChange={e => setFirstName(e.target.value)}
                                labelWidth={128}
                                required
                            />
                            </FormControl>
                            <FormControl variant="outlined" required>
                                <InputLabel htmlFor="lastName">Last Name</InputLabel>
                                <OutlinedInput
                                id="lastName"
                                name="lastName"
                                value={lastName}
                                onChange={e => setLastName(e.target.value)}
                                labelWidth={128}
                                required
                            />
                            </FormControl>
                        </div>
                        <FormControl variant="outlined" required>
                            <InputLabel htmlFor="email">Email</InputLabel>
                        <OutlinedInput
                            id="email"
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            labelWidth={70}
                            required
                        />
                        </FormControl>
                        <FormControl variant="outlined" required>
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <OutlinedInput
                                id="password"
                                type={values.showPassword ? "text" : "password"}
                                value={values.password}
                                onChange={handleChange("password")}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                            size="small"
                                        >
                                            {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                labelWidth={120}
                            />
                        </FormControl>
                        <Button variant="contained" color="primary" type="submit">Sign Up</Button>
                    </form>
                    <Link href="/login">Already have an account? </Link>
                </div>
            </div>
            </div>
    )
}
