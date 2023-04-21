import {message, Tabs} from "antd";
import MappingForScRNAseq from "./MappingForScRNAseq";
import React, {useState,useEffect} from "react";
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
    const [token,setToken] = useState('')
    const items =[
        {
            label: 'For scRNA-seq', key: 'item-1', children:
                <MappingForScRNAseq
                    validateMessages={validateMessages}
                    token={token}
                />
        },// 务必填写 key
        {
            label: 'For single-cell multiomics', key: 'item-2', children:
                <MappingForSingleCellMultiomics
                    validateMessages={validateMessages}
                    token={token}
                />
        }
    ]

    // set google reCAPTCHA v3
    const handleLoaded = _ => {
        window.grecaptcha.ready(_ => {
            // set the style of reCAPTCHA v3 badge
            const badge = document.getElementsByClassName('grecaptcha-badge')[0]
            badge.style.display = 'block'
            badge.style.opacity = '0.5'
            window.grecaptcha
                .execute("6Ld5sZglAAAAAJjVPWhT2G0rV5igM2-UiparMzPS", { action: "submit" })
                .then(token => {
                    if(token.length!==0) setToken(token)
                    else message.error({
                            content:'Failed in reCAPTCHA',
                            style:{
                                marginTop: '12vh',
                            },
                            duration:3,
                        });
                })
        })
    }
    useEffect(() => {
        // Add reCaptcha
        const script = document.createElement("script")
        script.src = "https://www.recaptcha.net/recaptcha/api.js?render=6Ld5sZglAAAAAJjVPWhT2G0rV5igM2-UiparMzPS"
        script.addEventListener("load", handleLoaded)
        document.body.appendChild(script)
    }, [])

    return(
        <Tabs className={'border-card-wrapper'}
              style={{paddingLeft:30,width:700,background:'rgb(251,251,252)'}}
              defaultActiveKey="1"
              items={items}
              size={'large'}
        />
    )
}