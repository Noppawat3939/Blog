import { memo } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'align',
    'strike',
    'script',
    'blockquote',
    'background',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'color',
]

const modules = {
    history: [{ delay: 500 }, { maxStack: 100 }, { userOnly: false }],
    toolbar: [
        [{ header: [1, false] }],
        [{ font: [] }],
        [{ size: ['12px', '14px', '16px', '18px', '20px'] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ list: 'ordered' }, { list: 'bullet' }, { list: 'check' }],
        [{ color: [] }, { background: [] }],
        [{ align: [] }],
        ['link'],
        ['image'],
    ],
}

interface EditorProps {
    value: string
    onChange: (e: string) => void
}

const Editor = (props: EditorProps): JSX.Element => {
    const { value, onChange } = props

    return (
        <ReactQuill
            style={{
                height: '60vh',
                overflow: 'scroll',
                marginTop: '20px',
            }}
            theme="snow"
            value={value}
            onChange={onChange}
            placeholder="Write content is here..."
            modules={modules}
            formats={formats}
        />
    )
}

export default memo(Editor)
