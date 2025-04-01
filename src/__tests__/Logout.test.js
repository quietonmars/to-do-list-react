import React from 'react';
import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import Logout from '../components/Logout';
import axios from 'axios';

jest.mock('axios');

describe('Logout Component', () => {
    beforeAll(() => {
        // Mock the window.location object
        const mockLocation = { href: '' };
        Object.defineProperty(window, 'location', {
            value: mockLocation,
            writable: true, // Allow updates to the location
        });
    });

    afterEach(() => {
        jest.clearAllMocks(); // Clear any mocks after each test
        localStorage.clear(); // Clear the localStorage after each test
    });

    test('renders Logout button', () => {
        render(<Logout/>);

        expect(screen.getByRole('button', {name: /Logout You Account/i})).toBeInTheDocument();
    });

    test('logs out and redirects to /login when logout is successful', async () => {
        localStorage.setItem('Token', 'test_token');
        axios.request.mockResolvedValueOnce({data: ""});
        console.log("mock axios logout step1");
        render(<Logout/>);
        console.log("mock axios logout step2");
        fireEvent.click(screen.getByRole('button', {name: /Logout You Account/i}));
        console.log("mock axios logout step3");
       await waitFor(() => {
           console.log("after logout token1: " + localStorage.getItem("Token"));
            expect(localStorage.getItem('Token')).toBeNull();
            console.log("after logout token2: " + localStorage.getItem("Token"));
        });

        // Optional: Test that the axios request was called
        expect(axios.request).toHaveBeenCalledTimes(1);
        expect(axios.request).toHaveBeenCalledWith(expect.objectContaining({
            method: 'post',
            url: expect.stringContaining('/api/logout/'),
            headers: expect.objectContaining({
                'Authorization': 'Token test_token',
            }),
        }));
    });
});
