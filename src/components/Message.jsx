import { useEffect, useState } from "react";

export const Message = ({ message }) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (!message) return;
        setVisible(true);
        const timer = setTimeout(() =>setVisible(false), 2000);
        return () => clearTimeout(timer);
    }, [message]);

    if (!message || !visible) return null;

    return (
        <div className="m-auto text-center max-w-2xl animate-fade-out rounded bg-green-100 px-3 py-2 text-indigo-950">
            {message}
        </div>
    );
};