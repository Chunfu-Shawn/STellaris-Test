import React from 'react';
import HelpLayout from "../../../components/Help/HelpLayout";
import HelpAnnotation from "../../../components/Help/Example/AnnotationModule.js";

export default function Help() {
    return (
        <HelpLayout opened={'features'} selected={'features_annotation'}>
            <HelpAnnotation></HelpAnnotation>
        </HelpLayout>
    )
}