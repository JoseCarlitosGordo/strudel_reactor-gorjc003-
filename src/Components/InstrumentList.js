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
    // const [notes_to_play, setNotesToPlay] = useState('');

    function openAddInstrument()
    {
    setIsModalOpen(true);
    }

    function  closeModal()
    {
    setIsModalOpen(false);
    }
    //This function will be called anytime an instrument is updated, added or deleted. 
    function playableNotes()
    {
        
            
        var notes_to_play = ''
        instrument_list.instruments.map(instrument => 
            (
            
            notes_to_play=  instrument.notes
                

            )

        );
        return notes_to_play
            

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
    // function remove_instrument(instrument_to_remove)
    // {
    //     update_instrument_list(prev_state => 
    //         (
    //             {
    //                 ...prev_state, 
    //                 instruments:  prev_state.instruments.filter((instrument) => instrument.name !== instrument_to_remove.name)
    //             }
    //         )
    //     );
    // }

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

    //todo: add logic to handle muting of an instrument within instrument object
    // function toggle_mute(muted_instrument)
    // {
    //      update_instrument_list
    //     (prev_list => (
    //     {
    //         //gets previous state
    //         ...prev_list, 
    //         instruments:  prev_list.instruments.map(instrument =>
    //             {
    //                 if(instrument.name == muted_instrument.name)
    //                 {
    //                     return {...instrument, ...muted_instrument};
    //                 }
    //                 else
    //                 {
    //                     return instrument;
    //                 }
    //             })
    //     }));

    // }
    

    
    return(
        <div>

            <button type = 'button' onClick={openAddInstrument}> Add Instrument</button>
            <button type = 'button' onClick={clear_all}> Clear</button>
        
            {/* Display modal for creating new instrument */}
            {isModalOpen && (
                <CreateInstrument function_to_add={add_instrument} />
               
            )}
            <div className = 'row justify-content-center'>
            {
             instrument_list.instruments.map((instrument, index) => (
            //TODO: replace this placeholder div with the instrument.js component
        
           
                <InstrumentObject 
                name= {instrument.name}
                notes = {instrument.notes}
                gain = {instrument.gain}
                function_to_update={update_instrument_instance}
                //TODO: create function for deleting an instrument
                // delete_function={remove_instrument}
                />
           
            ))
            }
            </div>
        </div>

    );
    //TODO: 1. ensure that all instruments that get instantiated getadded to this.instruments and converted to valid strudel code
    //(STRUDEL CODE IS KEPT IN proc element)
}   //2. Return this.instruments.map<Card>Instruments<Card>
//3. Add a button that allows user to create a new Instrument. 