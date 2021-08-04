import React, { ChangeEvent, FC, FormEvent } from 'react';
import './Form.css';

interface Props {
    handleSubmit: (event: FormEvent) => void;
    handleChange: (event: ChangeEvent<HTMLInputElement>) => ChangeEvent<HTMLInputElement>;
    alert: string;
}

const Form: FC<Props> = ({handleSubmit, handleChange, alert}: Props) => {
    return (
        <form onSubmit={ handleSubmit }>
            <h2>Add a Todo</h2>
            <label htmlFor="title">Title</label>
            <span className={ alert ? 'alert' : '' }>{ alert }</span>
            <input type="text" name="title" onChange={ handleChange } />
            <button type="submit">Add Todo</button>
        </form>
    );
};

export default Form;
