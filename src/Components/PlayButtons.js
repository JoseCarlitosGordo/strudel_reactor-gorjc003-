export default function PlayButtons({play_function, stop_function})
{
    
    return(
        <div>
            <div className="col-sm-3">
                <button id="process" className="btn btn-outline-primary" onClick={play_function}>Preprocess</button>
            </div>
            <div className="col-sm-3">
                <button id="process_play" className="btn btn-outline-primary" onClick={stop_function}>Proc & Play</button>
            </div>
        </div>
    );

}