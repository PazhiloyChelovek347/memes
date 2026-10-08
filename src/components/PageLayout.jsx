function PageLayout({ title, children }) {
  return (
    <div className="book">
      <h1>{title}</h1>
      <div className="page-content">
        {children}
      </div>
    </div>
  )
}

export default PageLayout