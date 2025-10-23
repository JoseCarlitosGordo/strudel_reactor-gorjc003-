import globalEditor, {Proc} from '../App'  
import {useState, useEffect, setData} from 'react'



class Instrument
{
  constructor(name, type, frequency, gain)
  {
    this.name = name;
    this.type = type;
    this.frequency = frequency
    this.gain = gain;
  }
}

const InstrumentObject = ({name, type, frequency, gain} ) => 
  {
   
    //create a new instrument 
    const [data, setData] = useState(
    new Instrument(name, type, frequency, gain)
    );
  useEffect(() => {
    // Create the instrument
    //TODO: console.log results of instrument
    // Play a note
    // synth.play({ frequency: 440, duration: 1 }); // Plays an A4 note for 1 second

    // Cleanup on unmount
    // return () => {
    //   synth.stop();
    // };
  }, [data]);

  return (
    <div>
      <h1>Strudel Music App</h1>
      <p>Enjoy creating music with Strudel!</p>
    </div>
  );
  };
export default InstrumentObject


// onChange={(e) =>
//     setData(prev => ({ ...prev, frequency: Number(e.target.value) }))