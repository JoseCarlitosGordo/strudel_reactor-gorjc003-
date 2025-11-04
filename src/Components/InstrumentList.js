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

export default function InstrumentList({update_song_function})
{
    const [instrument_list, update_instrument_list] = useState(new InstrumentListObject());
    const [isModalOpen, setIsModalOpen] = useState(false);
    // const [notes_to_play, setNotesToPlay] = useState('');
    //when instrument_list is updated, run playableNotes, which will update notes to play and then call update_song_function
    useEffect(() =>{playableNotes()}, [instrument_list])
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
            notes_to_play +=  instrument.strudelCode + "\n"
            )

        );
       
        update_song_function(notes_to_play)
            

    }

    function clear_all()
    {
        update_instrument_list(()=>(
            { 
                instruments: []
            }));
    }
    function add_instrument(instrument)
    {
        
        update_instrument_list(prev_state => (
        { 
            instruments: [...prev_state.instruments, instrument]
        }));
       closeModal()

        
    }
    function remove_instrument(instrument_to_remove)
    {
        update_instrument_list(prev_state => 
            (
                {
                    
                    instruments:  [prev_state.instruments.filter((instrument) => instrument.name !== instrument_to_remove.name)]
                }
            )
        );
    }

    function update_instrument_instance(new_instrument)
    {
        update_instrument_list
        (prev_list => (
        {
            
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

    function save_to_storage()
    {
        var instruments_to_store =JSON.stringify(instrument_list);
        localStorage.setItem("instrument_list", instruments_to_store)
        alert("Your instruments have been stored. To load them, please press the load from storage button.")
    }

    function load_from_storage()
    {
        var instrument_replacement =localStorage.getItem("instrument_list")
        update_instrument_list(Object.assign(new InstrumentListObject(), JSON.parse(instrument_replacement)))
    }
  
    

    return(
        <div>

            <button type = 'button' onClick={openAddInstrument}> Add Instrument</button>
            <button type = 'button' onClick={clear_all}> Clear</button>
            <button type = 'button' onClick={save_to_storage}> Save to Storage</button>
            <button type = 'button' onClick={load_from_storage}> Load from  Storage</button>
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
                delete_function={remove_instrument}
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