import { createContext, useContext, useMemo, useState } from "react";
import type { AppRole } from "../authz/permissions";

type BusinessMember = {
  userId: string;
  name: string;
  email: string;
  role: AppRole;
  status: "active" | "invited" | "disabled";
}

export type BusinessEntity = {
  id: string;
  name: string;
  vertical: "gastro" | "fitness";
  city: string;
  members: BusinessMember[];
}

type Ctx = {
  currentUserId: string;
  activeRole: AppRole;
  inviteMember: (member: Omit<BusinessMember, 'status'>) => void;
  updateMemberRole: (userId: string, role: AppRole) => void;
  setMemberStatus: (userId: string, status: BusinessMember['status']) => void;

  businesses: BusinessEntity[];
  selectedBusinessId: string | null;
  selectedBusiness: BusinessEntity | null;
  switchBusiness: (id: string) => void;
};

const BusinessSessionContext = createContext<Ctx | undefined>(undefined);

const INITIAL: BusinessEntity[] = [
  {
    id: "biz-fitness", name: "365 GYM", vertical: "fitness", city: "Nitra", members: [
      { userId: 'u1', name: 'Mimo', email: 'mimo@oneapp.sk', role: 'owner', status: 'active' },
      { userId: 'u2', name: 'Eva', email: 'eva@oneapp.sk', role: 'manager', status: 'active' },
    ]
  },
  {
    id: "biz-gastro", name: "365 RESTAURANT", vertical: "gastro", city: "Nitra", members: [
      { userId: 'u1', name: 'Mimo', email: 'mimo@oneapp.sk', role: 'owner', status: 'active' },
      { userId: 'u2', name: 'Eva', email: 'eva@oneapp.sk', role: 'manager', status: 'active' },
    ]
  },
];



export function BusinessSessionProvider({ children }: { children: React.ReactNode }) {
  const [selectedBusinessId, setSelectedBusinessId] = useState<string | null>(INITIAL[0].id);
  const [currentUserId] = useState("u1");
  const [businesses, setBusinesses] = useState(INITIAL);

  const inviteMember = (member: Omit<BusinessMember, 'status'>) => {
    if (!selectedBusinessId) return;

    setBusinesses((prev) =>
      prev.map((business) => {
        if (business.id !== selectedBusinessId) return business;

        const exists = business.members.some((m) => m.userId === member.userId);
        if (exists) return business;

        return {
          ...business,
          members: [...business.members, { ...member, status: 'invited' }],
        };
      })
    );
  };

  const updateMemberRole = (userId: string, role: AppRole) => {
    if (!selectedBusinessId) return;

    setBusinesses((prev) =>
      prev.map((business) => {
        if (business.id !== selectedBusinessId) return business;

        return {
          ...business,
          members: business.members.map((member) =>
            member.userId === userId ? { ...member, role } : member
          ),
        };
      })
    );
  };

  const setMemberStatus = (userId: string, status: BusinessMember['status']) => {
    if (!selectedBusinessId) return;

    setBusinesses((prev) =>
      prev.map((business) => {
        if (business.id !== selectedBusinessId) return business;

        return {
          ...business,
          members: business.members.map((member) =>
            member.userId === userId ? { ...member, status } : member
          ),
        };
      })
    );
  };


  const selectedBusiness = useMemo(
    () => businesses.find((b) => b.id === selectedBusinessId) ?? null,
    [businesses, selectedBusinessId]
  );

  const activeRole =
    selectedBusiness?.members.find((m) => m.userId === currentUserId)?.role ?? 'staff';

  const value = {
    currentUserId,
    activeRole,
    inviteMember,
    updateMemberRole,
    setMemberStatus,
    businesses,
    selectedBusinessId,
    selectedBusiness,
    switchBusiness: (id: string) => {
      if (!businesses.some((b) => b.id === id)) return;
      setSelectedBusinessId(id);
    },
  };

  return <BusinessSessionContext.Provider value={value}>{children}</BusinessSessionContext.Provider>;
}

export function useBusinessSession() {
  const ctx = useContext(BusinessSessionContext);
  if (!ctx) throw new Error('useBusinessSession must be used within BusinessSessionProvider');
  return ctx;
}
