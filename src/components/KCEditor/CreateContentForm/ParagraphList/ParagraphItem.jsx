import { memo } from 'react'

const ParagraphItem = (props) => {
  const {
    data,
    fullContent = '',
    addContentToEditor,
    clickToShowFullContent,
  } = props

  return (
    <div className="border rounded bg-white mb-2 p-2 cursor-pointer">
      <span onClick={() => {addContentToEditor(data, false)}}>{data}</span>
      <a className="underline text-blue-500" href="#" onClick={() => {clickToShowFullContent(data,fullContent)}}> KhÃ³ hiá»ƒu? Xem thÃªm</a>
    </div>
  )
}

export default memo(ParagraphItem);
