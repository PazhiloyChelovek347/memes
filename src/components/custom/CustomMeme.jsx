import PageLayout from '../PageLayout'

function CustomMeme({ page, onConfirm }) {
  return (
    <PageLayout title={page.title}>
      <p>Это кастомная страница.</p>

      <button onClick={onConfirm}>
        Выполнить условие
      </button>
    </PageLayout>
  )
}

export default CustomMeme