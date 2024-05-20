import { createContext, useState } from 'react';

export const IntervalContext = createContext();

export const IntervalProvider = ({ children }) => {
    const [isIntervalActive, setIsIntervalActive] = useState(true);

    return (
        <IntervalContext.Provider value={{ isIntervalActive, setIsIntervalActive }}>
            {children}
        </IntervalContext.Provider>
    );
};


