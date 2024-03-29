import { useToast } from '@chakra-ui/react';
import NextError from 'next/error';
import { useRouter } from 'next/router';
import React, { ReactElement } from 'react';

import { Sponsors } from '../../Events/graphql/queries';
import { DashboardLayout } from '../../shared/components/DashboardLayout';
import { DashboardLoading } from '../../shared/components/DashboardLoading';
import SponsorForm, { SponsorFormData } from '../components/SponsorForm';
import { useCreateSponsorMutation } from '../../../../generated/graphql';
import { checkInstancePermission } from '../../../../util/check-permission';
import { NextPageWithLayout } from '../../../../pages/_app';
import { Permission } from '../../../../../../common/permissions';
import { useUser } from '../../../auth/user';

const NewSponsorPage: NextPageWithLayout = () => {
  const router = useRouter();
  const [createSponsor] = useCreateSponsorMutation({
    refetchQueries: [{ query: Sponsors }],
  });
  const { user, loadingUser } = useUser();

  const hasPermissionToCreateSponsor = checkInstancePermission(
    user,
    Permission.SponsorManage,
  );

  const toast = useToast();
  const onSubmit = async (data: SponsorFormData) => {
    const { data: sponsorData, errors } = await createSponsor({
      variables: {
        data,
      },
    });

    if (errors) throw errors;
    if (sponsorData) {
      await router.replace('/dashboard/sponsors');
      toast({
        title: `Sponsor "${sponsorData.createSponsor.name}" created!`,
        status: 'success',
      });
    }
  };

  if (loadingUser) return <DashboardLoading />;
  if (!hasPermissionToCreateSponsor)
    return <NextError statusCode={403} title="Access denied" />;

  return (
    <SponsorForm
      onSubmit={onSubmit}
      submitText="Add New Sponsor"
      loadingText="Adding New Sponsor"
    />
  );
};

export { NewSponsorPage };

NewSponsorPage.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
