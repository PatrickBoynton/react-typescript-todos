import { ChangeEvent, FC, FormEvent, useState } from 'react';
import './App.css';
import Form from './components/Form';
import { Todo } from './models/Todo';
import TodoDisplay from './components/TodoDisplay';

const App: FC = () => {
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
        setTodos(todos.filter((todo: Todo) => todo.id !== id));
    };

    const handleSubmit = (event: FormEvent): void => {
        event.preventDefault();
        onAdd();
        clearInput();
    };

    const changeComplete = (todo: Todo): void => {
        todo.complete = !todo.complete;
        setTodos((previousTodos: Todo[]) => {
            const selectedTodo = previousTodos.find(
                (previousTodo: Todo) => previousTodo.id === todo.id
            );
            if (selectedTodo) {
                const filteredTodos = previousTodos.filter(
                    (previousTodo: Todo) => previousTodo.id !== todo.id
                );
                return [...filteredTodos, { ...selectedTodo, complete: true }];
            }

            return previousTodos;
        });
    };

    const todoDisplay = todos.map((todo: Todo) => (
        <TodoDisplay
            key={todo.id}
            changeComplete={changeComplete}
            todo={todo}
            onDelete={onDelete}
        />
    ));

    return (
        <>
            <Form handleSubmit={handleSubmit} handleChange={handleChange} alert={alert} />
            {todoDisplay}
        </>
    );
};

export default App;
