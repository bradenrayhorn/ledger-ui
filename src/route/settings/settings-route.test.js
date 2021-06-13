import { makeNock, render } from 'test-utils';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { getStoreValue, storageKeys } from 'utils/store';
import SettingsRoute from './settings-route';

test('can revoke all sessions', async () => {
  const sessionRequest = makeNock()
    .get('/svc.auth/api/v1/sessions')
    .reply(200, {
      sessions: [
        {
          created_at: '2021-06-13T20:26:35Z',
          identifier: 'X',
          ip: '1.2.3.4',
          last_accessed: '2021-06-13T15:27:01-05:00',
          user_agent: 'Firefox',
        },
      ],
    });
  const revokeRequest = makeNock().post('/svc.auth/api/v1/auth/revoke').reply(200);

  render(<SettingsRoute />);

  fireEvent.click(screen.getByRole('button', { name: /revoke all/i }));

  await waitFor(() => expect(screen.getByRole('button', { name: /revoke all/i })).toBeDisabled());
  await waitFor(() => expect(getStoreValue(storageKeys.isLoggedIn)).toBeFalsy());

  sessionRequest.done();
  revokeRequest.done();
});
