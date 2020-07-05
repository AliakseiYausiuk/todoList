import React, {useState,ChangeEvent} from 'react';

type EditableSpanType = {
    title: string;
    saveTitle: (newTitle:string) => void,
}

function EditableSpan(props: EditableSpanType) {

    let [editMode, setEditMode] = useState(false);
    let [title,setTitle] = useState(props.title)

    const onEditMode = () => {
        setEditMode(true);
    }

    const ofEditMode = () => {
        setEditMode(false);
        props.saveTitle(title);
        setTitle('');
    }

    const changeTitle = (e:ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }



    return editMode ? <input value={title} autoFocus={true} onBlur={ofEditMode} onChange={changeTitle}/>
    : <span onDoubleClick={onEditMode}>{props.title}</span>


}

export default EditableSpan;