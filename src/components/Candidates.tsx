import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NewCandidateForm from './NewCandidateForm'
import {baseURL} from '../api';
export default function Candidates() {
    interface ICandidate {
        id?: number;
        name: string;
        pledge: string;
        numVotes?: number;
    }
    const [candidates, setCandidates] = useState<ICandidate[]>([]);

    async function fetchAndStoreCandidates() {
        const res = await axios.get(`${baseURL}/candidates`);
        setCandidates(res.data);
    }
    useEffect(() => {
        fetchAndStoreCandidates();
    }, []);



    function handleVoteForCandidate(candidate: ICandidate) {
        axios
            .post(`${baseURL}/votes/${candidate.id}`)
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
