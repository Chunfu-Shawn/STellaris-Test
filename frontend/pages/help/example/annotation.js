import React from 'react';
import HelpLayout from "../../../components/Help/HelpLayout";
import HelpAnnotation from "../../../components/Help/Example/AnnotationModule.js";

export default function Help() {
    return (
        <HelpLayout opened={'example'} selected={'example_annotation'}>
            <HelpAnnotation></HelpAnnotation>
        </HelpLayout>
    )
}