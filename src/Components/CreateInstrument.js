import Instrument from "./Instrument"
export default function CreateInstrument({function_to_add})
{

    function create_instrument(name, type, notes, gain)
    {
        //TODO: INstantiate object and call the function_to_add to close the modal and 
        const new_instrument = new Instrument(name, type, notes, gain);
        function_to_add(new_instrument);
    }
    list_values = document.getElementsByClassName('input_value')
    //TODO: replace text with input fields and find a way to have this reflect back on instrument.js as well as strudel's REPL
    return(
    <div className="modal" tabindex="-1" role="dialog">
        <div className="modal-dialog" role="document">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Modal title</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    <p>Modal body text goes here.</p>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-primary" onClick={() => create_instrument(list_values[0].value, list_values[1].value, list_values[2].value, list_values[3].value)}>Add Instrument</button>
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
    )
}