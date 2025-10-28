import globalEditor, {Proc} from '../App'  
import {useState} from 'react'



export class Instrument
{
  constructor(name, notes, gain)
  {
    this.name = name;
    this.type = type;
    this.notes = '<'+this.name+'_radio>'+ this.name + ': \n' + notes
    this.gain = gain;
    this.is_muted = false;
  }
  

}

//TODO: Implement mute button in here?

const InstrumentObject = ({name, notes, gain, function_to_add, delete_function} ) => 
  {
   
    //create a new instrument 
    const [data, setData] = useState(new Instrument(name, notes, gain));
    const [isMuted, setIsMuted] = useState(false)
   function isMutedTrue()
    {
      setIsMuted(true);
    }

    function isMutedFalse()
    {
      setIsUpdating(false);
    }
   function update_instrument_notes(changed_value)
   {
       setData(prev => ({...prev, notes: String(changed_value.target.value)}))
       function_to_add(data);
   }
  return (
    
    
    <div className="card" style="width: 18rem;">
      <div className="card-body">
        <h5 className="card-title">Instrument Name: {data.name}</h5>
        <p className = "card-text"> Current Composition: {data.notes} </p>
        <textarea id = {'notes_for_' + data.name} className ='form-control' onChange = {(changed_value) => update_instrument_notes(changed_value.target.value)} value={data.notes}/>
        <button type='button' className="btn btn-danger" onClick={delete_function(data)}>Go somewhere</button>
      </div>
    </div>
  );
  };
export default InstrumentObject;

//TODO: IN return statement, have it display input fields for updating the values of notes and gain.
// onChange={(e) =>
//     setData(prev => ({ ...prev, frequency: Number(e.target.value) }))