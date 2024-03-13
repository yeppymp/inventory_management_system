import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { DialogInformationComponent } from '@components/dialog-information/dialog-information.component';

import AuthService from '@services/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  constructor(
    public dialogInformation: MatDialog,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) { }

  loginForm!: FormGroup;

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/']);

      return;
    }

    this.createForm();
  }

  createForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (!this.loginForm.valid) return;

    const { username, password } = this.loginForm.value;

    const user = this.authService.getUserByUserName(username);

    if (!user) {
      this.dialogInformation.open(DialogInformationComponent, {
        data: {
          title: 'User not registered',
          description: 'I am sorry, we are unable to find user with that username.'
        }
      });

      return;
    }

    if (user.password !== password) {
      this.dialogInformation.open(DialogInformationComponent, {
        data: {
          title: 'Password does not match',
          description: 'Seems the password you entered is wrong'
        }
      });

      return;
    }

    this.authService.setUser(user);
    this.router.navigate(['/']);
  }
}
