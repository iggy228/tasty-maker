import { mount } from '@vue/test-utils';
import LoadingSpinner from '../../src/components/LoadingSpinner.vue';
import { expect, test } from 'vitest';

test('display component', () => {
  const wrapper = mount(LoadingSpinner);

  expect(wrapper.text()).toContain('Loading...');
});
