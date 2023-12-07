import React, { useEffect, useState } from 'react';
import { Button, ConfigProvider, List, Skeleton, Typography } from 'antd';

import './TodoList.css';

const { Text } = Typography;

const count = 6;
const todosUrl = 'http://localhost:3000/todos';

const TodoList = ({ data, handleDelete }) => {
    const [initLoading, setInitLoading] = useState(true);
    const [loading, setLoading] = useState(false);
    const [list, setList] = useState([]);

    useEffect(() => {
        fetch(todosUrl)
            .then((res) => res.json())
            .then((res) => {
                setInitLoading(false);
                setList(res);
            });
    }, [data]);
    const onLoadMore = () => {
        setLoading(true);
        setList(
            data.concat(
                [...new Array(count)].map(() => ({
                    loading: true,
                }))
            )
        );
        fetch(todosUrl)
            .then((res) => res.json())
            .then((res) => {
                const newData = [...data, ...res];
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
                }}
            >
                <ConfigProvider
                    theme={{
                        components: {
                            Button: {
                                colorPrimary: '#c38154',
                                algorithm: true,
                            },
                        },
                    }}
                >
                    <Button onClick={onLoadMore}>Load more</Button>
                </ConfigProvider>
            </div>
        ) : null;

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorLink: '#c38154',
                    colorPrimary: '#c38154',
                },
            }}
        >
            <List
                className='demo-loadmore-list'
                loading={initLoading}
                itemLayout='horizontal'
                loadMore={loadMore}
                dataSource={list}
                renderItem={(item, index) => (
                    <div key={item.id} className='list-item-wrap'>
                        <List.Item
                            actions={[
                                <a
                                    key='list-loadmore-delete'
                                    onClick={() => {
                                        handleDelete(item.id);
                                    }}
                                >
                                    done
                                </a>,
                            ]}
                        >
                            <Skeleton
                                title={false}
                                loading={item.loading}
                                active
                            >
                                <Text
                                    style={{
                                        width: '100%',
                                    }}
                                >
                                    {item.text}
                                </Text>
                                <div className='list-item-date'>
                                    <span>Added on : </span>
                                    {item.date}
                                </div>
                            </Skeleton>
                        </List.Item>
                        <div className='separator' />
                    </div>
                )}
            />
        </ConfigProvider>
    );
};

export default TodoList;
