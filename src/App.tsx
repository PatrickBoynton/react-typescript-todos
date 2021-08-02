import { ChangeEvent, FormEvent, ReactElement, useState } from 'react';
import './App.css';

interface Todo {
    id: number;
    title: string;
    complete: boolean;
}

const App = (): ReactElement => {
    const [input, setInput] = useState({});
    const [todos, setTodos] = useState<Todo[]>([]);
    const [todo, setTodo] = useState<Todo | null>(null);
    const [alert, setAlert] = useState<string>('');

    const handleChange = (event: ChangeEvent<HTMLInputElement>): ChangeEvent<HTMLInputElement> => {
        setInput({
            ...input,
            id: Math.round(Math.random() * 1000),
            [event.target.name]: event.target.value,
            complete: false,
        });
        return event;
    };

    const onAddTodo = (todo: any) => {
        if (todo['title']) {
            setTodos([todo, ...todos]);
        } else {
            onAddAlert();
        }
    };

    const onRemoveTodo = (id: Todo['id']) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    const onAddAlert = (): void => {
        setAlert('Please add a title.');
        setTimeout(() => {
            setAlert('');
        }, 3000);
    };

    const handleSubmit = (event: FormEvent): void => {
        event.preventDefault();
        onAddTodo(input);
    };

    const changeComplete = (todo: Todo): void => {
        todo.complete = !todo.complete;
        setTodo({ id: todo.id, title: todo.title, complete: todo.complete });
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
                <button className="delete" onClick={() => onRemoveTodo(todo.id)}>
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
