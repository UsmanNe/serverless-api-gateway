import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import LoadingButton from "./LoadingButton";
import { userValidationSchema } from "../utils/validationSchema";

export default function UserForm({ onSubmit, loading, initialData }) {
  return (
    <Formik
      initialValues={{
        userName: initialData?.userName || "",
        userRole: initialData?.userRole || "",
        userShift: initialData?.userShift || "",
        userMembershipType: initialData?.userMembershipType || "",
      }}
      validationSchema={userValidationSchema}
      onSubmit={(values, { resetForm }) => {
        onSubmit(values);
        if (!initialData?.userId) resetForm();
      }}
    >
      {({ errors, touched }) => (
        <Form>
          {["userName", "userRole", "userShift", "userMembershipType"].map(
            (field) => (
              <div className="mb-3" key={field}>
                <label className="form-label">
                  {field.replace("user", "")}
                </label>
                <Field
                  name={field}
                  placeholder={field.replace("user", "") + "..."}
                  className={`form-control ${
                    errors[field] && touched[field] ? "is-invalid" : ""
                  }`}
                />
                <ErrorMessage
                  name={field}
                  component="div"
                  className="invalid-feedback"
                />
              </div>
            )
          )}
          <div className="d-grid">
            <LoadingButton type="submit" loading={loading}>
              {initialData?.userId ? "Save Changes" : "Add User"}
            </LoadingButton>
          </div>
        </Form>
      )}
    </Formik>
  );
}
