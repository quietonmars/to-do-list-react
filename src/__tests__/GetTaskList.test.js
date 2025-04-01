import React from 'react';
import {render, screen, waitFor} from '@testing-library/react';
import List from '../components/Task/List';  // Adjust the import path as needed
import axios from 'axios';
// import {verifyToken} from 'src/components/CheckLogin';

// Mock the dependencies
jest.mock('axios');
// jest.mock('../components/CheckLogin', () => ({
//     verifyToken: jest.fn()
// }));

describe('List Component', () => {
    // Reset mocks before each test
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders task list after fetching data', async () => {
        // Arrange
        const mockToken = 'mock-token';
        const mockTodoList = [
            {id: 1, title: 'Task 1', description: 'Task 1 description', status: 'todo'},
            {id: 2, title: 'Task 2', description: 'Task 2 description', status: 'in_progress'}
        ];
        const data = {data: mockTodoList};
        console.log(data)
        // Mock the behavior of verifyToken to always return true
        // verifyToken.mockReturnValue(true);

        // Mock the axios request to simulate a successful response
        axios.request.mockResolvedValueOnce(data);

        // Mock localStorage.getItem
        Storage.prototype.getItem = jest.fn(() => mockToken);

        // Act
        render(<List/>);

        // Assert
        await waitFor(() => {
            // Ensure the todo items are rendered
            expect(screen.getByText('Task 1')).toBeInTheDocument();
            expect(screen.getByText('Task 1 description')).toBeInTheDocument();
            expect(screen.getByText('Status: todo')).toBeInTheDocument();
            expect(screen.getByText('Task 2')).toBeInTheDocument();
            expect(screen.getByText('Task 2 description')).toBeInTheDocument();
            expect(screen.getByText('Status: in_progress')).toBeInTheDocument();
        });
    });
});
