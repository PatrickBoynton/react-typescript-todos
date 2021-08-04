import React, { FC } from 'react';
import { Todo } from '../../models/Todo';

interface Props {
    todo: Todo;
    changeComplete: (todo: Todo) => void;
    onDelete: (id: Todo['id']) => void;
}

const TodoDisplay: FC<Props> = ({changeComplete, todo, onDelete}: Props) => {
    return (
        <>
            <div className="display">
                <h1
                    key={ todo.id }
                    onClick={ () => changeComplete(todo) }
                    style={
                        todo.complete
                            ? {textDecoration: 'line-through'}
                            : {textDecoration: 'none'}
                    }>
                    { todo.title }
                </h1>
                <button className="delete" onClick={ () => onDelete(todo.id) }>
                    Delete
                </button>
            </div>
        </>
    );
};

export default TodoDisplay;
