import React, { useEffect, useState } from 'react';
import ReactFlow from 'react-flow-renderer';


const initialElements = [
    { id: '1', data: { label: '-' , title: ''}, position: { x: 100, y: 100 } },
    { id: '2', data: { label: 'Node 2', title:'' }, position: { x: 100, y: 200 } },
    { id: 'e1-2', source: '1', target: '2' },
];

export default function flow() {
    const [elements, setElements] = useState(initialElements);
    const [nodeName, setNodeName] = useState('');
    const [title, setTitle] = useState("")

    useEffect(() => {
        setElements((els) =>
            els.map((el) => {
                if (el.id === '1') {
                    // it's important that you create a new object here
                    // in order to notify react flow about the change
                    el.data = {
                        ...el.data,
                        label: nodeName,
                        title: title,
                    };
                }

                return el;
            })
        );
    }, [nodeName, title, setElements]);


    return (
        <ReactFlow elements={elements}>
            <div>
                <label>label:</label>
                <input
                    value={nodeName}
                    onChange={(evt) => setNodeName(evt.target.value)}
                />

                <label>title:</label>
                <input value={title} onChange={(evt) => setTitle(evt.target.value)} />
            </div>
        </ReactFlow>
    );
}
