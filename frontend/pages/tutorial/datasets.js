import React from 'react';
import TutorialLayout from "../../components/Tutorial/TutorialLayout";
import DatasetBrowser from "../../components/Tutorial/DatasetBrowser";

export default function Help() {

    return (
        <TutorialLayout opened={['Spatial Mapping']} selected={'Dataset Browser'}>
            <DatasetBrowser/>
        </TutorialLayout>
    )
}