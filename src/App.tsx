import { ChangeEvent, FC, FormEvent, useState } from 'react';
import './App.css';
import Form from './components/Form/Form';
import { Todo } from './models/Todo';
import TodoDisplay from './components/TodoDisplay/TodoDisplay';

const App: FC = () => {
    const [input, setInput] = useState('');
    const [todos, setTodos] = useState<Todo[]>([]);
    const [alert, setAlert] = useState<string>('');

    const handleChange = (event: ChangeEvent<HTMLInputElement>): ChangeEvent<HTMLInputElement> => {
        setInput(event.target.value);
        return event;
    };

    const onAdd = (): void => {
        const newTodo: Todo = {
            id: Math.round(Math.random() * 1000),
            title: input,
            complete: false,
        };

        if (input) {
            setTodos([newTodo, ...todos]);
        } else {
            onAddAlert('Needs a string to work.');
        }
    };

    const clearInput = (): void => {
        setInput('');
    };

    const onAddAlert = (message: string): void => {
        setAlert(message);
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
                return [...filteredTodos, {...selectedTodo, complete: true}];
            }

            return previousTodos;
        });
    };

    const todoDisplay = todos.map((todo: Todo) => (
        <TodoDisplay key={ todo.id }
            changeComplete={ changeComplete }
            todo={ todo }
            onDelete={ onDelete }
        />
    ));

    return (
        <>
            <Form handleSubmit={ handleSubmit }
                handleChange={ handleChange }
                alert={ alert } />
            { todoDisplay }
        </>
    );
};

export default App;
