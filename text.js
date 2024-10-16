const textArea = document.querySelector("textarea"),
voiceList = document.querySelector("select"),
speechButton = document.querySelector("button");

let synthesis = speechSynthesis,
isSaying = true;

voices();

function voices(){
    for(let voice of synthesis.getVoices()){
        let selected = voice.name === "Google US English" ? "selected" : "";
        let option = `<option value="${voice.name}" ${selected}>${voice.name} (${voice.lang})</option>`;
        voiceList.insertAdjacentHTML("beforeend", option);
    }
}

synthesis.addEventListener("voiceschanged", voices);

function textToSpeech(text){
    let utterance = new SpeechSynthesisUtterance(text);
    for(let voice of synthesis.getVoices()){
        if(voice.name === voiceList.value){
            utterance.voice = voice;
        }
    }
    synthesis.speak(utterance);
}

speechButton.addEventListener("click", e =>{
    e.preventDefault();
    if(textArea.value !== ""){
        if(!synthesis.speaking){
            textToSpeech(textArea.value);
        }
        if(textArea.value.length > 80){
            setInterval(()=>{
                if(!synthesis.speaking && !isSaying){
                    isSaying = true;
                    speechButton.innerText = "Convert To Speech";
                }else{
                }
            }, 500);
            if(isSaying){
                synthesis.resume();
                isSaying = false;
                speechButton.innerText = "Pause Speech";
            }else{
                synthesis.pause();
                isSaying = true;
                speechButton.innerText = "Resume Speech";
            }
        }else{
            speechButton.innerText = "Convert To Speech";
        }
    }
});