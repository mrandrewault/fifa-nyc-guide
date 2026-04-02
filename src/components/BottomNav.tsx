'use client';

import type { AppTab } from '@/types';

const TABS: { id: AppTab; icon: string; label: string; activeColor: string }[] = [
  { id: 'guide',         icon: '🏆', label: 'Guide',     activeColor: '#E8C84A' },
  { id: 'schedule',      icon: '📅', label: 'Matches',   activeColor: '#E8C84A' },
  { id: 'stadium',       icon: '🏟', label: 'Stadium',   activeColor: '#4AB4E8' },
  { id: 'neighborhoods', icon: '🗺', label: 'Areas',     activeColor: '#4AE8A0' },
  { id: 'transit',       icon: '🚇', label: 'Transit',   activeColor: '#E84A8C' },
];

interface BottomNavProps {
  activeTab: AppTab;
  onTabChange: (tab: AppTab) => void;
}

export default function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  return (
    <nav
      className="safe-bottom fixed bottom-0 left-0 right-0 z-40 flex border-t border-zinc-800"
      style={{ background: '#0D0D0D' }}
    >
      {TABS.map(tab => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className="flex flex-1 flex-col items-center gap-1 py-2.5 transition-opacity"
            style={{ opacity: isActive ? 1 : 0.4 }}
          >
            <span className="text-lg leading-none">{tab.icon}</span>
            <span
              className="label text-[9px]"
              style={{ color: isActive ? tab.activeColor : '#888' }}
            >
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
