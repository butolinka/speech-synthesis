const msg = new SpeechSynthesisUtterance();
  let voices = [];
  const voicesDropdown = document.querySelector('[name="voice"]');
  const options = document.querySelectorAll('[type="range"], [name="text"]');
  const speakButton = document.querySelector('#speak');
  const stopButton = document.querySelector('#stop');

  msg.text = document.querySelector('[name="text"]').value;

  function populateVoices(){
    voices = this.getVoices();
    voicesDropdown.innerHTML = voices
    .map(voice => `<option value='${voice.name}'>${voice.name}(${voice.land})</option>`)
    .join('');
  }

  function setVoice(){
    msg.voice = voices.find(voice => voice.name === this.value);
    toggle();
  }
  function toggle(startOver = true){
    speechSynthesis.cancel();
    if(startOver){
    speechSynthesis.speak(msg);
  }}

  function setOption(){
    msg[this.name] =this.value;
  }
  speechSynthesis.addEventListener('voiceschanged',populateVoices);
  voicesDropdown.addEventListener('change', setVoice);
  options.forEach(option => option.addEventListener('cgange', setOption));
  speakButton.addEventListener('click', toggle);
  stopButton.addEventListener('click', ()=> toggle(false) );