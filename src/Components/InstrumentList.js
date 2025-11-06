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

export default function InstrumentList({update_song_function, proc_and_play_function })
{
    const [instrument_list, update_instrument_list] = useState(new InstrumentListObject());
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [tempo, setTempo] = useState(100)
    //when instrument_list is updated, run playableNotes, which will update notes to play and then call update_song_function
    useEffect(() =>{playableNotes(tempo)}, [instrument_list])
    useEffect(() =>{
        playableNotes(tempo);
        proc_and_play_function()
    }, [tempo])
    //open and closing modal for adding an instrument
    function openAddInstrument()
    {
    setIsModalOpen(true);
    }
    function  closeModal()
    {
    setIsModalOpen(false);
    }

    //This function will be called anytime an instrument is updated, added or deleted. 
    function playableNotes(tempo)
    {   
        var notes_to_play = 'setcpm('+tempo+'); \n'
        instrument_list.instruments.map(instrument => 
            (
            notes_to_play +=  instrument.strudelCode + "\n"
            )

        );
       
        update_song_function(notes_to_play)
            

    }
    //function for clearing entire list of instruments
    function clear_all()
    {
        update_instrument_list(()=>(
            { 
                instruments: []
            }));
    }
    //once instrument from modal is confirmed, close Modal and append it to the instrument list
    function add_instrument(instrument)
    {
        
        update_instrument_list(prev_state => (
        { 
            instruments: [...prev_state.instruments, instrument]
        }));
       closeModal()

        
    }
    //removing an instrument by filtering out the ones that are equal to the instrument to remove (yet to be properly implemented )
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
    //change the strudel code of a specific instrument within the list
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
    //JSON handling and saving to local storage
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
            
           
            
            
           
            {/* Display modal for creating new instrument */}
            {isModalOpen && (
                <CreateInstrument function_to_add={add_instrument} />
               
            )}
            <div className = 'row justify-content-center '>
                <div className = 'col-6'>
                    
                
            {
             instrument_list.instruments.map((instrument, index) => (
            //Loop over every instrument in instrument_list and create a new InstrumentObject with it
        
           
                <InstrumentObject 
                name= {instrument.name}
                notes = {instrument.notes}
                gain = {instrument.gain}
                function_to_update={update_instrument_instance}
                //TODO: create function for deleting an instrument
                delete_function={remove_instrument}
                on_changed_state = {proc_and_play_function}
                />
           
            ))
            }
                </div>
                <div className = 'col-3 bg-dark rounded-4'>
                    <div className= 'row'>
                        <div className = 'col-6 p-2'>
                            <button type = 'button' className='btn btn-primary'onClick={openAddInstrument}> Add Instrument</button>
                        </div>
                        <div className = 'col-6 p-2'>
                            <button type = 'button' className='btn btn-primary'onClick={clear_all}> Clear Instruments</button>
                        </div>
                        <div className = 'col-6 p-2'>
                            <button type = 'button' className='btn btn-primary' onClick={save_to_storage}> Save to Storage</button>
                        </div>
                        <div className = 'col-6 p-2'>
                            <button type = 'button' className='btn btn-primary' onClick={load_from_storage}> Load from  Storage</button>
                        </div>
                         <div className = 'col p-2'>
                            <input id = 'globalTempo'type='range' min = '0' max = '1000' value = {tempo} onChange = {e => {setTempo(e.target.value); playableNotes(e.target.value)}}/>
                        </div>

                    </div>
                </div>
            </div>
        </div>

    );
    //TODO: 1. ensure that all instruments that get instantiated getadded to this.instruments and converted to valid strudel code
    //(STRUDEL CODE IS KEPT IN proc element)
}   //2. Return this.instruments.map<Card>Instruments<Card>
//3. Add a button that allows user to create a new Instrument. 