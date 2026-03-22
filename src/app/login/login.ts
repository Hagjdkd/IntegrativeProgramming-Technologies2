import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  username = '';
  password = '';
  email = '';
  isSignUpMode = false;

  constructor(private router: Router) {}

 // 1. Initialize by checking LocalStorage first
  users: any[] = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
signup() {
  if (!this.isSignUpMode) {
    this.isSignUpMode = true;
  } else {
    // Make sure to include the password here!
    const newUser = { 
      username: this.username, 
      email: this.email,
      password: this.password 
    };
    
    this.users.push(newUser);
    localStorage.setItem('registeredUsers', JSON.stringify(this.users));
    
    alert('User Registered!');
    this.isSignUpMode = false;
    this.clearFields();
  }
}

  login() {
  if (this.isSignUpMode) {
    this.isSignUpMode = false;
    return;
  }


  if (this.username === 'admin' && this.password === 'admin123') {
    this.router.navigate(['/dashboard']);
    return;
  }

  const userExists = this.users.find(u => 
    u.username === this.username && u.password === this.password
  );

  if (userExists) {
    alert('Welcome, ' + this.username + '!');
    this.router.navigate(['/dashboard']);
  } else {
    alert('Invalid username or password.');
  }
}
  clearFields() {
    this.username = '';
    this.email = '';
    this.password = '';
  }
 clearTable() {
  if (confirm('Are you sure you want to delete all registered users?')) {
    localStorage.removeItem('registeredUsers');
    this.users = [];
    alert('Database cleared!');
  }
}
}
