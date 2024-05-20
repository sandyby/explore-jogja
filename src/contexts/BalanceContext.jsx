import { createContext, useState } from 'react';

export const BalanceContext = createContext();

export const BalanceProvider = ({ children }) => {
    const [currMoney, setCurrMoney] = useState(450000);

    return (
        <BalanceContext.Provider value={{ currMoney, setCurrMoney }}>
            {children}
        </BalanceContext.Provider>
    );
};
