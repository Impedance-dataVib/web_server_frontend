import { useCallback } from "react";
import { useBeforeUnload } from "react-router-dom";

export interface IUnsavedPromptProps {
  isUnsaved: boolean;
}

const UnsavedPrompt = ({ isUnsaved }: IUnsavedPromptProps) => {
  useBeforeUnload(
    useCallback(
      (event: any) => {
        if (isUnsaved) {
          event.preventDefault();
          event.returnValue = "";
        }
      },
      [isUnsaved]
    ),
    { capture: true }
  );

  return <></>;
};
export default UnsavedPrompt;
