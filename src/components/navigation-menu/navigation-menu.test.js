import NavigationMenu from 'components/navigation-menu/navigation-menu';
import { render } from 'test-utils';
import { fireEvent, screen } from '@testing-library/react';
import { getStoreValue, setStoreValue, storageKeys } from 'utils/store';

test('it navigates and logs out', () => {
  const { history } = render(<NavigationMenu />);

  // test clicking navigation buttons changes route
  fireEvent.click(screen.getByRole('button', { name: /settings/i }));
  expect(history.location.pathname).toBe('/settings');

  fireEvent.click(screen.getByRole('button', { name: /dashboard/i }));
  expect(history.location.pathname).toBe('/dashboard');

  // test logout
  setStoreValue(storageKeys.isLoggedIn, 'x');
  fireEvent.click(screen.getByRole('button', { name: /logout/i }));
  expect(getStoreValue(storageKeys.isLoggedIn)).toBeUndefined();
});
