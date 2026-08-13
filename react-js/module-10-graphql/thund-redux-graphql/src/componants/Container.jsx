import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearError } from '../features/crud/crudSlice';

const Container = ({ children }) => {
    const dispatch = useDispatch();
    const error = useSelector((state) => state.products.error);

    return (
        <>
            <nav className="navbar navbar-dark bg-primary shadow-sm">
                <div className="container">
                    <span className="navbar-brand fw-bold">Products CRUD System</span>
                </div>
            </nav>

            <main className="container py-4">
                {error && (
                    <div className="alert alert-danger alert-dismissible fade show" role="alert">
                        <strong>API Error:</strong> {error}
                        <button
                            type="button"
                            className="btn-close"
                            aria-label="Close"
                            onClick={() => dispatch(clearError())}
                        />
                    </div>
                )}

                <div className="row g-4 align-items-start">
                    {children}
                </div>
            </main>
        </>
    );
};

export default Container;
