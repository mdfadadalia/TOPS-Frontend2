import { createContext, useContext, useState } from 'react';

const MyContext = createContext(null);

export const MyContextProvider = ({ children }) => {
  const [edit, setEdit] = useState(null);

  const editHandler = (product) => {
    setEdit(product);
  };

  const cancelEdit = () => {
    setEdit(null);
  };

  return (
    <MyContext.Provider value={{ edit, editHandler, setEdit, cancelEdit }}>
      {children}
    </MyContext.Provider>
  );
};

export const useMyContext = () => {
  const context = useContext(MyContext);

  if (!context) {
    throw new Error('useMyContext must be used inside MyContextProvider');
  }

  return context;
};

export default MyContextProvider;
