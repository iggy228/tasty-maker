import { mount } from '@vue/test-utils';
import DropdownBox from '../../src/components/DropdownBox.vue';
import { expect, test, describe } from 'vitest';

describe('Dropdown box component', () => {
  test('Display dropdown box with text "Hello"', () => {
    const wrapper = mount(DropdownBox, {
      props: {
        show: true
      },
      slots: {
        default: 'Hello'
      }
    });

    expect(wrapper.text()).toBe('Hello');
  });
  test('Not Displaying dropdown box with text "Hello"', () => {
    const wrapper = mount(DropdownBox, {
      props: {
        show: false
      },
      slots: {
        default: 'Hello'
      }
    });

    expect(wrapper.text()).toBe('');
  });
});
