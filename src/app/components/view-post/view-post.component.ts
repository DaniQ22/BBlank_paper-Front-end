import { Component, HostListener, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, catchError, map, of } from 'rxjs';
import { Article } from 'src/app/models/articleModel';
import { Comment } from 'src/app/models/commentModel';
import { getComment } from 'src/app/models/getCommentModel';
import { UserModel } from 'src/app/models/userModel';
import { CommentServiceService } from 'src/app/services/comment-service.service';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.css'],
})
export class ViewPostComponent implements OnInit {

  @Input() receiveUseLogged!: string;

  userLoggedIn!: number;
  articles: Article[] = [];

  pageSize = 5;
  pageNumber = 0;
  loading = false;
  isLastPage: boolean = false;
  userLogged!: string;

  openMenu: boolean = false;
  viewOptionsPost: boolean = false;

  formComment!: FormGroup;
  dataComment!: Comment;

  //En este lista solo se almacenan 4 comentarios de todos los comentarios
  listRecentComment: getComment[] = new Array(4);

  //Lista para almacenar todos los likes de todos los articulos
  listLikes: any[] = [];

  //Aqui almacenare el el email de usuario almacenado en el local storage, para colorear la opcion "Like" en el html cuando un usuario ya dio like
  emailUseFromlocalStogare!: string;

  classLike: boolean = false;
  constructor(private serviceArticle: PostService,
    private commentService: CommentServiceService,
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {
    //Aqui estoy obteniendo el email que se almacena en el local storage una vez un usuario hace un login
    const email = localStorage.getItem('email');
    if (email) {
      this.emailUseFromlocalStogare = email;
    }

    //Aqui se implementa la logica para saber un usuario ya ha dado like a un articulo, esto es con el fin de colorear la casilla de like

  }

  ngOnInit(): void {
    this.loadArticle();
    this.getAllLikes();
    console.log(this.receiveUseLogged);
    console.log(this.articles);
    this.formComment = this.formBuilder.group({
      contentComment: ['', Validators.required]
    })
  }


  //Este metodo me perimite cargar mas articulo desde el servidor una ez el scroll llega al final de la pagina
  @HostListener('window:scroll', ['$event'])
  onScroll(): void {
    const windowHeight =
      'innerHeight' in window
        ? window.innerHeight
        : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    );
    const windowBottom = windowHeight + window.pageYOffset;
    if (windowBottom >= docHeight) {
      this.loadMore();
    }
  }

  //Este metodo me permite abrir la opciones de un articulo (eliminar  o editar) de acuerdo al usuario
  openMenuOption(emailUser: string, index: number, event: boolean) {
    if (this.receiveUseLogged === emailUser) {
      this.articles[index].showOptionPost = !this.articles[index].showOptionPost;
    }
  }


  //Este metodo me permite cargar mas articulos.
  loadMore() {
    if (!this.loading && !this.isLastPage) {
      this.pageNumber++;
      this.loading = true;
      this.serviceArticle.getAllPosts(this.pageNumber, this.pageSize).subscribe(
        (articles: any) => {
          this.articles = this.articles.concat(articles.content);
          this.loading = false;
          this.isLastPage = articles.last;
        },
        (error) => {
          console.error('Error loading more articles:', error);
          this.loading = false;
        }
      );
    }
  }



  //Metodo para cargar todos los articulos
  loadArticle() {
    this.loading = true;
    this.serviceArticle.getAllPosts(this.pageNumber, this.pageSize).subscribe(
      (articles: any) => {
        this.articles = articles.content;
        this.loading = false;
        this.isLastPage = articles.last;
        console.log('lista de articulos', articles);
        //Esta parte del codigo verifica si el ususario logueado actualmente ha dado like a un ariticulo en especial
        const currentEmaiUser = localStorage.getItem('email');
        if(currentEmaiUser){
          this.userService.getIdUserByEmail(currentEmaiUser).subscribe(userId  => {
            this.articles = this.articles.map(article => ({
              ...article,
              isLikedByCurrentUser: article.likeDTOS.some(like => like.idUserDTO === userId)
            }));
            this.articles = this.articles.map(article => ({
              ...article,
              isDisLikedByCurrentUser: article.disLikeDTOS.some(disLike => disLike.idUserDTO === userId)
            }));
            

          });
        }
      },
      (error) => {
        console.error('Error loading articles:', error);
        this.loading = false;
      }
    );
  }

  //Este metodo me permite elimar un articulo
  deleteArticle(idArticle: number) {
    this.serviceArticle.deleteArticle(idArticle).subscribe(res => {
      if (res) {
        alert(res)
        this.loadArticle();
      }
    }, (error) => {
      alert(error)
    });
  }

  //Este metodo me permite unicamente un like a un articulo
  likeArticle(idArticle: number) {
    this.serviceArticle.likeArticle(idArticle).subscribe(
      () => {
        console.log('Like to article ' + idArticle + ' successful.');
        this.loadArticle();
      },
      (error) => {
        console.error('Error liking article:', error);
      }
    );
  }

  //Metodo para  comentar un articulo
  commentPost(idArticleDTO: number) {
    if (!this.formComment.valid) {
      alert('Por favor escriba un comentario!!')
    }
    this.dataComment = this.formComment.value;
    this.dataComment.idArticleDTO = idArticleDTO;
    this.commentService.commentPost(this.dataComment).subscribe(
      (res) => {
        if (res) {
          alert(res)
          this.formComment.reset();
          this.loadArticle();
        }
      }, (error) => {
        alert('No se pudo publicar el comentario')
      })
  }

  //Metodo para obtener todos los likes
  getAllLikes() {
    this.serviceArticle.getAllLikes().subscribe(
      (res) => {
        this.listLikes = res;
      }, (error) => {
        this.listLikes = [];
      }
    )
  }

  getCurrentUserId(email: string): Observable<number> {
    return this.userService.getIdUserByEmail(email);
  }
  
  //Metodo para dar no me gusta a un comentario
  dontLikePost(idArticle: number){
    this.serviceArticle.dontLike(idArticle).subscribe(
      () => {
      console.log('Don´t to article ' + idArticle + ' successful.');
      this.loadArticle();
    },
    (error) => {
      console.error('Error liking article:', error);
    }
  );

  }

  

}





