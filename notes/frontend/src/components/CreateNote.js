import React, { useEffect, useState } from 'react'
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'

export default function CreateNote(props) {
    const [users, setUsers] = useState([]);
    const [userSelected, setUserSelected] = useState('');
    const [date, setDate] = useState(new Date());
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [editing, setEditing] = useState(false);
    const [id, setId] = useState('');

    useEffect(() => {
        getData();
        if (props.match.params) {
            getNote();
            setEditing(true);
            setId(props.match.params.id);
        };
    }, []);

    const getNote = async () => {
       const res = await axios.get(`http://localhost:4000/api/notes/${props.match.params.id}`)
       setTitle(res.data.title);
       setContent(res.data.content);
       setDate(new Date(res.data.date));
       setUserSelected(res.data.author);
    };

    const getData = async () => {
        const res = await axios.get('http://localhost:4000/api/users');
        setUsers(res.data.map(user => user.username));
        setUserSelected(res.data[0].username);
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const newNote = {
            title,
            content,
            date,
            author: userSelected
        };
        if (editing) {
            await axios.put(`http://localhost:4000/api/notes/${id}`, newNote);
        } else {
            await axios.post('http://localhost:4000/api/notes', newNote);
        }
        window.location.href = '/';
    };

    const onChangeDate = date => {
        setDate(date);
    };

    return (
        <div className="col-md-6 offset-md-3">
            <div className="card card-body">
                <h4>Create a Note</h4>
                {/*Select user */}
                <div className="form-group">
                    <select 
                    className="form-control"
                    name="userSelected"
                    onChange={(e) => setUserSelected(e.target.value)}
                    value={userSelected}
                    >
                        {
                            users.map(user => (
                                <option key={user} value={user}>
                                    {user}
                                </option>
                            ))
                        }
                    </select>
                </div>
                
                <div className="form-group">
                    <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Title" 
                    name="title"
                    value={title}
                    required
                    onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                
                <div className="form-group">
                    <textarea 
                    name="content"
                    className="form-control"
                    placeholder="Content"
                    value={content}
                    required
                    onChange={(e) => setContent(e.target.value)}
                    >
                    </textarea>
                </div>

                <div className="form-group">
                    <DatePicker 
                    className="form-control" 
                    selected={date}
                    onChange={onChangeDate}
                    />
                </div>

                <form onSubmit={onSubmit}>
                    <button type="submit" className="btn btn-primary">
                        Save  
                    </button>
                </form>
            </div>
        </div>
    )
}
