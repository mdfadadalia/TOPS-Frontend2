import { useMutation, useQuery } from '@apollo/client/react';
import { DELETE_PRODUCT, GET_PRODUCTS } from '../graphql/productQueries';
import { useMyContext } from '../Context/MyContext';

const Display = () => {
  const { data, loading, error, refetch } = useQuery(GET_PRODUCTS, {
    fetchPolicy: 'cache-and-network',
  });
  const { editHandler } = useMyContext();
  const [deleteProduct, { loading: deleting }] = useMutation(DELETE_PRODUCT, {
    update(cache, { data: mutationData }) {
      const deletedId = mutationData?.deleteProduct?.id;
      if (!deletedId) return;

      cache.modify({
        fields: {
          products(existing = [], { readField }) {
            return existing.filter((reference) => readField('id', reference) !== deletedId);
          },
        },
      });
    },
  });

  const products = data?.products ?? [];

  const handleDelete = async (product) => {
    if (!window.confirm(`Delete "${product.name}"?`)) return;

    try {
      await deleteProduct({ variables: { id: product.id } });
    } catch (mutationError) {
      window.alert(mutationError.message || 'Unable to delete product.');
    }
  };

  if (loading && !data) {
    return (
      <section className="col-12 col-lg-8">
        <div className="card text-center p-5">
          <div className="spinner-border text-primary mx-auto" role="status" />
          <p className="mb-0 mt-3 text-muted">Loading products...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="col-12 col-lg-8">
        <div className="card p-4">
          <div className="alert alert-danger mb-3">{error.message}</div>
          <button className="btn btn-outline-primary" onClick={() => refetch()}>Try Again</button>
        </div>
      </section>
    );
  }

  return (
    <section className="col-12 col-lg-8">
      <div className="card">
        <div className="card-header bg-primary text-white">
          <div className="d-flex justify-content-between align-items-center gap-2">
            <h5 className="mb-0">Product List</h5>
            <span className="badge bg-light text-primary">{products.length} Products</span>
          </div>
        </div>

        <div className="card-body p-0">
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
                {products.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center text-muted py-5">No products found.</td>
                  </tr>
                ) : products.map((product, index) => (
                  <tr key={product.id}>
                    <td>{index + 1}</td>
                    <td className="fw-semibold">{product.name}</td>
                    <td>{product.category}</td>
                    <td>₹ {Number(product.price).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                    <td>{product.quantity}</td>
                    <td className="text-center text-nowrap">
                      <button type="button" className="btn btn-sm btn-warning me-2" onClick={() => editHandler(product)} disabled={deleting}>
                        Edit
                      </button>
                      <button type="button" className="btn btn-sm btn-danger" onClick={() => handleDelete(product)} disabled={deleting}>
                        {deleting ? <span className="spinner-border spinner-border-sm" /> : 'Delete'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Display;
