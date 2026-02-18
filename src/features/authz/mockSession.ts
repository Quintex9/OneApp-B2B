import { AppRole } from './permissions';

export type MockSession = {
  userName: string;
  businessName: string;
  role: AppRole;
};

export const DEFAULT_MOCK_SESSION: MockSession = {
  userName: 'Demo User',
  businessName: 'OneApp Partner',
  role: 'owner',
};

