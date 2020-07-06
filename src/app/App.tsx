import * as React from "react";
import {style} from "typestyle";
import { List } from './List';

const mainStyle = style({
    color: "green",
    fontFamily: "comic sans, helvetica",
});

const makeSomeSpacePlease = style({
    paddingTop: 20,
});

class App extends React.Component {
    public render() {
        const debug = (text:string) => {
            console.log(text);
        }
        return (
            <div className={mainStyle}>
                <h1>Hello, World!</h1>
                <List items={["Item 1"]} onAdd={debug}></List>
            </div>
        );
    }
}

export {App};
