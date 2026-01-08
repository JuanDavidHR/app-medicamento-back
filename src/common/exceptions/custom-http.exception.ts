import { HttpException, HttpStatus } from "@nestjs/common";

export class CustomHttpException extends HttpException {
  constructor(
    message: string,
    errorCode: string,
    statusCode: HttpStatus = HttpStatus.BAD_REQUEST
  ) {
    super(
      {
        message,
        errorCode,
        statusCode,
        timestamp: new Date().toISOString(),
      },
      statusCode
    );
  }
}
