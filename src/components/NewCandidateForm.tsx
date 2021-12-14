import React, { useState } from 'react';
import axios from 'axios';

export default function NewCandidateForm() {
    const [name, setName] = useState('');
    const [pledge, setPledge] = useState('');

    function handleAddCandidate() {
        const body = { name, pledge };
        axios
            .post('https://socketioserverfinished.neillbogie.repl.co/candidates', body)
            .then(function (response) {
                console.log('after posting candidate: ', response);
            })
            .catch(function (error) {
                console.error('when posting candidate: ', error);
            });
    }
    return (
        <div>
            <input
                type="text"
                value={name}
                placeholder="name"
                onChange={(e) => setName(e.target.value)}
            />

            <input
                type="pledge"
                value={pledge}
                placeholder="pledge"
                onChange={(e) => setPledge(e.target.value)}
            />
            <button onClick={handleAddCandidate}>Add</button>
        </div>
    );
}
