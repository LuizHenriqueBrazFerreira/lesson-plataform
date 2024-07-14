import { useEffect, useRef } from 'react';
import EditorJS, { OutputData } from '@editorjs/editorjs';
import textEditorConfigs from '../utils/textEditorConfigs';

type EditorProps = {
  content: string,
};

function ReadTextEditor({ content }: EditorProps) {
  const editorRef = useRef<EditorJS | null>(null);

  useEffect(() => {
    const initEditor = async () => {
      if (!editorRef.current) {
        let parsedContent = {};
        try {
          parsedContent = await new Promise((resolve) => {
            resolve(JSON.parse(content));
          });
        } catch (error) {
          console.error('Erro ao analisar o conteúdo:', error);
        }

        const editor = new EditorJS({
          ...textEditorConfigs,
          holder: 'editorReader',
          readOnly: true,
          data: parsedContent as OutputData,
        });

        editorRef.current = editor;
      }
    };

    initEditor();

    return () => {
      if (editorRef.current) {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
  }, [content]);

  return (
    <div className="h-fit min-w-fit">
      <div id="editorReader" />
    </div>
  );
}

export default ReadTextEditor;
