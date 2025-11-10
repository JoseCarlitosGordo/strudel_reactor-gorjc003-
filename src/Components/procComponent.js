export default function ProcComponent({songText})
{
    return(
        <>
        <div className="col-4 accordion mx-3" id = "accordion_preprocess" >
            <div className="accordion-item">
                <h2 className="accordion-header">
                    <button className="accordion-button bg-secondary text-light" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded = 'false' aria-controls="collapseOne">
                        Text to preprocess
                    </button>
                </h2>
                <div id="collapseOne" className="accordion-collapse collapse" data-bs-parent="#accordion_preprocess">
                    <div className="accordion-body bg-secondary">
                        <textarea className="form-control bg-dark text-light" rows="10" id="proc" value={songText}></textarea> 
                    </div>
                </div>
            </div>   
        </div>
        </>
    )
}