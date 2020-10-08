interface ValidatorObj {
  expression: { test: (x: string) => boolean };
  errorMessage: string;
}

export default interface InputObj {
  id: string;
  autoFocus?: boolean;
  default?: string;
  error?: string | null;
  labelContent: string;
  required: boolean;
  validators?: ValidatorObj[];
  type: string;
  value?: string | null;
  setValue: any;
}
