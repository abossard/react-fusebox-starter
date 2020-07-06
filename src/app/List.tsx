import * as React from 'react';
import { useState } from 'react';

type ListItemsProps = { items: string[] }
type ListAdderProps = { onAdd: (text: string) => void }

const ItemNameValidator = (name: string) => true


const ListAdder = (props: ListAdderProps) => {
    const [itemName, setItemName] = useState("")

    const handleSubmit = (ev: React.FormEvent) => {
        ev.preventDefault()
        props.onAdd(itemName)
        setItemName("")
    }
    return <div>
        <form onSubmit={handleSubmit}>
            <label htmlFor="item-name"></label>
            <input
                name="item-name"
                type="text"
                value={itemName}
                onChange={ev => setItemName(ev.target.value)}
            />
            <input type="submit" value="Add Item" />
        </form>
    </div>
}

const ListDisplay = (props: ListItemsProps) => (props.items.length > 0) ?
    <ul>
        {props.items.map((item, index) => <li key={item + index}>{item}</li>)}
    </ul>
    : <h3>Empty list, add the first one</h3>

const List = (props: ListItemsProps & ListAdderProps) => {
    return <div>
        <h3>My current backlog</h3>
        <ListDisplay items={props.items}></ListDisplay>
        <ListAdder onAdd={props.onAdd}></ListAdder>
    </div>
}


export {
    ListDisplay, ListAdder, List
}