import React from 'react';
import HelpLayout from "../components/Help/HelpLayout";
import HelpProject from "../components/Help/ProjectOverview.js";

export default function Help() {
    return (
        <HelpLayout selected='project'>
            <HelpProject></HelpProject>
        </HelpLayout>
    )
}