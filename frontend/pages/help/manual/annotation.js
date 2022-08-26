import React from 'react';
import HelpLayout from "../../../components/Help/HelpLayout";
import ManualAnnotation from "../../../components/Help/Manual/ManualAnnotation.js";

export default function Help() {
    return (
        <HelpLayout opened={'manual'} selected={'manual_annotation'}>
            <ManualAnnotation></ManualAnnotation>
        </HelpLayout>
    )
}