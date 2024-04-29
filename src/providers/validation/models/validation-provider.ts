export interface IValidationProvider {
  validate(data: any, schema: any): Promise<void>;
}
