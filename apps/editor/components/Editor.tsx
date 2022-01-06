import { EditorView, ViewPlugin, ViewUpdate } from "@codemirror/view";
import React, { MutableRefObject, useState } from "react";

import { EditorState } from "@codemirror/state";
import { basicSetup } from "@codemirror/basic-setup";
import { markdown } from "@codemirror/lang-markdown";

type Props = {
  valueRef: MutableRefObject<string>;
  onChange?: () => void;
};

const updaterPlugin = (onChange: (value: string) => void) =>
  ViewPlugin.fromClass(
    class {
      update(update: ViewUpdate) {
        if (update.docChanged) onChange(update.state.doc.toJSON().join("\n"));
      }
    }
  );

const Editor = ({ valueRef, onChange }: Props): React.ReactElement => {
  const [editorState] = useState(
    EditorState.create({
      doc: valueRef.current,
      extensions: [
        basicSetup,
        markdown(),
        updaterPlugin((value) => {
          valueRef.current = value;
          onChange?.();
        }),
      ],
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

export default React.memo(Editor);
