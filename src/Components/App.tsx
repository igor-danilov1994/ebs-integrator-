import React, { useEffect, useState } from 'react';
import ProductList from './ ProductList/ ProductList';
import Basket from './Basket/Basket';
import { getCategories, getProduct } from 'api/api';
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
  const [category, setCategory] = useState<Array<Category>>([]);
  const [quantityProduct, setQuantityProduct] = useState(1);


  // @ts-ignore
  useEffect(async () => {
    const allProduct = await getProduct();
    setProduct(allProduct);
  }, []);

  // @ts-ignore
  useEffect(async () => {
    let category = await getCategories();
    setCategory(category);
  }, []);

  let getCurrentProduct = (id: number, categoriesName: string, item: Product) => {

    if (productToBasket.includes(item)) {
      /*productToBasket.forEach((item: Product) => {
        //debugger
        if (item.id !== id) {
          debugger

          product.forEach((item: Product) => {
            if (item.name === categoriesName) {
              setProductToBasket(arr => [item]);
              checked(id);
            }
          });
        }
        debugger
        //setQuantityProduct(quantityProduct + 1);
      });*/
    } else {
      setProductToBasket(arr => [item]);
      checked(id);
    }
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
      <Route path='/ProductList/' render={() => <ProductList setProductToBasket={getCurrentProduct} category={category}
                                                             deleteProductToBasket={deleteProductToBasket}
                                                             product={product} isChecked={isChecked} />} />

      <Basket productToBasket={productToBasket} quantityProduct={quantityProduct}
              deleteProductID={deleteProductID} unChecked={unChecked} />
    </>
  );
};

export default App;