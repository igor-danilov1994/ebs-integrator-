import React, { useContext, useEffect, useState } from 'react';
import ProductList from './ ProductList/ ProductList';
import Basket from './Basket/Basket';
import { Route, Redirect } from 'react-router-dom';
import Context from '../index';

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
  const [deleteProductID, setDeleteProductIDToBasket] = useState();
  const [isChecked, setIsChecked] = useState<Array<isCheckedProduct>>([]);

  const [count, setCount] = useState(1);

  const getCurrentProduct = (id: number, item: Product) => {
    setProductToBasket(arr => [item]);
    checked(id);
  };

  const checked = (id: number) => {
    if (!isChecked.find(item => item.id === id)) {
      setIsChecked(arr => [...arr, { id: id, count: count }]);
    } else {
      const newArr = isChecked.map(item => item.id === id ? { ...item, count: item.count! + 1 } : item);
      setIsChecked(newArr);
    }
  };

  const deleteProductToBasket = (id: number) => {
    //приходит от ProductList
    setDeleteProductIDToBasket(id);
    isChecked.forEach((item: isCheckedProduct) => {
      if (item.id === id) {
        if (item.count! > 1) {
          unChecked(id);
        } else {
          //если в isChecked есть этот id то его убираем
          setIsChecked(arr => arr.filter(item => item.id !== id));
        }
      }
    });
  };

  const unChecked = (id: number) => {
    if (isChecked.find(item => item.id === id)) {
      const newArr = isChecked.map(item => item.id === id ? { ...item, count: item.count! - 1 } : item);
      setIsChecked(newArr);
    }
  };

  return (
    <>
      <Route path='' render={() => <Redirect to='/ProductList' />} />
      <Route path='/ProductList/' render={() =>
        <ProductList setProductToBasket={getCurrentProduct}
                     deleteProductToBasket={deleteProductToBasket}
                     isChecked={isChecked}
        />} />

      <Basket productToBasket={productToBasket}
              deleteProductToBasket={deleteProductToBasket}
              deleteProductID={deleteProductID}
              isChecked={isChecked}
      />
    </>
  );
};

export default App;