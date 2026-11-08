'use client';

import React, {useEffect, useRef, useState, useMemo} from 'react';
import * as d3 from 'd3';
import {
  Compass,
  Scroll,
  Shield,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Award,
  Layers,
} from 'lucide-react';
import {AgeRangeFilter} from '@/components/MilestoneMenu';

export interface MilestoneStageData {
  id: '3-7' | '8-12' | '13-18';
  name: string;
  ageScope: string;
  horizonTitle: string;
  yearsSpan: string;
  description: string;
  targetPercent: number; // 0-100 base milestone arc
  currentProgress: number; // 0-100 actual computed progress
  color: string;
  darkColor: string;
  trackColor: string;
  darkTrackColor: string;
  icon: typeof Compass;
  studiosCount: number;
  celebratedCount: number;
}

interface MilestoneOverviewSummaryProps {
  selectedRange: AgeRangeFilter;
  onSelectRange: (range: AgeRangeFilter) => void;
  celebratedMilestones?: Record<string, boolean>;
  onTriggerCelebration?: (stageId: '3-7' | '8-12' | '13-18') => void;
}

export default function MilestoneOverviewSummary({
  selectedRange,
  onSelectRange,
  celebratedMilestones = {},
  onTriggerCelebration,
}: MilestoneOverviewSummaryProps) {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [hoveredStageId, setHoveredStageId] = useState<string | null>(null);

  // Compute live stage progress based on developmental horizon and celebrated milestones
  const stagesData = useMemo<MilestoneStageData[]>(() => {
    // 3-7 cards: tiers (Stage 1 primary), growth-tracker, bible-study-studio
    const stage1Celebrated =
      (celebratedMilestones['tiers'] ? 1 : 0) +
      (celebratedMilestones['growth-tracker'] ? 1 : 0) +
      (celebratedMilestones['bible-study-studio'] ? 1 : 0);
    // Base 60% + up to 40% based on celebrations
    const stage1Progress = Math.min(100, Math.round(55 + (stage1Celebrated / 3) * 45));

    // 8-12 cards: ancient-archive (Stage 2 primary), semantic-search, timeline
    const stage2Celebrated =
      (celebratedMilestones['ancient-archive'] ? 1 : 0) +
      (celebratedMilestones['semantic-search'] ? 1 : 0) +
      (celebratedMilestones['timeline'] ? 1 : 0);
    const stage2Progress = Math.min(100, Math.round(45 + (stage2Celebrated / 3) * 55));

    // 13-18 cards: safe-harbor (Stage 3 primary), parent-portal
    const stage3Celebrated =
      (celebratedMilestones['safe-harbor'] ? 1 : 0) +
      (celebratedMilestones['parent-portal'] ? 1 : 0);
    const stage3Progress = Math.min(100, Math.round(35 + (stage3Celebrated / 2) * 65));

    return [
      {
        id: '3-7',
        name: 'Childhood Sanctuary',
        ageScope: 'Ages 3–7',
        horizonTitle: 'Stage 01 · Bedtime, Wonder & Calm',
        yearsSpan: 'Years 1–5 Horizon',
        description: '2100K circadian storytelling, whispered wonder questions, and nervous-system grounding.',
        targetPercent: 33,
        currentProgress: stage1Progress,
        color: '#D97706', // Warm Amber
        darkColor: '#F59E0B',
        trackColor: '#FDE68A',
        darkTrackColor: '#451A03',
        icon: Compass,
        studiosCount: 3,
        celebratedCount: stage1Celebrated,
      },
      {
        id: '8-12',
        name: 'Tween Archive',
        ageScope: 'Ages 8–12',
        horizonTitle: 'Stage 02 · Historical Discovery & Root Ciphers',
        yearsSpan: 'Years 6–10 Horizon',
        description: 'Near Eastern archaeological maps, Hebrew/Greek roots, and concrete historical evidence.',
        targetPercent: 66,
        currentProgress: stage2Progress,
        color: '#10B981', // Sage Emerald
        darkColor: '#34D399',
        trackColor: '#A7F3D0',
        darkTrackColor: '#064E3B',
        icon: Scroll,
        studiosCount: 3,
        celebratedCount: stage2Celebrated,
      },
      {
        id: '13-18',
        name: 'Adolescent Harbor',
        ageScope: 'Ages 13–18',
        horizonTitle: 'Stage 03 · Safe Harbor & Raw Inquiry',
        yearsSpan: 'Years 11–15 Horizon',
        description: 'Zero-knowledge encrypted journaling, ancient laments collision, and peer seminar tables.',
        targetPercent: 100,
        currentProgress: stage3Progress,
        color: '#3B82F6', // Deep Twilight Lapis
        darkColor: '#60A5FA',
        trackColor: '#BFDBFE',
        darkTrackColor: '#1E3A8A',
        icon: Shield,
        studiosCount: 2,
        celebratedCount: stage3Celebrated,
      },
    ];
  }, [celebratedMilestones]);

  // Overall combined 15-year developmental progress
  const overallProgress = useMemo(() => {
    const total = stagesData.reduce((acc, s) => acc + s.currentProgress, 0);
    return Math.round(total / stagesData.length);
  }, [stagesData]);

  // D3 concentric ring chart rendering
  useEffect(() => {
    const svgEl = svgRef.current;
    if (!svgEl) return;

    const width = 230;
    const height = 230;
    const centerX = width / 2;
    const centerY = height / 2;

    const svg = d3.select(svgEl);
    svg.selectAll('*').remove();

    const g = svg
      .append('g')
      .attr('transform', `translate(${centerX}, ${centerY})`);

    // Ring specifications: [Stage 1 Inner, Stage 2 Middle, Stage 3 Outer]
    // 3 rings: inner (r: 54-66), middle (r: 72-84), outer (r: 90-102)
    const ringRadii = [
      {inner: 54, outer: 66}, // Stage 1: 3-7
      {inner: 72, outer: 84}, // Stage 2: 8-12
      {inner: 90, outer: 102}, // Stage 3: 13-18
    ];

    stagesData.forEach((stage, idx) => {
      const radius = ringRadii[idx];
      const isSelected = selectedRange === stage.id;
      const isHovered = hoveredStageId === stage.id;
      const highlight = isSelected || isHovered;

      // Background Track (360 degrees)
      const bgArc = d3
        .arc()
        .innerRadius(radius.inner)
        .outerRadius(radius.outer)
        .startAngle(0)
        .endAngle(2 * Math.PI)
        .cornerRadius(6);

      g.append('path')
        .attr('d', bgArc as unknown as string)
        .attr('fill', stage.color)
        .attr('opacity', 0.12)
        .attr('class', 'transition-opacity duration-300');

      // Active Progress Arc
      const progressAngle = (stage.currentProgress / 100) * 2 * Math.PI;

      const progressArc = d3
        .arc()
        .innerRadius(radius.inner)
        .outerRadius(radius.outer)
        .startAngle(0)
        .endAngle(progressAngle)
        .cornerRadius(6);

      const path = g
        .append('path')
        .attr('d', progressArc as unknown as string)
        .attr('fill', stage.color)
        .attr('opacity', highlight ? 1 : 0.88)
        .attr('stroke', highlight ? '#FFFFFF' : 'none')
        .attr('stroke-width', highlight ? 1.5 : 0)
        .attr('cursor', 'pointer')
        .attr('class', 'transition-all duration-300 hover:opacity-100');

      // Click & Hover interactions
      path
        .on('mouseenter', () => setHoveredStageId(stage.id))
        .on('mouseleave', () => setHoveredStageId(null))
        .on('click', () => {
          onSelectRange(stage.id);
          onTriggerCelebration?.(stage.id);
        });
    });

    // Outer subtle dashed guideline circle
    g.append('circle')
      .attr('r', 108)
      .attr('fill', 'none')
      .attr('stroke', '#D97706')
      .attr('stroke-width', 1)
      .attr('stroke-dasharray', '3,4')
      .attr('opacity', 0.25);
  }, [stagesData, selectedRange, hoveredStageId, onSelectRange, onTriggerCelebration]);

  const activeFocusStage = stagesData.find(
    (s) => s.id === (hoveredStageId || selectedRange)
  );

  return (
    <div className="w-full rounded-2xl bg-[#FAF7F2] dark:bg-[#24211E] border border-[#E5DEC9] dark:border-[#36312E] p-6 sm:p-7 shadow-xs space-y-6">
      {/* Top Banner Header: Explains the 3-Tier Multi-Ring Architecture */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#E5DEC9] dark:border-[#36312E]">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider font-semibold text-[#92400E] dark:text-[#FBBF24]">
            <Award className="w-4 h-4 text-[#D97706]" />
            <span>Developmental Journey Milestone Overview</span>
            <span aria-hidden="true">·</span>
            <span>All 3 Life Stages</span>
          </div>
          <h3
            className="text-xl sm:text-2xl font-bold tracking-tight text-[#1C1917] dark:text-[#F9F6F0]"
            style={{fontFamily: 'var(--font-display), serif'}}
          >
            Combined 15-Year Milestone Progress Ring
          </h3>
          <p className="text-xs sm:text-sm text-[#57534E] dark:text-[#A8A29E] max-w-2xl leading-relaxed">
            A combined multi-tier D3 visualization tracking childhood wonder, tween historical inquiry, and teen theological resilience in a unified concentric arc.
          </p>
        </div>

        {/* Quick Reset to All Horizons */}
        <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
          <button
            type="button"
            onClick={() => onSelectRange('all')}
            className={`min-h-[36px] px-3.5 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
              selectedRange === 'all'
                ? 'bg-[#1C1917] text-[#FAF7F2] border-[#1C1917] dark:bg-[#FAF7F2] dark:text-[#1C1917]'
                : 'bg-white dark:bg-[#1C1917] text-[#57534E] dark:text-[#A8A29E] border-[#E5DEC9] dark:border-[#36312E] hover:border-[#D97706]'
            }`}
          >
            View All Horizons (15-Year Arc)
          </button>
        </div>
      </div>

      {/* Main Grid: D3 Ring Chart (Left) & 3 Stage Horizon Cards (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* D3 Multi-Ring Concentric Chart Container */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center p-5 rounded-xl bg-white/70 dark:bg-[#1C1917]/70 border border-[#E5DEC9] dark:border-[#36312E] relative min-h-[260px]">
          <div className="relative w-[230px] h-[230px] flex items-center justify-center">
            <svg
              ref={svgRef}
              viewBox="0 0 230 230"
              className="w-full h-full select-none"
              aria-label="D3 Concentric Multi-Ring Progress Chart"
            />

            {/* Central Readout: Cumulative Progress & Active Stage Horizon */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center px-4">
              <span className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1C1917] dark:text-[#F9F6F0]">
                {activeFocusStage ? `${activeFocusStage.currentProgress}%` : `${overallProgress}%`}
              </span>
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#92400E] dark:text-[#FBBF24] font-semibold mt-0.5">
                {activeFocusStage ? activeFocusStage.ageScope : '15-Year Arc'}
              </span>
              <span className="text-[10px] text-[#57534E] dark:text-[#A8A29E] mt-0.5 max-w-[90px] truncate">
                {activeFocusStage ? activeFocusStage.name : 'Cumulative Path'}
              </span>
            </div>
          </div>

          {/* D3 Legend beneath chart */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3 pt-3 border-t border-[#E5DEC9] dark:border-[#36312E] w-full text-[11px] font-mono">
            {stagesData.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => {
                  onSelectRange(s.id);
                  onTriggerCelebration?.(s.id);
                }}
                className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-md transition-colors cursor-pointer ${
                  selectedRange === s.id
                    ? 'bg-[#1C1917] text-white dark:bg-[#FAF7F2] dark:text-[#1C1917] font-semibold'
                    : 'text-[#57534E] dark:text-[#A8A29E] hover:text-[#1C1917] dark:hover:text-white'
                }`}
              >
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{backgroundColor: s.color}}
                />
                <span>{s.ageScope}</span>
                <span className="opacity-70 font-bold">{s.currentProgress}%</span>
              </button>
            ))}
          </div>
        </div>

        {/* 3 Stage Breakdown Cards (Right) */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          {stagesData.map((stage) => {
            const Icon = stage.icon;
            const isSelected = selectedRange === stage.id;
            return (
              <div
                key={stage.id}
                onClick={() => {
                  onSelectRange(stage.id);
                  onTriggerCelebration?.(stage.id);
                }}
                onMouseEnter={() => setHoveredStageId(stage.id)}
                onMouseLeave={() => setHoveredStageId(null)}
                className={`p-4 rounded-xl border flex flex-col justify-between space-y-3.5 transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-white dark:bg-[#1C1917] border-[#D97706] ring-2 ring-[#D97706]/40 shadow-sm'
                    : 'bg-white/80 dark:bg-[#1C1917]/80 border-[#E5DEC9] dark:border-[#36312E] hover:border-[#D97706]/70 hover:bg-white dark:hover:bg-[#1C1917]'
                }`}
              >
                <div className="space-y-2.5">
                  {/* Top Badge Row */}
                  <div className="flex items-center justify-between gap-2">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                      style={{
                        backgroundColor: `${stage.color}15`,
                        color: stage.color,
                        border: `1px solid ${stage.color}35`,
                      }}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <span
                      className="text-[10px] font-mono uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full"
                      style={{
                        backgroundColor: `${stage.color}18`,
                        color: stage.color,
                        border: `1px solid ${stage.color}30`,
                      }}
                    >
                      {stage.ageScope}
                    </span>
                  </div>

                  {/* Stage Name & Horizon */}
                  <div>
                    <h4
                      className="text-base font-semibold text-[#1C1917] dark:text-[#F9F6F0] leading-snug"
                      style={{fontFamily: 'var(--font-display), serif'}}
                    >
                      {stage.name}
                    </h4>
                    <div className="text-[10.5px] font-mono text-[#92400E] dark:text-[#FBBF24] mt-0.5">
                      {stage.yearsSpan}
                    </div>
                  </div>

                  <p className="text-xs text-[#57534E] dark:text-[#A8A29E] leading-relaxed line-clamp-2">
                    {stage.description}
                  </p>
                </div>

                {/* Progress Mini Bar & Select Action */}
                <div className="space-y-2 pt-2 border-t border-[#E5DEC9] dark:border-[#36312E]">
                  <div className="flex items-center justify-between text-[10.5px] font-mono">
                    <span className="text-[#57534E] dark:text-[#A8A29E]">Milestone Arc</span>
                    <span className="font-bold" style={{color: stage.color}}>
                      {stage.currentProgress}%
                    </span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-[#E5DEC9] dark:bg-[#36312E] overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${stage.currentProgress}%`,
                        backgroundColor: stage.color,
                      }}
                    />
                  </div>

                  <div className="flex items-center justify-between pt-1 text-[11px] font-semibold text-[#1C1917] dark:text-[#F9F6F0]">
                    <span>{isSelected ? 'Active Horizon' : 'Inspect Horizon'}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#D97706]" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
