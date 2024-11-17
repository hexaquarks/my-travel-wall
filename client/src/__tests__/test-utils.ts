import { render, type RenderResult } from '@testing-library/svelte';
import type { SvelteComponent, ComponentType } from 'svelte';
import TestLayout from './TestLayout.svelte';

type ComponentProps<T> = T extends SvelteComponent<infer Props>
    ? Props
    : Record<string, any>;

interface RenderWithLayoutOptions<T> {
    componentProps?: ComponentProps<T>;
}

export function renderWithLayout<T extends SvelteComponent<any>>(
    ComponentUnderTest: ComponentType<T>,
    options: RenderWithLayoutOptions<T> = {},
) {
    const { componentProps = {} } = options;
    return render(TestLayout, {
        props: {
            ComponentUnderTest,
            componentProps,
        },
    });
}
