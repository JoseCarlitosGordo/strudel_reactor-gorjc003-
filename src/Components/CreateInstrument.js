import Instrument from "./Instrument"
export default function CreateInstrument({function_to_add})
{

    function create_instrument(name, type, notes, gain)
    {
        //TODO: INstantiate object and call the function_to_add to close the modal and 
    }
    //TODO: replace text with input fields and find a way to have this reflect back on instrument.js as well as strudel's REPL
    return(
    <div class="modal" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Modal title</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <p>Modal body text goes here.</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" onClick={create_instrument}>Add Instrument</button>
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
    )
}