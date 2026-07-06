import { Card, fmtMoney } from './cards';

export type Range = '1M' | '3M' | '6M' | '1Y';

export const RANGES: Range[] = ['1M', '3M', '6M', '1Y'];

const COUNT: Record<Range, number> = { '1M': 5, '3M': 13, '6M': 26, '1Y': 52 };
const MONTHS_BACK: Record<Range, number> = { '1M': 1, '3M': 3, '6M': 6, '1Y': 12 };
const MONTH_ABBR = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

// Data snapshot is anchored to Jul 2026 (see cards-data.js), so the x-axis
// labels are computed from that fixed "now" rather than the real clock.
const SNAPSHOT_NOW = new Date(2026, 6, 6);

export interface PriceChart {
  linePoints: string;
  areaPoints: string;
  dotX: number;
  dotY: number;
  yMax: string;
  yMin: string;
  xLabels: string[];
  deltaColor: string;
  deltaLabel: string;
}

// Chart geometry for viewBox 680x240.
const W = 680;
const TOP = 18;
const BOTTOM = 222;

export function computePriceChart(card: Card, range: Range): PriceChart {
  const h = card.history.slice(-COUNT[range]);

  const min = Math.min(...h);
  const max = Math.max(...h);
  const span = max - min || max * 0.1 || 1;
  const lo = min - span * 0.12;
  const hi = max + span * 0.12;
  const pts = h.map((v, i): [number, number] => [
    (i / (h.length - 1)) * W,
    BOTTOM - ((v - lo) / (hi - lo)) * (BOTTOM - TOP),
  ]);
  const linePoints = pts.map((p) => p[0].toFixed(1) + ',' + p[1].toFixed(1)).join(' ');
  const areaPoints = linePoints + ` ${W},240 0,240`;

  const first = h[0];
  const last = h[h.length - 1];
  const pct = ((last - first) / first) * 100;
  const up = pct >= 0;

  const back = MONTHS_BACK[range];
  const xLabels = [0, 1, 2, 3, 4].map((i) => {
    const d = new Date(
      SNAPSHOT_NOW.getFullYear(),
      SNAPSHOT_NOW.getMonth() - back + (back * i) / 4,
      SNAPSHOT_NOW.getDate(),
    );
    return back === 1
      ? MONTH_ABBR[d.getMonth()] + ' ' + Math.max(1, d.getDate())
      : MONTH_ABBR[d.getMonth()] + " '" + String(d.getFullYear()).slice(2);
  });

  return {
    linePoints,
    areaPoints,
    dotX: pts[pts.length - 1][0],
    dotY: pts[pts.length - 1][1],
    yMax: fmtMoney(Math.round(hi)),
    yMin: fmtMoney(Math.max(0, Math.round(lo))),
    xLabels,
    deltaColor: up ? '#1c9e4f' : '#c0362c',
    deltaLabel:
      (up ? '▲ ' : '▼ ') +
      fmtMoney(Math.abs(last - first)) +
      ' (' +
      (up ? '+' : '−') +
      Math.abs(pct).toFixed(1) +
      '%) ' +
      range.toLowerCase(),
  };
}
