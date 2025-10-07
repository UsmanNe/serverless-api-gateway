import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import LoadingButton from "./LoadingButton";
import { userValidationSchema } from "../utils/validationSchema";

export default function EditModal({ user, onClose, onSave, loading }) {
  if (!user) return null;

  return (
    <div
      className="modal d-block"
      tabIndex="-1"
      style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit User</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>

          <Formik
            enableReinitialize={true}
            initialValues={{
              userName: user.userName || "",
              userRole: user.userRole || "",
              userShift: user.userShift || "",
              userMembershipType: user.userMembershipType || "",
            }}
            validationSchema={userValidationSchema}
            onSubmit={(values) => onSave(values)}
          >
            {({ errors, touched }) => (
              <Form>
                <div className="modal-body">
                  {[
                    "userName",
                    "userRole",
                    "userShift",
                    "userMembershipType",
                  ].map((field) => (
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
                  ))}
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={onClose}
                    disabled={loading}
                  >
                    Cancel
                  </button>
                  <LoadingButton type="submit" loading={loading} color="Dark">
                    Save Changes
                  </LoadingButton>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
