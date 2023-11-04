// Convention with the back where the "errors" property is standardized.
// And the types "CsvResults" and "ErrorsAndCorrect".
export interface MultiPartRequest {
  errors: string[];
}

export interface CsvResults extends MultiPartRequest {
  numberOfCorrects: number;
  numberOfErrors: number;
  totalsProcesed: number;
}

export interface ErrorsAndCorrect extends MultiPartRequest {
  correct: string[];
}
