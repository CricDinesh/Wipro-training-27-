import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async mock fetch (simulated)
export const fetchProducts = createAsyncThunk('products/fetch', async () => {
  await new Promise((r) => setTimeout(r, 500));
  return [
    { id: 1, name: 'Dumbbell', price: 600 },
    { id: 2, name: 'Yoga Mat', price: 1000 }
  ];
});

const productsSlice = createSlice({
  name: 'products',
  initialState: { list: [], status: 'idle', error: null },
  reducers: {
    addProduct(state, action) {
      state.list.push(action.payload);
    },
    updateProduct(state, action) {
      const { id, name, price } = action.payload;
      const p = state.list.find((x) => x.id === id);
      if (p) {
        if (name !== undefined) p.name = name;
        if (price !== undefined) p.price = price;
      }
    },
    deleteProduct(state, action) {
      state.list = state.list.filter((p) => p.id !== action.payload);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (s) => { s.status = 'loading'; })
      .addCase(fetchProducts.fulfilled, (s, a) => { s.status = 'succeeded'; s.list = a.payload; })
      .addCase(fetchProducts.rejected, (s, a) => { s.status = 'failed'; s.error = a.error?.message; });
  }
});

export const { addProduct, updateProduct, deleteProduct } = productsSlice.actions;
export default productsSlice.reducer;
