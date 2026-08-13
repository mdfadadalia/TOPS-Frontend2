import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://node-products-graphql-api.onrender.com/graphql';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 30000,
});

const graphqlRequest = async (query, variables = {}, signal) => {
    const { data } = await api.post(
        '',
        { query, variables },
        { signal },
    );

    if (data?.errors?.length) {
        throw new Error(data.errors.map((error) => error.message).join(', '));
    }

    if (!data?.data) {
        throw new Error('The GraphQL API returned an empty response.');
    }

    return data.data;
};

const productFields = `
    id
    name
    price
    category
    quantity
    createdAt
    updatedAt
`;

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async (_, { rejectWithValue, signal }) => {
        try {
            const data = await graphqlRequest(
                `query GetProducts { products { ${productFields} } }`,
                {},
                signal,
            );

            return data.products;
        } catch (error) {
            if (axios.isCancel(error)) {
                throw error;
            }

            return rejectWithValue(error.message || 'Failed to fetch products.');
        }
    },
);

export const addProduct = createAsyncThunk(
    'products/addProduct',
    async (product, { rejectWithValue, signal }) => {
        try {
            const data = await graphqlRequest(
                `
                    mutation CreateProduct($input: ProductInput!) {
                        createProduct(input: $input) {
                            ${productFields}
                        }
                    }
                `,
                {
                    input: {
                        name: product.name.trim(),
                        price: Number(product.price),
                        category: product.category.trim(),
                        quantity: Number(product.quantity),
                    },
                },
                signal,
            );

            return data.createProduct;
        } catch (error) {
            if (axios.isCancel(error)) {
                throw error;
            }

            return rejectWithValue(error.message || 'Failed to add product.');
        }
    },
);

export const updateProduct = createAsyncThunk(
    'products/updateProduct',
    async (product, { rejectWithValue, signal }) => {
        try {
            const data = await graphqlRequest(
                `
                    mutation UpdateProduct($id: ID!, $input: ProductUpdateInput!) {
                        updateProduct(id: $id, input: $input) {
                            ${productFields}
                        }
                    }
                `,
                {
                    id: product.id,
                    input: {
                        name: product.name.trim(),
                        price: Number(product.price),
                        category: product.category.trim(),
                        quantity: Number(product.quantity),
                    },
                },
                signal,
            );

            if (!data.updateProduct) {
                throw new Error('Product was not found or could not be updated.');
            }

            return data.updateProduct;
        } catch (error) {
            if (axios.isCancel(error)) {
                throw error;
            }

            return rejectWithValue(error.message || 'Failed to update product.');
        }
    },
);

export const deleteProduct = createAsyncThunk(
    'products/deleteProduct',
    async (id, { rejectWithValue, signal }) => {
        try {
            const data = await graphqlRequest(
                `
                    mutation DeleteProduct($id: ID!) {
                        deleteProduct(id: $id) {
                            id
                        }
                    }
                `,
                { id },
                signal,
            );

            if (!data.deleteProduct) {
                throw new Error('Product was not found or could not be deleted.');
            }

            return data.deleteProduct;
        } catch (error) {
            if (axios.isCancel(error)) {
                throw error;
            }

            return rejectWithValue(error.message || 'Failed to delete product.');
        }
    },
);

const initialState = {
    data: [],
    loading: false,
    error: '',
    operation: null,
};

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = '';
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = '';
                state.operation = 'fetch';
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                state.operation = null;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message || 'Failed to fetch products.';
                state.operation = null;
            })

            .addCase(addProduct.pending, (state) => {
                state.loading = true;
                state.error = '';
                state.operation = 'add';
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.data.unshift(action.payload);
                state.operation = null;
            })
            .addCase(addProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message || 'Failed to add product.';
                state.operation = null;
            })

            .addCase(updateProduct.pending, (state) => {
                state.loading = true;
                state.error = '';
                state.operation = 'update';
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.data.findIndex((product) => product.id === action.payload.id);

                if (index !== -1) {
                    state.data[index] = action.payload;
                }

                state.operation = null;
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message || 'Failed to update product.';
                state.operation = null;
            })

            .addCase(deleteProduct.pending, (state) => {
                state.loading = true;
                state.error = '';
                state.operation = 'delete';
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.data = state.data.filter((product) => product.id !== action.payload.id);
                state.operation = null;
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message || 'Failed to delete product.';
                state.operation = null;
            });
    },
});

export const { clearError } = productSlice.actions;
export default productSlice.reducer;
