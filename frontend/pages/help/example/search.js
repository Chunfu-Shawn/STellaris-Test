import React from 'react';
import HelpLayout from "../../../components/Help/HelpLayout";
import HelpSearch from "../../../components/Help/Example/SearchModule.js";

export default function Help() {

    return (
        <HelpLayout opened={['example']} selected={'example_search'}>
            <HelpSearch></HelpSearch>
        </HelpLayout>
    )
}