const Container = ({ children }) => (
  <>
    <nav className="navbar navbar-dark bg-primary shadow-sm">
      <div className="container">
        <span className="navbar-brand fw-bold">Products CRUD System</span>
      </div>
    </nav>

    <main className="container py-4">
      <div className="row g-4 align-items-start">{children}</div>
    </main>
  </>
);

export default Container;
