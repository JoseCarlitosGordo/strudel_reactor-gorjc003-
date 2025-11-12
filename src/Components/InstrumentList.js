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
    const [tempo, setTempo] = useState(50);
    const [globalGain, setGain] = useState(1);
    //when instrument_list is updated, run playableNotes, which will update notes to play and then call update_song_function
    useEffect(() =>{playableNotes(tempo)}, [instrument_list, tempo, globalGain])
    //runs when tempo or global gain is changed
    useEffect(() =>{
        proc_and_play_function()
    }, [tempo, globalGain])
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
    function playableNotes(tempo, gain= globalGain)
    {   
        var notes_to_play = 'setcpm('+tempo+'); \n'
        instrument_list.instruments.map(instrument => 
            (
            notes_to_play +=  instrument.strudelCode + ".gain("+gain+");\n"
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
  
    //change the strudel code of a specific instrument within the list
    function update_instrument_instance(new_instrument)
    {
        update_instrument_list
        (prev_list => (
        {
            
            instruments:  prev_list.instruments.map(instrument =>
                {
                    //if the instrument name is equal to the instrument that we update, 
                    if(instrument.name == new_instrument.name)
                    {
                        //return the parts of the old instrument that stay the same and add the updated values of new_instrument
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
        //populate instrument list with values from local storage
        update_instrument_list(Object.assign(new InstrumentListObject(), JSON.parse(instrument_replacement)))
    }
  
    

    return(
        <div>
            
           
            
            
           
            {/* Display modal for creating new instrument */}
            {isModalOpen && (
                <CreateInstrument function_to_add={add_instrument} close_modal={closeModal} />
               
            )}
            <div className = 'row justify-content-center '>
                <div className = 'col-6'>
                    
                    <div className = 'row'>
                    {
                    instrument_list.instruments.map((instrument, index) => (
                    //Loop over every instrument in instrument_list and create a new InstrumentObject with it
                        
                        <InstrumentObject 
                        name= {instrument.name}
                        notes = {instrument.notes}
                        function_to_update={update_instrument_instance}
                        proc_and_play = {proc_and_play_function}
                        />
                
                    ))
                    }
                    </div>
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
                            <input type='range' className = 'form-range' min = '0' max = '99' value = {tempo} onChange = {e => {setTempo(e.target.value); playableNotes(e.target.value, globalGain)}}/>
                        </div>
                        <div className = 'col p-2'>
                             <input type="range" className="form-range" min="0" max="3" step="0.01" value={globalGain} onChange={(e) => {
                                                                                setGain(e.target.value);
                                                                                playableNotes(tempo, e.target.value )
                                                                                }}
                                                                                />
                        </div>

                    </div>
                </div>
            </div>
        </div>

    );
}   