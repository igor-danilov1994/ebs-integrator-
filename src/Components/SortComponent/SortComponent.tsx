import React from 'react';
import s from '../ ProductList/ProductList.module.css';


interface SortComponent {
  sortData: (value: string) => void
}

let SortComponent: React.FC <SortComponent> = ({sortData}) => {
  return (
    <div className={s.productList_sort_arrows}>
      <span onClick={() => sortData('up')} className={`${s.sortArrow} ${s.productList_sortUp}`}> </span>
      <span onClick={() => sortData('down')} className={`${s.sortArrow} ${s.productList_sortDown}`}> </span>
    </div>
  );
};

export default SortComponent;