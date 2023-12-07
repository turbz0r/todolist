import { useEffect, useState } from 'react';
import AddForm from '../addForm/AddForm';
import Header from '../header/Header';
import TodoList from '../todoList/TodoList';
import './App.css';

const todosUrl = 'http://localhost:3000/todos';

function App() {
    const [data, setData] = useState([]);
    //TODO synchronize todo items among form/list and App component making it(App) main recieveing component

    useEffect(() => {
        fetch(todosUrl)
            .then((res) => res.json())
            .then((res) => {
                setData(res);
            });
    }, []);

    console.log(data);
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
                return fetch(todosUrl);
            })
            .then((res) => {
                res.json();
            })
            .then((res) => {
                setData(res);
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
                //TODO
                //re-request here to get updated todos from db
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
