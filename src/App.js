import './cors-redirect';
import './App.css';
import { initStrudel, note, hush, evalScope, getAudioContext, webaudioOutput, registerSynthSounds, initAudioOnFirstClick, transpiler } from "@strudel/web";
import { useEffect, useRef } from "react";
import { StrudelMirror } from '@strudel/codemirror';
import { registerSoundfonts } from '@strudel/soundfonts';
import { stranger_tune } from './tunes';
import console_monkey_patch, { getD3Data } from './console-monkey-patch';
import PreProcessorControl from './Components/PreProcessorControl';
import InstrumentList from './Components/InstrumentList';
let globalEditor = null;

const handleD3Data = (event) => {
    console.log(event.detail);
};


export function SetupButtons() {

    document.getElementById('play').addEventListener('click', () => globalEditor.evaluate());
    document.getElementById('stop').addEventListener('click', () => globalEditor.stop());
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

//TODO: Change it so that Proc checks all Instrument preprocessor controls instead of just one
export function Proc() {

    let proc_text = document.getElementById('proc').value
    let proc_text_replaced = proc_text.replaceAll('<p1_Radio>', ProcessText);
   
    globalEditor.setCode(proc_text_replaced)
}

export function ProcessText(match, ...args) {

    let replace = ""
    if (document.getElementById('flexRadioDefault2').checked) {
        replace = "_"
    }

    return replace
}

export default function StrudelDemo() {

const hasRun = useRef(false);

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
            Proc()
        })();
        document.getElementById('proc').value = stranger_tune
        SetupButtons()
    }

}, []);


return (
    <div>
        <h2>Strudel Demo</h2>
        <main>

            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-8" style={{ maxHeight: '50vh', overflowY: 'auto' }}>
                        <label htmlFor="exampleFormControlTextarea1" className="form-label">Text to preprocess:</label>
                        <textarea className="form-control" rows="1" id="proc" ></textarea>
                    </div>
                    <div className="col-md-4 bg-dark">

                        <nav>
                            <button id="process" className="btn btn-primary">Preprocess</button>
                            <button id="process_play" className="btn btn-outline-primary">Proc & Play</button>
                            <br />
                            <button id="play" className="btn btn-outline-primary">Play</button>
                            <button id="stop" className="btn btn-outline-primary">Stop</button>
                        </nav>
                    </div>
                </div>
                <div className="row">
                    <InstrumentList/>
                </div>
                <div className="row">
                    <div className="col-md-8" style={{ maxHeight: '50vh', overflowY: 'auto' }}>
                        <div id="editor" />
                    </div>
                    <div className="col-md-4">
                         <PreProcessorControl
                        text = "ON"
                        element_id="flexRadioDefault1"
                        default_check={true}/>
                        <PreProcessorControl
                        text = "HUSH"
                        element_id="flexRadioDefault2"
                        default_check={false}/>
                        
                    </div>
                </div>
            </div>

        </main >
    </div >
);


}

