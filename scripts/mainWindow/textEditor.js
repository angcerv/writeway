const DecoupledEditor = require( '@ckeditor/ckeditor5-build-decoupled-document' );
const { updateChapterContent } = require('../../scripts/services/chapterService');

DecoupledEditor
        .create( document.querySelector( '.document-editor__editable' ), {
            language: 'es',
            toolbar: [
            'heading', '|',
            'undo', 'redo', '|',
            'fontFamily', 'fontSize','fontColor', 'fontBackgroundColor', '|',
            'bold', 'italic', 'underline', '|',
            'alignment:left', 'alignment:right','alignment:center', 'alignment:justify', '|',
            'bulletedList', 'numberedList', '|',
            'outdent', 'indent', '|'
            ],
            heading: {
                options: [
                    { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
                    { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
                    { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
                    { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' }
                ]
            }
        } )
        .then( editor => {
            const toolbarContainer = document.querySelector( '.document-editor__toolbar' );
            toolbarContainer.appendChild( editor.ui.view.toolbar.element );
            window.editor = editor;
        } )
        .catch( error => {
            console.error( error );
        } );

document.querySelector('#abDownIcon2').addEventListener('click', function(){
        console.log(editor.getData());
        
}, false);

async function saveEditorData(chapterId) {
    await updateChapterContent(chapterId, editor.getData());
}

async function setEditorData(data) {
    editor.setData(data);
}

module.exports = {
    saveEditorData: saveEditorData,
    setEditorData: setEditorData
}