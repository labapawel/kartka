import { Injectable } from '@angular/core';
import { HfInference } from "@huggingface/inference"
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AiService {
  client = new HfInference("token z huggingface");
  constructor() { }

  private _obs: BehaviorSubject<string> = new BehaviorSubject<string>("");
  public obs = this._obs.asObservable();

  async generateAnswer(od:string, doo:string)  {
    const stream = this.client.chatCompletionStream({
      model: "meta-llama/Llama-3.2-3B-Instruct",
      messages: [
        { role: "system", content: "Piszemy życzenia świąteczne\nna święta Bożego Narodzenia i nowy rok\nnie dodawaj dodatkowych informacji\nnie dodawaj dodatkowych treści" },
        { role: "user", content: "napisz życzenia od "+ od +" dla "+ doo +", maksymalnie 2 zdania" },
      ],
      temperature: 0.8,
      max_tokens: 2048,
      top_p: 0.7
    });
    
    let out:string = "";
    for await (const chunk of stream) {
      if (chunk.choices && chunk.choices.length > 0) {
        const newContent = chunk.choices[0].delta.content;
        out += newContent;
        //console.log(newContent);
      }  
    }  
    this._obs.next(out);
  }
}
