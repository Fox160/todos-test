import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import '../App.css';
import Task from './Task';

class List extends React.Component {
    constructor(props) {
        super(props);
        const { tasks } = this.props;
        this.state = {
            tasks,
        };
    }

    // componentDidMount() {
    //     this.loadData();
    // }

    componentDidUpdate() {
        axios.get(`${process.env.REACT_APP_API}/tasks`).then(res => {
            const { tasks } = this.state;
            if (tasks.length !== res.data.length) {
                this.setState({ tasks: res.data });
            }
        });
    }

    loadData = () => {
        axios.get(`${process.env.REACT_APP_API}/tasks`).then(res => {
            this.setState({ tasks: res.data });
            return res.data;
        });
    };

    deleteTask = id => {
        axios.delete(`${process.env.REACT_APP_API}/tasks/${id}`);
        this.loadData();
    };

    render() {
        const { tasks } = this.state;

        return (
            <>
                {tasks.map(task => (
                    <React.Fragment key={task.id}>
                        <Task id={task.id} taskName={task.name} checked={task.checked} deleteTask={this.deleteTask} />
                    </React.Fragment>
                ))}
            </>
        );
    }
}

List.propTypes = {
    tasks: PropTypes.instanceOf(Array).isRequired,
    // tasks: PropTypes.arrayOf(
    //     PropTypes.shape({
    //         id: PropTypes.number.isRequired,
    //         taskName: PropTypes.string.isRequired,
    //         checked: PropTypes.bool.isRequired,
    //     }),
    // ),
};

export default List;
