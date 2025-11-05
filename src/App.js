import './cors-redirect';
import './App.css';
import { initStrudel, note, hush, evalScope, getAudioContext, webaudioOutput, registerSynthSounds, initAudioOnFirstClick, transpiler } from "@strudel/web";
import { useEffect, useRef, useState } from "react";
import { StrudelMirror } from '@strudel/codemirror';
import { registerSoundfonts } from '@strudel/soundfonts';
import { stranger_tune } from './tunes';
import console_monkey_patch, { getD3Data } from './console-monkey-patch';
import PreProcessorControl from './Components/PreProcessorControl';
import InstrumentList from './Components/InstrumentList';
import PlayButtons from './Components/PlayButtons';

let globalEditor = null;

const handleD3Data = (event) => {
    console.log(event.detail);
};


export function SetupButtons() {

    // document.getElementById('play').addEventListener('click', () => globalEditor.evaluate());
    // document.getElementById('stop').addEventListener('click', () => globalEditor.stop());
    document.getElementById('process').addEventListener('click', () => {
        Proc()
    }
    )
    document.getElementById('process_play').addEventListener('click', () => {
        if (globalEditor != null) {
            Proc()
            globalEditor.evaluate()
        }
    }
    )
}



export function ProcAndPlay() {
    if (globalEditor != null && globalEditor.repl.state.started == true) {
        console.log(globalEditor)
        Proc()
        globalEditor.evaluate();
    }
}


export function Proc() {
    let proc_text = document.getElementById('proc').value
    globalEditor.setCode(proc_text)
}


export default function StrudelDemo() {

    const hasRun = useRef(false);
    const [songText, setSongText] = useState('')
    function update_song_text(new_song_text)
    {
        console.log(new_song_text)
        setSongText(new_song_text)
        console.log("notes to play: " + songText)
    }
    function play_song()
    {
        globalEditor.evaluate()
    }

    function stop_song()
    {
        globalEditor.stop()
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
                SetupButtons()
            })();
    }

}, []);


return (
    <div>
        <h2>Strudel Demo</h2>
        <main>

            <div className="container-fluid">
                 <div className="row justify-content-center">
                    <div className="col-sm-3">
                        <button id="process" className="btn btn-outline-primary">Preprocess</button>
                    </div>
                    <div className="col-sm-3">
                            <button id="process_play" className="btn btn-outline-primary">Proc & Play</button>
                    </div>
                        <PlayButtons play_function={play_song} stop_function={stop_song}/>
                    <div className="col-4 md-8" style={{ maxHeight: '50vh', overflowY: 'auto' }}>
                        <label htmlFor="exampleFormControlTextarea1" className="form-label">Text to preprocess:</label>
                        <textarea className="form-control" rows="10" id="proc" value={songText}></textarea>
                    </div>
                    <div className="col-4 md-8 p-4 bg-dark" style={{ maxHeight: '40vh', overflowY: 'auto' }}>
                        <div id="editor" />
                    </div>
                          
                </div>
               
             
                <InstrumentList 
                update_song_function={update_song_text}
                proc_and_play_function = {ProcAndPlay}
                />
                    
               
            </div>

        </main >
    </div >
);


}

