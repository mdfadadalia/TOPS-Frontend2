import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, updateProduct } from '../features/crud/crudSlice';
import { useMyContext } from '../Context/MyContext';

const Create = () => {
    const dispatch = useDispatch();
    const { edit, clearEdit } = useMyContext();
    const { loading, operation } = useSelector((state) => state.products);

    const nameRef = useRef(null);
    const priceRef = useRef(null);
    const categoryRef = useRef(null);
    const quantityRef = useRef(null);

    const isSubmitting = loading && (operation === 'add' || operation === 'update');

    useEffect(() => {
        if (!edit) {
            nameRef.current.value = '';
            priceRef.current.value = '';
            categoryRef.current.value = '';
            quantityRef.current.value = '';
            return;
        }

        nameRef.current.value = edit.name ?? '';
        priceRef.current.value = edit.price ?? '';
        categoryRef.current.value = edit.category ?? '';
        quantityRef.current.value = edit.quantity ?? '';
    }, [edit]);

    const resetForm = () => {
        nameRef.current.value = '';
        priceRef.current.value = '';
        categoryRef.current.value = '';
        quantityRef.current.value = '';
        clearEdit();
        nameRef.current.focus();
    };

    const submitHandler = async (event) => {
        event.preventDefault();

        const product = {
            name: nameRef.current.value.trim(),
            price: Number(priceRef.current.value),
            category: categoryRef.current.value.trim(),
            quantity: Number(quantityRef.current.value),
        };

        if (!product.name || !product.category) return;
        if (!Number.isFinite(product.price) || product.price < 0) return;
        if (!Number.isInteger(product.quantity) || product.quantity < 0) return;

        try {
            if (edit) {
                await dispatch(updateProduct({ ...product, id: edit.id })).unwrap();
            } else {
                await dispatch(addProduct(product)).unwrap();
            }

            resetForm();
        } catch {
            // Redux stores the API error; keep the form values for correction/retry.
        }
    };

    return (
        <div className="col-12 col-lg-4">
            <div className="card h-100">
                <div className="card-header bg-primary text-white">
                    <div className="d-flex justify-content-between align-items-center">
                        <h5 className="mb-0">{edit ? 'Edit Product' : 'Add Product'}</h5>
                        {edit && (
                            <button type="button" className="btn btn-sm btn-light" onClick={resetForm}>
                                Cancel
                            </button>
                        )}
                    </div>
                </div>

                <div className="card-body">
                    <form onSubmit={submitHandler} noValidate>
                        <div className="mb-3">
                            <label htmlFor="productName" className="form-label">Product Name</label>
                            <input id="productName" ref={nameRef} type="text" className="form-control" placeholder="Enter product name" maxLength={100} required />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="productPrice" className="form-label">Price</label>
                            <input id="productPrice" ref={priceRef} type="number" className="form-control" placeholder="Enter price" min="0" step="0.01" required />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="productCategory" className="form-label">Category</label>
                            <input id="productCategory" ref={categoryRef} type="text" className="form-control" placeholder="Enter category" maxLength={100} required />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="productQuantity" className="form-label">Quantity</label>
                            <input id="productQuantity" ref={quantityRef} type="number" className="form-control" placeholder="Enter quantity" min="0" step="1" required />
                        </div>

                        <div className="d-grid">
                            <button className={`btn ${edit ? 'btn-warning' : 'btn-success'}`} type="submit" disabled={isSubmitting}>
                                {isSubmitting ? 'Saving...' : edit ? 'Update Product' : 'Save Product'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Create;
