import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, deleteProduct, updateProduct, fetchProducts } from '../store/productsSlice';

export default function ProductsPanel() {
  const dispatch = useDispatch();
  const { list, status } = useSelector((s) => s.products);
  const [search, setSearch] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [editing, setEditing] = useState(null);

  useEffect(() => { if (status === 'idle') dispatch(fetchProducts()); }, [dispatch, status]);

  const filtered = useMemo(() => {
    return list.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));
  }, [list, search]);

  const handleAddOrEdit = () => {
    if (!name || !price) return alert('Enter name and price');
    if (editing) {
      dispatch(updateProduct({ id: editing, name, price: Number(price) }));
      setEditing(null);
    } else {
      dispatch(addProduct({ id: Date.now(), name, price: Number(price) }));
    }
    setName(''); setPrice('');
  };

  const startEdit = (p) => { setEditing(p.id); setName(p.name); setPrice(p.price); };

  if (status === 'loading') return <div className="card">Loading products...</div>;

  return (
    <div className="card side-card">
      <h2>Products (Redux)</h2>

      <div style={{ marginTop:8 }}>
        <input className="search" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>

      <div style={{ marginTop:10, display:'grid', gridTemplateColumns:'1fr 120px', gap:8 }}>
        <input className="input" placeholder="Product name" value={name} onChange={(e)=>setName(e.target.value)} />
        <input className="input" placeholder="Price (₹)" type="number" value={price} onChange={(e)=>setPrice(e.target.value)} />
        <div style={{ gridColumn:'1 / span 2', textAlign:'right' }}>
          <button className="btn" onClick={handleAddOrEdit}>{editing ? 'Update' : 'Add'}</button>
        </div>
      </div>

      <table className="product-table" style={{ marginTop:14 }}>
        <thead>
          <tr><th>Product</th><th>Price (₹)</th><th>Action</th></tr>
        </thead>
        <tbody>
          {filtered.map((p) => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>₹ {p.price}</td>
              <td className="product-actions">
                <button onClick={() => dispatch(updateProduct({ id: p.id, price: p.price + 50 }))}>+₹50</button>
                <button onClick={() => startEdit(p)}>Edit</button>
                <button onClick={() => { if (window.confirm('Delete product?')) dispatch(deleteProduct(p.id)); }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
