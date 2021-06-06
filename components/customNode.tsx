import React, {useState} from 'react';
import 'beautiful-react-diagrams/styles.css';
import {Avatar, Button, IconButton, InputAdornment, makeStyles, TextField} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import ClearIcon from '@material-ui/icons/Clear';
import styles from '../styles/playground.module.css';



const useStyles = makeStyles(theme => ({
    input: {
        color: '#fff',
        '& :-webkit-autofill': {
            transitionDelay: '9999s'}
    },
    avatar: {
        width: 80,
        height: 80,
        background: '#7b1fa2',
    },
    deleteButton: {
        position: 'absolute',
        top: '-8px',
        color: '#7b1fa2',
        marginRight: '5px'
    }
}))


// the diagram model
export default function customNode(props)  {
    const { id, data, inputs,outputs } = props;
    const classes = useStyles();
    const [nameValue, setNameValue] = useState({name:"", needToClearName: false});
    const [titleValue, setTitleValue] = useState({title:"", needToClearTitle: false});

    const handleNameChange = e => {
        setNameValue({name: e.target.value, needToClearName: true});

    }

    const handleTitleChange = e => {
        setTitleValue({title: e.target.value, needToClearTitle: true});
    }


    const handleClearName = e => {
        setNameValue({name: "", needToClearName: false})
    }

    const handleClearTitle = e => {
        setTitleValue({title: "", needToClearTitle: false})
    };


    const focusUsernameInputField = input => {
        if (input) {
            setTimeout(() => {input.focus()}, 100);
        }
    };

    const portStyle = { width: '15px', height: '15px', background: '#7b1fa2', borderRadius: '40%', alignItems: 'center', margin: '-5px' };

    return (<>
        <div className={styles.wrapper}>
            <div className={styles.inputs}>
                {inputs.map((port) => React.cloneElement(port, {
                    style: portStyle
                }))}
            </div>
            { id !=='node-1' && <div className={styles.node}>
              <Button className={classes.deleteButton} onClick={()=>data.onClick(id)}><DeleteIcon/></Button>
            </div>}
            <form>
                <div className={styles.form}>
                    <Avatar alt="" src="/images/avatar/1.jpg" className={classes.avatar} />
                    <div className={styles.text} >
                        <TextField
                            id="full-name"
                            placeholder="Name"
                            InputProps={{
                                className: classes.input,
                                disableUnderline: false,
                                autoFocus: true,
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="clear input"
                                            onClick={handleClearName}
                                        >
                                            <ClearIcon className={!nameValue.needToClearName? "hide" : ""}/>
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                            value={nameValue.name}
                            ref={focusUsernameInputField}
                            onChange={handleNameChange}
                        />
                        <TextField
                            id="title"
                            placeholder="Title"
                            multiline={true}
                            InputProps={{
                                className: classes.input,
                                disableUnderline: false,
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="clear input"
                                            onClick={handleClearTitle}
                                        >
                                            <ClearIcon className={!titleValue.needToClearTitle ? "hide" : ""}/>
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                            value={titleValue.title}
                            onChange={handleTitleChange}
                        />
                    </div>
                </div>
            </form>
            <div className={styles.outputs}>
                {outputs.map((port) => React.cloneElement(port, {
                    style: portStyle
                }))}
            </div>
        </div>
    </>);
};
