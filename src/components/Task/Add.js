import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {BaseUrl} from "../../constants";


function Add(props) {
    const [token, setToken] = useState("");
    const [Err, setErr] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("todo");

    // Status choices
    const STATUS_CHOICES = [
        {value: 'todo', label: 'To Do'},
        {value: 'in_progress', label: 'In Progress'},
        {value: 'done', label: 'Done'},
    ];

    useEffect(() => {
        setToken(localStorage.getItem("Token"));
    }, []);

    const handleCreateTask = () => {
        let data = JSON.stringify({
            "title": title,
            "description": description,
            "status": status
        });

        console.log("Request Data: ", data);
        console.log("Authorization Header: ", `Token ${token}`);

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: BaseUrl + '/api/tasks/',
            headers: {
                'Authorization': `Token ${token}`,
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                 setErr("Create Task success");
            })
            .catch((error) => {
                console.log("Error: ", error.response.data);
                setErr("Error creating task");
            });
    };




    function TitleChangeHandler(event) {
        setTitle(event.target.value);
    }

    function DescriptionChangeHandler(event) {
        setDescription(event.target.value);
    }

    function StatusChangeHandler(event) {
        console.log(event.target.value);
        setStatus(event.target.value);
    }

    return (
        <div>
            {/*<Home />*/}
            <h1>Create Task</h1>
            <div>
                <label htmlFor="Title">Title</label>
                <input type="text" placeholder="Title" value={title} onChange={TitleChangeHandler} />
            </div>
            <div>
                <label htmlFor="Description">Description</label>
                <input type="text" placeholder="Description" value={description} onChange={DescriptionChangeHandler} />
            </div>
            <div>
                <label htmlFor="Status">Status</label>
                <select placeholder="Status" value={status} onChange={StatusChangeHandler}>
                    {STATUS_CHOICES.map((statusChoice) => (
                        <option key={statusChoice.value} value={statusChoice.value}>
                            {statusChoice.label}
                        </option>
                    ))}
                </select>
            </div>
            <button placeholder="Create Task" onClick={handleCreateTask}>Create Task</button>
            {Err && <p>{Err}</p>}
            {/*<List />*/}
        </div>
    );
}

export default Add;
