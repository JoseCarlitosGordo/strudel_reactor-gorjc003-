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
    //toDO: modify instrumentDetails to be used for the creation of instruments instead
    if(isModalOpen)
    {
        const added_instrument_component = <CreateInstrument/>
    }
    return(
        <div>
        <button type = 'button' onClick={openAddInstrument}> Add Instrument</button>

       
        {
      instrument_list.instruments.map((instrument, index) => (

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