import {Button, Dropdown, message} from "antd";
import {throttle} from "../../util";
import {useRouter} from "next/router";
import Link from "next/link.js";

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
                    <Link href={"/mapping/resultPage/c71959a0-6a62-11ed-a471-a39e452631de"}>
                        Mouse fetal brain spatial cellular map (FINISHED)
                    </Link>
                </Button>
            ),
        },
        {
            key: '2',
            label: (
                <Button type={"link"}>
                    <Link href={"/mapping/resultPage/1fdb50c0-726a-11ed-a8ae-05b48e1b9d52"}>
                        Spatial distribution of cell types in mouse organogenesis (FINISHED)
                    </Link>
                </Button>
            ),
        },
        {
            key: '3',
            label: (
                <Button type={"link"}>
                    <Link href={"/mapping/resultPage/be5c2ed0-73c4-11ed-b6c1-d3f15153eaa4"}>
                        Spatial patterning of tumor microenvironment in PDAC (FINISHED)
                    </Link>
                </Button>
            ),
        },
        {
            key: '4',
            label: (
                <Button type={"link"} onClick={throttle(1000,onRunExample("Mouse fetal brain spatial cellular map"))}>
                    Mouse fetal brain spatial cellular map (FROM SCRATCH)
                </Button>
            ),
        },
        {
            key: '5',
            label: (
                <Button type={"link"} onClick={throttle(2000,onRunExample("Spatial distribution of cell types in mouse organogenesis"))}>
                    Spatial distribution of cell types in mouse organogenesis (FROM SCRATCH)
                </Button>
            ),
        },
        {
            key: '6',
            label: (
                <Button type={"link"} onClick={throttle(2000,onRunExample("Spatial patterning of tumor microenvironment in PDAC"))}>
                    Spatial patterning of tumor microenvironment in PDAC (FROM SCRATCH)
                </Button>
            ),
        },
    ]

    return(
        <Dropdown
            menu={{ items, }}
            trigger={['click']}
        >
            <Button type="primary" htmlType="button" className={"btn-upload"}>
                Run Example
            </Button>
        </Dropdown>
    )
}