import { useEffect, useState } from "react";
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
        update_instrument_list(prev_state =>(
            {
            
                ...prev_state, 
                instruments: [],
            }));
    }
    function add_instrument(instrument)
    {
        
        update_instrument_list(prev_state => (
        {
            ...prev_state, 
            instruments: [...prev_state.instruments, instrument]
        }));
       closeModal()

        
    }

    function update_instrument_instance(new_instrument)
    {
        update_instrument_list
        (prev_list => (
        {
            //gets previous state
            ...prev_list, 
            instruments:  prev_list.instruments.map(instrument =>
                {
                    if(instrument.name == new_instrument.name)
                    {
                        return {...instrument, ...new_instrument};
                    }
                    else
                    {
                        return instrument;
                    }
                })
        }));
            
        
        
    }
    

    // useEffect(() =>
    // {

    
    //     if(isModalOpen)
    //     {
    //         add_instrument_modal = <CreateInstrument function_to_add={add_instrument} />
    //     }
    //     else
    //     {
    //         add_instrument_modal = null;

    //     }
    // },
    // [isModalOpen]);
    let add_instrument_modal;
    // if(isModalOpen)
    // {
    //     add_instrument_modal = <CreateInstrument function_to_add={add_instrument} />
    // }
    // else
    // {
    //     add_instrument_modal = null

    // }
    return(
        <div>
            <button type = 'button' onClick={openAddInstrument}> Add Instrument</button>
            
            {/* Display modal for creating new instrument */}
            {isModalOpen && (
                <CreateInstrument function_to_add={add_instrument} />
               
            )}

            {
        instrument_list.instruments.map((instrument, index) => (
            //TODO: replace this placeholder div with the instrument.js component
        
            <div>
                <InstrumentObject 
                name= {instrument.name}
                type = {instrument.type}
                notes = {instrument.notes}
                gain = {instrument.gain}
                function_to_add={update_instrument_instance}
                />
            </div>
            ))
            }
        </div>

    );
    //TODO: 1. ensure that all instruments that get instantiated getadded to this.instruments and converted to valid strudel code
    //(STRUDEL CODE IS KEPT IN proc element)
}   //2. Return this.instruments.map<Card>Instruments<Card>
//3. Add a button that allows user to create a new Instrument. 