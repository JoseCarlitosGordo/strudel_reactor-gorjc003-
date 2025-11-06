import './cors-redirect';
import './App.css';
import { initStrudel, note, hush, evalScope, getAudioContext, webaudioOutput, registerSynthSounds, initAudioOnFirstClick, transpiler } from "@strudel/web";
import { useEffect, useRef, useState } from "react";
import { StrudelMirror } from '@strudel/codemirror';
import { registerSoundfonts } from '@strudel/soundfonts';
import { stranger_tune } from './tunes';
import console_monkey_patch, { getD3Data } from './console-monkey-patch';
import PreProcessorButtons from './Components/PreProcessorControl';
import InstrumentList from './Components/InstrumentList';
import PlayButtons from './Components/PlayButtons';

let globalEditor = null;

const handleD3Data = (event) => {
    console.log(event.detail);
};

export default function StrudelDemo() {

    const hasRun = useRef(false);
    const [songText, setSongText] = useState('')
    //whenever a change in instrument list is called, update preprocessed text
    function update_song_text(new_song_text)
    {
        console.log(new_song_text)
        setSongText(new_song_text)
        console.log("notes to play: " + songText)
    }
    //play song button
    function play_song()
    {
        globalEditor.evaluate()
    }
    //stop song button 
    function stop_song()
    {
        globalEditor.stop()
    }
    //proc button
    function process()
    {
        let proc_text = document.getElementById('proc').value
        globalEditor.setCode(proc_text)
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
    <div className='bg-secondary'>
        <h2 className= 'text-center bg-dark text-light pb-3'>Strudel Demo</h2>
        <main>

            <div className="container-fluid">
                 <div className="row justify-content-center mb-3 mx-auto bg-dark">
                        <PreProcessorButtons proc={process} proc_and_play={process_and_play}/>
                        <PlayButtons play_function={play_song} stop_function={stop_song}/>
                </div>
                <div className="row justify-content-center pb-3">
                    <div className="col-4 mx-3 bg-dark rounded-3" style={{ maxHeight: '50vh', overflowY: 'auto' }}>
                        <label className="form-label text-center text-light">Text to preprocess:</label>
                        <textarea className="form-control" rows="10" id="proc" value={songText}></textarea>
                    </div>
                    <div className="col-4 mx-3 bg-dark rounded-3" style={{ maxHeight: '60vh', overflowY: 'auto' }}>
                        <div id="editor" />
                    </div>  
                </div>         
                
                <InstrumentList 
                update_song_function={update_song_text}
                proc_and_play_function = {process_and_play}
                /> 
            </div>
        </main >
    </div >
);


}

