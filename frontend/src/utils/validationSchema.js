import * as Yup from "yup";

export const userValidationSchema = Yup.object({
  userName: Yup.string()
    .required("Name is required")
    .min(3, "Name must be at least 3 characters")
    .matches(/^[^0-9]*$/, "Name cannot contain numbers"),
  userRole: Yup.string()
    .required("Role is required")
    .min(3, "Role must be at least 3 characters")
    .matches(/^[^0-9]*$/, "Role cannot contain numbers"),
  userShift: Yup.string()
    .required("Shift is required")
    .matches(/^[^0-9]*$/, "Shift cannot contain numbers"),
  userMembershipType: Yup.string()
    .required("Membership Type is required")
    .matches(/^[^0-9]*$/, "Membership Type cannot contain numbers"),
});
