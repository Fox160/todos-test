import React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import FormGroup from '@material-ui/core/FormGroup';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { green } from '@material-ui/core/colors';
import classes from '../materialUiStyles';
import List from './List';

class MyContainer extends React.Component {
    greenTheme = createMuiTheme({ palette: { primary: green } });

    constructor() {
        super();
        this.state = {
            taskName: '',
            tasks: [],
        };
    }

    componentDidMount() {
        this.loadData();
    }

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

    handleChange = event => {
        const { name, value } = event.target;
        this.setState(previousState => ({ ...previousState, [name]: value }));
    };

    addTask = () => {
        const { tasks, taskName } = this.state;
        if (taskName === '') {
            alert('Введите название задачи');
            return;
        }
        axios.post(`${process.env.REACT_APP_API}/tasks`, {
            id: tasks.length + 1,
            name: taskName,
            checked: false,
        });

        this.loadData();

        this.setState({
            taskName: '',
        });
    };

    render() {
        const { tasks, taskName } = this.state;

        return (
            <Container maxWidth="sm">
                <Typography component="div" style={{ boxShadow: '0 0 3px rgba(0,0,0,0.5)', height: 'auto' }}>
                    <FormGroup row>
                        <TextField
                            id="outlined-basic"
                            name="taskName"
                            value={taskName}
                            onChange={this.handleChange}
                            className={classes.textField}
                            label="Task"
                            margin="normal"
                            variant="outlined"
                        />
                        <ThemeProvider theme={this.greenTheme}>
                            <Button
                                variant="outlined"
                                className={classes.button}
                                color="primary"
                                onClick={this.addTask}
                            >
                                ADD
                            </Button>
                        </ThemeProvider>
                    </FormGroup>

                    <List tasks={tasks} />
                </Typography>
            </Container>
        );
    }
}

export default MyContainer;
