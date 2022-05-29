import { EditorView, ViewPlugin, ViewUpdate } from "@codemirror/view";
import React, { useState } from "react";

import { EditorState } from "@codemirror/state";
import { basicSetup } from "@codemirror/basic-setup";
import { markdown } from "@codemirror/lang-markdown";
import { oneDark } from "@codemirror/theme-one-dark";
import styled from "@emotion/styled";

const Container = styled.div({
  color: "initial",
});

type Props = {
  initialValue: string;
  onChange?: (value: string) => void;
};

const updaterPlugin = (onChange: (value: string) => void) =>
  ViewPlugin.fromClass(
    class {
      update(update: ViewUpdate) {
        if (update.docChanged) onChange(update.state.doc.toJSON().join("\n"));
      }
    }
  );

const Editor = ({ initialValue, onChange }: Props): React.ReactElement => {
  const [editorState] = useState(
    EditorState.create({
      doc: initialValue,
      extensions: [
        basicSetup,
        oneDark,
        markdown(),
        updaterPlugin((value) => {
          onChange?.(value);
        }),
      ],
    })
  );

  return (
    <Container
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
