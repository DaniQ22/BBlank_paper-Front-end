export interface getComment {
    id: number,
    contentComment: string
    userDTO: {
        id: number;
        firstNameUser: string;
        lastNameUser: string;
        emailUser: string;
    }
}

