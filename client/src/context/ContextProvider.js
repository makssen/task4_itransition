import React, { createContext, useEffect, useState } from 'react';
import { apiService } from '../services';

export const Context = createContext();

export const ContextProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [isAuth, setIsAuth] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [messages, setMessages] = useState([]);
    const [isLoadingMsg, setIsLoadingMsg] = useState(false);

    const fetchMessages = async () => {
        setIsLoadingMsg(true);
        const data = await apiService.getMessages();
        setMessages(data);
        setIsLoadingMsg(false);
    }

    const logout = async () => {
        setIsAuth(false);
        return apiService.logOut();
    }

    const fetchUser = async () => {
        await fetch('http://localhost:8080/user')
            .then(resp => resp.json())
            .then(resp => {
                if (Object.keys(resp).length > 0) {
                    setUser(resp);
                    setIsAuth(true);
                }
                setIsLoading(true);
            })
    }

    const countStatistics = (type) => {
        return messages.filter(item => item.message === type).length;
    }

    useEffect(() => {
        fetchUser();
        fetchMessages();
    }, []);

    const value = {
        user,
        logout,
        isLoading,
        isAuth,
        messages,
        isLoadingMsg,
        setMessages,
        countStatistics
    };

    return (
        <Context.Provider value={value}>{children}</Context.Provider>
    )
}
