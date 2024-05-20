import { createContext, useState } from 'react';

export const RainyContext = createContext();

export const RainyProvider = ({ children }) => {
    const [isRaining, setIsRaining] = useState(false);
    const [showRainyModal, setShowRainyModal] = useState(false);

    return (
        <RainyContext.Provider value={{ isRaining, setIsRaining, showRainyModal, setShowRainyModal }}>
            {children}
        </RainyContext.Provider>
    );
};