import { AuthState } from "../../state/auth/authTypes";

export interface RootState {
  auth: AuthState;
}

export interface Country {
  name: string;
  iso3: string;
  iso2: string;
  states: State[];
}

export interface State {
  name: string;
  state_code: string;
}

export interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  country: string;
  state: string;
  [key: string]: string;
}

export interface FormGroupProps {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  value: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface SetErrorsFunctionType {
  (errors: Partial<FormData>): void;
}

export interface SetCountriesFunctionType {
  (countries: Country[]): void;
}

export interface SetPasswordErrorFunctionType {
  (passwordError: string): void;
}

export interface SetEmailErrorFunctionType {
  (emailError: string): void;
}
