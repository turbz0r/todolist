import { useEffect, useState } from 'react';
import AddForm from '../addForm/AddForm';
import Header from '../header/Header';
import TodoList from '../todoList/TodoList';
import './App.css';

const todosUrl = 'http://localhost:3000/todos';

function App() {
    const [forceUpdate, setForceUpdate] = useState(false);
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch(todosUrl)
            .then((res) => res.json())
            .then((res) => {
                setData(res);
                setForceUpdate(false);
            });
    }, [forceUpdate]);

    const onPostTodo = (data) => {
        const date = new Date().toLocaleDateString('en-GB');
        fetch(todosUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: '', text: data, date: date }),
        })
            .then(() => {
                setForceUpdate(true);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const handleDelete = (id) => {
        const url = `${todosUrl}/${id}`;
        fetch(url, {
            method: 'DELETE',
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Something went wrong...');
                }

                setForceUpdate(true);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    return (
        <>
            <Header />
            <main>
                <AddForm onPostTodo={onPostTodo} />
                <div className='todo-wrapper'>
                    <TodoList data={data} handleDelete={handleDelete} />
                </div>
            </main>
        </>
    );
}

export default App;
