import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import FormGroup from '@material-ui/core/FormGroup';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider, makeStyles } from '@material-ui/styles';
import { green } from '@material-ui/core/colors';
import List from './List';

const useStyles = makeStyles({
    textField: {
        display: 'flex',
        marginLeft: 8,
        marginRight: 8,
        flexGrow: 1,
    },
    button: {
        display: 'flex',
        marginTop: 16,
        marginBottom: 8,
        marginRight: 16,
        marginLeft: 8,
        padding: 16,
        flexGrow: 0.5,
    },
});

const MyContainer = () => {
    const [taskName, setTaskName] = useState('');
    const [tasks, setTasks] = useState([]);

    const greenTheme = createMuiTheme({ palette: { primary: green } });
    const classes = useStyles();

    const loadData = () => {
        axios.get(`${process.env.REACT_APP_API}/tasks`).then(res => {
            setTasks(res.data);
            return res.data;
        });
    };

    const addTask = () => {
        if (taskName === '') {
            return;
        }
        axios.post(`${process.env.REACT_APP_API}/tasks`, {
            id: tasks.length + 1,
            name: taskName,
            checked: false,
        });

        loadData();
        setTaskName('');
    };

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/tasks`).then(res => {
            if (tasks.length !== res.data.length) {
                setTasks(res.data);
            }
        });
    }, [tasks]);

    const handleChange = event => {
        const { value } = event.target;
        setTaskName(value);
    };

    return (
        <Container maxWidth="sm" style={{ marginTop: 30 }}>
            <Typography component="div" style={{ boxShadow: '0 0 3px rgba(0,0,0,0.5)', height: 'auto' }}>
                <FormGroup row>
                    <TextField
                        id="outlined-basic"
                        name="taskName"
                        value={taskName}
                        onChange={handleChange}
                        className={classes.textField}
                        label="Task"
                        margin="normal"
                        variant="outlined"
                    />
                    <ThemeProvider theme={greenTheme}>
                        <Button variant="outlined" className={classes.button} color="primary" onClick={addTask}>
                            ADD
                        </Button>
                    </ThemeProvider>
                </FormGroup>

                {tasks.length !== 0 ? <List tasks={tasks} /> : null}
            </Typography>
        </Container>
    );
};

export default MyContainer;
