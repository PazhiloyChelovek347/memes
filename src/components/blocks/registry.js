import ButtonBlock from './ButtonBlock.jsx'
import ChoiceBlock from './ChoiceBlock.jsx'
import ExampleCustomBlock from './custom/ExampleCustomBlock.jsx'
import ImageBlock from './ImageBlock.jsx'
import TapBlock from './TapBlock.jsx'
import TextBlock from './TextBlock.jsx'

/**
 * Реестр типов блоков: значение поля `type` в data-файле → компонент.
 * Новый блок = новый компонент + одна строка здесь.
 */
export const blockRegistry = {
  text: TextBlock,
  image: ImageBlock,
  button: ButtonBlock,
  tap: TapBlock,
  choice: ChoiceBlock,
  'example-custom': ExampleCustomBlock,
}
