import { createContext, useContext, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

const MyContext = createContext(null);

const MyContextProvider = ({ children }) => {
    const products = useSelector((state) => state.products.data);
    const [editId, setEditId] = useState(null);

    const edit = useMemo(
        () => products.find((product) => product.id === editId) ?? null,
        [products, editId],
    );

    const editHandler = (id) => setEditId(id);
    const clearEdit = () => setEditId(null);

    const value = useMemo(
        () => ({ edit, editHandler, clearEdit }),
        [edit],
    );

    return <MyContext.Provider value={value}>{children}</MyContext.Provider>;
};

export default MyContextProvider;

export const useMyContext = () => {
    const context = useContext(MyContext);

    if (!context) {
        throw new Error('useMyContext must be used inside MyContextProvider.');
    }

    return context;
};
