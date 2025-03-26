"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { z } from "zod";
import { Eye, EyeOff, UserPlus } from "lucide-react";

const signUpSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  Branch: z.string().min(1, "Branch is required"),
  Course: z.string().min(1, "Course is required"),
});

type SignUpFormData = z.infer<typeof signUpSchema>;

export default function SignUp() {
  const router = useRouter();
  const [formData, setFormData] = useState<SignUpFormData>({
    name: "",
    email: "",
    phone: "",
    password: "",
    Branch: "",
    Course: "",
  });
  const [errors, setErrors] = useState<Partial<SignUpFormData>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  // Course options based on selected branch
  const branches = ["Computer Science", "Electrical Engineering", "Mechanical Engineering", "Civil Engineering", "Other"];
  const courseOptions: Record<string, string[]> = {
    "Computer Science": ["B.Tech", "M.Tech", "PhD", "Diploma"],
    "Electrical Engineering": ["B.Tech", "M.Tech", "PhD", "Diploma"],
    "Mechanical Engineering": ["B.Tech", "M.Tech", "PhD", "Diploma"],
    "Civil Engineering": ["B.Tech", "M.Tech", "PhD", "Diploma"],
    "Other": ["BCA", "MCA", "BSc", "MSc", "BBA", "MBA"],
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name as keyof SignUpFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
    setAuthError(null);
    
    // Reset Course if Branch changes
    if (name === "Branch") {
      setFormData((prev) => ({ ...prev, Course: "" }));
    }
  };

  const validateForm = (): boolean => {
    try {
      signUpSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedErrors: Partial<SignUpFormData> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            formattedErrors[err.path[0] as keyof SignUpFormData] = err.message;
          }
        });
        setErrors(formattedErrors);
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      // This would be replaced with your actual sign-up API call
      // const response = await signUp(formData);
      
      // For now, simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Successful registration would navigate to sign-in or verify page
      router.push("/signin");
    } catch (error) {
      setAuthError("This email is already registered. Please use a different email.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="bg-white rounded-xl shadow-xl overflow-hidden max-w-lg w-full">
        <div className="bg-indigo-600 p-6 text-center">
          <h1 className="text-white text-2xl font-bold">Create an Account</h1>
          <p className="text-indigo-200 mt-1">Join us today</p>
        </div>
        
        <div className="p-6 sm:p-8">
          {authError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
              {authError}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="col-span-1">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none transition-colors ${
                    errors.name 
                      ? "border-red-300 focus:ring-red-100" 
                      : "border-gray-300 focus:ring-indigo-100 focus:border-indigo-400"
                  }`}
                  placeholder="John Doe"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                )}
              </div>
              
              <div className="col-span-1">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none transition-colors ${
                    errors.email 
                      ? "border-red-300 focus:ring-red-100" 
                      : "border-gray-300 focus:ring-indigo-100 focus:border-indigo-400"
                  }`}
                  placeholder="your.email@example.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>
              
              <div className="col-span-1">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none transition-colors ${
                    errors.phone 
                      ? "border-red-300 focus:ring-red-100" 
                      : "border-gray-300 focus:ring-indigo-100 focus:border-indigo-400"
                  }`}
                  placeholder="(123) 456-7890"
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                )}
              </div>
              
              <div className="col-span-1">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none transition-colors ${
                      errors.password 
                        ? "border-red-300 focus:ring-red-100" 
                        : "border-gray-300 focus:ring-indigo-100 focus:border-indigo-400"
                    }`}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                )}
              </div>
              
              <div className="col-span-1">
                <label htmlFor="Branch" className="block text-sm font-medium text-gray-700 mb-1">
                  Branch
                </label>
                <select
                  id="Branch"
                  name="Branch"
                  value={formData.Branch}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none transition-colors ${
                    errors.Branch 
                      ? "border-red-300 focus:ring-red-100" 
                      : "border-gray-300 focus:ring-indigo-100 focus:border-indigo-400"
                  }`}
                >
                  <option value="">Select Branch</option>
                  {branches.map((branch) => (
                    <option key={branch} value={branch}>
                      {branch}
                    </option>
                  ))}
                </select>
                {errors.Branch && (
                  <p className="mt-1 text-sm text-red-600">{errors.Branch}</p>
                )}
              </div>
              
              <div className="col-span-1">
                <label htmlFor="Course" className="block text-sm font-medium text-gray-700 mb-1">
                  Course
                </label>
                <select
                  id="Course"
                  name="Course"
                  value={formData.Course}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none transition-colors ${
                    errors.Course 
                      ? "border-red-300 focus:ring-red-100" 
                      : "border-gray-300 focus:ring-indigo-100 focus:border-indigo-400"
                  }`}
                  disabled={!formData.Branch}
                >
                  <option value="">Select Course</option>
                  {formData.Branch && courseOptions[formData.Branch]?.map((course) => (
                    <option key={course} value={course}>
                      {course}
                    </option>
                  ))}
                </select>
                {errors.Course && (
                  <p className="mt-1 text-sm text-red-600">{errors.Course}</p>
                )}
              </div>
            </div>
            
            <div className="mt-6">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating account...
                  </>
                ) : (
                  <>
                    <UserPlus size={18} />
                    Sign up
                  </>
                )}
              </button>
            </div>
          </form>
          
          <div className="mt-6 text-center text-sm">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link href="/signin" className="font-medium text-indigo-600 hover:text-indigo-500">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
