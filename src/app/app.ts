import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
 username = 'admin';
 password = 'admin123';

 login() {
   // Implement login logic here
   if (this.username === 'admin' && this.password === 'admin123') {
     alert('Login successful!');
   } else {
     alert('Invalid username or password.');
   }
 }
}
