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
        // the input should remain a string value until it's ready to be used
        setInput(event.target.value);
        return event;
    };


    const onAddTodo = () => {
        if (input) {
            // create new ToDo when they click add, using the input
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

    const onRemoveTodo = (id: Todo['id']) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    // nice
    const onAddAlert = (): void => {
        setAlert('Please add a title.');
        setTimeout(() => {
            setAlert('');
        }, 3000);
    };

    const clearInput = () => {
        setInput('');
    };

    const handleSubmit = (event: FormEvent): void => {
        // the value will be coming from 'input' which you are tracking with state,
        // so the only thing you need the event for is to prevent a page refresh.
        event.preventDefault();
        onAddTodo();
        // after submit, your input is reset and ready for the next.
        clearInput();
    };

    // be careful with your naming you have a few functions with the name 'todo' and that can be confusing
    const changeComplete = (todo: Todo): void => {
        // hook functions can take a callback that receives the old state as an argument.
        // this helps to prevent stale state when updating.
        // This version takes the old state, selects the intended todo, marks it complete, then returns the updated list.
        setTodos((prevTodos) => {
            // use your ids to select your correct todo
            const selectedTodo = prevTodos.find((prevTodo) => prevTodo.id === todo.id);
            if(selectedTodo){
            // remove old todo from the previous list
                const filteredTodos = prevTodos.filter((prevTodo) => prevTodo.id !== todo.id);
                return [...filteredTodos, { ...selectedTodo, complete: true }];
            }
            // if there is no todo with the selected id, we're in trouble haha
            return prevTodos;
        });
    };

    // There can only be one H1 per webpage for accessibility reasons. The h1, h2, h3 tags shouldn't be used for style, only for creating an outline on the page.
    const todoDisplay = todos.map((todo) => (
        <>
            <div className="display">
                <h1
                    key={todo.id}
                    onClick={() => changeComplete(todo)}
                    style={
                        // nice
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
                <input type="text" name="title" value={input} onChange={handleChange} />
                <button type="submit">Add Todo</button>
            </form>

            {todoDisplay}
        </>
    );
};

export default App;
