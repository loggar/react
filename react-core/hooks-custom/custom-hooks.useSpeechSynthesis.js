// npm i react-speech-kit

import { useSpeechSynthesis } from "react-speech-kit";

function Component() {
  const ref = React.useRef();
  const { speak } = useSpeechSynthesis();

  return (
    <div>
      <input type="text" ref={ref} />
      <button onClick={() => speak({ text: ref.current.value })}>Speak</button>
    </div>
  );
}
