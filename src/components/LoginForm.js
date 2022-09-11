import Form from "./Form";
import TextInput from "./TextInput";
import Button from "./Button";
import { Link } from "react-router-dom";

export default function LoginForm() {
  return (
    <Form className={{ height: "330px" }}>
      <TextInput type="text" placeholder="Enter email" icon="alternate_email" />

      <TextInput type="password" placeholder="Enter password" icon="lock" />

      <Button>
        <span>Submit Now</span>
      </Button>

      <div className="info">
        Don't have an account? <Link to="/signup">Signup</Link> instead.
      </div>
    </Form>
  );
}
