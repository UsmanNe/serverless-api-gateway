import { Button } from "react-bootstrap";

export default function LoadingButton({ loading, children,color, ...props }) {
  return (
    <Button
      className="btn btn-dark"
      {...props}
      disabled={loading || props.disabled}
      variant={color}
    >
      {loading && (
        <span
          className="spinner-border spinner-border-sm me-2"
          role="status"
        ></span>
      )}
      {children}
    </Button>
  );
}

