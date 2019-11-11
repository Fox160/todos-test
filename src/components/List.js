import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import '../App.css';
import Task from './Task';

const List = props => {
    const { tasks } = props;
    const [stateTasks, setTasks] = useState(tasks);

    const loadData = () => {
        axios.get(`${process.env.REACT_APP_API}/tasks`).then(res => {
            setTasks(res.data);
            return res.data;
        });
    };

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/tasks`).then(res => {
            if (stateTasks.length !== res.data.length) {
                setTasks(res.data);
            }
            return res.data;
        });
    }, [stateTasks]);

    useEffect(() => {
        loadData();
    }, [tasks]);

    const deleteTask = id => {
        axios.delete(`${process.env.REACT_APP_API}/tasks/${id}`);
        loadData();
    };

    return (
        <>
            {stateTasks.map(task => (
                <React.Fragment key={task.id}>
                    <Task id={task.id} taskName={task.name} checked={task.checked} deleteTask={deleteTask} />
                </React.Fragment>
            ))}
        </>
    );
};

List.defaultProps = {
    tasks: [],
};

List.propTypes = {
    tasks: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number,
            name: PropTypes.string,
            checked: PropTypes.boolean,
        }),
    ),
};

export default List;
