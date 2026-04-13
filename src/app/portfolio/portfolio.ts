import { Component } from '@angular/core';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [],
  templateUrl: './portfolio.html',
  styleUrl: './portfolio.css',
})
export class Portfolio {
  name = 'Emman Villarino';
  age = 20;
  section = 'BSIT-3A';
  goBack() {
    window.history.back();
  }
}
