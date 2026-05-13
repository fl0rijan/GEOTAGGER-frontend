import {useState} from 'react';
import {useLoginMutation, usePerformLogoutMutation} from '../../store/api/authApi';
import {useAppSelector} from '../../store/hooks';
import {Button, Form, Alert, Card} from 'react-bootstrap';
import * as React from "react";

export const LoginTest = () => {
    const [email, setEmail] = useState('user@gmail.com');
    const [password, setPassword] = useState('password123');

    const {user, token, isAuthenticated} = useAppSelector((state) => state.auth);

    const [login, {isLoading}] = useLoginMutation();
    const [logout] = usePerformLogoutMutation();

    const handleLogin = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await login({email, password}).unwrap();
        } catch (err) {
            console.error("Login test failed:", err);
        }
    };

    const handleSocialLogin = (provider: 'google' | 'facebook') => {
        window.location.href = `${import.meta.env.VITE_API_URL}/${provider}`;
    };

    return (
        <Card className="shadow-sm border-0 rounded-4 overflow-hidden">
            <Card.Header className="bg-primary text-white fw-bold border-0">
                Auth Test
            </Card.Header>
            <Card.Body className="p-4">
                <div className="mb-4">
                    <h6 className="text-muted small uppercase fw-bold mb-3">Redux Auth State</h6>
                    <div className="p-3 bg-light rounded-3 font-monospace small">
                        <p className="mb-1"><strong>Authenticated:</strong> {isAuthenticated ? 'YES' : 'NO'}</p>
                        <p className="mb-1">
                            <strong>User:</strong> {user ? `${user.firstName} ${user.lastName}` : 'null'}</p>
                        <p className="mb-1"><strong>Points:</strong> {user?.gamePoints ?? 'n/a'}</p>
                        <img src={user?.image} alt="Users image" className={"w-10 rounded-circle"}/>
                        <p className="mb-0 text-truncate">
                            <strong>Token:</strong> {token ? `${token.substring(0, 20)}...` : 'null'}</p>
                    </div>
                </div>

                {!isAuthenticated ? (
                    <Form onSubmit={handleLogin}>
                        <Form.Group className="mb-3">
                            <Form.Label className="small fw-bold">Email</Form.Label>
                            <Form.Control
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter email"
                            />
                        </Form.Group>
                        <Form.Group className="mb-4">
                            <Form.Label className="small fw-bold">Password</Form.Label>
                            <Form.Control
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>
                        <Button
                            variant="secondary"
                            type="submit"
                            className="w-100 fw-bold py-2 rounded-3"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Chaining Requests...' : 'Test Login Chain'}
                        </Button>
                        <div className="d-flex flex-column gap-2">
                            <Button variant="outline-dark" onClick={() => handleSocialLogin('google')}>
                                Continue with Google
                            </Button>
                            <Button variant="outline-primary" onClick={() => handleSocialLogin('facebook')}>
                                Continue with Facebook
                            </Button>
                        </div>
                    </Form>
                ) : (
                    <>
                        <Alert variant="success" className="mb-0 rounded-3">
                            Success! Profile loaded and tokens stored.
                        </Alert>
                        <Button
                            type="button"
                            className="w-100 fw-bold py-2 rounded-3"
                            disabled={isLoading}
                            onClick={async () => await logout().unwrap()}
                        >
                            {isLoading ? 'Logging out' : 'Logout and Clear Tokens'}
                        </Button>
                    </>
                )}
            </Card.Body>
        </Card>
    );
};