import React, { useState } from 'react';
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { setUserToken } from "./userStore";
import axios from "axios";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import Footer from "./Footer";

const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost';
const SERVER_PORT = process.env.SERVER_PORT || 3001;
const defaultTheme = createTheme();

const SignIn = () => {
    const navigate = useNavigate();
    const [validationError, setValidationError] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const username = data.get("username");
        const password = data.get("password");

        // Reset validation error message
        setValidationError("");

        // Validation checks
        if (!username || !password) {
            // Required fields not filled out
            setValidationError("Username and password are required.");
            return;
        }


        try {
            const response = await axios.post(
                `${BASE_URL}:${SERVER_PORT}/user/signin`,
                {
                    username: username,
                    password: password,
                },
                {
                    headers: {
                    },
                }
            );
            setUserToken(response.data.accessToken);
            localStorage.setItem("user", JSON.stringify(response.data.user));
            navigate("/dashboard");
        } catch (error) {
            if (error.response && error.response.status === 401) {
                // Authentication failed
                setValidationError("Invalid username or password.");
            } else {
                // Network error or other server error
                setValidationError("An error occurred. Please try again later.");
            }
        }
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <Box
                    sx={{
                        marginTop: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: "#1976d2" }}>
                        <LockOpenIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        noValidate
                        sx={{ mt: 1 }}
                    >
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Username"
                            name="username"
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Password"
                            name="password"
                            type="password"
                        />
                        {validationError && (
                            <Typography variant="body2" color="error">
                                {validationError}
                            </Typography>
                        )}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item>
                                <Link component={RouterLink} to="/sign-up" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Footer />
            </Container>
        </ThemeProvider>
    );
};

export default SignIn;
