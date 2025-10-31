import globalEditor, {Proc} from '../App'  
import {useState} from 'react'



export class Instrument
{
  constructor(name, notes, gain)
  {
    this.name = name;
    this.notes = notes
    this.strudelCode = '<'+this.name+'_radio>'+ this.name + ': ' + notes
    this.gain = gain;
    this.is_muted = false;
  }
  

}

//TODO: Implement mute button in here?

const InstrumentObject = ({name, notes, gain, function_to_update} ) => 
  {
    //create a new instrument 
    const [data, setData] = useState(new Instrument(name, notes, gain));
    const [isMuted, setIsMuted] = useState(false)
   function isMutedTrue()
    {
      setIsMuted(true);
    }
   function update_instrument_notes(changed_value)
   {
       setData(prev => ({...prev, notes: changed_value, strudelCode :'<'+data.name+'_radio>'+ data.name + ': \n' + changed_value}))
       function_to_update(data);
   }
  return (
    
    
    <div className="card col-4" style={{width: "18rem;"}}>
      <div className="card-body">
        <h5 className="card-title">Instrument Name: {data.name}</h5>
        <p className = "card-text"> Current Composition for {data.name}: <br/> {data.strudelCode} </p>
        <textarea id = {'notes_for_' + data.name} className ='form-control' onInput = {(changed_value) => update_instrument_notes(changed_value.target.value)} value = {data.notes}/>
        <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"></input>
        {/* <button type='button' className="btn btn-danger" onClick={delete_function(data)}>Go somewhere</button> */}
      </div>
    </div>
  );
  };
export default InstrumentObject;

//TODO: IN return statement, have it display input fields for updating the values of notes and gain.
// onChange={(e) =>
//     setData(prev => ({ ...prev, frequency: Number(e.target.value) }))