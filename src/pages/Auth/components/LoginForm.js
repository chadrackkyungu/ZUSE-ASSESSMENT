import React, { useState } from 'react'
import { AvField } from "availity-reactstrap-validation"
import { FaEye, FaEyeSlash } from "react-icons/fa";

function LoginForm() {
    const [showPassword, setShowPassword] = useState(false);
    const toggleIsLoading = () => setShowPassword(current => !current)

    return (
        <div>
            <div className="mb-3">
                <AvField
                    name="email"
                    label="Email"
                    className="form-control"
                    placeholder="Enter email"
                    type="email"
                    required
                />
            </div>

            <div className="mb-3">
                <div onClick={toggleIsLoading} className='text-end show-password' htmlFor="password">
                    {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                    {showPassword ? "Hide" : "Show"} password
                </div>
                <AvField
                    name="password"
                    label="Password"
                    type={!showPassword ? "password" : "text"}
                    required
                    placeholder="Enter Password"
                />
            </div>
        </div>
    )
}

export default LoginForm