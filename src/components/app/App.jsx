import AddForm from '../addForm/AddForm';
import Header from '../header/Header';
import TodoList from '../todoList/TodoList';
import './App.css';

const todosUrl = 'http://localhost:3000/todos';

function App() {
    //TODO synchronize todo items among form/list and App component making it(App) main recieveing component

    const onPostTodo = (data) => {
        const date = new Date().toLocaleDateString('en-GB');
        fetch(todosUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: '', text: data, date: date }),
        });
    };

    const handleDelete = (id) => {
        //fetch delete method
    };

    return (
        <>
            <Header />
            <main>
                <AddForm onPostTodo={onPostTodo} />
                <div className='todo-wrapper'>
                    <TodoList />
                </div>
            </main>
        </>
    );
}

export default App;
