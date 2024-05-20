import { createContext, useState } from 'react';

export const HappinessContext = createContext();

export const HappinessProvider = ({ children, hap, maxHap }) => {
    const [currHap, setCurrHap] = useState(hap);

    return (
        <HappinessContext.Provider value={{ currHap, setCurrHap }}>
            {children}
        </HappinessContext.Provider>
    );
};
