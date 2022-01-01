import { EditorView, ViewPlugin, ViewUpdate } from "@codemirror/view";
import React, { useState } from "react";

import { EditorState } from "@codemirror/state";
import { basicSetup } from "@codemirror/basic-setup";
import { markdown } from "@codemirror/lang-markdown";

type Props = {
  onChange: (value: string) => void;
};

const updaterPlugin = (onChange: (value: string) => void) =>
  ViewPlugin.fromClass(
    class {
      update(update: ViewUpdate) {
        if (update.docChanged) onChange(update.state.doc.toJSON().join("\n"));
      }
    }
  );

const Editor = ({ onChange }: Props): React.ReactElement => {
  const [editorState] = useState(
    EditorState.create({
      extensions: [basicSetup, markdown(), updaterPlugin(onChange)],
    })
  );

  return (
    <div
      ref={(node) => {
        if (node) {
          new EditorView({
            state: editorState,
            parent: node,
          });
        }
      }}
    />
  );
};

export default Editor;
