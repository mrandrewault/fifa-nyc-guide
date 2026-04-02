'use client';

import { useState } from 'react';
import type { AppTab } from '@/types';
import BottomNav from '@/components/BottomNav';
import GuideTab from '@/components/guide/GuideTab';
import ScheduleTab from '@/components/schedule/ScheduleTab';
import StadiumTab from '@/components/stadium/StadiumTab';
import NeighborhoodsTab from '@/components/neighborhoods/NeighborhoodsTab';
import TransitTab from '@/components/transit/TransitTab';

const TAB_COMPONENTS: Record<AppTab, React.FC> = {
  guide:         GuideTab,
  schedule:      ScheduleTab,
  stadium:       StadiumTab,
  neighborhoods: NeighborhoodsTab,
  transit:       TransitTab,
};

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<AppTab>('guide');
  const ActiveTab = TAB_COMPONENTS[activeTab];

  return (
    <div
      className="relative min-h-screen"
      style={{ background: '#0A0A0A', color: '#FFF' }}
    >
      {/* Grid background texture */}
      <div className="grid-texture pointer-events-none fixed inset-0 z-0" />

      {/* Scrollable content */}
      <main className="relative z-10 mx-auto max-w-3xl content-area">
        <ActiveTab />
      </main>

      {/* Bottom navigation */}
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}
