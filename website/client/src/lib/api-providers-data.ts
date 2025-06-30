// Utility functions and constants for API providers
export const TAG_DESCRIPTIONS = {
  "🆓": "completely_free",
  "🔓": "free_credits", 
  "💰": "requires_payment",
  "💪": "claude_support",
  "✌": "openai_support", 
  "🎉": "other_models",
  "🌎": "international_network",
  "🎁": "recharge_bonus",
  "🚀": "high_concurrency",
  "😆": "daily_checkin",
  "🚩": "registered_platform",
  "✔": "verified_authentic",
  "🌹": "premium_service"
} as const;

export const TAG_COLORS = {
  "🆓": "bg-green-100 text-green-800",
  "🔓": "bg-green-100 text-green-800", 
  "💰": "bg-yellow-100 text-yellow-800",
  "💪": "bg-red-100 text-red-800",
  "✌": "bg-blue-100 text-blue-800",
  "🎉": "bg-indigo-100 text-indigo-800",
  "🌎": "bg-cyan-100 text-cyan-800",
  "🎁": "bg-purple-100 text-purple-800",
  "🚀": "bg-orange-100 text-orange-800",
  "😆": "bg-yellow-100 text-yellow-800",
  "🚩": "bg-green-100 text-green-800",
  "✔": "bg-gray-100 text-gray-800",
  "🌹": "bg-pink-100 text-pink-800"
} as const;

export const FILTER_OPTIONS = [
  { key: 'all', emoji: '', label: 'all' },
  { key: 'free', emoji: '🆓', label: 'free' },
  { key: 'claude', emoji: '💪', label: 'claude' },
  { key: 'openai', emoji: '✌', label: 'openai' },
  { key: 'verified', emoji: '✔', label: 'verified' }
] as const;

export const APP_ICON_MAP = {
  desktop: "Monitor",
  globe: "Globe", 
  comments: "MessageSquare",
  mobile: "Smartphone",
  "message-square": "MessageCircle",
  zap: "Zap"
} as const;

export const APP_TAG_COLORS = {
  "开源": "bg-green-100 text-green-800",
  "跨平台": "bg-blue-100 text-blue-800",
  "网页端": "bg-purple-100 text-purple-800", 
  "多模态": "bg-red-100 text-red-800",
  "移动端": "bg-indigo-100 text-indigo-800",
  "语音": "bg-orange-100 text-orange-800",
  "现代界面": "bg-cyan-100 text-cyan-800",
  "企业级": "bg-gray-100 text-gray-800",
  "知识库": "bg-yellow-100 text-yellow-800"
} as const;

// Helper functions for filtering and searching
export function filterProvidersByTag(providers: any[], tag: string): any[] {
  if (tag === 'all') return providers;
  return providers.filter(provider => provider.tags.includes(getTagEmoji(tag)));
}

export function searchProviders(providers: any[], searchTerm: string): any[] {
  if (!searchTerm.trim()) return providers;
  
  const term = searchTerm.toLowerCase();
  return providers.filter(provider => 
    provider.displayName.toLowerCase().includes(term) ||
    provider.name.toLowerCase().includes(term) ||
    provider.notes?.toLowerCase().includes(term) ||
    provider.url.toLowerCase().includes(term)
  );
}

export function getTagEmoji(filterKey: string): string {
  const option = FILTER_OPTIONS.find(opt => opt.key === filterKey);
  return option?.emoji || '';
}

export function getTagColor(tag: string): string {
  return TAG_COLORS[tag as keyof typeof TAG_COLORS] || 'bg-gray-100 text-gray-800';
}

export function getAppTagColor(tag: string): string {
  return APP_TAG_COLORS[tag as keyof typeof APP_TAG_COLORS] || 'bg-gray-100 text-gray-800';
}

// URL validation and formatting
export function formatUrl(url: string): string {
  return url.replace(/^https?:\/\//, '');
}

export function isValidUrl(url: string): boolean {
  try {
    new URL(url.startsWith('http') ? url : `https://${url}`);
    return true;
  } catch {
    return false;
  }
}

// Local storage helpers for user preferences
export function saveFavorites(favorites: Set<number>): void {
  localStorage.setItem('api-provider-favorites', JSON.stringify(Array.from(favorites)));
}

export function loadFavorites(): Set<number> {
  try {
    const saved = localStorage.getItem('api-provider-favorites');
    return new Set(saved ? JSON.parse(saved) : []);
  } catch {
    return new Set();
  }
}

export function saveFilterPreference(filter: string): void {
  localStorage.setItem('api-provider-filter', filter);
}

export function loadFilterPreference(): string {
  return localStorage.getItem('api-provider-filter') || 'all';
}

// Analytics and tracking helpers (for future implementation)
export function trackProviderClick(providerId: number, providerName: string): void {
  // This could be implemented to track user interactions
  console.log(`Provider clicked: ${providerName} (ID: ${providerId})`);
}

export function trackSearch(searchTerm: string): void {
  // This could be implemented to track search patterns
  console.log(`Search performed: ${searchTerm}`);
}

export function trackFilterUsage(filter: string): void {
  // This could be implemented to track filter usage
  console.log(`Filter applied: ${filter}`);
}

// Copy to clipboard with fallback
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      // Fallback for older browsers or non-secure contexts
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      return successful;
    }
  } catch (err) {
    console.error('Failed to copy text: ', err);
    return false;
  }
}

// Scroll utilities
export function scrollToSection(sectionId: string): void {
  const element = document.getElementById(sectionId);
  if (element) {
    const headerHeight = 80; // Account for sticky header
    const elementPosition = element.offsetTop - headerHeight;
    window.scrollTo({
      top: elementPosition,
      behavior: 'smooth'
    });
  }
}

// Debounce function for search input
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// Sort providers by various criteria
export function sortProviders(providers: any[], sortBy: 'name' | 'recommended' | 'tags' = 'recommended'): any[] {
  return [...providers].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.displayName.localeCompare(b.displayName);
      case 'recommended':
        if (a.isRecommended && !b.isRecommended) return -1;
        if (!a.isRecommended && b.isRecommended) return 1;
        return a.sortOrder - b.sortOrder;
      case 'tags':
        return b.tags.length - a.tags.length;
      default:
        return a.sortOrder - b.sortOrder;
    }
  });
}

// Constants for UI
export const MOBILE_BREAKPOINT = 1024;
export const SEARCH_DEBOUNCE_MS = 300;
export const TOAST_DURATION = 3000;
export const ANIMATION_DURATION = 200;

// Language-specific formatting
export const LANGUAGE_FLAGS = {
  zh: '🇨🇳',
  en: '🇺🇸', 
  ru: '🇷🇺',
  fr: '🇫🇷'
} as const;

export const LANGUAGE_NAMES = {
  zh: '中文',
  en: 'English',
  ru: 'Русский', 
  fr: 'Français'
} as const;
