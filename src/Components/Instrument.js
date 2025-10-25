import globalEditor, {Proc} from '../App'  
import {useState, useEffect, setData} from 'react'



class Instrument
{
  constructor(name, type, notes, gain)
  {
    this.name = name;
    this.type = type;
    this.notes = notes
    this.gain = gain;
  }
  strudel_code()
  {
    return ``
  }
}

const InstrumentObject = ({name, type, notes, gain} ) => 
  {
   
    //create a new instrument 
    const [data, setData] = useState(
    new Instrument(name, type, notes, gain)
    );
  // useEffect(() => {
  //   // Create the instrument
  //   //TODO: console.log results of instrument
  //   // Play a note
  //   // synth.play({ frequency: 440, duration: 1 }); // Plays an A4 note for 1 second

  //   // Cleanup on unmount
  //   // return () => {
  //   //   synth.stop();
  //   // };
  // }, [data]);
  
  return (
    <div>
      <h1>{data.name}</h1>
      <p>Enjoy creating music with Strudel!</p>
    </div>
  );
  };
export default InstrumentObject;

//TODO: IN return statement, have it display input fields for updating the values of notes and gain.
// onChange={(e) =>
//     setData(prev => ({ ...prev, frequency: Number(e.target.value) }))