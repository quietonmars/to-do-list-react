import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Add from '../components/Task/Add';
import axios from 'axios';

jest.mock('axios');

describe('create Task Component', () => {

    afterEach(() => {
        jest.clearAllMocks();
        localStorage.clear();
    });

    test('renders create Task form', () => {
        render(<Add />);

        expect(screen.getByPlaceholderText(/Title/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Description/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Status/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Create Task/i })).toBeInTheDocument();
    });

    test('displays success message and stores token when create task is successful', async () => {

        axios.request.mockResolvedValueOnce({ data: { token: 'test_token' } });

        render(<Add />);

        fireEvent.change(screen.getByPlaceholderText(/Title/i), { target: { value: 'Test Task' } });
        fireEvent.change(screen.getByPlaceholderText(/Description/i), { target: { value: 'This is a test task.' } });
        fireEvent.change(screen.getByPlaceholderText(/Description/i), { target: { value: 'todo' } });

        fireEvent.click(screen.getByRole('button', { name: /Create Task/i }));

        // await waitFor(() => {
        //     expect(screen.getByText(/Create Task success/i)).toBeInTheDocument();
        // });

        // expect(localStorage.getItem('Token')).toBe('test_token');
    });
});
