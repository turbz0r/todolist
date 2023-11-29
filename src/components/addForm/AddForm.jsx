import React from 'react';
import { ConfigProvider, Button, Input, Space } from 'antd';

import './AddForm.css';

const AddForm = () => {
    return (
        <div className="todo-form-wrapper">
            <h3>Add new Todo task</h3>
            <ConfigProvider
                theme={{
                    components: {
                        Button: {
                            colorPrimary: '#c38154',
                            algorithm: true,
                        },
                        Input: {
                            colorPrimary: '#c38154',
                            algorithm: true,
                        },
                    },
                }}>
                <Space.Compact
                    style={{
                        width: '100%',
                    }}>
                    <Input placeholder="Enter todo here..." />
                    <Button type="primary">Submit</Button>
                </Space.Compact>
            </ConfigProvider>
        </div>
    );
};

export default AddForm;
