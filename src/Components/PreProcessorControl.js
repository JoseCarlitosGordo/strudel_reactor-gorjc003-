import { ProcAndPlay } from "../App"
export default function PreProcessorControl({text, element_id, default_check})
{
    return(
        <div className="form-check">
            <input className="form-check-input" type="radio" name="flexRadioDefault" id={element_id} onChange={ProcAndPlay} defaultChecked = {default_check}/>
            <label className="form-check-label" htmlFor={element_id}>
                p1: {text}
            </label>
        </div>
    )
}