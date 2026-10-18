/** Ответное сообщение под кнопкой/вопросом. Пустой текст не рендерится. */
function Message({ children }) {
  if (!children) {
    return null
  }

  return (
    <p className="message" role="status">
      {children}
    </p>
  )
}

export default Message
