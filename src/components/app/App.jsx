import AddForm from '../addForm/AddForm';
import Header from '../header/Header';
import TodoList from '../todoList/TodoList';
import './App.css';

function App() {
    return (
        <>
            <Header />
            <main>
                <AddForm />
                <div className="todo-wrapper">
                    <TodoList />
                </div>
            </main>
        </>
    );
}

export default App;
