import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NewCandidateForm from './NewCandidateForm'
import { baseURL } from '../api';
import fakeCandidatesData from '../data/fakeCandidatesData.json'
export default function Candidates() {
    interface ICandidate {
        id?: number;
        name: string;
        pledge: string;
        numVotes?: number;
    }

    const [candidates, setCandidates] = useState<ICandidate[]>([]);

    async function fetchAndStoreCandidates() {
        try {
            const res = await axios.get(`${baseURL}/candidates`);
            setCandidates(res.data);
        } catch (err) {
            console.error('error fetching candidates', err);
        }

    }
    useEffect(() => {
        fetchAndStoreCandidates();
    }, []);



    function handleVoteForCandidate(candidate: ICandidate) {
        axios
            .post(`${baseURL}/votes/${candidate.id}`)
            .catch(function (error) {
                console.log('Error when posting candidate: ', error);
            });
    }


    return (
        <div className="candidatesList">
            <h2>Candidates:</h2>
            {candidates.map((c) => (
                <div className='candidate' key={c.id}>
                    <span className='name'>{c.name}</span>
                    <span className='pledge'>"{c.pledge}"</span>
                    <span className='votes'>Votes: <span className='voteNumber'>{c.numVotes}</span></span>
                    <button onClick={ev => handleVoteForCandidate(c)}>Vote for {c.name}</button>
                </div>
            ))}
            <NewCandidateForm />
        </div>
    );
}
