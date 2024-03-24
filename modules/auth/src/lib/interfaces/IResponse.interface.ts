export interface IResponse {
  user: {
    id: number;
    name: string;
    email: string;
    height: number;
    weight: number;
    birthday: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
  };
  access_token: string;
}
