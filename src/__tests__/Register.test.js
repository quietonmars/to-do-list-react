import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Register from '../components/Register'; // Adjust path as needed
import axios from 'axios';
import { MemoryRouter } from 'react-router-dom';

jest.mock('axios');


describe('Register Component', () => {

    beforeEach(() => {
    jest.clearAllMocks();
    });

    test('renders Register form', () => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <Register />
            </MemoryRouter>
        );


        expect(screen.getByLabelText(/Username:/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Email:/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Password:/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Register/i })).toBeInTheDocument();
    });

    test('displays error message when fields are empty', async () => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <Register />
            </MemoryRouter>
        );


        fireEvent.click(screen.getByRole('button', { name: /Register/i }));


        await waitFor(() => {
            expect(screen.getByText(/Please enter all fields/i)).toBeInTheDocument();
        });
    });

    test('calls axios and displays success message on successful registration', async () => {

        axios.request.mockResolvedValueOnce({ data: 'Success' });

        render(
            <MemoryRouter initialEntries={['/']}>
                <Register />
            </MemoryRouter>
        );


        fireEvent.change(screen.getByLabelText(/Username:/i), { target: { value: 'testuser' } });
        fireEvent.change(screen.getByLabelText(/Email:/i), { target: { value: 'testuser@example.com' } });
        fireEvent.change(screen.getByLabelText(/Password:/i), { target: { value: 'password123' } });


        fireEvent.click(screen.getByRole('button', { name: /Register/i }));


        await waitFor(() => {
            expect(screen.getByText(/Register success/i)).toBeInTheDocument();
        });
    });

    test('displays error message when registration fails', async () => {

        axios.request.mockRejectedValueOnce({
            response: { data: 'Registration failed' },
        });

        render(
            <MemoryRouter initialEntries={['/']}>
                <Register />
            </MemoryRouter>
        );


        fireEvent.change(screen.getByLabelText(/Username:/i), { target: { value: 'testuser' } });
        fireEvent.change(screen.getByLabelText(/Email:/i), { target: { value: 'testuser@example.com' } });
        fireEvent.change(screen.getByLabelText(/Password:/i), { target: { value: 'password123' } });


        fireEvent.click(screen.getByRole('button', { name: /Register/i }));


        await waitFor(() => {
            expect(screen.getByText(/Registration failed/i)).toBeInTheDocument();
        });
    });
});
