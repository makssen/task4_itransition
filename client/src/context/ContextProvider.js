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
        const user = await apiService.getUser();
        if (Object.keys(user).length > 0) {
            setUser(user);
            setIsAuth(true);
        }
        setIsLoading(true);
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
        <Context.Provider value={value} > {children} </Context.Provider>
    )
}