/** Карточка-страница: заголовок + содержимое */
function PageCard({ title, titleRef, children }) {
  return (
    <article className="page-card">
      {title && (
        <h1 className="page-card__title" ref={titleRef} tabIndex={-1}>
          {title}
        </h1>
      )}
      <div className="page-card__body">{children}</div>
    </article>
  )
}

export default PageCard
