// src/components/common/Header/Header.tsx
import { useState } from 'react';
import { SearchInput } from '../ui/SearchInput';
import { Logo } from '../ui/Logo';
import ContentLayout from '../ui/Layout/ContentLayout.';
import { useQueryParams } from '../../hooks/useQueryParams';

export const Header = () => {
  const { getParam, updateParams } = useQueryParams();
  const [searchTerm, setSearchTerm] = useState(() => getParam('q') || '');

  const handleSearch = (value: string) => {
    updateParams({ q: value.trim() });
    setSearchTerm(value.trim());
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
      <ContentLayout>
        <nav className="min-h-18 flex items-start justify-between gap-4 flex-col sm:flex-row sm:items-center">
          <Logo />
          <SearchInput initialValue={searchTerm} onSearch={handleSearch} />
        </nav>
      </ContentLayout>
    </header>
  );
};
