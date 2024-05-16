import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { formArticle } from 'src/app/models/formArticle';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-publicate-post',
  templateUrl: './publicate-post.component.html',
  styleUrls: ['./publicate-post.component.css'],
})
export class PublicatePostComponent implements OnInit, OnChanges {
  @Input() openContentPostFromNavbar!: boolean;
  ContentPost: boolean = false;

  addImage: boolean = false;

  selectedImage: { file: File, showCancelOption: boolean }[] = [];

  formArticle!: FormGroup;

  articleToSave!: formArticle;

  constructor(
    private servicePost: PostService,
    private formBuilder: FormBuilder,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.formArticle = this.formBuilder.group({
      tittle: ['', Validators.required],
      contentPost: ['', Validators.required]
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['openContentPostFromNavbar']) {
      this.showContentPost(changes['openContentPostFromNavbar'].currentValue);
    }
  }
  

  getSanitizedImageUrl(image: File): any {
    return this.sanitizer.bypassSecurityTrustUrl(
      window.URL.createObjectURL(image)
    );
  }

  saveArticle() {
    if (!this.formArticle.valid) {
      alert('Error, por favor ingrese un titulo y contenido');
    }
    this.articleToSave = this.formArticle.value;
    const formData: FormData = new FormData();
    formData.append('article', JSON.stringify(this.articleToSave));
    if (this.selectedImage && this.selectedImage.length > 0) {
      for (let i = 0; i < this.selectedImage.length; i++) {
        formData.append('images', this.selectedImage[i].file);
      }
    }
    this.servicePost.saveArticle(formData).subscribe(
      () => {
        alert('Artículo guardado correctamente');
        this.ContentPost = false;
      },
      (error) => {
        console.error('Error al guardar el artículo', error);
        alert('Error al guardar el artículo'+ error);
      }
    );
  }

  showContentPost(event: boolean) {
    this.ContentPost = event;
  }

  showOpenPostFromNavBar(){
    this.ContentPost = this.openContentPostFromNavbar;
  }
  showBoxAddImae() {
    this.addImage = !this.addImage;
  }

  deleteImgOfList(index: number) {
    this.selectedImage.splice(index, 1);
  }

  handleFileInput(event: any) {
    const files = event.target.files;
    if (files) {
      for (let i = 0; i < files.length; i++) {
        this.selectedImage.push({ file: files[i], showCancelOption: false });
      }
    }
  }
}
