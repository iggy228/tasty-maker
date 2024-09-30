import { mount } from '@vue/test-utils';
import SearchBar from '../../src/components/SearchBar.vue';
import { expect, test, describe, vi } from 'vitest';

describe('SearchBar component', () => {
  // setup mocks
  vi.mock('loadash/debounce', () => vi.fn((fn) => fn));

  test('Display searchBar with empty input', () => {
    const wrapper = mount(SearchBar, {
      props: {}
    });

    const input = wrapper.find('input');

    expect(input.element.value).toBe('');
  });
  test('Display searchBar with input with "abc"', async () => {
    const wrapper = mount(SearchBar, {
      props: {
        debounceTime: 100
      }
    });

    const input = wrapper.find('input');

    input.setValue('abc');

    expect(input.element.value).toBe('abc');

    // check if event emitted
    await new Promise((r) => setTimeout(r, 100));
    expect(wrapper.emitted()).toHaveProperty('update:modelValue');
    const modelValueEvents = wrapper.emitted('update:modelValue');
    expect(modelValueEvents?.[0]).toEqual(['abc']);
  });
  test('Display searchBar with input with "abc" with emitted event search', () => {
    const wrapper = mount(SearchBar, {
      props: {
        debounceTime: 100
      },
      slots: {
        default: 'Hello'
      }
    });

    const input = wrapper.find('input');
    const button = wrapper.find('button');

    input.setValue('abc');

    expect(input.element.value).toBe('abc');

    button.element.click();

    expect(wrapper.emitted()).toHaveProperty('search');
    expect(wrapper.emitted('search')?.[0]).toEqual(['abc']);
  });
});
