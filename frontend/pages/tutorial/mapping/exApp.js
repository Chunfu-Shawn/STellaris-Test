import React from 'react';
import TutorialLayout from "../../../components/Tutorial/TutorialLayout";
import MutiOmics from "../../../components/Tutorial/MutiOmics";

export default function Help() {

    return (
        <TutorialLayout opened={['Spatial Mapping']} selected={'MutiOmics'}>
            <MutiOmics/>
        </TutorialLayout>
    )
}