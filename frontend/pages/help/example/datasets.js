import React from 'react';
import HelpLayout from "../../../components/Help/HelpLayout";
import HelpDatasets from "../../../components/Help/Example/DatasetsModule.js";

export default function Help() {

    return (
        <HelpLayout opened={'example'} selected={'example_datasets'}>
            <HelpDatasets></HelpDatasets>
        </HelpLayout>
    )
}