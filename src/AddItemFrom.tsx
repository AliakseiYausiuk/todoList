import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type addItemFromType = {
    addItem: (title: string) => void;
}

function AddItemFrom(props: addItemFromType) {

    let [title, setTitle] = useState<string>('');
    let [error, setError] = useState<string | null>(null);


    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value);

    const onAddItem = () => {
        if (title.trim() !== "") {
            props.addItem(title);

        } else {
            setError('Title is required');
        }
        setTitle('');

    }


const onKeyPressItem = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (e.charCode === 13) {
        onAddItem();
    }
}
return (<div>

    <input
        type='text' value={title}
        onChange={onChangeHandler}
        onKeyPress={onKeyPressItem}
        className={error ? "error" : ""}
    />
    <button onClick={onAddItem}>add</button>
    {error && <div className={'error-message'}>{error}</div>}
</div>
)

}

export default AddItemFrom;