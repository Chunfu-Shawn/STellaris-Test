import React from 'react';
import TutorialLayout from "../../../components/Tutorial/TutorialLayout";
import HumanSCC from "../../../components/Tutorial/HumanSCC";

export default function HumanSCCPage() {

    return (
        <TutorialLayout opened={['Spatial Mapping']} selected={'HumanSCC'}>
            <HumanSCC/>
        </TutorialLayout>
    )
}