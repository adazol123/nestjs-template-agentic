import { HttpException, HttpStatus } from '@nestjs/common';
import { ApiResponse } from '../interfaces/response.interface';

export class ErrorHandler {
  static handleError(error: any): ApiResponse<null> {
    if (error instanceof HttpException) {
      return {
        success: false,
        error: error.message,
        message: error.message,
      };
    }
    
    return {
      success: false,
      error: error.message || 'Internal server error',
      message: error.message || 'An unexpected error occurred',
    };
  }
}