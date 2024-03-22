import { FormGroupProps } from "../../AddressForm/AddressFormTypes";

const formGroupInputs: FormGroupProps[] = [
  {
    label: "First Name",
    name: "firstName",
    type: "text",
    placeholder: "type your first name",
    value: "",
    handleChange: () => {},
  },
  {
    label: "Last Name",
    name: "lastName",
    type: "text",
    placeholder: "type your last name",
    value: "",
    handleChange: () => {},
  },
  {
    label: "Email",
    name: "email",
    type: "email",
    placeholder: "type your email",
    value: "",
    handleChange: () => {},
  },
  {
    label: "Address",
    name: "address",
    type: "text",
    placeholder: "type your address",
    value: "",
    handleChange: () => {},
  },
];

export default formGroupInputs;
