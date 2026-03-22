import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

 username = '';
 password = '';
 isLoggedin = false;
 
  constructor(private router: Router) {}

 login() {
    if (this.username === 'admin' && this.password === 'admin123') {
      this.isLoggedin = true;
      console.log('Login successful!');
      this.router.navigate(['/dashboard']);
    } else {
     alert('Invalid username or password.');
   }
 }
 signup() {
   // Handle signup logic here
 }
}
