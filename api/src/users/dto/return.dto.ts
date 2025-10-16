export class ReturnUserDto {
  id: number;
  email: string;
  username?: string;
}

export class ReturnUserPassDto extends ReturnUserDto {
  password: string;
}
