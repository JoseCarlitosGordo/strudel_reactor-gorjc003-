import { useState } from "react";
import InstrumentObject from "./Instrument";
import CreateInstrument from "./CreateInstrument";
class InstrumentListObject

{
    constructor()
    {
        this.instruments = [];
    }
    
}

export default function InstrumentList()
{
    const [instrument_list, update_instrument_list] = useState(new InstrumentListObject());
    const [isModalOpen, setIsModalOpen] = useState(false);

    function openAddInstrument()
    {
    setIsModalOpen(true);
    }

    function  closeModal()
    {
    setIsModalOpen(false);
    }


    //saves other states, but resets instrument_list to an empty list
    function clear_all()
    {
        update_instrument_list((prev_state) =>
        {
            return {
                ...prev_state, 
                instruments: []


            };
        });
    }
    function add_instrument(instrument)
    {
        
        update_instrument_list((prev_state) =>
        {
            return {
                ...prev_state, 
                instruments: [...prev_state.instruments, instrument]


            };
        });
       closeModal()

        
    }

    function update_instrument_instance(new_instrument)
    {
        
    }
    //toDO: modify instrumentDetails to be used for the creation of instruments instead
    var add_instrument_modal = null
    if(isModalOpen)
    {
         added_instrument_modal = <CreateInstrument function_to_add={add_instrument(instrument)} />
    }
    return(
        <div>
        <button type = 'button' onClick={openAddInstrument}> Add Instrument</button>
        
        {/* Display modal for creating new instrument */}
        {add_instrument_modal}

        {
      instrument_list.instruments.map((instrument, index) => (
        //TODO: replace this placeholder div with the instrument.js component
        <div key={index}>
          <p>{instrument.name}</p>
        </div>

        ))
        }
        </div>

    );
    //TODO: 1. ensure that all instruments that get instantiated getadded to this.instruments and converted to valid strudel code
    //(STRUDEL CODE IS KEPT IN proc element)
}   //2. Return this.instruments.map<Card>Instruments<Card>
//3. Add a button that allows user to create a new Instrument. 