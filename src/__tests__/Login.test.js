import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login from '../components/Login';
import axios from 'axios';

jest.mock('axios');

describe('Login Component', () => {

    afterEach(() => {
        jest.clearAllMocks();
        localStorage.clear();
    });

    test('renders Login form', () => {
        render(<Login />);

        expect(screen.getByPlaceholderText(/Username/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Login/i })).toBeInTheDocument();
    });

    test('displays success message and stores token when login is successful', async () => {

        axios.request.mockResolvedValueOnce({ data: { token: 'test_token' } });

        Object.defineProperty(window, 'location', {
            value: { href: '' },
            writable: true,
        });
        render(<Login />);

        fireEvent.change(screen.getByPlaceholderText(/Username/i), { target: { value: 'haohan_test_login' } });
        fireEvent.change(screen.getByPlaceholderText(/Password/i), { target: { value: '123456' } });

        fireEvent.click(screen.getByRole('button', { name: /Login/i }));

        await waitFor(() => {
            expect(screen.getByText(/Login success/i)).toBeInTheDocument();
        });

        expect(localStorage.getItem('Token')).toBe('test_token');
    });

    test('redirects to /logout if Token exists in localStorage', () => {
        localStorage.setItem("Token", 'existing_token');

        Object.defineProperty(window, 'location', {
            value: { href: '' },
            writable: true,
        });

        render(<Login />);

        expect(window.location.href).toBe("/logout");
    });
});
