import React, {useEffect, useState} from 'react';
import {BaseUrl} from "../../constants";
import axios from "axios";

function List(props) {
    const [tasks, setTasks] = useState([])
    useEffect(() => {

        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: BaseUrl + '/api/tasks/',
            headers: {
                'Authorization': 'Token ' + localStorage.getItem("Token"),
                'Content-Type': 'application/json'
            },
        };

        axios.request(config)
            .then((response) => {
                console.log(response.data)
                setTasks(response.data);
                console.log("after set tasks: ", tasks);
            })
            .catch((error) => {
                console.log(error);
            });
// eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <h1>Task List</h1>
            {tasks.map((task) => (
                <li key={task.id}>
                    <h2>{task.title}</h2>
                    <p>{task.description}</p>
                    <p>Status: {task.status}</p>
                </li>
            ))}
        </div>
    );
}

export default List;