import { createContext } from 'react';
//help for passing the userData into all components
export default createContext({
    token: undefined,
    user: undefined,
});