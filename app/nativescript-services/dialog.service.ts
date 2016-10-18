import { Injectable } from "@angular/core";
import {
  alert,
  prompt,
  PromptResult,
  PromptOptions,
} from "ui/dialogs";

@Injectable()
export class DialogService {
  /**
   * Show alert with the message.
   * @param message The message.
   * @param title Optional alert title. Defaults to 'Racket O Meter'
   */
  public alert(message: string, title?: string): Promise<void> {
    return alert({
      title: title || "Racket O Meter",
      message,
      okButtonText: "OK",
    });
  }

  /**
   * Display dialog box that prompts for user input.
   * @param options The options for the dialog box.
   */
  public prompt(options: PromptOptions): Promise<PromptResult> {
    return prompt(options);
  }
}
