import { makeNock, render } from 'test-utils';
import { screen, waitFor } from '@testing-library/react';
import UserEmail from './user-email';
import userEvent from '@testing-library/user-event';

test('can update email and clear email', async () => {
  const updateRequest = makeNock().post('/svc.auth/api/v1/me/email').times(2).reply(200);

  render(<UserEmail userEmail="old@email.com" />);

  expect(screen.getByRole('button', { name: /save/i })).toBeDisabled();

  userEvent.clear(screen.getByLabelText('Email'));
  userEvent.type(screen.getByLabelText('Email'), 'new@email.com');
  expect(screen.getByRole('button', { name: /save/i })).toBeEnabled();

  userEvent.click(screen.getByRole('button', { name: /save/i }));
  await waitFor(() => expect(screen.getByText('Email updated')).toBeVisible());

  // check if old email is now saveable
  userEvent.clear(screen.getByLabelText('Email'));
  userEvent.type(screen.getByLabelText('Email'), 'old@email.com');
  expect(screen.getByRole('button', { name: /save/i })).toBeEnabled();

  // clear email
  userEvent.clear(screen.getByLabelText('Email'));
  expect(screen.getByRole('button', { name: /save/i })).toBeEnabled();
  userEvent.click(screen.getByRole('button', { name: /save/i }));
  await waitFor(() => expect(screen.getByText('Email updated')).toBeVisible());

  updateRequest.done();
});

test('can handle email change failure', async () => {
  const updateRequest = makeNock().post('/svc.auth/api/v1/me/email').reply(500);

  render(<UserEmail userEmail="old@email.com" />);

  userEvent.clear(screen.getByLabelText('Email'));
  userEvent.type(screen.getByLabelText('Email'), 'new@email.com');
  expect(screen.getByRole('button', { name: /save/i })).toBeEnabled();

  userEvent.click(screen.getByRole('button', { name: /save/i }));
  await waitFor(() => expect(screen.getByText('Failed to update email')).toBeVisible());

  updateRequest.done();
});
