export type AppRole = 'owner' | 'manager' | 'staff';

export type Ability =
  | 'profile.edit'
  | 'offers.create_draft'
  | 'offers.publish'
  | 'pricing.edit_standard'
  | 'pricing.edit_critical'
  | 'reservations.manage';

export const ROLE_LABELS: Record<AppRole, string> = {
  owner: 'Owner',
  manager: 'Manager',
  staff: 'Staff',
};

const ROLE_ABILITIES: Record<AppRole, Ability[]> = {
  owner: [
    'profile.edit',
    'offers.create_draft',
    'offers.publish',
    'pricing.edit_standard',
    'pricing.edit_critical',
    'reservations.manage',
  ],
  manager: [
    'profile.edit',
    'offers.create_draft',
    'offers.publish',
    'pricing.edit_standard',
    'reservations.manage',
  ],
  staff: ['offers.create_draft', 'reservations.manage'],
};

export function can(role: AppRole, ability: Ability): boolean {
  return ROLE_ABILITIES[role].includes(ability);
}

type PermissionPreview = {
  id: 'profile' | 'offers' | 'pricing' | 'reservations';
  title: string;
  description: string;
  byRole: Record<AppRole, string>;
};

export const PERMISSION_PREVIEW: PermissionPreview[] = [
  {
    id: 'profile',
    title: 'Profil prevadzky',
    description: 'Kontakt, otvaracie hodiny, verejne udaje.',
    byRole: {
      owner: 'Plna editacia',
      manager: 'Plna editacia',
      staff: 'Iba citanie',
    },
  },
  {
    id: 'offers',
    title: 'Ponuky',
    description: 'Draft, publikovanie a ukoncenie kampani.',
    byRole: {
      owner: 'Draft + publish + stop',
      manager: 'Draft + publish + stop',
      staff: 'Iba draft (bez publish)',
    },
  },
  {
    id: 'pricing',
    title: 'Ceny',
    description: 'Bezna zmena cien a kriticke zlavy.',
    byRole: {
      owner: 'Bezne + kriticke zmeny',
      manager: 'Bezne zmeny (kriticke iba po schvaleni)',
      staff: 'Bez pristupu',
    },
  },
  {
    id: 'reservations',
    title: 'Rezervacie',
    description: 'Potvrdenie, check-in, no-show.',
    byRole: {
      owner: 'Plna sprava',
      manager: 'Plna sprava',
      staff: 'Operativna sprava',
    },
  },
];

