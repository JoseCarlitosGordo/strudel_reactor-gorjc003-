import { useState } from "react";
import {Instrument }from "./Instrument.js"
import "../cssFiles/CreateInstrument.css"
export default function CreateInstrument({function_to_add, close_modal})
{

    function create_instrument()
    {
        const new_instrument = new Instrument(name, notes)
        function_to_add(new_instrument);
    }
    const[name, setName] = useState('');
    const[notes, setNotes] = useState(`n("0 2 4 6 7 6 4 2")
  .scale("<c3:major>/2")
  .s("supersaw")
  .distort(0.7)
  .superimpose((x) => x.detune("<0.5>"))
  .lpenv(perlin.slow(3).range(1, 4))
  .lpf(perlin.slow(2).range(100, 2000))
  .gain(0.3)`);
  
    return(
    <div className="modal-overlay">
          <div className="custom-modal-content">
            <h2>Instrument Creation</h2>
            <input type='text' placeholder="Enter the name of your instrument here" onInput = {e =>setName(e.target.value)}/>
             {/* <textarea rows={5} placeholder="Enter the composition of your instrument here" onInput = {e =>setNotes(e.target.value)}/> */}
            <select class="form-select" value={notes} onChange= {e => setNotes(e.target.value)} aria-label="Default select example">
              
              <option selected value='n("0 2 4 6 7 6 4 2")
.scale("<c3:major>/2")
.s("supersaw")
.distort(0.7)
.superimpose((x) => x.detune("<0.5>"))
.lpenv(perlin.slow(3).range(1, 4))
.lpf(perlin.slow(2).range(100, 2000))
.gain(0.3)'>Piano</option>
              <option value='"<a1 e2>/8".clip(0.8).struct("x*8").s("supersaw").note()'>Bass</option>
            </select>
            <button id ="modal_button" onClick={create_instrument}>Create Instrument</button>
            <button id ="close_button" onClick={close_modal}>Cancel</button>
          </div>
    </div>
    )
}