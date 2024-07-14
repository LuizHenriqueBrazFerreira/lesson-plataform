import { useEffect, useRef } from 'react';
import EditorJS, { OutputData } from '@editorjs/editorjs';
import textEditorConfigs from '../utils/textEditorConfigs';

type EditorProps = {
  handleContentChange: (content: any) => void;
  content?: any;
  index: number;
};

function Editor({ handleContentChange, content = {}, index }: EditorProps) {
  const editorRef = useRef<EditorJS | null>(null);

  useEffect(() => {
    if (!editorRef.current) {
      let parsedContent = {};
      try {
        parsedContent = JSON.parse(content);
      } catch (error) {
        console.error('Erro ao analisar o conteúdo:', error);
      }

      const editor = new EditorJS({
        ...textEditorConfigs,
        holder: `editorjs${index}`,
        data: parsedContent as OutputData,
        onChange: async () => {
          if (!editorRef.current) return;
          const outputData = await editorRef.current.save();
          handleContentChange(JSON.stringify(outputData));
        },
      });

      editorRef.current = editor;
    }

    return () => {
      if (editorRef.current) {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
  }, [handleContentChange]);

  return (
    <div className="border-2 h-fit min-w-fit px-14">
      <div id={ `editorjs${index}` } />
    </div>
  );
}

export default Editor;
