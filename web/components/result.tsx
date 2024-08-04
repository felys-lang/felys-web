import { Output } from "@/app/page";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

interface Props {
  output: undefined | Output;
  setOutput: Dispatch<SetStateAction<Output | undefined>>;
}

const Result = ({ output, setOutput }: Props) => {
  return (
    <dialog
      open={output !== undefined}
      className="fixed bg-vpgray bottom-0 p-4 w-full border-t-2 border-vpwhite"
    >
      <div className="flex justify-between items-center">
        <code className="text-vpwhite">Felys-Web 0.1.0</code>
        <button onClick={() => setOutput(undefined)}>
          <Image src="/close.svg" alt="CLOSE" width={32} height={32} />
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
          <code>{`Finished with exit object <${output?.msg}>`}</code>
        </div>
      )}

      {!output?.ok && <code className="text-vpwhite">{output?.msg}</code>}
    </dialog>
  );
};

export default Result;
