import React, { forwardRef } from 'react';
import { Helmet } from 'react-helmet';

interface IPageProps {
  children: React.ReactElement;
  title: string;
}
const Page = ({ title, children }: IPageProps): React.ReactElement => {
  return (
    <div>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      {children}
    </div>
  );
};

export default Page;
