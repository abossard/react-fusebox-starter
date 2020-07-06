import * as React from "react";
import { style } from "typestyle";
import { List } from './List';
import { useState } from 'react';

const mainStyle = style({
    color: "green",
    fontFamily: "comic sans, helvetica",
});

const makeSomeSpacePlease = style({
    paddingTop: 20,
});

const App = () => {
    const [items, setItems] = useState([] as string[]);

    const addItem = (text: string) => {
        setItems([...items, text])
    }
    return (
        <div className={mainStyle}>
            <h1>Hello, World!</h1>
            <List items={items} onAdd={addItem}></List>
        </div>
    );
}

export { App };
