import { ProcAndPlay } from "../App"
export default function PreProcessorButtons({proc, proc_and_play})
{
    return(
       <>
            <div className="col-sm-3">
                <button id="process" className="btn btn-outline-primary" onClick={proc}>Preprocess</button>
            </div>
            <div className="col-sm-3">
                <button id="process_play" className="btn btn-outline-primary" onClick={proc_and_play}>Proc & Play</button>
            </div>
       </>
    )
}