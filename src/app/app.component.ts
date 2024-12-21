import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AiService } from './ai.service';
import { NgFor, NgStyle } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgFor, NgStyle],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'kartka';
  zyczenia: string = "pisze ....";
  snieg: any[] = [];
  constructor (private aiService: AiService) {
   
    aiService.obs.subscribe((data) => {
      this.zyczenia = data;
    })
    aiService.generateAnswer("Paweł", "Joli");

    setInterval(() => {
      let sniezka = {
        hw: Math.random() * 10 + "px",
        left: Math.random() * 100 + "%",
        opacity: Math.random() * 0.5 + 0.5,
        animationDuration: Math.random() * 2 + 2 + "s",
      }
      this.snieg.push(sniezka);
      setTimeout(() => {
        this.snieg = this.snieg.filter((s) => s != sniezka);
      }, 5001);

    }, 10);
  }
}
