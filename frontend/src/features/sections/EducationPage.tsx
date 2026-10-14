import { Award, BookOpen, GraduationCap, MonitorPlay, Plus } from 'lucide-react';
import type { FC } from 'react';
import { useMemo, useState } from 'react';

import { EducationCard } from './components/EducationCard';
import { EducationModal } from './components/EducationModal';
import { SectionHeader } from './components/SectionHeader';
import type { EducationItem, EducationType } from './sections.types';
import { swapAndReorder } from './useReorderHelper';
import { useSection } from './useSections';
import { Button, EmptyState } from '../../components/ui';

type FilterTab = 'all' | 'academic' | 'course' | 'certificate';

export const EducationPage: FC = () => {
  const { items, createItem, updateItem, deleteItem, reorderItems } =
    useSection<EducationItem>('education');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<EducationItem | null>(null);
  const [activeTab, setActiveTab] = useState<FilterTab>('all');
  const [modalInitialType, setModalInitialType] = useState<EducationType>('academic');

  const handleOpenAdd = (type: EducationType = 'academic') => {
    setEditingItem(null);
    setModalInitialType(type);
    setModalOpen(true);
  };

  const handleOpenEdit = (it: EducationItem) => {
    setEditingItem(it);
    setModalOpen(true);
  };

  const handleSave = async (data: Partial<EducationItem>) => {
    if (editingItem) await updateItem({ id: editingItem.id, data });
    else await createItem(data);
  };

  // Filter items based on active tab
  const filteredItems = useMemo(() => {
    if (activeTab === 'all') return items;
    if (activeTab === 'academic') {
      return items.filter((it) => (it.type || 'academic') === 'academic');
    }
    if (activeTab === 'course') {
      return items.filter((it) => it.type === 'course' || it.type === 'bootcamp');
    }
    if (activeTab === 'certificate') {
      return items.filter((it) => it.type === 'certificate');
    }
    return items;
  }, [items, activeTab]);

  const counts = useMemo(() => {
    let academic = 0;
    let course = 0;
    let certificate = 0;
    for (const it of items) {
      const t = it.type || 'academic';
      if (t === 'academic') academic++;
      else if (t === 'course' || t === 'bootcamp') course++;
      else if (t === 'certificate') certificate++;
    }
    return { all: items.length, academic, course, certificate };
  }, [items]);

  const tabs: Array<{ id: FilterTab; label: string; count: number; icon: typeof BookOpen }> = [
    { id: 'all', label: 'All', count: counts.all, icon: BookOpen },
    { id: 'academic', label: 'Degrees', count: counts.academic, icon: GraduationCap },
    { id: 'course', label: 'Courses & Bootcamps', count: counts.course, icon: MonitorPlay },
    { id: 'certificate', label: 'Certifications', count: counts.certificate, icon: Award },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <SectionHeader
        icon={<BookOpen className="h-6 w-6" />}
        title="Education & Certifications"
        subtitle="Academic degrees, online courses (Udemy, Coursera), bootcamps, and certifications."
        actionLabel="Add Education"
        onAction={() => handleOpenAdd(activeTab === 'course' ? 'course' : activeTab === 'certificate' ? 'certificate' : 'academic')}
      />

      {/* Quick Add Shortcut Buttons when items exist */}
      {items.length > 0 && (
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Filter Tabs */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-surface-raised border border-border overflow-x-auto">
            {tabs.map((tab) => {
              const TabIcon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-primary text-white shadow-sm'
                      : 'text-text-muted hover:text-text hover:bg-surface'
                  }`}
                >
                  <TabIcon className="h-3.5 w-3.5" />
                  <span>{tab.label}</span>
                  <span
                    className={`ml-1 text-[11px] px-1.5 py-0.2 rounded-full ${
                      isActive ? 'bg-white/20 text-white' : 'bg-surface text-text-muted'
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Quick add dropdown or secondary buttons */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleOpenAdd('course')}
              leftIcon={<Plus className="h-3.5 w-3.5" />}
            >
              Add Course
            </Button>
          </div>
        </div>
      )}

      {items.length === 0 ? (
        <EmptyState
          icon={<BookOpen className="h-6 w-6 text-primary" />}
          title="No education or courses added yet"
          description="Add your university degrees, online courses (Udemy, Coursera), bootcamps, and certificates to build an AI-ready career profile."
          actionLabel="Add Education"
          onAction={() => handleOpenAdd('academic')}
        />
      ) : filteredItems.length === 0 ? (
        <div className="text-center py-12 px-4 rounded-2xl border border-dashed border-border bg-surface-raised/40">
          <p className="text-sm font-medium text-text-muted">
            No items in this category yet.
          </p>
          <Button
            variant="outline"
            size="sm"
            className="mt-3"
            onClick={() => handleOpenAdd(activeTab === 'course' ? 'course' : activeTab === 'certificate' ? 'certificate' : 'academic')}
            leftIcon={<Plus className="h-3.5 w-3.5" />}
          >
            Add to {activeTab === 'course' ? 'Courses' : activeTab === 'certificate' ? 'Certifications' : 'Degrees'}
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredItems.map((item, idx) => (
            <EducationCard
              key={item.id}
              item={item}
              canMoveUp={activeTab === 'all' && idx > 0}
              canMoveDown={activeTab === 'all' && idx < items.length - 1}
              onMoveUp={() => swapAndReorder(items, idx, 'up', reorderItems)}
              onMoveDown={() => swapAndReorder(items, idx, 'down', reorderItems)}
              onEdit={() => handleOpenEdit(item)}
              onDelete={() => deleteItem(item.id)}
            />
          ))}
        </div>
      )}

      <EducationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        item={editingItem}
        initialType={modalInitialType}
      />
    </div>
  );
};
