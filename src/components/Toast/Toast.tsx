import React, { FC } from 'react';

interface Props {
    alert: string;
    children: string;
}

const Toast: FC<Props> = ({alert, children}: Props) => {

    return (
        <span className={ alert ? 'alert' : '' }>{alert ? children : ''}</span>
    );
};

export default Toast;
