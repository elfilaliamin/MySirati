import { useMemo, useState } from 'react';

import {
  filterAndSortSkills,
  getDistinctCategories,
  type SkillSortOption,
} from './skillFilterUtils';
import type { SkillItem } from '../sections.types';

export const useSkillFilters = (items: SkillItem[]) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [sortBy, setSortBy] = useState<SkillSortOption>('default');

  const categories = useMemo(() => getDistinctCategories(items), [items]);
  const filteredItems = useMemo(
    () => filterAndSortSkills(items, searchQuery, selectedCategory, selectedLevel, sortBy),
    [items, searchQuery, selectedCategory, selectedLevel, sortBy]
  );

  const hasActiveFilters = Boolean(
    searchQuery.trim() || selectedCategory || selectedLevel || sortBy !== 'default'
  );

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setSelectedLevel('');
    setSortBy('default');
  };

  return {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    categories,
    selectedLevel,
    setSelectedLevel,
    sortBy,
    setSortBy,
    filteredItems,
    hasActiveFilters,
    resetFilters,
  };
};
