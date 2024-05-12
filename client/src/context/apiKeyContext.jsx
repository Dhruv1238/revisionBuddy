import { Button, Input } from '@nextui-org/react';
import React, { createContext, useState, useEffect } from 'react';

// Create the API key context
export const ApiKeyContext = createContext();

// Create the API key provider component
export const ApiKeyProvider = ({ children }) => {
    const [apiKey, setApiKey] = useState(null);

    useEffect(() => {
        // Check if the API key exists in the browser's storage
        const storedApiKey = localStorage.getItem('apiKey');

        if(storedApiKey === "null") {
            return;
        }
        setApiKey(storedApiKey);

        console.log('apiKey', storedApiKey);
    }, []);

    const getApiKey = (apiKeyInput) => {
        localStorage.setItem('apiKey', apiKey);
        setApiKey(apiKeyInput);
    }

    useEffect(() => {
        console.log('apiKey', apiKey);
    }, [apiKey]);

    const clearApiKey = () => {
        localStorage.removeItem('apiKey');
        setApiKey(null);
    }

    return (
        <ApiKeyContext.Provider value={{ apiKey, setApiKey, getApiKey, clearApiKey }}>
            {children}
        </ApiKeyContext.Provider>
    );
};