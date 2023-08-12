import React, { FunctionComponent } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import SVG from 'react-inlinesvg';

import BoldIcon from '../assets/icons/bold-02.svg';
import UnderlineIcon from '../assets/icons/underline-02.svg';

const Tiptap: FunctionComponent = () => {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                paragraph: {
                    HTMLAttributes: {
                        class: 'text-pink-700',
                    },
                },
            }),
        ],
        content: '<p>Hello World!</p> <p>Hello World!</p>',
        editorProps: {
            attributes: {
                class: 'focus:outline-none border-t border-t-secondary',
            },
        },
    });

    if (!editor) {
        return null;
    }

    return (
        <div className='border border-secondary rounded-md p-2'>
            <button
                className='text-secondary'
                onClick={() => editor.chain().focus().toggleBold().run()}
            >
                <SVG
                    src={BoldIcon}
                />
            </button>

            <EditorContent editor={editor} />
        </div>
    );
};

export default Tiptap;
