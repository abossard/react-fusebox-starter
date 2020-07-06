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
    const [items, setItems] = useState([] as string[])
    const listProps = {
        items,
        onAdd: (newItemText:string) => {
            setItems([...items, newItemText])
        }
    }

    return (
        <div className={mainStyle}>
            <h1>Hello, World!</h1>
            <List {...listProps}></List>
        </div>
    );
}

export { App };


/*
    const [items, setItems] = useState([] as string[]);

    const listProps = {
        items,
        onAdd: (text: string) => {
            setItems([...items, text])
        }
    }
*/