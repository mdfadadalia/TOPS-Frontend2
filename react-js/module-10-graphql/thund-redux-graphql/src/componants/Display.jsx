import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct } from '../features/crud/crudSlice';
import { useMyContext } from '../Context/MyContext';

const Display = () => {
    const dispatch = useDispatch();
    const { editHandler } = useMyContext();
    const { data: products, loading, error, operation } = useSelector((state) => state.products);

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this product?')) return;

        try {
            await dispatch(deleteProduct(id)).unwrap();
        } catch {
            // Error is displayed from Redux state.
        }
    };

    return (
        <div className="col-12 col-lg-8">
            <div className="card h-100">
                <div className="card-header bg-primary text-white">
                    <div className="d-flex justify-content-between align-items-center">
                        <h5 className="mb-0">Product List</h5>
                        <span className="badge bg-light text-primary">{products.length} Products</span>
                    </div>
                </div>

                <div className="card-body p-0">
                    {error && (
                        <div className="alert alert-danger rounded-0 mb-0" role="alert">
                            <strong>Error:</strong> {error}
                        </div>
                    )}

                    {loading && operation === 'fetch' && (
                        <div className="text-center py-4">
                            <div className="spinner-border text-primary" role="status" aria-hidden="true" />
                            <div className="mt-2">Loading products...</div>
                        </div>
                    )}

                    <div className="table-responsive">
                        <table className="table table-bordered table-hover align-middle mb-0">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Category</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th className="text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {!loading && products.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="text-center text-muted py-4">
                                            No products found.
                                        </td>
                                    </tr>
                                ) : (
                                    products.map((product, index) => (
                                        <tr key={product.id}>
                                            <td>{index + 1}</td>
                                            <td className="fw-semibold">{product.name}</td>
                                            <td>{product.category}</td>
                                            <td>₹ {Number(product.price).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                                            <td>{product.quantity}</td>
                                            <td className="text-center text-nowrap">
                                                <button
                                                    type="button"
                                                    className="btn btn-sm btn-warning me-2"
                                                    onClick={() => editHandler(product.id)}
                                                    disabled={loading}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    type="button"
                                                    className="btn btn-sm btn-danger"
                                                    onClick={() => handleDelete(product.id)}
                                                    disabled={loading && operation === 'delete'}
                                                >
                                                    {loading && operation === 'delete' ? 'Deleting...' : 'Delete'}
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Display;
