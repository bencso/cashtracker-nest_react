export class ReturnUserDto {
  id: number;
  username: string;
}

export class ReturnUserPassDto extends ReturnUserDto {
  password: string;
}
