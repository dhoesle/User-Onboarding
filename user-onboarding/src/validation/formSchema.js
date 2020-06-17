import * as Yup from "yup";

const formSchema = Yup.object().shape({
  email: Yup
    .string()
    .email("Must be a valid email address.")
    .required("Must include email address."),
  name: Yup
    .string()
    .min(3, "name must be at least 3 characters long.")
    .required("Password is Required"),
  password: Yup
    .string()
    .min(3, "password must be at least 3 characters long.")
    .required("Password is Required"),
})

export default formSchema