import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Checkbox from '@material-ui/core/Checkbox';
import ClearIcon from '@material-ui/icons/Clear';
import IconButton from '@material-ui/core/IconButton';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import TextField from '@material-ui/core/TextField';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import classes from '../materialUiStyles';
import '../App.css';

class Task extends React.Component {
    redTheme = createMuiTheme({ palette: { primary: red } });

    constructor(props) {
        super(props);
        const { id, taskName, checked } = this.props;

        this.state = {
            id,
            taskName,
            checked,
        };
    }

    handleChange = event => {
        const { name, value, checked } = event.target;
        const { id } = this.state;

        if (event.target.type === 'checkbox') {
            axios.patch(`${process.env.REACT_APP_API}/tasks/${id}`, {
                checked,
            });
            this.setState(previousState => ({ ...previousState, [name]: checked }));
        } else {
            axios.patch(`${process.env.REACT_APP_API}/tasks/${id}`, {
                name: value,
            });
            this.setState(previousState => ({ ...previousState, [name]: value }));
        }
    };

    render() {
        const { id, taskName, checked } = this.state;
        const { deleteTask } = this.props;

        return (
            <div className={classes.container}>
                <Checkbox
                    style={{ width: 20, height: 20 }}
                    name="checked"
                    checked={checked}
                    onChange={this.handleChange}
                    value={checked}
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
                    value={taskName}
                    onChange={this.handleChange}
                    margin="normal"
                    InputProps={{
                        disableUnderline: false,
                        classes: {
                            input: classes.textFieldInput,
                        },
                    }}
                />
                <ThemeProvider theme={this.redTheme}>
                    <IconButton
                        className={classes.icon}
                        aria-label="delete"
                        color="primary"
                        onClick={() => deleteTask(id)}
                    >
                        <ClearIcon fontSize="small" />
                    </IconButton>
                </ThemeProvider>
            </div>
        );
    }
}

Task.propTypes = {
    id: PropTypes.number.isRequired,
    taskName: PropTypes.string.isRequired,
    checked: PropTypes.bool.isRequired,
    deleteTask: PropTypes.func.isRequired,
};

export default Task;
