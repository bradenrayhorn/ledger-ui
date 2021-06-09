import { makeNock, render } from 'test-utils';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { getStoreValue, storageKeys } from 'utils/store';
import LoginRoute from 'route/login/login-route';
import userEvent from '@testing-library/user-event';

test('can login successfully', async () => {
  render(<LoginRoute />);

  userEvent.type(screen.getByLabelText('Username'), 'testing');
  userEvent.type(screen.getByLabelText('Password'), 'secrets');

  fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

  const scope = makeNock()
    .post('/svc.auth/api/v1/auth/login', { username: 'testing', password: 'secrets' })
    .reply(200);

  await waitFor(() => expect(screen.getByRole('button', { name: /sign in/i })).toBeDisabled());
  await waitFor(() => expect(getStoreValue(storageKeys.isLoggedIn)).toBeTruthy());

  scope.done();
});


test('can interact with alert', async () => {
  render(<LoginRoute />);

  userEvent.type(screen.getByLabelText('Username'), 'testing');
  userEvent.type(screen.getByLabelText('Password'), 'secrets');

  fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

  const scope = makeNock()
    .post('/svc.auth/api/v1/auth/login', { username: 'testing', password: 'secrets' })
    .reply(401);

  await waitFor(() => expect(screen.getByRole('alert')).toHaveTextContent("Incorrect username or password."));

  userEvent.click(screen.getByRole('button', {name: /close/i}));

  await waitFor(() => expect(screen.queryByRole('alert')).not.toBeInTheDocument());

  scope.done();
});
