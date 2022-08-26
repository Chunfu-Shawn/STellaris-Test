import React from 'react';
import HelpLayout from "../../../components/Help/HelpLayout";
import ManualBrowser from "../../../components/Help/Manual/ManualBrowser.js";

export default function Help() {

    return (
        <HelpLayout opened={'manual'} selected={'manual_browser'}>
            <ManualBrowser></ManualBrowser>
        </HelpLayout>
    )
}