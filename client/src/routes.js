import { Chat } from './pages/Chat';
import { Login } from './pages/Login';

export const routes = [{
        path: '/',
        component: Login
    },
    {
        path: '/messages',
        component: Chat
    }
]