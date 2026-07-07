// No real auth backend yet — this is a fixed demo identity used across all
// "logged in" pages, matching the original prototype's single demo user.
import type { NavSession } from '@/components/SiteNav';

export const DEMO_MEMBER_SESSION: NavSession = {
  badge: '★ MEMBER',
  username: '@hokage_hoarder',
  avatar: 'https://res.cloudinary.com/du3f8jjrp/image/upload/v1783400585/av-h.png',
  logoutHref: '/login',
};

export const DEMO_ROOKIE_SESSION: NavSession = {
  badge: 'ROOKIE',
  username: '@hokage_hoarder',
  avatar: 'https://res.cloudinary.com/du3f8jjrp/image/upload/v1783400585/av-h.png',
  logoutHref: '/login',
};
