import '@testing-library/jest-dom';
import { vi } from 'vitest';
import { initializeStores } from '@skeletonlabs/skeleton';

// Mock the global fetch API
vi.stubGlobal('fetch', vi.fn());

// Mock window.matchMedia
vi.hoisted(() => {
    Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: vi.fn().mockImplementation(query => ({
            matches: false,
            media: query,
            onchange: null,
            addListener: vi.fn(), // deprecated
            removeListener: vi.fn(), // deprecated
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
            dispatchEvent: vi.fn(),
        })),
    })
})

// Initialize Skeleton stores
// initializeStores();
