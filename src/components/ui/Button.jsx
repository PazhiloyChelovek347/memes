/** Кнопка в стиле приложения. variant: neutral | positive | negative | ghost */
function Button({ variant = 'neutral', done = false, className = '', ...props }) {
  const classes = ['btn', `btn--${variant}`, done && 'is-done', className].filter(Boolean).join(' ')

  return <button type="button" className={classes} {...props} />
}

export default Button
