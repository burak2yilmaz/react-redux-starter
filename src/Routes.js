import React from "react";

//  HELPERS
import {
    variables
} from "./helpers";

//  PAGES
import {
    HomePage
} from "./pages";

//  LAYOUTS
import {
    Layout1
} from "./layouts";

const Routes = [
    {   //  0
        name: "homepage",
        url: variables.url.APP + "/",
        title: "Anasayfa",
        layout: Layout1,
        page: HomePage,
        status: 1,
        icon: "icon-home"
    }
];

export default Routes;