import React, { useEffect, useState } from 'react';
import ProductList from './ ProductList/ ProductList';
import Basket from './Basket/Basket';
import { getProduct } from 'api/api';
import { Route, Redirect } from 'react-router-dom';

export interface Category {
  id: string
  name: string
}

export interface Product {
  name: string;
  category: Category;
  price: number;
  id: number
}

const App = () => {
  const [product, setProduct] = useState<Array<Product>>([]);
  const [productToBasket, setProductToBasket] = useState<Array<Product>>([]);
  const [deleteProductID, setDeleteProductIDToBasket] = useState();
  const [isChecked, setIsChecked] = useState<Array<number>>([]);

  // @ts-ignore
  useEffect(async () => {
    const allProduct = await getProduct();
    setProduct(allProduct);
  }, []);

  let getCurrentProduct = (index: number, id: number) => {
    let names: Array<Product> = [];
    names.push(product[index]);
    checked(id);
    setProductToBasket(names);
  };

  let deleteProductToBasket = (id: number) => {
    unChecked(id);
    setDeleteProductIDToBasket(id);
  };

  const checked = (id: number) => {
    if (!isChecked.includes(id)) {
      setIsChecked(arr => [...arr, id]);
    }
  };

  const unChecked = (id: number) => {
    if (isChecked.includes(id)) {
      setIsChecked(arr => arr.filter(item => item !== id));
    }
  };

  return (
    <>
      <Route path='' render={() => <Redirect to='/ProductList' />} />
      <Route path='/ProductList/' render={() => <ProductList setProductToBasket={getCurrentProduct}
                                                             deleteProductToBasket={deleteProductToBasket}
                                                             product={product} isChecked={isChecked} />} />

      <Basket productToBasket={productToBasket}
              deleteProductID={deleteProductID} unChecked={unChecked} />
    </>
  );
};

export default App;