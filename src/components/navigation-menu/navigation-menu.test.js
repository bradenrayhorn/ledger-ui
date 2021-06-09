import NavigationMenu from 'components/navigation-menu/navigation-menu';
import { render } from 'test-utils';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { getStoreValue, setStoreValue, storageKeys } from 'utils/store';
import nock from 'nock';

test('it navigates and logs out', async () => {
  const { history } = render(<NavigationMenu />);

  // test clicking navigation buttons changes route
  fireEvent.click(screen.getByRole('button', { name: /view more options/i }));
  await waitFor(() => expect(screen.getByRole('menuitem', { name: /settings/i })).toBeVisible());
  fireEvent.click(screen.getByRole('menuitem', { name: /settings/i }));
  expect(history.location.pathname).toBe('/settings');

  fireEvent.click(screen.getByRole('link', { name: /dashboard/i }));
  expect(history.location.pathname).toBe('/dashboard');

  const scope = nock('http://x.x').post('/svc.auth/api/v1/auth/logout').reply(200);

  // test logout
  setStoreValue(storageKeys.isLoggedIn, 'x');
  fireEvent.click(screen.getByRole('button', { name: /view more options/i }));
  await waitFor(() => expect(screen.getByRole('menuitem', { name: /sign out/i })).toBeVisible());
  fireEvent.click(screen.getByRole('menuitem', { name: /sign out/i }));

  await waitFor(() => expect(getStoreValue(storageKeys.isLoggedIn)).toBeUndefined());

  scope.done();
});
