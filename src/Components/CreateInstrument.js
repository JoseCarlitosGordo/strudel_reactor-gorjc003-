import { useState } from "react";
import {Instrument }from "./Instrument.js"
import "../cssFiles/CreateInstrument.css"
export default function CreateInstrument({function_to_add})
{

    function create_instrument()
    {
        const new_instrument = new Instrument(name, notes, gain)
        function_to_add(new_instrument);
    }
    const[name, setName] = useState('');
    const[notes, setNotes] = useState('');
    const[gain, setGain] = useState(0);
   
    //TODO: replace text with input fields and find a way to have this reflect back on instrument.js as well as strudel's REPL
    return(
    <div className="modal-overlay">
          <div className="custom-modal-content">
            <h2>Modal Title</h2>
            <p>This is the modal content.</p>
            <input type='text' placeholder="Enter the name of your instrument here" onInput = {e =>setName(e.target.value)}/>
             <textarea rows={5} placeholder="Enter the composition of your instrument here" onInput = {e =>setNotes(e.target.value)}/>
             <label htmlFor='gain'><p> Gain slider</p></label> 
             <input id = 'gain'type='range' min = '0' max = '100' value = {gain} onInput = {e =>setGain(e.target.value)}/>
            <button id ="modal_button" onClick={create_instrument}>Create Instrument</button>
          </div>
    </div>
    )
}