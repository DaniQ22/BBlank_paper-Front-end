import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-activate-account',
  templateUrl: './activate-account.component.html',
  styleUrls: ['./activate-account.component.css'],
})
export class ActivateAccountComponent implements OnInit {
  constructor(private serviceUse: UserService, private route: ActivatedRoute,
    private rou: Router
  ) {}
  
  activationSuccess = false;

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const email = params['email'];

      if (email) {
        // Llamar al método para activar la cuenta
        this.activateAccount(email);
      } else {
        console.error(
          'No se proporcionó un correo electrónico para activar la cuenta.'
        );
        // Aquí puedes manejar el caso en el que no se proporciona un correo electrónico
      }
    });
  }
  activateAccount(email: string) {
    console.log('Activar cuenta, tue');
    this.serviceUse.activateAccount(email).subscribe(() => {
      alert('Su cuenta ha sido activada con exito');
      this.rou.navigateByUrl('/login')
    });
  }
}
