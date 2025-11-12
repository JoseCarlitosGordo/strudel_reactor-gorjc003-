import {useState, useEffect} from 'react'



export class Instrument
{
  constructor(name, notes)
  {
    this.name = name;
    this.notes = notes;
    this.strudelCode = this.name + ': ' + this.notes + '.log()'
   
    
  }
  

}

const InstrumentObject = ({name, notes, function_to_update, proc_and_play} ) => 
  {
    //create a new instrument 
    const [data, setData] = useState(new Instrument(name, notes));
    const [isMuted, setIsMuted] = useState(false)
    

    function update_mute(e)
    {
      //updates mute state, which is then reflected in songText
      update_instrument_notes(data.notes, e.target.checked);
      setIsMuted(e.target.checked);
    }
    function update_instrument_notes(changed_value, muted = isMuted)
   {
    //if it is muted, prefix the string with an underscore
      let replace = ""
      if (muted)
      {
        replace = "_"
      }
      //update data of individual instrument
      const newData = {...data, notes: changed_value, strudelCode : replace + data.name + ': \n' + changed_value + '.log()' } 
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
      </div>
    </div>
  );
  };
export default InstrumentObject;

