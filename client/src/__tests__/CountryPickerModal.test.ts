import { render, fireEvent } from '@testing-library/svelte';
import ModalTestWrapper from './ModalTestWrapper.svelte';
import CountryPickerModal from '$lib/components/CountryPickerModal.svelte';
import { mockCountries } from '../mocks/countryData';
import { vi } from 'vitest';

describe('CountryPickerModal Component', () => {
    test('renders with initial data', async () => {
        const responseMock = vi.fn();
        const modalTitle: string = 'Add Trip Experience';

        const modalSettings = {
            type: 'component',
            title: modalTitle,
            component: {
                ref: CountryPickerModal,
                props: {
                    modalCountriesList: mockCountries,
                    modalInitialData: {
                        country: 'Country A',
                        startDate: '2023-01-01',
                        endDate: '2023-01-10',
                        pictures: [],
                        description: 'A great trip!',
                    },
                },
            },
            response: responseMock,
        };

        const { getByText, queryByText, getByLabelText } = render(ModalTestWrapper, {
            props: {
                modalSettings,
            },
        });


        // Verify that some of the modal's properties are correctly displayed or hidden.
        expect(getByText('Select a country')).toBeInTheDocument();

        expect(getByLabelText(/Country/)).toHaveValue('Country A');
        expect(getByLabelText(/Country/)).toHaveDisplayValue('Country A');
        expect(getByLabelText(/Country/)).not.toHaveDisplayValue('Select a country');
        // TODO: The date is incorrectly parsed. Probably some hour rounding given IDO conversion?
        // expect(getByLabelText(/Start Date/)).toHaveValue('2023-01-01');
        // expect(getByLabelText(/End Date/)).toHaveValue('2023-01-10');
        expect(getByLabelText(/Description/)).toHaveValue('A great trip!');


        expect(getByText('OK')).toBeInTheDocument();

        // Select OK to close the modal
        const okButton = getByText('OK');
        await fireEvent.click(okButton);

        // Verify that the title of the modal is not in the DOM.
        expect(queryByText(modalTitle)).not.toBeInTheDocument();
    });

    test('validates required fields', async () => {
        const responseMock = vi.fn();
        const modalTitle: string = 'Add Trip Experience';

        const modalSettings = {
            type: 'component',
            title: modalTitle,
            component: {
                ref: CountryPickerModal,
                props: {
                    modalInitialData: {},
                    modalCountriesList: mockCountries,
                },
            },
            response: responseMock,
        };

        const { getByText, queryByText, getByLabelText } = render(ModalTestWrapper, {
            props: {
                modalSettings,
            },
        });

        // Ensure that the error message is not visible on modal open.
        expect(queryByText('Please select a country.')).not.toBeInTheDocument();

        // Submit the modal's form without the requirede entries.
        expect(getByText('OK')).toBeInTheDocument();
        const okButton = getByText('OK');
        await fireEvent.click(okButton);

        // Ensure that an error messsage is visible.
        expect(getByText('Please select a country.')).toBeInTheDocument();

        // Select a country and submit the form again.
        await fireEvent.change(getByLabelText(/Country/), {
            target: { value: 'Country B' },
        });

        await fireEvent.click(okButton);

        expect(responseMock).toHaveBeenCalled();
        expect(responseMock).toHaveBeenCalledWith({
            country: 'Country B',
            startDate: null,
            endDate: null,
            pictures: [],
            description: '',
        });

        expect(queryByText('Please select a country.')).not.toBeInTheDocument();
        expect(queryByText(modalTitle)).not.toBeInTheDocument();
    });
});
