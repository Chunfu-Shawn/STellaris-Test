import {Tabs} from "antd";
import AnnotateSpatialLocation from "../AnnotateSpatialLocation";
import React from "react";
import {data, getAnnotationOptions} from "../../Datasets/getData&Options";


const validateMessages = {
    required: '${label} is required!',
    types: {
        email: '${label} is not a valid email!',
        number: '${label} is not a valid number!',
    },
    number: {
        range: '${label} must be between ${min} and ${max}',
    },
    string: {
        max: "'${name}' cannot be longer than ${max} characters",
    }
};
const {speciesOptions,organOptions,tissueOptions} = getAnnotationOptions(data);

export default function UploadModule(){
    return(
        <Tabs className={'border-card-wrapper'}
              style={{paddingLeft:30,width:700,background:'rgb(253,252,255)'}}
              defaultActiveKey="1"
              size={'large'}
        >
            <Tabs.TabPane tab="Annotate Spatial Location" key="2">
                <AnnotateSpatialLocation
                    validateMessages={validateMessages}
                    speciesOptions={speciesOptions}
                    organOptions={organOptions}
                    tissueOptions={tissueOptions}
                />
            </Tabs.TabPane>
        </Tabs>
    )
}