import React from 'react';

import './AddForm.css';

const AddForm = () => {
    return (
        <div className="todo-form-wrapper">
            <h3>Add new Todo task</h3>
            <form className="todo-form">
                <input type="text" className="form-input" placeholder="Enter todo here..." />
                <button type="submit" className="form-button">
                    Add
                </button>
            </form>
        </div>
    );
};

export default AddForm;
