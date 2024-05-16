import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile-user',
  templateUrl: './profile-user.component.html',
  styleUrls: ['./profile-user.component.css']
})
export class ProfileUserComponent implements OnInit {

  //Aqui se alamacena todos los datos del usuario logueado
  user: any = {};

  addImageUser: any;
  urlImageAdd: string = "";

  closeBoxUpdateImage: boolean = false;


  constructor(private userService: UserService,
    private sanitizer: DomSanitizer,

  ) {

  }

  ngOnInit(): void {
    //Obtenemos el email del ususario logueado que se alamcena en el local storage
    const emailUser = localStorage.getItem('email')
    if (emailUser) {
      //Llamamos al servicio para obetener los datos del usuario logeuado
      this.userService.getUse(emailUser).subscribe(user => {
        this.user = user;
      })
    }
  }

  handleFileInput(event: any) {
    const files = event.target.files;
    if (files) {
      this.addImageUser = files;
    }
    this.urlImageAdd = this.getSanitizedImageUrl(files);
    console.log('Imagen cargada', this.urlImageAdd);
  }

  getSanitizedImageUrl(files: FileList): any {
    if (files && files.length > 0) {
      const file = files.item(0); // Tomamos solo el primer archivo de la lista
      if (file) {
        return this.sanitizer.bypassSecurityTrustUrl(
          window.URL.createObjectURL(file)
        );
      }
    }
    return null; // Devolvemos null si no hay archivos o la lista está vacía
  }

  openBoxUpdateImageUserFromIconCamera(){
    this.closeBoxUpdateImage = true;
  }

  openBoxUpdateImageUserFromIconClose(){
    this.closeBoxUpdateImage = false;
  
  }

  updateImageUser(){

    const formData: FormData =new FormData();
    const email = localStorage.getItem('email');
    if(email){
      formData.append('email', JSON.stringify(email));
    }
    if (this.addImageUser && this.addImageUser.length > 0) {
      formData.append('image', this.addImageUser[0]);
    }
    this.userService.updateImageUser(formData).subscribe(res=>{
      if(res){
        console.log(res);
      }
    })

  }



}
