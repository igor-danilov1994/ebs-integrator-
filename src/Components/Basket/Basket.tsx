import React from 'react';
import s from '../ ProductList/ProductList.module.css';

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

interface isCheckedProduct {
  id: number
  count: number
}

interface BasketPropsType {
  productToBasket: Array<Product>
  isChecked: Array<isCheckedProduct>
  deleteProductToBasket: (id: number) => void
}

const Basket: React.FC<BasketPropsType> = ({
                                             productToBasket,
                                             isChecked,
                                             deleteProductToBasket,
                                           }) => {

  return (
    <div className={s.productList}>
      <h1>Basket</h1>
      {productToBasket.length > 0 &&
      <table>
        <thead>
        <tr>
          <td>Category</td>
          <td>Name</td>
          <td>Quantity</td>
          <td>Price</td>
          <td>Actions</td>
        </tr>
        </thead>
        <tbody>
        {productToBasket.map((productItem: Product, index: number) =>
          <tr key={productItem.id}>
            <td>{productItem.category.name}</td>
            <td>{productItem.name}</td>
            <td> {isChecked[index].count} </td>
            <td>{productItem.price}</td>
            <td>
              <button onClick={() => deleteProductToBasket(productItem.id)}>Delete</button>
            </td>
          </tr>)}
        </tbody>
      </ table>}
    </div>
  );
};

export default Basket;

