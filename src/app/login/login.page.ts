import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  userType: 'aluno' | 'professor' = 'aluno';
  cpf: string = '';
  password: string = '';

  cpfInvalid = false;
  loginFailed = false;
  showPassword = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}

  setUserType(type: 'aluno' | 'professor') {
    this.userType = type;
  }

  onCPFInput(event: any) {
    let val: string = event.target.value || '';
    val = val.replace(/\D/g, '');
    if (val.length > 11) {
      val = val.substring(0, 11);
    }
    this.cpf = val;
  }

  login() {
    this.validateCPF(this.cpf);

    if (this.cpfInvalid) {
      this.loginFailed = false;
      return;
    }

    if (this.authService.login(this.cpf, this.password)) {
      const user = {
        cpf: this.cpf,
        userType: this.userType,
      };
      localStorage.setItem('user', JSON.stringify(user));

      this.loginFailed = false;
      this.router.navigate(['/success-page']);
    } else {
      this.loginFailed = true;
    }
  }

  validateCPF(cpf: string) {
    const cleanedCPF = cpf.replace(/\D/g, '');
    this.cpfInvalid = !(cleanedCPF.length === 11);
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  forgotPassword() {
    alert('Funcionalidade para recuperar senha ainda não implementada.');
  }

  openCadastro() {
    alert('Funcionalidade para cadastro ainda não implementada.');
  }
}