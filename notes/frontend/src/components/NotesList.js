import React, { useState, useEffect } from 'react'
import axios from 'axios';
import {format} from 'timeago.js';
import {Link} from 'react-router-dom';

export default function NotesList() {
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        const res = await axios.get('http://localhost:4000/api/notes');
        setNotes(res.data);
    };

    const deleteNote = async (id) => {
        await axios.delete(`http://localhost:4000/api/notes/${id}`);
        getData();
    };

    return (
        <div className="row">
            {
                notes.map(note => (
                    <div className="col-md-4 p-2" key={note._id}>
                        <div className="card">
                        <div className="card-header d-flex justify-content-between">
                            <h5>{note.title}</h5>
                            <Link to={`/edit/${note._id}`} className="btn btn-secondary">
                                Edit
                            </Link>
                        </div>
                            <div className="card-body">
                                <p>{note.content}</p>
                                <p>{note.author}</p>
                                <p>{format(note.date)}</p>
                            </div>
                            <div className="card-footer">
                                <button className="btn btn-danger"
                                onClick={() => deleteNote(note._id)}>
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}
