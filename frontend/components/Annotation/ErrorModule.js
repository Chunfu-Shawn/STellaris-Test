import ErrorStatus from "./ErrorStatus";


export default function ErrorModule(){
    return(
        <div className="modal-body-stw" >
            <div className="page-header">
                <h3>Annotation Result</h3>
            </div>
            <h2>ERROR!</h2>
            <h4>There is something wrong happened in server or your data file is undesirable. Please upload again with correct format file.</h4>
            <ErrorStatus style={{width: 600, margin:"50px auto"}}/>
        </div>
    )
}