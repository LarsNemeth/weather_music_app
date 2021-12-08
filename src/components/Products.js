import React from 'react';
import { useParams } from 'react-router-dom';

function Products() {
  const list = [
    { name: 'hamburg', photo: 'https://source.unsplash.com/600x800/?hamburg' },
  ];

  const param = useParams();
  console.log(param.productName);
  console.log(param);
  return (
    <div>
      <h1> CityPage</h1>
      <h4>{onchange}</h4>

      <img src="https://source.unsplash.com/500x800/?hamburg" />
    </div>
  );
}

export default Products;
