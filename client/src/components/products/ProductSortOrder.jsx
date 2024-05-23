const ProductSortOrder = ({ onSortChange, onOrderChange }) => {
  return (
    <div className="product-sortOrder">
      <div className="labelSelect">
        <label htmlFor="productSort" className="label">Sort</label>
        <select
          id="productSort"
          name="productSort"
          className="select"
          onChange={onSortChange}
        >
          <option value="name">Name</option>
          <option value="description">Description</option>
          <option value="price">Price</option>
          <option value="discountAmount">Discount Amount</option>
        </select>
      </div>
      <div className="labelSelect">
        <label htmlFor="productOrder" className="label">Order</label>
      <select id="productOrder" name="productOrder" className="select" onChange={onOrderChange}>
        <option value="ASC">⬆️ Ascending</option>
        <option value="DESC">⬇️ Descending</option>
      </select>
      </div>
    </div>
  );
};

export default ProductSortOrder;
