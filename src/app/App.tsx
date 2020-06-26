import * as React from "react";
import {style} from "typestyle";

const mainStyle = style({
    color: "green",
    fontFamily: "comic sans, helvetica",
});

const makeSomeSpacePlease = style({
    paddingTop: 20,
});

class App extends React.Component {
    public render() {
        return (
            <div className={mainStyle}>
                
                <h1>look at my <em>xyz</em></h1>
                <hr/>
                <dl>
                    <dt className={makeSomeSpacePlease}><h3>Async state example</h3></dt>
                    <dd>
                        <p>
                            Count 5
                        </p>
                        <button onClick={this.onReset}>
                            Hit me
                        </button>
                    </dd>
                </dl>
                
            </div>
        );
    }

    public onReset = () => {
        console.log("s");
    }
}

export {App};
