import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Create from './componants/Create';
import Display from './componants/Display';
import Container from './componants/Container';
import { fetchProducts } from './features/crud/crudSlice';
import MyContextProvider from './Context/MyContext';

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    return (
        <MyContextProvider>
            <Container>
                <Create />
                <Display />
            </Container>
        </MyContextProvider>
    );
};

export default App;
