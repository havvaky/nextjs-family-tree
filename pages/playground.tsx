import React, {useState} from 'react';
import 'beautiful-react-diagrams/styles.css';
import Diagram, { createSchema, useSchema } from 'beautiful-react-diagrams';
import {Avatar, Button, makeStyles, TextField} from '@material-ui/core';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import styles from '../styles/playground.module.css'



// the diagram model

const useStyles = makeStyles(theme => ({
    input: {
        '& :-webkit-autofill': {
            transitionDelay: '9999s'}
    },
    avatar: {
        width: 70,
        height: 70,
        background: '#7b1fa2'
    }
}))

const CustomNode = (props) => {
    const { id, content, data, inputs,outputs } = props;
    const classes = useStyles();
    const [name, setName] = useState("");
    const [title, setTitle] = useState("");

    const handleNameChange = e => {
        setName(e.target.value);
    }

    const handleTitleChange = e => {
        setTitle(e.target.value);
    }
    const handleClean = e => {
        setName("");
        setTitle("");
    }

    return (<>
        <div className={styles.main}>
            <div className={styles.inputs}>
                {inputs.map((port) => React.cloneElement(port, {
                    style: { width: '15px', height: '15px', background: '#7b1fa2', borderRadius: '40%', alignItems: 'center', margin: '-5px' }
                }))}
            </div>
            { id =='node-1' ?  <div className={styles.node}>
                <Button onClick={handleClean}><DeleteOutlineIcon/></Button>
            </div> : <div className={styles.node}>
                <Button onClick={()=>data.onClick(id)}><DeleteForeverIcon/></Button>
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
                                disableUnderline: true,
                            }}
                            value={name}
                            onChange={handleNameChange}
                        />
                        <TextField
                            id="title"
                            placeholder="Title"
                            multiline={true}
                            InputProps={{
                                className: classes.input,
                                disableUnderline: true,
                            }}
                            value={title}
                            onChange={handleTitleChange}
                        />
                    </div>
                </div>
            </form>
            <div className={styles.outputs}>
                {outputs.map((port) => React.cloneElement(port, {
                    style: { width: '15px', height: '15px', background: '#7b1fa2', borderRadius: '40%', alignItems: 'center', margin: '-5px' }
                }))}
            </div>
        </div>
    </>);
};

const initialSchema = createSchema({
    nodes: [
        {
            id: 'node-1',
            content: 'Node 1',
            coordinates: [150, 60],
            outputs: [ { id: 'port-1'} ],
            inputs: [ { id: 'port-2'} ],
            render: CustomNode,
        },
    ],
    links: [
        // { input: 'port-1',  output: 'port-2', label: 'spouse' }
    ]
});


export default function playground() {
    // create diagrams schema
    const [schema, { onChange, addNode, removeNode }] = useSchema(initialSchema);

    const deleteNodeFromSchema = (id) => {
        const nodeToRemove = schema.nodes.find(node => node.id === id);
        removeNode(nodeToRemove);

    };

    const addNewNode = () => {
        const nextNode = {
            id: `node-${schema.nodes.length+1}`,
            content: `Node ${schema.nodes.length+1}`,
            coordinates: [
                schema.nodes[schema.nodes.length - 1].coordinates[0] + 350,
                schema.nodes[schema.nodes.length - 1].coordinates[1] + 150,
            ],
            render: CustomNode,
            data: {onClick: deleteNodeFromSchema},
            inputs: [{ id: `port-${Math.random()}`}],
            outputs: [{ id: `port-${Math.random()}`}],
        };

        // @ts-ignore
        addNode(nextNode);
    }


    return (
        <div style={{ height: '100vh', width: '100vw' }}>
            <Button variant="contained" color="primary" onClick={addNewNode}><PersonAddIcon/></Button>
            <Diagram schema={schema} onChange={onChange} />
        </div>
    );
};
