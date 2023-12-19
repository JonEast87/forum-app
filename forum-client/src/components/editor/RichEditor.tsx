import React, { useState, useCallback, useMemo, useEffect, FC } from "react";
import { Editable, withReact, useSlate, Slate, useEditor } from "slate-react";
import { Editor, Transforms, createEditor, Node } from "slate";
import isHotKey from "is-hotkey";
import { withHistory } from "slate-history";
import { Button, Toolbar } from "./RichTextControls";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBold,
    faItalic,
    faUnderline,
    faCode,
    faHeading,
    faQuoteRight,
    faListOl,
    faListUl,
} from "@fortawesome/free-solid-svg-icons";
import "./RichEditor.css";

// this simply allows us to make hotkeys for the user to utilize in the text editor
const HOTKEYS: { [keyName: string]: string } = {
    "mod+b": "bold",
    "mod+i": "italic",
    "mod-u": "underline",
    "mod+`": "code",
};

// this editor uses objects and not string values
const initialValue = [
    {
        type: "paragraph",
        children: [{ text: "Enter your post here." }],
    },
];

// this simply allows the editor to distinguish if the between a paragraph or line of text
const LIST_TYPES = ["numbered-list", "bulleted-list"];

interface RichEditorProps {
    existingBody?: string;
}

const RichEditor: FC<RichEditorProps> = ({ existingBody }) => {
    const [value, setValue] = useState<Node[]>(initialValue);
    // renders larger peices of text, ie multilines
    const renderElement = useCallback((props) => <Element {...props} />, []);
    // this handles some snippets of text inside the editor
    const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
    // this withHistory will remember all changes made show that the user can quickly undo them if needed
    // this is the actual editor whereas the Slate, Toolbar and Editable are simply wrappers
    const editor = useMemo(() => withHistory(withReact(createEditor())), []);

    useEffect(() => {
        if (existingBody) {
            setValue([
                {
                    type: "paragraph",
                    text: existingBody,
                },
            ]);
        }
    }, []);

    // changes the local value, it accepts a Node array since that is what Slates uses
    const onChangeEditorValue = (val: Node[]) => {
        setValue(val);
    };

    return (
        // the start of our JSX defintion in which we initialize our Slate wrapper comp with the editor
        <Slate editor={editor} value={value} onChange={onChangeEditorValue}>
            <Toolbar>
                <MarkButton format="bold" icon="bold" />
                <MarkButton format="italic" icon="italic" />
                <MarkButton format="underline" icon="underlined" />
                <MarkButton format="code" icon="code" />
                <BlockButton format="heeading-one" icon="header1" />
                <BlockButton format="blockquote" icon="in_quotes" />
                <BlockButton format="numbered-list" icon="list_numbered" />
                <BlockButton format="bulleted-list" icon="list_bulleted" />
            </Toolbar>
            <Editable className="editor" renderElement={renderElement} renderLeaf={renderLeaf} placeholder="Enter some rich text..." spellCheck autoFocus
                onKeyDown={(event) => {
                    for (const hotkey in HOTKEYS) {
                        if (isHotKey(hotkey, event as any)) {
                            event.preventDefault();
                            const mark = HOTKEYS[hotkey];
                            toggleMark(editor, mark);
                        }
                    }
                }}
            />
        </Slate>
    );
};

const MarkButton = ({ format, icon }: { format: string; icon: string }) => {
    const editor = useSlate();
    let thisIcon = faBold;
    if (icon === "italic") {
        thisIcon = faItalic;
    } else if (icon === "underlined") {
        thisIcon = faUnderline;
    } else if (icon === "code") {
        thisIcon = faCode;
    }
    return (
        <Button
            active={isMarkActive(editor, format)}
            onMouseDown={(event: any) => {
                event.preventDefault();
                toggleMark(editor, format);
            }}
        >
            <FontAwesomeIcon icon={thisIcon} />
        </Button>
    );
};

const isMarkActive = (editor: Editor, format: string) => {
    const marks = Editor.marks(editor);
    return marks ? marks[format] === true : false;
};

const toggleMark = (editor: Editor, format: string) => {
    const isActive = isMarkActive(editor, format);

    if (isActive) {
        Editor.removeMark(editor, format);
    } else {
        Editor.addMark(editor, format, true);
    }
};

const BlockButton = ({ format, icon }: { format: string; icon: string }) => {
    const editor = useSlate();
    let thisIcon = faHeading;
    if (icon === "heading1") {
        thisIcon = faItalic;
    } else if (icon === "heading2") {
        thisIcon = faUnderline;
    } else if (icon === "in_quotes") {
        thisIcon = faQuoteRight;
    } else if (icon === "list_numbered") {
        thisIcon = faListOl;
    } else if (icon === "list_bulleted") {
        thisIcon = faListUl;
    }
    return (
        <Button
            active={isBlockActive(editor, format)}
            onMouseDown={(event: any) => {
                event.preventDefault();
                toggleBlock(editor, format);
            }}
        >
            <FontAwesomeIcon icon={thisIcon} />
        </Button>
    );
};

const isBlockActive = (editor: Editor, format: string) => {
    const [match] = Editor.nodes(editor, {
        match: (n) => n.type === format,
    });

    return !!match;
};

const toggleBlock = (editor: Editor, format: string) => {
    const isActive = isBlockActive(editor, format);
    const isList = LIST_TYPES.includes(format);

    Transforms.unwrapNodes(editor, {
        match: (n) => LIST_TYPES.includes(n.type as string),
        split: true,
    });

    Transforms.setNodes(editor, {
        type: isActive ? "paragraph" : isList ? "list-item" : format,
    });

    if (!isActive && isList) {
        const block = { type: format, children: [] };
        Transforms.wrapNodes(editor, block);
    }
};

const Element = ({
    attributes,
    children,
    element,
}: {
    attributes: any;
    children: any;
    element: any;
}) => {
    switch (element.type) {
        case "block-quote":
            return <blockquote {...attributes}>{children}</blockquote>;
        case "bulleted-list":
            return <ul {...attributes}>{children}</ul>;
        case "heading-one":
            return <h1 {...attributes}>{children}</h1>;
        case "heading-two":
            return <h2 {...attributes}>{children}</h2>;
        case "list-item":
            return <li {...attributes}>{children}</li>;
        case "numbered-list":
            return <ol {...attributes}>{children}</ol>;
        default:
            return <p {...attributes}>{children}</p>;
    }
};

const Leaf = ({
    attributes,
    children,
    leaf,
}: {
    attributes: any;
    children: any;
    leaf: any;
}) => {
    if (leaf.bold) {
        children = <strong>{children}</strong>;
    }
    if (leaf.code) {
        children = <code>{children}</code>;
    }
    if (leaf.italic) {
        children = <em>{children}</em>;
    }
    if (leaf.underline) {
        children = <u>{children}</u>;
    }

    return <span {...attributes}>{children}</span>;
};

export default RichEditor;