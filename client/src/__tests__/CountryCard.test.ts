import { fireEvent } from '@testing-library/svelte';
import CountryCard from '$lib/components/CountryCard.svelte';
import { vi } from 'vitest';
import { tick } from 'svelte';

import type { CountryCardFormData } from '$lib/types/types';
import { renderWithLayout } from './test-utils';

describe('CountryCard Component', () => {
    const mockCardData: CountryCardFormData = {
        country: 'Country A',
        startDate: '2023-01-01',
        endDate: '2023-01-10',
        pictures: [],
        description: 'A wonderful journey.',
    };

    const onOpenCountryPickerMock = vi.fn();
    const onDeleteCardMock = vi.fn();

    afterEach(() => {
        vi.clearAllMocks();
    });

    test('renders placeholder card when isPlaceholder is true', () => {
        const { getByText, getByRole } = renderWithLayout(CountryCard, {
            componentProps: {
                isPlaceholder: true,
                onOpenCountryPicker: onOpenCountryPickerMock,
                onDeleteCard: onDeleteCardMock,
            },
        });

        expect(getByText('Add a country')).toBeInTheDocument();
        const addButton = getByRole('button');
        expect(addButton).toBeInTheDocument();

        // Simulate clicking the add button
        fireEvent.click(addButton);
        expect(onOpenCountryPickerMock).toHaveBeenCalledWith(1);
    });

    test('renders country card with data when isPlaceholder is false', () => {
        const { getByText } = renderWithLayout(CountryCard, {
            componentProps: {
                isPlaceholder: false,
                key: '1',
                cardData: mockCardData,
                onOpenCountryPicker: onOpenCountryPickerMock,
                onDeleteCard: onDeleteCardMock,
            },
        });

        expect(getByText('Country A')).toBeInTheDocument();
        // expect(getByText('2023-01-01 ⟶ 2023-01-10')).toBeInTheDocument();
    });

    test('toggles expansion when expand button is clicked', async () => {
        const { getByRole, queryByText, getByText } = renderWithLayout(CountryCard, {
            componentProps: {
                isPlaceholder: false,
                key: '1',
                cardData: mockCardData,
                onOpenCountryPicker: onOpenCountryPickerMock,
                onDeleteCard: onDeleteCardMock,
            },
        });

        const expandButton = getByRole('button', { name: /chevron down/i });
        expect(expandButton).toBeInTheDocument();

        // Initially, the expansion area should not be visible
        // expect(queryByText('Memories')).not.toBeInTheDocument();
        expect(queryByText('Trip Report')).not.toBeInTheDocument();

        // Click the expand button
        await fireEvent.click(expandButton);
        await tick();

        // Now, the expansion area should be visible
        // TODO: Picture stuff should be reviewed
        // expect(getByText('Memories')).toBeInTheDocument();
        expect(getByText('Trip Report')).toBeInTheDocument();
    });

    test('calls onOpenCountryPicker with edit mode when edit button is clicked', async () => {
        const { getByRole, getByLabelText } = renderWithLayout(CountryCard, {
            componentProps: {
                isPlaceholder: false,
                key: '1',
                cardData: mockCardData,
                onOpenCountryPicker: onOpenCountryPickerMock,
                onDeleteCard: onDeleteCardMock,
            },
        });

        const editButton = getByRole('button', { name: /edit/i });
        expect(editButton).toBeInTheDocument();

        await fireEvent.click(editButton);

        expect(onOpenCountryPickerMock).toHaveBeenCalledWith(0, '1');
    });

    test('opens confirmation modal and deletes card when confirmed', async () => {

        const { getByText, getByLabelText, getByRole } = renderWithLayout(CountryCard, {
            componentProps: {
                isPlaceholder: false,
                key: '1',
                cardData: mockCardData,
                onOpenCountryPicker: onOpenCountryPickerMock,
                onDeleteCard: onDeleteCardMock,
            },
        });

        const deleteButton = getByRole('button', { name: /minus/i });
        expect(deleteButton).toBeInTheDocument();

        await fireEvent.click(deleteButton);

        expect(getByLabelText('Please Confirm')).toBeInTheDocument();
        expect(getByText('Are you sure you want to delete this trip report?')).toBeInTheDocument();

        // Simulate the user confirming the deletion
        const confirmButton = getByRole('button', { name: 'Confirm' });
        expect(confirmButton).toBeInTheDocument();

        await fireEvent.click(confirmButton);

        // Verify that onDeleteCard was called with the correct id
        expect(onDeleteCardMock).toHaveBeenCalledWith('1');
    });
});
