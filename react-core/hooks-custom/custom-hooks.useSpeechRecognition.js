// npm i react-speech-kit

import { useSpeechRecognition } from "react-speech-kit";

function Component() {
  const [result, setResult] = useState();
  const { listen, listening, stop } = useSpeechRecognition({
    onResult: (result) => setResult(result),
  });

  return (
    <div>
      {listening ? "Speak, I'm listening" : ""}
      <textarea value={value} />
      <button onClick={listen}>Listen</button>
      <button onClick={stop}>Stop</button>
    </div>
  );
}
