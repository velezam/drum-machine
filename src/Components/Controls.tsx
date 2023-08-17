import { heaterKit, pianoKit } from "../App.tsx";

export default function Controls({ power, volume, bank, setVolume, setPower, setBank }: any) {
  function handleVolumeChange(event: any) {
    if (!power) return; // Don't do anything if the power is off

    const newVolume = Number(event.target.value);
    setVolume(newVolume);

    document.getElementById("display")!.innerText = "Volume: " + String(Math.round(newVolume * 100));

    setTimeout(() => {
      document.getElementById("display")!.innerText = "";
    }, 2000);
  }

  function handleToggle(event: any) {
    const button = event.target;

    if (button.classList.contains("power")) {
      if (!power) {
        setPower(!power);
        button.classList.add("on");

        document.getElementById("display")!.innerText = "Power: On";
      } else {
        setPower(!power);
        button.classList.remove("on");

        document.getElementById("display")!.innerText = "Power: Off";
      }
    }

    if (button.classList.contains("bank")) {
      if (!power) return; // Don't do anything if the power is off

      if (bank === heaterKit) {
        setBank(pianoKit);
        button.classList.add("on");
        document.getElementById("display")!.innerText = "Piano Kit";
      } else {
        setBank(heaterKit);
        button.classList.remove("on");
        document.getElementById("display")!.innerText = "Heater Kit";
      }
    }

    setTimeout(() => {
      document.getElementById("display")!.innerText = "";
    }, 2000);
  }

  return (
    <div className="controls-container">
      <div className="control">
        Power
        <div className="toggle-container">
          <div className="power toggle-selector on" onClick={handleToggle}></div>
        </div>
      </div>

      <div id="display"></div>

      <div className="volume-slider">
        <input max="1" min="0" step="0.01" type="range" id="volume" value={volume} onChange={handleVolumeChange} />
      </div>

      <div className="control">
        Bank
        <div className="toggle-container">
          <div className="bank toggle-selector" onClick={handleToggle}></div>
        </div>
      </div>
    </div>
  );
}
