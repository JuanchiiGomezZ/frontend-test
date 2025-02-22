import { ReactNode } from 'react';

interface ContentLayoutProps {
  children: ReactNode;
}

const ContentLayout = ({ children }: ContentLayoutProps) => {
  return <div className="max-w-[1260px] mx-auto p-4">{children}</div>;
};

export default ContentLayout;
