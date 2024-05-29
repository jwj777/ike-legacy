import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';

ClassicEditor.create(document.querySelector("#editor"), {
  fontSize: {
    options: ["tiny", "small", "default", "big"],
  },
  link: {
    decorators: {
      openInNewTab: {
        mode: "manual",
        label: "Open in a new tab",
        attributes: {
          target: "_blank",
          rel: "noopener noreferrer",
        },
      },
    },
  },
  language: "en",
}).catch((error) => {
  console.error(error);
});
