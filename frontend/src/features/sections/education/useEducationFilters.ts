import { useMemo, useState } from 'react';

import {
  filterAndSortEducation,
  type EducationSortOption,
} from './educationFilterUtils';
import type { EducationItem } from '../sections.types';

export const useEducationFilters = (items: EducationItem[]) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [sortBy, setSortBy] = useState<EducationSortOption>('default');

  const filteredItems = useMemo(
    () => filterAndSortEducation(items, searchQuery, selectedType, selectedStatus, sortBy),
    [items, searchQuery, selectedType, selectedStatus, sortBy]
  );

  const hasActiveFilters = Boolean(
    searchQuery.trim() || selectedType || selectedStatus || sortBy !== 'default'
  );

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedType('');
    setSelectedStatus('');
    setSortBy('default');
  };

  return {
    searchQuery,
    setSearchQuery,
    selectedType,
    setSelectedType,
    selectedStatus,
    setSelectedStatus,
    sortBy,
    setSortBy,
    filteredItems,
    hasActiveFilters,
    resetFilters,
  };
};
