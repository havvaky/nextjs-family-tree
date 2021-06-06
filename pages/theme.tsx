import { createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';

const theme = createMuiTheme({
    spacing: 4,
    palette: {
        primary: {
            main:  purple[400],
        },
        secondary: {
            main: purple[700],
        },
    },
    props: {
        // Name of the component ⚛️
        MuiButtonBase: {
            // The properties to apply
            disableRipple: true, // when true No more ripple, on the whole application 💣!
        },
        MuiLink: {
            underline: 'hover',
        },

    },
    overrides: {
        MuiButton: {
            root: {
                textTransform: 'none',
                 minWidth: '5px',
            },
            text: {
                size: 'medium',
                padding: 0,
            },
        },
        MuiSvgIcon: {
            root: {
                width: '1.2em',
                height: '1.2em',
                fontSize: '0.7rem',
            },
        },
        MuiInputBase: {
            root: {
                fontSize: '0.7rem',
                fontWeight: 400,

            }
        },
        MuiIconButton: {
            root: {
                '&:hover': {
                    backgroundColor: "none"
                },
            }
        }
    },
});

export default theme;
