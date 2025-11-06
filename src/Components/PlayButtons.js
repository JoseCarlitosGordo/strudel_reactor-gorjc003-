export default function PlayButtons({play_function, stop_function})
{
    
    return(
        <>
            <div className="col-sm-3">
                <button id="process" className="btn btn-outline-light" onClick={play_function}>Play</button>
            </div>
            <div className="col-sm-3">
                <button id="process_play" className="btn btn-outline-light" onClick={stop_function}>Stop</button>
            </div>
        </>
    );

}