import React from 'react';
import Overview from "../components/Tutorial/Overview";
import TutorialLayout from "../components/Tutorial/TutorialLayout";

export default function Help() {

    return (
        <TutorialLayout opened={['Spatial Mapping']} selected={'Overview'}>
            <Overview/>
        </TutorialLayout>
    )
}