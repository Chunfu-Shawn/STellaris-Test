import {Button, Dropdown, message} from "antd";
import {throttle} from "../../../util";
import {useRouter} from "next/router";

export default function RunExampleModule(props){
    const { setUploading } = props
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
                        content:'Run example unsuccessfully.',
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
                    <a href={"/mapping/resultPage/c71959a0-6a62-11ed-a471-a39e452631de"}>
                        <span>
                            Mouse fetal brain <b><i>(FINISHED)</i></b>
                        </span>
                    </a>
                </Button>
            ),
        },
        {
            key: '2',
            label: (
                <Button type={"link"} onClick={throttle(1000,onRunExample("Mouse fetal brain spatial cellular map"))}>
                    <span>
                        Mouse fetal brain <b><i>(FROM SCRATCH)</i></b>
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