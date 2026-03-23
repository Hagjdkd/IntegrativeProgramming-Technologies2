import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; // Added these
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ReactiveFormsModule], // Swap FormsModule for ReactiveFormsModule
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  private fb = inject(FormBuilder);
  private router = inject(Router);

  isSignUpMode = false;
  loginForm: FormGroup;
  users: any[] = JSON.parse(localStorage.getItem('registeredUsers') || '[]');

  constructor() {
  
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
      email: [''] 
    });
  }

  signup() {
    if (!this.isSignUpMode) {
      this.isSignUpMode = true;
      this.loginForm.get('email')?.setValidators([Validators.required, Validators.email]);
    } else {
      if (this.loginForm.valid) {
        const newUser = this.loginForm.value; // Gets all fields at once
        this.users.push(newUser);
        localStorage.setItem('registeredUsers', JSON.stringify(this.users));
        
        alert('User Registered!');
        this.isSignUpMode = false;
        this.loginForm.reset();
      } else {
        alert('Please fill out the form correctly.');
      }
    }
  }

  login() {
    if (this.isSignUpMode) {
      this.isSignUpMode = false;
      this.loginForm.get('email')?.clearValidators();
      return;
    }

    const { username, password } = this.loginForm.value;

    if (username === 'admin' && password === 'admin123') {
      this.router.navigate(['/dashboard']);
      return;
    }

    const userExists = this.users.find(u => u.username === username && u.password === password);

    if (userExists) {
      alert(`Welcome, ${username}!`);
      this.router.navigate(['/dashboard']);
    } else {
      alert('Invalid username or password.');
    }
  }

  clearTable() {
    if (confirm('Are you sure?')) {
      localStorage.removeItem('registeredUsers');
      this.users = [];
    }
  }
}