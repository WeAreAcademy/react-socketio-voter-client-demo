import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';
import NewCandidateForm from './NewCandidateForm'

export default function Candidates() {
    interface ICandidate {
        id?: number;
        name: string;
        pledge: string;
        numVotes?: number;
    }
    const [candidates, setCandidates] = useState<ICandidate[]>([]);

    async function fetchAndStoreCandidates() {
        const res = await axios.get(
            'https://socketioserverfinished.neillbogie.repl.co/candidates'
        );
        setCandidates(await res.data);
    }
    useEffect(() => {
        fetchAndStoreCandidates();
    }, []);

    useEffect(() => {
        console.log('trying to set up socket.io');

        const socket = io(
            'https://socketioserverfinished.neillbogie.repl.co'
        );

        console.log('socket connected');

        socket.emit('hello', 'from react!');

        socket.on('candidates', (receivedCandidates: ICandidate[]) => {
            console.log('socketio rx: candidates');
            setCandidates(receivedCandidates);
        });

        socket.on('time', (serverId, timeStr, randomNum) => {
            console.log('socketio rx: req', timeStr);
        });
        socket.on('req', (path) => {
            console.log('socketio rx: req', path);
        });

        console.log('socket registered listeners');

        function desubscribe() {
            socket.emit('desubscribing...');
            socket.disconnect();
        }
        return desubscribe;
    }, []);


    function handleVoteForCandidate(candidate: ICandidate) {
        axios
            .post(`https://socketioserverfinished.neillbogie.repl.co/votes/${candidate.id}`)

            .then(function (response) {
                console.log('after posting candidate: ', response);
            })
            .catch(function (error) {
                console.log('when posting candidate: ', error);
            });
    }


    return (
        <div className="candidatesList">
            Candidates:
            {candidates.map((c) => (
                <div key={c.id}>
                    <span>{c.name}</span>
                    <span>({c.pledge})</span>
                    <span>Votes: {c.numVotes}</span>
                    <button onClick={ev => handleVoteForCandidate(c)}>Vote for {c.name}</button>
                </div>
            ))}
            <NewCandidateForm />
        </div>
    );
}
