import * as React from "react";
import * as ReactDOM from "react-dom";
import {setStylesTarget} from "typestyle";

import {App} from "./App";

const store = {};

ReactDOM.hydrate(
    <App {...store} />,
    document.getElementById("root") as HTMLElement,
);

setStylesTarget(document.getElementById("styles-target") as HTMLElement);
