import { ChangeEvent, FormEvent, ReactElement, useState } from 'react';
import './App.css';

interface Todo {
    id: number;
    title: string;
    complete: boolean;
}

const App = (): ReactElement => {
    const [input, setInput] = useState('');
    const [todos, setTodos] = useState<Todo[]>([]);
    const [alert, setAlert] = useState<string>('');

    const handleChange = (event: ChangeEvent<HTMLInputElement>): ChangeEvent<HTMLInputElement> => {
        setInput(event.target.value);
        return event;
    };

    const onAdd = (): void => {
        if (input) {
            const newTodo = {
                id: Math.round(Math.random() * 1000),
                title: input,
                complete: false,
            };
            setTodos([newTodo, ...todos]);
        } else {
            onAddAlert();
        }
    };

    const clearInput = (): void => {
        setInput('');
    };

    const onAddAlert = (): void => {
        setAlert('Please add a title.');
        setTimeout(() => {
            setAlert('');
        }, 3000);
    };

    const onDelete = (id: Todo['id']): void => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    const handleSubmit = (event: FormEvent): void => {
        event.preventDefault();
        onAdd();
        clearInput();
    };

    const changeComplete = (todo: Todo): void => {
        todo.complete = !todo.complete;
        setTodos((previousTodos) => {
            const selectedTodo = previousTodos.find((previousTodo) => previousTodo.id === todo.id);
            if (selectedTodo) {
                const filteredTodos = previousTodos.filter(
                    (previousTodo) => previousTodo.id !== todo.id
                );
                return [...filteredTodos, { ...selectedTodo, complete: true }];
            }

            return previousTodos;
        });
    };

    const todoDisplay = todos.map((todo) => (
        <>
            <div className="display">
                <h1
                    key={todo.id}
                    onClick={() => changeComplete(todo)}
                    style={
                        todo.complete
                            ? { textDecoration: 'line-through' }
                            : { textDecoration: 'none' }
                    }>
                    {todo.title}
                </h1>
                <button className="delete" onClick={() => onDelete(todo.id)}>
                    Delete
                </button>
            </div>
        </>
    ));

    return (
        <>
            <form onSubmit={handleSubmit}>
                <h2>Add a Todo</h2>
                <label htmlFor="title">Title</label>
                <span className={alert ? 'alert' : ''}>{alert}</span>
                <input type="text" name="title" onChange={handleChange} />
                <button type="submit">Add Todo</button>
            </form>

            {todoDisplay}
        </>
    );
};

export default App;
