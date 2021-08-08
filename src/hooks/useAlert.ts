import { useState } from 'react';

const useAlert = (message: string): string | undefined => {
    const [alert, setAlert] = useState<string>();
    setAlert(message);
    setTimeout(() => {
        setAlert('');
    }, 3000);

    return alert;
};

export default useAlert;
