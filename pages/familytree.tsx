import React from 'react';
import 'beautiful-react-diagrams/styles.css';
import Diagram, { createSchema, useSchema } from 'beautiful-react-diagrams';


const CustomNode = ({ id, content, data, inputs, outputs}) => {

    return (<>
        <div className='container'>
                <div style={{ padding: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <img src="../images/" alt="Havva" width={150} height={150} />
                    <div className='name' >{content}</div>
                </div>
            <div>
                {outputs.map((port) => React.cloneElement(port))}
                {inputs.map((port) => React.cloneElement(port))}
            </div>
            <style jsx>
                {`
            .container {
            background-color: #d79de0;
            border-radius: 5px;
            box-shadow: 12px 12px 12px rgb(0 0 0 / 20%);
            color: #fff;
            }
            `}
            </style>
        </div>
    </>);
};


let initialSchema = createSchema({
    nodes: [
        {
            id: 'node-1',
            content: 'Havva Yildiz',
            coordinates: [150, 60],
            inputs: [ { id: 'port-1', alignment: 'right' } ],
            outputs: [ { id: 'port-2', alignment: 'left'} ],
            render: CustomNode,
        },
        {
            id: 'node-2',
            content: 'Ayhan Yildiz',
            coordinates: [850, 60],
            inputs: [ { id: 'port-3', alignment: 'right' } ],
            outputs: [ { id: 'port-4', alignment: 'left'} ],
            render: CustomNode,
        },
        {
            id: 'node-3',
            content: 'Melis Yildiz',
            coordinates: [250, 360],
            inputs: [ { id: 'port-1', alignment: 'right' } ],
            outputs: [ { id: 'port-2', alignment: 'left'} ],
            render: CustomNode,
        },
        {
            id: 'node-4',
            content: 'Selim Yildiz',
            coordinates: [650, 360],
            inputs: [ { id: 'port-3', alignment: 'right' } ],
            outputs: [ { id: 'port-4', alignment: 'left'} ],
            render: CustomNode,
        },
    ],
    links: [
        { input: 'node-1',  output: 'node-2', label: 'spouse' },
        { input: 'node-1',  output: 'node-3', label: 'daughter' },
        { input: 'node-1',  output: 'node-4', label: 'son' }
    ]
});

export default function familytree() {
    const [schema, { onChange }] = useSchema(initialSchema);
    return (
        <div style={{ height: '100vh' }}>
            <Diagram schema={schema} onChange={onChange} />
        </div>
    );
};
