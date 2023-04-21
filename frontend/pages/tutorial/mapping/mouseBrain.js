import React from 'react';
import TutorialLayout from "../../../components/Tutorial/TutorialLayout";
import MouseFetalBrain from "../../../components/Tutorial/MouseFetalBrain";

export default function MouseBrainPage() {

    return (
        <TutorialLayout opened={['Spatial Mapping']} selected={'MouseFetalBrain'}>
            <MouseFetalBrain/>
        </TutorialLayout>
    )
}