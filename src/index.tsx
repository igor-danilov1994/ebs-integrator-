import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { getCategories, getProduct } from './api/api';
import App from './Components/App';

const Context = React.createContext([]);
export default Context;


interface Category {
  id: string
  name: string
}

interface Product {
  name: string;
  category: Category;
  price: number;
  id: number
}

const Main = () => {

  const [AllCategory, setAllCategory] = useState([]);
  const state = useRef([]);

  useEffect(() => {
    (async () => {
      const allProduct = await getProduct();
      const category = await getCategories();

      // @ts-ignore
      state.current.push(category);
      // @ts-ignore
      state.current.push(allProduct);

      if (state.current.length > 0) {
        setAllCategory(state.current);
      }
    })();
  }, []);


  return (
    <React.StrictMode>
      <BrowserRouter>
        <Context.Provider value={AllCategory}>
          <App />
        </ Context.Provider>
      </ BrowserRouter>
    </ React.StrictMode>
  );
};

ReactDOM.render(
  <Main />,
  document.getElementById('root'));

reportWebVitals();
