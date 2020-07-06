import * as React from 'react';
import { useState } from 'react';

type ListItemsProps = { items: string[] }
type ListAdderProps = { onAdd: (text: string) => void }

const ListAdder = (props: ListAdderProps) => {
    const [itemName, setItemName] = useState("")

    const handleSubmit = (ev: React.FormEvent) => {
        ev.preventDefault()
        props.onAdd(itemName)
    }
    return <div>
        <form onSubmit={handleSubmit}>
            <label htmlFor="item-name"></label>
            <input name="item-name" type="text" onChange={ev => setItemName(ev.target.value)} />
            <input type="submit" value="Add Item" />
        </form>
    </div>
}

const ListDisplay = (props: ListItemsProps) => (props.items.length > 0) ? <ul>
    {props.items.map((item, index) => <li key={item + index}>{item}</li>)}
</ul> : <h3>Empty List</h3>

const List = (props: ListItemsProps & ListAdderProps) => {
    return <ListDisplay items={props.items}></ListDisplay>
}


export {
    ListDisplay, ListAdder, List
}