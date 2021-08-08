import React, { ChangeEvent, FC, FormEvent } from 'react';
import './Form.css';
import Toast from '../Toast/Toast';

interface Props {
    handleSubmit: (event: FormEvent) => void;
    handleChange: (event: ChangeEvent<HTMLInputElement>) => ChangeEvent<HTMLInputElement>;
    alert: string;
}

const Form: FC<Props> = ({handleSubmit, handleChange, alert}: Props) => {
    // const alertDisplay = <Toast alert={ alert }>Test</Toast>;
    return (
        <form onSubmit={ handleSubmit }>
            <h2>Add a Todo</h2>
            <label htmlFor="title">Title</label>
            <Toast alert={alert}>Please input a title.</Toast>
            <input type="text" name="title" onChange={ handleChange } />
            <label htmlFor="category">Category</label>
            <Toast alert={alert}>Please give a category.</Toast>
            <input type="text" name="category" onChange={ handleChange } />
            <button type="submit">Add Todo</button>
        </form>
    );
};

export default Form;
