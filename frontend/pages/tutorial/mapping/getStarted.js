import React from 'react';
import GetStarted from "../../../components/Tutorial/GetStarted";
import TutorialLayout from "../../../components/Tutorial/TutorialLayout";

export default function Help() {

    return (
        <TutorialLayout opened={['Spatial Mapping']} selected={'Get started'}>
            <GetStarted/>
        </TutorialLayout>
    )
}