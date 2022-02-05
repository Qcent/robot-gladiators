import React, { createContext, useContext } from "react";
import { useProductReducer } from './reducers';
/* ####################################### */
// ### SEE anctions.js and reducers.js ### //
// ## FOR HOW TO CHANGE OBJECTS IN STATE # //
/* ####################################### */
const StoreContext = createContext();
const { Provider } = StoreContext;

const StoreProvider = ({ value = [], ...props }) => {
    const [state, dispatch] = useProductReducer({
        /* Set your default states here */
        // products: [],
        // cart: [],
        // cartOpen: false,
        // categories: [],
        // currentCategory: ''
    });
    // use this to confirm it works!
    console.log(state);
    return <Provider value = {
        [state, dispatch]
    } {...props }
    />;
};

const useStoreContext = () => {
    return useContext(StoreContext);
};

export { StoreProvider, useStoreContext };