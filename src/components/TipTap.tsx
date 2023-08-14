import React, { FunctionComponent } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

const Tiptap: FunctionComponent = () => {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                paragraph: {
                    HTMLAttributes: {
                        class: 'text-black',
                    },
                },
            }),
        ],
        content: '<h1>Hello World!</h1> <p>Hello World!</p>',
        editorProps: {
            attributes: {
                class: 'focus:outline-none border-t border-t-secondary py-2',
            },
        },
    });

    if (!editor) {
        return null;
    }

    return (
        <div className='border border-secondary rounded-md p-2 flex flex-col gap-2'>
            <div className='w-full justify-start flex'>
                <button
                    className='text-secondary'
                    onClick={() => editor.chain().focus().toggleBold().run()}
                >
                    B
                </button>
            </div>

            <EditorContent editor={editor} />
        </div>
    );
};

export default Tiptap;
