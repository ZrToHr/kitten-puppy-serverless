export interface Album {
  UserId: string;
  AlbumOwner: string;
  UserEmail: string;
  AlbumPhotos: AlbumPhoto[];
}

export interface AlbumPhoto {
  PhotoName: string;
  PhotoType: string;
  PhotoSignedUrl: string;
}
