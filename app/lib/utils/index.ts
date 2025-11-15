/**
 * Utility functions
 */

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge Tailwind CSS classes
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format trust score
 */
export function formatTrustScore(score: number): string {
  return score.toFixed(1);
}

/**
 * Get trust score color
 */
export function getTrustScoreColor(score: number): string {
  if (score >= 4.5) return 'text-green-600';
  if (score >= 3.5) return 'text-blue-600';
  if (score >= 2.5) return 'text-yellow-600';
  if (score >= 1.5) return 'text-orange-600';
  return 'text-red-600';
}

/**
 * Generate swap code (6 digits)
 */
export function generateSwapCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

/**
 * Format date relative (e.g., "2 hours ago")
 */
export function formatRelativeTime(date: string | Date): string {
  const now = new Date();
  const then = typeof date === 'string' ? new Date(date) : date;
  const diffMs = now.getTime() - then.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;

  return then.toLocaleDateString();
}

/**
 * Validate email
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate phone number (basic international format)
 */
export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^\+?[1-9]\d{1,14}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
}

/**
 * Get age range label
 */
export function getAgeRangeLabel(ageRange: string): string {
  const labels: Record<string, string> = {
    '0-1yr': '0-12 months',
    '1-3yr': '1-3 years',
    '3-5yr': '3-5 years',
    '5-8yr': '5-8 years',
    '8+': '8+ years',
  };
  return labels[ageRange] || ageRange;
}

/**
 * Get condition color
 */
export function getConditionColor(condition: string): string {
  const colors: Record<string, string> = {
    'Like New': 'bg-green-100 text-green-800',
    'Good': 'bg-blue-100 text-blue-800',
    'Fair': 'bg-yellow-100 text-yellow-800',
    'Well-Loved': 'bg-orange-100 text-orange-800',
  };
  return colors[condition] || 'bg-gray-100 text-gray-800';
}
