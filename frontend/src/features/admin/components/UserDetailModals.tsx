import type { FC } from 'react';

import { DeleteUserModal } from './DeleteUserModal';
import { RevokeLinksModal } from './RevokeLinksModal';
import { UserStatusModal } from './UserStatusModal';
import type { useAdminUserMutations } from '../useAdminUserDetail';

interface ModalsProps {
  userEmail: string;
  userStatus: 'active' | 'suspended';
  statusOpen: boolean;
  onCloseStatus: () => void;
  revokeOpen: boolean;
  onCloseRevoke: () => void;
  deleteOpen: boolean;
  onCloseDelete: () => void;
  mutations: ReturnType<typeof useAdminUserMutations>;
  onDeleted: () => void;
}

export const UserDetailModals: FC<ModalsProps> = ({
  userEmail,
  userStatus,
  statusOpen,
  onCloseStatus,
  revokeOpen,
  onCloseRevoke,
  deleteOpen,
  onCloseDelete,
  mutations,
  onDeleted,
}) => (
  <>
    <UserStatusModal
      isOpen={statusOpen}
      onClose={onCloseStatus}
      targetStatus={userStatus === 'active' ? 'suspended' : 'active'}
      onConfirm={async (reason) => {
        await mutations.statusMutation.mutateAsync({
          status: userStatus === 'active' ? 'suspended' : 'active',
          reason,
        });
      }}
      isLoading={mutations.statusMutation.isPending}
    />

    <RevokeLinksModal
      isOpen={revokeOpen}
      onClose={onCloseRevoke}
      onConfirm={async () => {
        await mutations.revokeMutation.mutateAsync();
      }}
      isLoading={mutations.revokeMutation.isPending}
    />

    <DeleteUserModal
      isOpen={deleteOpen}
      onClose={onCloseDelete}
      expectedEmail={userEmail}
      onConfirm={async (confirmEmail) => {
        await mutations.deleteMutation.mutateAsync({ confirmEmail });
        onDeleted();
      }}
      isLoading={mutations.deleteMutation.isPending}
    />
  </>
);
