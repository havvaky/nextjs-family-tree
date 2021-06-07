import React, {useContext, useState} from 'react';
import {Avatar, Button, IconButton, makeStyles, FormControl} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Link from 'next/link';
import { useRouter } from 'next/router'
import auth from './auth';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import result from 'postcss/lib/result';
import { AppContext } from './AppContext';



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
        alignItems: 'center',
        justifyContent: 'center',
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
        marginBottom: 0,
        backgroundColor: theme.palette.primary.main,
    }
}))


export default function login() {
    const router = useRouter();
    const context = useContext(AppContext);
    console.log("context", context);
    const classes = useStyles();

    const [email, setEmail] = useState("");
    const [values, setValues] = React.useState({
        password: '',
        showPassword: false,
    });

    const [loginData, setLoginData] = useState({message:"", email: "", password: "", status:""  })

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
        setLoginData(result);
        console.log("message", result.message)
;
        auth.login(() => {
            if (email === result.email && values.password === result.password) {
                router.push("/");
                // @ts-ignore
                context.toggleSignIn();
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
                        {loginData.message ? <div className="loginMessage">{loginData.message}</div> : ""}
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
                                labelWidth={120}
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
