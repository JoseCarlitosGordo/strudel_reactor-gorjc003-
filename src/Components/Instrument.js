import globalEditor, {Proc} from '../App'  
import {useState, useEffect} from 'react'



export class Instrument
{
  constructor(name, notes, gain)
  {
    this.name = name;
    this.notes = notes
    this.strudelCode = '<'+this.name+'_radio>'+ this.name + ': ' + notes
    this.gain = gain;
    
  }
  

}

const InstrumentObject = ({name, notes, gain, function_to_update, on_changed_state} ) => 
  {
    //create a new instrument 
    const [data, setData] = useState(new Instrument(name, notes, gain));
    const [isMuted, setIsMuted] = useState(false)
    //run this change everytime isMuted is toggled (can be extended for other features such as sliders.)
    useEffect(() => 
      {
        update_instrument_notes(data.notes);
        on_changed_state();
      }, [isMuted]);

    function update_mute(e)
    {
      //updates mute state
      setIsMuted(e.target.checked);
    }
    function update_instrument_notes(changed_value)
   {
      let replace = ""
      if (isMuted)
      {
        replace = "_"
      }
      const newData = {...data, notes: changed_value, strudelCode : replace + data.name + ': \n' + changed_value}
      setData(newData)
      function_to_update(newData);
   }
  return (
    
    
    <div className="card col-5 bg-dark text-light m-3" style={{width: "18rem;"}}>
      <div className="card-body">
        <h5 className="card-title">Instrument Name: {data.name}</h5>
        <label htmlFor={'notes_for_' + data.name}>Composition editor</label>
        <textarea id = {'notes_for_' + data.name} className ='form-control' onChange= {(changed_value) => update_instrument_notes(changed_value.target.value)} value = {data.notes}/>
        <input type="checkbox" id={"mute_button_"+ data.name } checked={isMuted} onChange = {update_mute}/>
        {/* <button type='button' className="btn btn-danger" onClick={delete_function(data)}>Go somewhere</button> */}
      </div>
    </div>
  );
  };
export default InstrumentObject;