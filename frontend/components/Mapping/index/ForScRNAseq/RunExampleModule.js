import {Button, Dropdown, message} from "antd";
import {throttle} from "../../../util";
import {useRouter} from "next/router";
import {useEffect} from "react";

export default function RunExampleModule(props){
    const { setUploading,token } = props
    const DEMO_URL = `/mapping/demo/`
    const router = useRouter()
    const onRunExample = (title) => function (){
        let rid = ""
        setUploading(true);
        fetch(DEMO_URL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json', 'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title:title,
                isDemo:'true',
                type: "scRNA-seq",
                token:token,
            })
        }).then(response => response.json())
            .then(json => rid = json.rid)
            .then(() => {
                message.success({
                    content:'Run example successfully!',
                    style:{
                        marginTop: '12vh',
                    },
                });
                //nextjs路由跳转到结果页面
                router.push('/mapping/resultPage/'+rid)
            })
            .catch(() => {
                message.error({
                        content:'Run example unsuccessfully. Refresh the page and try again.',
                        style:{
                            marginTop: '12vh',
                        },
                        duration:3,
                    }
                );
                //router.reload()
            })
            .finally(() => {
                setUploading(false);
            });
    };

    const items=[
        {
            key: '1',
            label: (
                <Button type={"link"}>
                    <a href={"/mapping/resultPage/52fa0100-909b-11ed-9249-979b422f6c75"}>
                        <span>
                            Mouse fetal brain <b><i>(FINISHED)</i></b>
                        </span>
                    </a>
                </Button>
            ),
        },
        {
            key: '3',
            label: (
                <Button type={"link"}>
                    <a href={"/mapping/resultPage/b3ae1730-90b3-11ed-9695-b54d6690f34b"}>
                        <span>
                            Human squamous cell carcinoma <b><i>(FINISHED)</i></b>
                        </span>
                    </a>
                </Button>
            ),
        },
        {
            key: '4',
            label: (
                <Button type={"link"} onClick={throttle(1000,onRunExample("Mouse fetal brain spatial cellular map"))}>
                    <span>
                        Mouse fetal brain <b><i>(FROM SCRATCH)</i></b>
                    </span>
                </Button>
            ),
        },
        {
            key: '6',
            label: (
                <Button type={"link"} onClick={throttle(2000,onRunExample("Spatial patterning of human cutaneous squamous cell carcinoma"))}>
                    <span>
                        Human squamous cell carcinoma <b><i>(FROM SCRATCH)</i></b>
                    </span>
                </Button>
            ),
        },
    ]

    useEffect(() => {
        // Add reCaptcha
        const script = document.createElement("script")
        script.src = "https://www.recaptcha.net/recaptcha/api.js?render=6Ld5sZglAAAAAJjVPWhT2G0rV5igM2-UiparMzPS"
        document.body.appendChild(script)
    }, [])

    return(
        <Dropdown
            menu={{ items, }}
            trigger={['click']}
        >
            <Button type="primary" htmlType="button" size={"large"} className={"btn-upload"}>
                Run Example
            </Button>
        </Dropdown>
    )
}