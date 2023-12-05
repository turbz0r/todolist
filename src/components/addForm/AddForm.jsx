import React, { useState } from 'react';
import { ConfigProvider, Button, Input, Space } from 'antd';

import './AddForm.css';

const AddForm = (props) => {
    const [input, setInput] = useState('');

    const handleSubmit = () => {
        if (input.trim().length > 0) {
            props.onPostTodo(input);
        }
    };

    return (
        <div className='todo-form-wrapper'>
            <h3>Add new Todo task</h3>
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: '#c38154',
                    },
                }}
            >
                <Space.Compact
                    style={{
                        width: '100%',
                    }}
                >
                    <Input
                        placeholder='Enter todo here...'
                        onChange={(e) => {
                            setInput(e.target.value);
                        }}
                    />
                    <Button
                        type='primary'
                        onClick={() => {
                            handleSubmit();
                        }}
                    >
                        Submit
                    </Button>
                </Space.Compact>
            </ConfigProvider>
        </div>
    );
};

export default AddForm;
