import React, { useEffect, useState } from 'react';
import { Button, ConfigProvider, Input, List, Skeleton, Space } from 'antd';

import './TodoList.css';

const count = 6;
const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat,picture&noinfo`;

const date = new Date().toLocaleDateString('en-GB');

const TodoList = () => {
    const [initLoading, setInitLoading] = useState(true);
    const [loading, setLoading] = useState(false);
    const [editItem, setEditItem] = useState(false);
    const [data, setData] = useState([]);
    const [list, setList] = useState([]);
    const [editedTodo, setEditedTodo] = useState('');

    useEffect(() => {
        fetch(fakeDataUrl)
            .then((res) => res.json())
            .then((res) => {
                setInitLoading(false);
                setData(res.results);
                setList(res.results);
            });
    }, []);
    const onLoadMore = () => {
        setLoading(true);
        setList(
            data.concat(
                [...new Array(count)].map(() => ({
                    loading: true,
                }))
            )
        );
        fetch(fakeDataUrl)
            .then((res) => res.json())
            .then((res) => {
                const newData = data.concat(res.results);
                setData(newData);
                setList(newData);
                setLoading(false);
                window.dispatchEvent(new Event('resize'));
            });
    };
    const loadMore =
        !initLoading && !loading ? (
            <div
                style={{
                    textAlign: 'center',
                    marginTop: 12,
                    height: 32,
                    lineHeight: '32px',
                }}>
                <ConfigProvider
                    theme={{
                        components: {
                            Button: {
                                colorPrimary: '#c38154',
                                algorithm: true,
                            },
                        },
                    }}>
                    <Button onClick={onLoadMore}>Load more</Button>
                </ConfigProvider>
            </div>
        ) : null;

    const EditInput = ({ item }) => {
        return (
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
                    <Input value={item.gender} />
                    <Button type="primary">Save</Button>
                </Space.Compact>
            </ConfigProvider>
        );
    };

    return (
        <List
            className="demo-loadmore-list"
            loading={initLoading}
            itemLayout="horizontal"
            loadMore={loadMore}
            dataSource={list}
            renderItem={(item) => (
                <div className="list-item-wrap">
                    <List.Item
                        actions={[<a key="list-loadmore-edit">edit</a>, <a key="list-loadmore-delete">delete</a>]}>
                        <Skeleton title={false} loading={item.loading} active>
                            <List.Item.Meta description="Ant Design, a design language for background applications, is refined by Ant UED Team" />
                            <div className="list-item-date">
                                <span>Added on : </span>
                                {date}
                            </div>
                        </Skeleton>
                    </List.Item>
                    {editItem ? <EditInput item={item} /> : null}
                    <div className="separator" />
                </div>
            )}
        />
    );
};

export default TodoList;
