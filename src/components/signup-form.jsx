import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { api } from "../helpers/Axios";

export function SignupForm({ ...props }) {
  const [loading , setLoading] = useState(false)
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // -------------------------------
  // VALIDATION
  // -------------------------------
  const validateField = (field, value) => {
    let error = "";

    if (field === "name") {
      if (!value.trim()) error = "Full name is required";
      else if (value.length < 2)
        error = "Name must be at least 2 characters long";
    }

    if (field === "email") {
      if (!value.trim()) error = "Email is required";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
        error = "Please enter a valid email address";
    }

    if (field === "password") {
      if (!value) error = "Password is required";
      else if (value.length < 8)
        error = "Password must be at least 8 characters long";
      else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value))
        error = "Must include uppercase, lowercase and number";
    }

    return { [field]: error };
  };

  const validateForm = () => {
    const newErrors = {
      ...validateField("name", formData.name),
      ...validateField("email", formData.email),
      ...validateField("password", formData.password),
    };

    setErrors(newErrors);
    setTouched({ name: true, email: true, password: true });

    return Object.values(newErrors).every((e) => e === "");
  };

  // -------------------------------
  // INPUT HANDLERS
  // -------------------------------
  const handleChange = (e) => {
    const { id, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));

    if (touched[id]) {
      setErrors((prev) => ({
        ...prev,
        ...validateField(id, value),
      }));
    }
  };

  const handleBlur = (e) => {
    const { id, value } = e.target;

    setTouched((prev) => ({ ...prev, [id]: true }));
    setErrors((prev) => ({
      ...prev,
      ...validateField(id, value),
    }));
  };

  // -------------------------------
  // SUBMIT HANDLER
  // -------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setLoading(true)
      const res = await api.post("/auth/registration", formData);

      console.log("Registration success:", res.data);

      navigate("/login"); // ⬅️ Navigate on success
    } catch (error) {
      console.log("Registration error:", error);
    }finally{
      setLoading(false)
    }
  };

  const getInputClass = (field) =>
    errors[field] && touched[field] ? "border border-red-500" : "";

  // -------------------------------
  // COMPONENT JSX
  // -------------------------------
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-md" {...props}>
        <CardHeader>
          <CardTitle>Create an account</CardTitle>
          <CardDescription>
            Enter your information to create your account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              {/* NAME FIELD */}
              <Field>
                <FieldLabel htmlFor="name">Full Name</FieldLabel>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={getInputClass("name")}
                />
                {errors.name && touched.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </Field>

              {/* EMAIL */}
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={getInputClass("email")}
                />
                <FieldDescription>
                  We won't share your email with anyone.
                </FieldDescription>

                {errors.email && touched.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </Field>

              {/* PASSWORD */}
              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>

                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={getInputClass("password")}
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>

                <FieldDescription>
                  Must have 8+ chars, uppercase, lowercase & number.
                </FieldDescription>

                {errors.password && touched.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
              </Field>

              {/* ACTIONS */}
              <Field>
                <Button type="submit" className="w-full">
                  {loading ? "loading..." : "Create Account"}
                </Button>

                <Button variant="outline" type="button" className="w-full mt-2">
                  Sign up with Google
                </Button>

                <FieldDescription className="text-center mt-4">
                  Already have an account?{" "}
                  <span
                    onClick={() => navigate("/login")}
                    className="text-blue-600 cursor-pointer hover:underline"
                  >
                    Sign in
                  </span>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
