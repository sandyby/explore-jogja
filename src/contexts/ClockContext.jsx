import { createContext, useState } from 'react';

export const ClockContext = createContext();

export const ClockProvider = ({ children }) => {
    const [currHour, setCurrHour] = useState(-1);

    return (
        <ClockContext.Provider value={{ currHour, setCurrHour }}>
            {children}
        </ClockContext.Provider>
    );
};
