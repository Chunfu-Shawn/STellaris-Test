import React from 'react';
import HelpLayout from "../../../components/Help/HelpLayout";
import HelpBrowser from "../../../components/Help/Example/BrowserModule.js";

export default function Help() {

    return (
        <HelpLayout opened={'example'} selected={'example_browser'}>
            <HelpBrowser></HelpBrowser>
        </HelpLayout>
    )
}