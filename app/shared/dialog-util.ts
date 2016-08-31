import * as dialogsModule from "ui/dialogs";

export function alert(message: string) {
  return dialogsModule.alert({
    title: "Racket'O'Meter",
    okButtonText: "OK",
    message: message
  });
}
