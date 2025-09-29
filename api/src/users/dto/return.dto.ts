export class ReturnUserDto {
  id: number;
  email: string;
}

export class ReturnUserPassDto extends ReturnUserDto {
  password: string;
}
