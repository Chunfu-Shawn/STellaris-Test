import React from 'react';
import HelpLayout from "../../../components/Help/HelpLayout";
import MappingModule from "../../../components/Help/Example/MappingModule.js";

export default function Help() {
    return (
        <HelpLayout opened={['example']} selected={'example_mapping'}>
            <MappingModule></MappingModule>
        </HelpLayout>
    )
}