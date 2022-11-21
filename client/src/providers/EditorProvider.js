import React from "react";
import reducer from "../editorReducer";
import { EditorState } from "draft-js";

export const EditorContext = React.createContext({});

function EditorProvider({ children }) {
	const initialState = EditorState.createEmpty();
	const [editorState, callReducer] = React.useReducer(reducer, initialState);

	const onChange = data => {
		callReducer({ dispatch: "UPDATE_EDITOR", data });
	};

	return (
		<EditorContext.Provider value={{ editorState, onChange, callReducer }}>
			{children}
		</EditorContext.Provider>
	);
}

export default EditorProvider;
