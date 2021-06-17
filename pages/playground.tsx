import React, {useContext} from 'react';
import 'beautiful-react-diagrams/styles.css';
import Diagram, { createSchema, useSchema } from 'beautiful-react-diagrams';
import { Button } from '@material-ui/core';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import styles from '../styles/playground.module.css';
import CustomNode from '../components/customNode';
import {AppContext} from './AppContext';



interface NodeArray {
    id: string,
    content: string,
    coordinates: number[],
    render: (props: any) => JSX.Element,
    data: {onClick: (id: any) => void},
    inputs: {id: string}[],
    outputs: {id: string}[],
}


const initialSchema = createSchema({
    nodes: [
        {
            id: 'node-1',
            content: 'Node 1',
            coordinates: [550, 60],
            outputs: [ { id: 'port-1'} ],
            inputs: [ { id: 'port-2'} ],
            render: CustomNode,
        },
    ]
});


export default function playground() {
    const context = useContext(AppContext);
    console.log("context", context);

    // create diagrams schema
    const [schema, { onChange, addNode, removeNode }] = useSchema(initialSchema);

    const deleteNodeFromSchema = (id) => {
        const nodeToRemove = schema.nodes.find(node => node.id === id);
        removeNode(nodeToRemove);

    };

    const addNewNode = () => {
        const nextNode: NodeArray = {
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
        <div className={styles.main}>
            <Button className={styles.addPerson} variant="contained" color="primary" onClick={addNewNode}><PersonAddIcon/></Button>
            <Diagram schema={schema} onChange={onChange} />
        </div>
    );
};
