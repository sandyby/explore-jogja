import { createContext, useState } from 'react';

export const EnergyContext = createContext();

export const EnergyProvider = ({ children, egy, maxEgy }) => {
    const [currEgy, setCurrEgy] = useState(egy);

    return (
        <EnergyContext.Provider value={{ currEgy, setCurrEgy}}>
            {children}
        </EnergyContext.Provider>
    );
};
