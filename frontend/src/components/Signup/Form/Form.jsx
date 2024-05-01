// src/components/Form.js

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const PageContainer = styled.div`
    padding-top: 10px;
`;

const PageTitle = styled.div`
    font-size: 30px;
    padding-bottom: 10px;
    padding-left: 100px;
`;

const RegisterContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const FormTitle = styled.div`
    font-size: 30px;
    padding-bottom: 10px;
`;

const FormContainer = styled.div`
    justify-content: flex-start;
    width: 14%;
`;

const InputSection = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 15px;
    label {
        margin-bottom: 5px;
    }
    input {
        padding: 5px;
        border: 2px solid #e3e3e3;
        &:focus {
            outline: 2px solid #9da631;
            border: none;
        }
    }
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 15px; // Corrected misspelling of "margin-bottom"
`;

const SubmitButton = styled.button`
    background-color: #9da631;
    border: none;
    border-radius: 2px;
    padding: 8px 10px; // Removed unnecessary padding value
    color: white;
    cursor: pointer;
    font-family: inherit;
    font-size: inherit;
    :focus {
        outline: none;
        border: none;
    }
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    color: #9da631;
    font-weight: bold;
`;

const Form = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        passwordConfirmation: "",
        mobileNumber: "" // Added mobileNumber field
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                // Redirect to success page
                navigate("/success");
            } else {
                console.error("Error registering user:", response.statusText);
                // Redirect to error page
                navigate("/error");
            }
        } catch (error) {
            console.error("Error registering user:", error);
            // Redirect to error page
            navigate("/error");
        }
    };

    return (
        <PageContainer>
            <PageTitle>WeIndic</PageTitle>
            <RegisterContainer>
                <FormTitle>Register</FormTitle>
                <FormContainer>
                    <form onSubmit={handleSubmit}>
                        <InputSection>
                            <label htmlFor="firstName">First Name</label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                placeholder="First Name"
                                maxLength="25"
                                required
                            />
                            <label htmlFor="lastName">Last Name</label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                placeholder="Last Name"
                                maxLength="25"
                                required
                            />
                            <label htmlFor="email">E-mail</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Email"
                                maxLength="50"
                                required
                            />
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Password"
                                maxLength="25"
                                required
                            />
                            <label htmlFor="passwordConfirmation">Confirm Password</label>
                            <input
                                type="password"
                                id="passwordConfirmation"
                                name="passwordConfirmation"
                                value={formData.passwordConfirmation}
                                onChange={handleChange}
                                placeholder="Confirm Password"
                                maxLength="25"
                                required
                            />
                            <label htmlFor="mobileNumber">Mobile Number</label> {/* Added mobile number input */}
                            <input
                                type="text"
                                id="mobileNumber"
                                name="mobileNumber"
                                value={formData.mobileNumber}
                                onChange={handleChange}
                                placeholder="Mobile Number"
                                maxLength="10" // Added maximum length constraint
                                required
                            />
                        </InputSection>
                        <ButtonContainer>
                            <SubmitButton type="submit">Register</SubmitButton>
                        </ButtonContainer>
                        <div>Want to see all registered users?{" "} <StyledLink to="/all-users">View all users</StyledLink></div>
                    </form>
                </FormContainer>
            </RegisterContainer>
        </PageContainer>
    );
};

export default Form;
