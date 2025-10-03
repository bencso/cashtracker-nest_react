export class ReturnDto {
  message: [string];
  statusCode: number;
}

export class ReturnDataDto extends ReturnDto {
  data: any;
}
