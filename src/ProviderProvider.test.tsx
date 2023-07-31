import { render } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { ProviderProvider } from '../dist';
import * as Mock from './mocks';

const allProviders = [Mock.Provider1, Mock.Provider2, Mock.Provider3];

it('should render providers with children', () => {
  const { getByText } = render(
    <ProviderProvider providers={allProviders}>render me!</ProviderProvider>
  );
  expect(getByText('render me!')).toBeTruthy();
});

it('should only rerender consumers for the correct context', () => {
  const spy1 = vi.spyOn(Mock, 'Consumer1');
  const spy2 = vi.spyOn(Mock, 'Consumer2');
  const spy3 = vi.spyOn(Mock, 'Consumer3');
  const { getByTestId } = render(
    <ProviderProvider providers={allProviders}>
      <Mock.Consumer1 />
      <Mock.Consumer2 />
      <Mock.Consumer3 />
    </ProviderProvider>
  );
  expect(spy1).toHaveBeenCalledTimes(1);
  expect(spy2).toHaveBeenCalledTimes(1);
  expect(spy3).toHaveBeenCalledTimes(1);

  const button = getByTestId('button2');
  act(() => {
    button.click();
    button.click();
  });

  expect(spy1).toHaveBeenCalledTimes(1);
  expect(spy2).toHaveBeenCalledTimes(2);
  expect(spy3).toHaveBeenCalledTimes(1);

  act(() => {
    button.click();
  });

  expect(spy1).toHaveBeenCalledTimes(1);
  expect(spy2).toHaveBeenCalledTimes(3);
  expect(spy3).toHaveBeenCalledTimes(1);
});
