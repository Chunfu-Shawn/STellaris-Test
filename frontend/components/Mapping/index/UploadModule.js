import {Tabs} from "antd";
import MappingForScRNAseq from "./MappingForScRNAseq";
import React from "react";
import MappingForSingleCellMultiomics from "./MappingForSingleCellMultiomics";

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

export default function UploadModule(){
    const items =[
        {
            label: 'For scRNA-seq', key: 'item-1', children:
                <MappingForScRNAseq
                    validateMessages={validateMessages}
                />
        },// 务必填写 key
        {
            label: 'For Single Cell Multiomics', key: 'item-2', children:
                <MappingForSingleCellMultiomics
                    validateMessages={validateMessages}
                />
        }
    ]
    return(
        <Tabs className={'border-card-wrapper'}
              style={{paddingLeft:30,width:700,background:'rgb(251,251,252)'}}
              defaultActiveKey="1"
              items={items}
              size={'large'}
        />
    )
}