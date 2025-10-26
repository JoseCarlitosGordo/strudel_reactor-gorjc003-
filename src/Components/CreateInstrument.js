import { useState } from "react";
import Instrument from "./Instrument"
import "../cssFiles/CreateInstrument.css"
export default function CreateInstrument({function_to_add})
{

    function create_instrument(name, type, notes, gain)
    {
        //TODO: INstantiate object and call the function_to_add to close the modal and add instrument to the list
        const new_instrument = new Instrument(name, type, notes, gain);
        function_to_add(new_instrument);
    }
    const[name, setName] = useState('A cool Instrument');
    const[type, setType] = useState('');
    const[notes, setNotes] = useState('');
    const[gain, setGain] = useState(0);
   
    //TODO: replace text with input fields and find a way to have this reflect back on instrument.js as well as strudel's REPL
    return(
    
    // <div className="modal" tabindex="-1" role="dialog">
    //     <div className="modal-dialog" role="document">
    //         <div className="modal-content">
    //             <div className="modal-header">
    //                 <h5 className="modal-title">Modal title</h5>
    //                 <button type="button" className="close" data-dismiss="modal" aria-label="Close">
    //                 <span aria-hidden="true">&times;</span>
    //                 </button>
    //             </div>
    //             <div className="modal-body">
    //                 <p>Modal body text goes here.</p>
    //                 <input type='text' value = {name} onInput = {e =>setName(e.target.value)}/>
    //                 <input type='text' value = {type} onInput = {e =>setType(e.target.value)}/>
    //                 <input type='text' value = {notes} onInput = {e =>setNotes(e.target.value)}/>
    //                 <input type='range' min = '0' max = '100' onInput = {e =>setGain(e.target.value)}/>
    //             </div>
    //             <div className="modal-footer">
    //                 <button type="button" className="btn btn-primary" onClick={() => create_instrument(name, type, notes, gain)}>Add Instrument</button>
    //                 <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
    //             </div>
    //         </div>
    //     </div>
    // </div>
     <div className="modal-overlay">
          <div className="modal-content">
            <h2>Modal Title</h2>
            <p>This is the modal content.</p>
            <input type='text' value = {name} onInput = {e =>setName(e.target.value)}/>
            <input type='text' value = {type} onInput = {e =>setType(e.target.value)}/>
            <input type='text' value = {notes} onInput = {e =>setNotes(e.target.value)}/>
            <input type='range' min = '0' max = '100' onInput = {e =>setGain(e.target.value)}/>
            <button type="button" className="btn btn-primary" onClick={() => create_instrument(name, type, notes, gain)}>Add Instrument</button>
          </div>
        </div>
    // <div className="modal-overlay">
    //       <div className="modal-content">
    //         <h2>Modal Title</h2>
    //         <p>This is the modal content.</p>
    //         <button onClick={function_to_add}>Close Modal</button>
    //       </div>
    //     </div>
    )
}