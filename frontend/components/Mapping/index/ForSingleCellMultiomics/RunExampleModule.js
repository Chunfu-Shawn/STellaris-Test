import {Button, Dropdown, message} from "antd";
import {throttle} from "../../../util";
import {useRouter} from "next/router";

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
                type: "multiomics",
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
                    <a href={"/mapping/resultPage/75afdf70-c300-11ed-8a89-3fb9e5c5307c"}>
                        <span>
                            H3K4me3 modification in mouse brain <b><i>(FINISHED)</i></b>
                        </span>
                    </a>
                </Button>
            ),
        },
        {
            key: '2',
            label: (
                <Button type={"link"} onClick={throttle(1000,onRunExample("H3K4me3 modification in mouse adult cortex and hippocampus"))}>
                    <span>
                        H3K4me3 modification in mouse brain <b><i>(FROM SCRATCH)</i></b>
                    </span>
                </Button>
            ),
        }
    ]

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