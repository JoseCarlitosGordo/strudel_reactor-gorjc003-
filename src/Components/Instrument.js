import globalEditor, {Proc} from '../App'  
import {useState, useEffect} from 'react'



export class Instrument
{
  constructor(name, notes)
  {
    this.name = name;
    this.notes = notes
    this.strudelCode = this.name + ': ' + this.notes + '.log();'
   
    
  }
  

}

const InstrumentObject = ({name, notes, function_to_update, proc_and_play} ) => 
  {
    //create a new instrument 
    const [data, setData] = useState(new Instrument(name, notes, ));
    const [isMuted, setIsMuted] = useState(false)
    //run this change everytime isMuted is toggled
    //  useEffect(() => 
    //   {
    //     update_instrument_notes(data.notes, isMuted);
    //     proc_and_play();
    //   }, [isMuted]);

    function update_mute(e)
    {
      //updates mute state
      setIsMuted(e.target.checked);
      update_instrument_notes(data.notes, e.target.checked);
      proc_and_play();  // now uses the updated mute state

    }
    function update_instrument_notes(changed_value, muted = isMuted)
   {
      let replace = ""
      if (muted)
      {
        replace = "_"
      }
      const newData = {...data, notes: changed_value, strudelCode : replace + data.name + ': \n' + changed_value + '.log();' } 
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