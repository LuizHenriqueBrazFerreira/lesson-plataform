import { Component } from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

class EditorConvertToHTML extends Component {
  state = {
    editorState: EditorState.createEmpty(),
  };

  onEditorStateChange = (editorState: any) => {
    this.setState({
      editorState,
    });
    console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())));
  };

  render() {
    const { editorState } = this.state;
    return (
      <Editor
        editorState={ editorState }
        wrapperClassName="demo-wrapper border-2"
        editorClassName="demo-editor"
        onEditorStateChange={ this.onEditorStateChange }
        placeholder="Conteúdo da aula..."
      />
    );
  }
}

export default EditorConvertToHTML;
