import markdownit from "markdown-it"
import DOMPurify from "dompurify"

const md = markdownit({
})

const Markdown = ({text} : {text: string}) => {
    const htmlContent = markdownit().render(text)
    const sanitizeHtml = DOMPurify.sanitize(htmlContent);
  return (
    <div dangerouslySetInnerHTML={{__html: sanitizeHtml}}>

    </div>
  )
}

export default Markdown
