export type TCategory = {
    id: string;
    catName: string;
  };
  
  export type TCourse = {
    id: string;
    name: string;
    content: string;
    imageUrl?: string;
    publicId?: string;
    catName?: string;
    createdAt: string;
    authorEmail: string;
    author: {
      name: string;
    };
    date:string;
  };