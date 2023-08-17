import { useEffect } from "react";

export default function Drum({ bank, power, volume }: any) {
  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [bank, power, volume]);

  function playSound(audioClip: any) {
    if (!power) return; // Don't do anything if the power is off

    const audioElement = document.getElementById(audioClip.id)?.children[0] as HTMLAudioElement;

    // Set the volume of the audio element
    audioElement.volume = volume;

    // Play the audio clip
    audioElement.play().catch(console.error);

    // Update the display
    document.getElementById("display")!.innerText = audioClip.id;

    // Highlight the button
    const button = document.getElementById(audioClip.id);
    if (button) {
      button.classList.add("highlight");
      setTimeout(() => {
        button.classList.remove("highlight");
      }, 100);
    }
  }

  function handleKeyPress(event: any) {
    if (!power) return; // Don't do anything if the power is off

    const keyPressed = event.key.toUpperCase();

    const audioClip = bank.find((clip: any) => clip.keyTrigger === keyPressed);

    playSound(audioClip);
    const button = document.getElementById(audioClip.id);
    if (button) {
      button.classList.add("highlight");
      setTimeout(() => {
        button.classList.remove("highlight");
      }, 100);
    }
  }

  return (
    <>
      {bank.map((clip: any) => (
        <button key={clip.keyTrigger} className="drum-pad" id={clip.id} onClick={() => playSound(clip)}>
          <audio id={clip.keyTrigger} className="clip" src={clip.url} />
          {clip.keyTrigger}
        </button>
      ))}
    </>
  );
}
