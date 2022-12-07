import ErrorStatus from "./ErrorStatus";
import Link from "next/link.js";


export default function ErrorModule(){
    return(
        <div className="modal-body-stw" >
            <div className="page-header">
                <h3>Mapping Results</h3>
            </div>
            <h2>ERROR!</h2>
            <h4>Unfortunately, something wrong happened or your uploaded files is undesirable.
                Please check it or create an issue on our <Link href={"#"}><a>Github repository</a></Link>. </h4>
            <ErrorStatus style={{width: 600, margin:"50px auto"}}/>
        </div>
    )
}