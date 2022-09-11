import Form from "./Form";
import TextInput from "./TextInput";
import Checkbox from "./Checkbox";
import Button from "./Button";
import { Link } from "react-router-dom";

export default function SignupForm() {
  return (
    <Form className={{ height: "500px" }}>
      <TextInput type="text" placeholder="Enter name" icon="person" />

      <TextInput type="text" placeholder="Enter email" icon="alternate_email" />

      <TextInput type="password" placeholder="Enter password" icon="lock" />

      <TextInput
        type="password"
        placeholder="Confirm password"
        icon="lock_clock"
      />

      <Checkbox text="I agree to the Terms &amp; Conditions" />

      <Button>
        <span>Submit Now</span>
      </Button>

      <div className="info">
        Already have an account? <Link to="/login">Login</Link> instead.
      </div>
    </Form>
  );
}