import React, { useEffect, useState } from 'react';
import { Card, CardBody, Col, Container, Input, Label, Row, Button, Form, FormFeedback, Alert, Spinner } from 'reactstrap';
import ParticlesAuth from "../AuthenticationInner/ParticlesAuth";

//redux
import { useSelector, useDispatch } from "react-redux";

import { Link } from "react-router-dom";
import withRouter from "../../Components/Common/withRouter";
// Formik validation
import * as Yup from "yup";
import { useFormik } from "formik";

// actions
import { authenticate } from "../../slices/thunks"; // Updated import
import { resetLoginFlag } from "../../slices/thunks"; // Assuming resetLoginFlag is in thunks.js

import logoLight from "../../assets/images/logo-light.png";
import { createSelector } from 'reselect';

const Login = (props) => {
    const dispatch = useDispatch();

    const selectAuthState = (state) => state.auth; // Updated selector
    const authState = createSelector(
        selectAuthState,
        (state) => ({
            token: state.token,
            subscriberID: state.subscriberID,
            error: state.error,
            loading: state.loading,
        })
    );

    const {
        token, subscriberID, error, loading
    } = useSelector(authState);

    const [showPassword, setShowPassword] = useState(false);

    const validation = useFormik({
        enableReinitialize: true,

        initialValues: {
            Username: "developers@codeplayers.in" || '',
            Password: "Dev123" || '',
        },
        validationSchema: Yup.object({
            Username: Yup.string().required("Please Enter Your Username"),
            Password: Yup.string().required("Please Enter Your Password"),
        }),
        onSubmit: (values) => {
            dispatch(authenticate(values)); // Updated dispatch
        }
    });

    useEffect(() => {
        if (token && subscriberID) {
            props.router.navigate("/dashboard"); // Navigate to dashboard on successful login
        }
    }, [token, subscriberID, props.router]);

    useEffect(() => {
        if (error) {
            setTimeout(() => {
                dispatch(resetLoginFlag());
            }, 3000);
        }
    }, [dispatch, error]);

    document.title = "Basic SignIn | Velzon - React Admin & Dashboard Template";
    return (
        <React.Fragment>
            <ParticlesAuth>
                <div className="auth-page-content">
                    <Container>
                        <Row>
                            <Col lg={12}>
                                <div className="text-center mt-sm-5 mb-4 text-white-50">
                                    <div>
                                        <Link to="/" className="d-inline-block auth-logo">
                                            <img src={logoLight} alt="" height="20" />
                                        </Link>
                                    </div>
                                    <p className="mt-3 fs-15 fw-medium">Premium Admin & Dashboard Template</p>
                                </div>
                            </Col>
                        </Row>

                        <Row className="justify-content-center">
                            <Col md={8} lg={6} xl={5}>
                                <Card className="mt-4">
                                    <CardBody className="p-4">
                                        <div className="text-center mt-2">
                                            <h5 className="text-primary">Welcome Back !</h5>
                                            <p className="text-muted">Sign in to continue to Velzon.</p>
                                        </div>
                                        {error && (<Alert color="danger"> {error} </Alert>)}
                                        <div className="p-2 mt-4">
                                            <Form
                                                onSubmit={(e) => {
                                                    e.preventDefault();
                                                    validation.handleSubmit();
                                                    return false;
                                                }}
                                                action="#">

                                                <div className="mb-3">
                                                    <Label htmlFor="Username" className="form-label">Username</Label>
                                                    <Input
                                                        name="Username"
                                                        className="form-control"
                                                        placeholder="Enter username"
                                                        type="text"
                                                        onChange={validation.handleChange}
                                                        onBlur={validation.handleBlur}
                                                        value={validation.values.Username || ""}
                                                        invalid={
                                                            validation.touched.Username && validation.errors.Username ? true : false
                                                        }
                                                    />
                                                    {validation.touched.Username && validation.errors.Username ? (
                                                        <FormFeedback type="invalid">{validation.errors.Username}</FormFeedback>
                                                    ) : null}
                                                </div>

                                                <div className="mb-3">
                                                    <div className="float-end">
                                                        <Link to="/forgot-password" className="text-muted">Forgot password?</Link>
                                                    </div>
                                                    <Label className="form-label" htmlFor="password-input">Password</Label>
                                                    <div className="position-relative auth-pass-inputgroup mb-3">
                                                        <Input
                                                            name="Password"
                                                            value={validation.values.Password || ""}
                                                            type={showPassword ? "text" : "Password"}
                                                            className="form-control pe-5"
                                                            placeholder="Enter Password"
                                                            onChange={validation.handleChange}
                                                            onBlur={validation.handleBlur}
                                                            invalid={
                                                                validation.touched.Password && validation.errors.Password ? true : false
                                                            }
                                                        />
                                                        {validation.touched.Password && validation.errors.Password ? (
                                                            <FormFeedback type="invalid">{validation.errors.Password}</FormFeedback>
                                                        ) : null}
                                                        <button className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted shadow-none" onClick={() => setShowPassword(!showPassword)} type="button" id="password-addon"><i className="ri-eye-fill align-middle"></i></button>
                                                    </div>
                                                </div>

                                                <div className="form-check">
                                                    <Input className="form-check-input" type="checkbox" value="" id="auth-remember-check" />
                                                    <Label className="form-check-label" htmlFor="auth-remember-check">Remember me</Label>
                                                </div>

                                                <div className="mt-4">
                                                    <Button color="success" disabled={loading} className="btn btn-success w-100" type="submit">
                                                        {loading ? <Spinner size="sm" className='me-2'> Loading... </Spinner> : null}
                                                        Sign In
                                                    </Button>
                                                </div>

                                                <div className="mt-4 text-center">
                                                    <div className="signin-other-title">
                                                        <h5 className="fs-13 mb-4 title">Sign In with</h5>
                                                    </div>
                                                    <div>
                                                        <Link
                                                            to="#"
                                                            className="btn btn-primary btn-icon me-1"
                                                            onClick={e => {
                                                                e.preventDefault();
                                                                signIn("facebook");
                                                            }}
                                                        >
                                                            <i className="ri-facebook-fill fs-16" />
                                                        </Link>
                                                        <Link
                                                            to="#"
                                                            className="btn btn-danger btn-icon me-1"
                                                            onClick={e => {
                                                                e.preventDefault();
                                                                signIn("google");
                                                            }}
                                                        >
                                                            <i className="ri-google-fill fs-16" />
                                                        </Link>
                                                        <Button color="dark" className="btn-icon"><i className="ri-github-fill fs-16"></i></Button>{" "}
                                                        <Button color="info" className="btn-icon"><i className="ri-twitter-fill fs-16"></i></Button>
                                                    </div>
                                                </div>
                                            </Form>
                                        </div>
                                    </CardBody>
                                </Card>

                                <div className="mt-4 text-center">
                                    <p className="mb-0">Don't have an account ? <Link to="/register" className="fw-semibold text-primary text-decoration-underline"> Signup </Link> </p>
                                </div>

                            </Col>
                        </Row>
                    </Container>
                </div>
            </ParticlesAuth>
        </React.Fragment>
    );
};

export default withRouter(Login);
