export class User {
  constructor(
    public _id: string = '',
    public username: string,
    public password: string,
    public resourceAmount = {
      food: 0,
      wood: 0,
      iron: 0,
      silver: 0,
    }
  ) {}
}
