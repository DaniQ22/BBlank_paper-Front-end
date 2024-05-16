export interface Article {
  id: number;
  tittle: string;
  contentPost: string;
  likeCountPost: number;
  dislikeCountPost: number;
  idUserDTO: number;
  publicationDatePost: string;
  showOptionPost: boolean;
  isLikedByCurrentUser?: boolean;
  isDisLikedByCurrentUser?: boolean

  likeDTOS: [{
    idArticleDTO: number,
    idUserDTO: number
  }];
  disLikeDTOS: [{
    idArticleDTO: number,
    idUserDTO: number
  }]

  userDTO: {
    id: number;
    firstNameUser: string;
    lastNameUser: string;
    emailUser: string;
    imageUserDTO: {
      imgUrlDTO: string
    }

  };
  imgDTO: [
    {
      altImg: string;
      imgUrlDTO: string
    }
  ];
  commentDTO: [
    {
      id: number,
      contentComment: string
      userDTO: {
        id: number;
        firstNameUser: string;
        lastNameUser: string;
        emailUser: string;
      }
    }   
  ];
}
