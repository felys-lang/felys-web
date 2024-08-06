import { Output } from "@/app/page";
import { Dispatch, SetStateAction } from "react";

interface Props {
  output: Output | undefined;
  setOutput: Dispatch<SetStateAction<Output | undefined>>;
}

const Result = ({ output, setOutput }: Props) => {
  return (
    <dialog
      open={output !== undefined}
      className="fixed bg-vpgray bottom-0 p-4 w-full border-t-2 border-vpwhite max-h-[40%] overflow-auto"
    >
      <div className="flex justify-between items-center">
        <code className="text-vpwhite">Felys-Web 0.1.0</code>
        <button onClick={() => setOutput(undefined)}>
          <CloseIcon />
        </button>
      </div>

      {output?.ok && output?.out && (
        <div className="text-elypink whitespace-pre-wrap overflow-auto">
          <code>{output?.out}</code>
        </div>
      )}

      <br />

      {output?.ok && (
        <div className="text-vpwhite whitespace-pre-wrap">
          <code>{`Finished with <${output?.msg}> in ${output?.time}`}</code>
        </div>
      )}

      {!output?.ok && <code className="text-vpwhite">{output?.msg}</code>}
    </dialog>
  );
};

const CloseIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="#ffc6f5"
      viewBox="0 0 16 16"
      transform="scale(2)"
    >
      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
    </svg>
  );
};

export default Result;
