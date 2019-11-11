import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Checkbox from '@material-ui/core/Checkbox';
import ClearIcon from '@material-ui/icons/Clear';
import IconButton from '@material-ui/core/IconButton';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import TextField from '@material-ui/core/TextField';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme, makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import '../App.css';

const useStyles = makeStyles({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        padding: '0 15px',
        '&:last-child': {
            paddingBottom: 16,
        },
    },
    textField: {
        display: 'flex',
        marginLeft: 8,
        marginRight: 8,
        flexGrow: 1,
    },
    taskField: {
        paddingTop: 0,
        marginRight: 0,
        marginLeft: 0,
    },
    textFieldInput: {
        paddingTop: 0,
        marginLeft: 8,

        '&:focus': {
            marginLeft: 0,
        },
    },
    icon: {
        padding: 9,
    },
});

const Task = props => {
    const redTheme = createMuiTheme({ palette: { primary: red } });
    const { id, taskName, checked, deleteTask } = props;

    const [taskId] = useState(id);
    const [stateTaskName, setTaskName] = useState(taskName);
    const [taskChecked, setTaskChecked] = useState(checked);

    const classes = useStyles();

    const handleChange = event => {
        const { value } = event.target;

        if (event.target.type === 'checkbox') {
            axios.patch(`${process.env.REACT_APP_API}/tasks/${taskId}`, {
                checked: event.target.checked,
            });
            setTaskChecked(event.target.checked);
        } else {
            axios.patch(`${process.env.REACT_APP_API}/tasks/${taskId}`, {
                name: value,
            });
            setTaskName(value);
        }
    };

    return (
        <div className={classes.container}>
            <Checkbox
                style={{ width: 20, height: 20 }}
                name="checked"
                checked={taskChecked}
                onChange={handleChange}
                value={taskChecked}
                inputProps={{
                    'aria-label': 'primary checkbox',
                }}
                icon={<CheckBoxOutlineBlankIcon style={{ fontSize: 20 }} />}
                checkedIcon={<CheckBoxIcon style={{ fontSize: 20 }} />}
            />
            <TextField
                id="standard-name"
                className={`${classes.textField} ${classes.taskField}`}
                name="taskName"
                value={stateTaskName}
                onChange={handleChange}
                margin="normal"
                InputProps={{
                    disableUnderline: false,
                    classes: {
                        input: classes.textFieldInput,
                    },
                }}
            />
            <ThemeProvider theme={redTheme}>
                <IconButton className={classes.icon} aria-label="delete" color="primary" onClick={() => deleteTask(id)}>
                    <ClearIcon fontSize="small" />
                </IconButton>
            </ThemeProvider>
        </div>
    );
};

Task.defaultProps = {
    id: 0,
    taskName: '',
    checked: false,
};

Task.propTypes = {
    id: PropTypes.number,
    taskName: PropTypes.string,
    checked: PropTypes.bool,
    deleteTask: PropTypes.func.isRequired,
};

export default Task;
