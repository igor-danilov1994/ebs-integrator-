import React, { useRef, useState } from 'react';
import ProductList from './ ProductList/ ProductList';
import Basket from './Basket/Basket';
import { Route, Redirect } from 'react-router-dom';

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

interface isCheckedProduct {
  id: number
  count: number
}

const App = () => {
  const [productToBasket, setProductToBasket] = useState<Array<Product>>([]);
  const [isChecked, setIsChecked] = useState<Array<isCheckedProduct>>([]);

  const count = useRef<number>(1)

  const getCurrentProduct = (item: Product): void => {
    if (productToBasket.length > 0) {
      if (!productToBasket.includes(item)) {
        setProductToBasket(arr => [...arr, item]);
      }
    } else {
      setProductToBasket(arr => [item]);
    }
    checked(item.id);
  };

  const checked = (id: number): void => {
    if (!isChecked.find(item => item.id === id)) {
      setIsChecked(arr => [...arr, { id: id, count: count.current }]);
    } else {
      const newArr = isChecked.map(item => item.id === id ? { ...item, count: ++item.count } : item);
      setIsChecked(newArr);
    }
  };

  const deleteProductToBasket = (id: number): void => {
    isChecked.forEach((item: isCheckedProduct) => {
      if (item.id === id) {
        if (item.count! > 1) {
          unChecked(id);
        } else {
          setIsChecked(arr => arr.filter(item => item.id !== id));
          setProductToBasket(arr => arr.filter(item => item.id !== id));
        }
      }
    });
  };

  const unChecked = (id: number): void => {
    if (isChecked.find(item => item.id === id)) {
      const newArr = isChecked.map(item => item.id === id ? { ...item, count: --item.count } : item);
      setIsChecked(newArr);
    }
  };

  return (
    <>
      <Route path='' render={() => <Redirect to='/ProductList' />} />
      <Route path='/ProductList/' render={() =>
        <ProductList getCurrentProduct={getCurrentProduct}
                     deleteProductToBasket={deleteProductToBasket}
                     isChecked={isChecked}
        />}
      />

      <Basket productToBasket={productToBasket}
              deleteProductToBasket={deleteProductToBasket}
              isChecked={isChecked}
      />
    </>
  );
};

export default App;