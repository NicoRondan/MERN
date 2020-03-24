import React, {useEffect, useState} from 'react'
import axios from 'axios';

export default function CreateUser() {
    const [users, setUsers] = useState([]);
    const [username, setUserName] = useState('');

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        const res = await axios.get('http://localhost:4000/api/users');
        setUsers(res.data);
    };

    const onChangeUserName = (e) => {
        setUserName(e.target.value);
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:4000/api/users', {
            username
        });
        setUserName('');
        getData();
    };

    const deleteUser = async (id) => {
        await axios.delete(`http://localhost:4000/api/users/${id}`);
        getData();
    };

    return (
        <div className="row">
            <div className="col-md-4">
                <div className="card card-body">
                    <h3>Create New User</h3>
                    <form onSubmit={onSubmit}>
                        <div className="form-group">
                            <input 
                            type="text"
                            value={username}
                            className="form-control"  onChange={onChangeUserName} />
                        </div>
                        <button type="submit" className="btn btn-primary">
                            Save
                        </button>
                    </form> 
                </div>
            </div>
            <div className="col-md-8">
                <ul className="list-group">
                    {
                        users.map(user => 
                        (<li 
                        key={user._id} 
                        className="list-group-item list-group-item-action"
                        onDoubleClick={() => deleteUser(user._id)}
                        style={{cursor: 'pointer'}}
                        >
                            {user.username}
                        </li>))
                    }
                </ul>
            </div>
        </div>
    )
}
