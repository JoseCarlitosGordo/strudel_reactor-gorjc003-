import './cors-redirect';
import './App.css';
import { initStrudel, note, hush, evalScope, getAudioContext, webaudioOutput, registerSynthSounds, initAudioOnFirstClick, transpiler } from "@strudel/web";
import { useEffect, useRef, useState } from "react";
import { StrudelMirror } from '@strudel/codemirror';
import { registerSoundfonts } from '@strudel/soundfonts';
import console_monkey_patch from './console-monkey-patch';
import PreProcessorButtons from './Components/PreProcessorControl';
import InstrumentList from './Components/InstrumentList';
import PlayButtons from './Components/PlayButtons';
import D3Graph from './Components/d3Graph';
import ProcComponent from './Components/procComponent';
let globalEditor = null;

//this function logs the musical notes played to the console
const handleD3Data = (event) => {
    console.log(event.detail);
};

export default function StrudelDemo() {

    const hasRun = useRef(false);
    const [songText, setSongText] = useState('')
    const hasProcessed = useRef(false)
    //whenever a change in instrument list is called, update preprocessed text
    function update_song_text(new_song_text)
    {
        setSongText(new_song_text)
    }
    //play song button
    function play_song()
    {
        if(!hasProcessed.current)
        {
            alert("Cannot play as no initial text has been preprocessed.")
        }
        else
        {
            globalEditor.evaluate()
        }
        
        
        
    }
    //stop song button 
    function stop_song()
    {
        globalEditor.stop()
    }
    //proc button
    function process()
    {
        let proc_text = songText
        globalEditor.setCode(proc_text)
        hasProcessed.current= true;
    }
    //proc_and_play button 
    function process_and_play()
    {
        if (globalEditor != null) {
        console.log(globalEditor)
        process()
        globalEditor.evaluate();
    }
    }
    useEffect(() => {

        if (!hasRun.current) {
            document.addEventListener("d3Data", handleD3Data);
            console_monkey_patch();
            hasRun.current = true;
            (async () => {
                await initStrudel();
                globalEditor = new StrudelMirror({
                    defaultOutput: webaudioOutput,
                    getTime: () => getAudioContext().currentTime,
                    transpiler,
                    root: document.getElementById('editor'),
                    prebake: async () => {
                        initAudioOnFirstClick(); // needed to make the browser happy (don't await this here..)
                        const loadModules = evalScope(
                            import('@strudel/core'),
                            import('@strudel/draw'),
                            import('@strudel/mini'),
                            import('@strudel/tonal'),
                            import('@strudel/webaudio'),
                        );
                        await Promise.all([loadModules, registerSynthSounds(), registerSoundfonts()]);
                    },
                });
            })();
    }

}, []);


return (
    <div>
        <h2 className= 'text-center bg-dark text-light pb-3'>Strudel Demo</h2>
        <main>

            <div className="container-fluid">
                <div className="row justify-content-center align-items-start pb-3">
                    <div className = "col-4 bg-dark m-2">
                        <div className="row bg-dark">
                            <PreProcessorButtons proc={process} proc_and_play={process_and_play}/>
                            <PlayButtons play_function={play_song} stop_function={stop_song}/>
                        </div> 
                    </div>
                    <InstrumentList 
                        update_song_function={update_song_text}
                        proc_and_play_function = {process_and_play}
                    /> 
                    {/* <div className="col-4 accordion mx-3" id = "accordion_preprocess" >
                         <div className="accordion-item">
                            <h2 className="accordion-header">
                                <button className="accordion-button bg-secondary text-light" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded = 'false' aria-controls="collapseOne">
                                    Text to preprocess
                                </button>
                            </h2>
                            <div id="collapseOne" className="accordion-collapse collapse" data-bs-parent="#accordion_preprocess">
                                <div className="accordion-body bg-secondary">
                                    <textarea className="form-control bg-dark text-light" rows="10" id="proc" value={songText}></textarea> 
                                </div>
                            </div>
                        </div>   
                    </div> */}
                    <ProcComponent songText = {songText}/>
                </div>
                <div className="row justify-content-center pb-3">
                    
                    <div className="col-4 mx-3 bg-dark rounded-3" >
                        <div id="editor" />
                    </div>  
                     <div className="col mx-3 bg-dark rounded-3" >
                        <D3Graph /> 
                    </div>     
                </div>     
            </div>     
        </main >  
    </div >
);


}

  