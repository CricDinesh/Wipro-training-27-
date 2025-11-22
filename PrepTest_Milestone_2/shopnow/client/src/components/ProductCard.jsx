import React from 'react';
import PropTypes from 'prop-types';

// Q1: functional component with props: title, price, discount
export default function ProductCard({ title, price, discount }) {
  const finalPrice = Number(price) - Number(discount);
  return (
    <div className="product-card">
      <h4>{title}</h4>
      <p>Price: ₹{price}</p>
      <p>Discount: ₹{discount}</p>
      <p><strong>Final Price: ₹{finalPrice}</strong></p>
    </div>
  );
}

ProductCard.propTypes = {
  title: PropTypes.string.isRequired,
  price: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  discount: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired
};
