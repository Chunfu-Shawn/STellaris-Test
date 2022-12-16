import React from 'react';
import TutorialLayout from "../../components/Tutorial/TutorialLayout";
import GeneSearch from "../../components/Tutorial/GeneSearch";

export default function Help() {

    return (
        <TutorialLayout opened={['Spatial Mapping']} selected={'Gene Search'}>
            <GeneSearch/>
        </TutorialLayout>
    )
}