'use client';

import { useState } from 'react';
import type { AppTab } from '@/types';
import BottomNav from '@/components/BottomNav';
import GuideTab from '@/components/guide/GuideTab';
import ScheduleTab from '@/components/schedule/ScheduleTab';
import StadiumTab from '@/components/stadium/StadiumTab';
import NeighborhoodsTab from '@/components/neighborhoods/NeighborhoodsTab';
import TransitTab from '@/components/transit/TransitTab';
import DayPlannerTab from '@/components/planner/DayPlannerTab';
import TranslateWidget from '@/components/shared/TranslateWidget';

const TAB_COMPONENTS: Record<AppTab, React.FC> = {
  guide:         GuideTab,
  schedule:      ScheduleTab,
  stadium:       StadiumTab,
  neighborhoods: NeighborhoodsTab,
  transit:       TransitTab,
  planner:       DayPlannerTab,
};

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<AppTab>('guide');
  const ActiveTab = TAB_COMPONENTS[activeTab];

  return (
    <div className="relative min-h-screen" style={{ background: '#0A0A0A', color: '#FFF' }}>
      <div className="grid-texture pointer-events-none fixed inset-0 z-0" />

      {/* Top bar with translate */}
      <div
        className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4 py-2"
        style={{ background: '#0A0A0A', borderBottom: '1px solid #1A1A1A' }}
      >
        <div className="label text-[10px] text-zinc-700" style={{ letterSpacing: '0.15em' }}>
          GOLAZO.NYC · WORLD CUP 2026
        </div>
        <TranslateWidget />
      </div>

      {/* Scrollable content — push down below top bar */}
      <main className="relative z-10 mx-auto max-w-3xl content-area" style={{ paddingTop: '44px' }}>
        <ActiveTab />
      </main>

      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}
