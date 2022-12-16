import React from 'react';
import TutorialLayout from "../../../components/Tutorial/TutorialLayout";
import ResultInterpretation from "../../../components/Tutorial/ResultInterpretation";

export default function Help() {

    return (
        <TutorialLayout opened={['Spatial Mapping']} selected={'Result interpretation'}>
            <ResultInterpretation/>
        </TutorialLayout>
    )
}