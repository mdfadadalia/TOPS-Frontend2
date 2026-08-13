import { useEffect, useRef, useState } from 'react';
import { useMutation } from '@apollo/client/react';
import { CREATE_PRODUCT, GET_PRODUCTS, UPDATE_PRODUCT } from '../graphql/productQueries';
import { useMyContext } from '../Context/MyContext';

const emptyForm = { name: '', price: '', category: '', quantity: '' };

const Create = () => {
  const { edit, setEdit, cancelEdit } = useMyContext();
  const [form, setForm] = useState(emptyForm);
  const [formError, setFormError] = useState('');

  const nameRef = useRef(null);

  const [createProduct, { loading: creating }] = useMutation(CREATE_PRODUCT, {
    refetchQueries: [{ query: GET_PRODUCTS }],
    awaitRefetchQueries: true,
  });

  const [updateProduct, { loading: updating }] = useMutation(UPDATE_PRODUCT, {
    refetchQueries: [{ query: GET_PRODUCTS }],
    awaitRefetchQueries: true,
  });

  const saving = creating || updating;

  useEffect(() => {
    if (edit) {
      setForm({
        name: edit.name ?? '',
        price: edit.price ?? '',
        category: edit.category ?? '',
        quantity: edit.quantity ?? '',
      });
      nameRef.current?.focus();
    } else {
      setForm(emptyForm);
    }
    setFormError('');
  }, [edit]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const resetForm = () => {
    setForm(emptyForm);
    setFormError('');
    setEdit(null);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setFormError('');

    const name = form.name.trim();
    const category = form.category.trim();
    const price = Number(form.price);
    const quantity = Number(form.quantity);

    if (!name || !category) {
      setFormError('Name and category are required.');
      return;
    }
    if (!Number.isFinite(price) || price < 0) {
      setFormError('Please enter a valid price.');
      return;
    }
    if (!Number.isInteger(quantity) || quantity < 0) {
      setFormError('Quantity must be a whole number greater than or equal to 0.');
      return;
    }

    const input = { name, price, category, quantity };

    try {
      if (edit) {
        await updateProduct({ variables: { id: edit.id, input } });
      } else {
        await createProduct({ variables: { input } });
      }
      resetForm();
    } catch (error) {
      setFormError(error.message || 'Unable to save product.');
    }
  };

  return (
    <section className="col-12 col-lg-4">
      <div className="card h-100">
        <div className={`card-header text-white ${edit ? 'bg-warning' : 'bg-primary'}`}>
          <div className="d-flex justify-content-between align-items-center">
            <h5 className={`mb-0 ${edit ? 'text-dark' : ''}`}>
              {edit ? 'Edit Product' : 'Add Product'}
            </h5>
            {edit && (
              <button type="button" className="btn btn-sm btn-dark" onClick={cancelEdit} disabled={saving}>
                Cancel
              </button>
            )}
          </div>
        </div>

        <div className="card-body">
          {formError && <div className="alert alert-danger py-2">{formError}</div>}

          <form onSubmit={submitHandler} noValidate>
            <div className="mb-3">
              <label htmlFor="product-name" className="form-label">Product Name</label>
              <input ref={nameRef} id="product-name" name="name" type="text" value={form.name} onChange={handleChange} className="form-control" placeholder="Enter product name" disabled={saving} required />
            </div>

            <div className="mb-3">
              <label htmlFor="product-price" className="form-label">Price</label>
              <input id="product-price" name="price" type="number" value={form.price} onChange={handleChange} className="form-control" placeholder="Enter price" min="0" step="0.01" disabled={saving} required />
            </div>

            <div className="mb-3">
              <label htmlFor="product-category" className="form-label">Category</label>
              <input id="product-category" name="category" type="text" value={form.category} onChange={handleChange} className="form-control" placeholder="Enter category" disabled={saving} required />
            </div>

            <div className="mb-3">
              <label htmlFor="product-quantity" className="form-label">Quantity</label>
              <input id="product-quantity" name="quantity" type="number" value={form.quantity} onChange={handleChange} className="form-control" placeholder="Enter quantity" min="0" step="1" disabled={saving} required />
            </div>

            <div className="d-grid">
              <button className={`btn ${edit ? 'btn-warning' : 'btn-success'}`} type="submit" disabled={saving}>
                {saving ? (
                  <><span className="spinner-border spinner-border-sm me-2" />Saving...</>
                ) : edit ? 'Update Product' : 'Save Product'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Create;
