/**
 * Recent Activity tracking service for BH KONVER
 * Unifies generated documents (Europass CV, PDFs, barcodes) and conversions (files, images, formats).
 */

export type ActivityType = "document" | "conversion";
export type ActivityCategory = "generator" | "converter" | "calculator" | "document";

export interface RecentActivityItem {
  id: string;
  type: ActivityType;
  title: string;
  category: ActivityCategory;
  toolName: string;
  sourceFormat?: string;
  targetFormat?: string;
  sizeBytes?: number;
  formattedSize?: string;
  status: "completed" | "processing" | "failed";
  createdAt: string; // ISO string
  timestamp: number; // Unix epoch ms
  downloadUrl?: string;
  previewUrl?: string;
  isLocal?: boolean;
}

const STORAGE_KEY = "bhk_recent_activities_v1";
const MAX_LOCAL_ACTIVITIES = 50;

/**
 * Retrieve recent local activities from localStorage
 */
export function getLocalRecentActivities(): RecentActivityItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed.sort((a, b) => b.timestamp - a.timestamp);
    }
  } catch (e) {
    console.warn("Could not read local recent activities:", e);
  }
  return [];
}

/**
 * Add a new activity entry to localStorage and dispatch event for live UI reactivity
 */
export function recordRecentActivity(
  item: Omit<RecentActivityItem, "id" | "createdAt" | "timestamp" | "isLocal"> & {
    id?: string;
    createdAt?: string;
    timestamp?: number;
  }
): RecentActivityItem {
  const now = Date.now();
  const fullItem: RecentActivityItem = {
    id: item.id || `act_${now}_${Math.random().toString(36).substring(2, 8)}`,
    createdAt: item.createdAt || new Date(now).toISOString(),
    timestamp: item.timestamp || now,
    isLocal: true,
    ...item,
  };

  try {
    const existing = getLocalRecentActivities();
    // Prevent duplicate entries for exact same title within 5 seconds
    const filtered = existing.filter(
      (a) => !(a.title === fullItem.title && Math.abs(a.timestamp - fullItem.timestamp) < 5000)
    );
    const updated = [fullItem, ...filtered].slice(0, MAX_LOCAL_ACTIVITIES);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

    // Dispatch custom event for real-time dashboard listeners
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("bhk_activity_updated", { detail: fullItem }));
    }
  } catch (e) {
    console.warn("Could not save recent activity:", e);
  }

  return fullItem;
}

/**
 * Remove an activity item by ID
 */
export function deleteRecentActivity(id: string): void {
  try {
    const existing = getLocalRecentActivities();
    const updated = existing.filter((item) => item.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("bhk_activity_updated", { detail: { deletedId: id } }));
    }
  } catch (e) {
    console.warn("Could not delete recent activity:", e);
  }
}

/**
 * Clear all local activities
 */
export function clearAllRecentActivities(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("bhk_activity_updated", { detail: { cleared: true } }));
    }
  } catch (e) {
    console.warn("Could not clear recent activities:", e);
  }
}

/**
 * Format bytes to human readable string
 */
export function formatBytes(bytes?: number | null): string {
  if (!bytes || bytes <= 0) return "—";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

/**
 * Friendly relative time formatting in Bosnian/Croatian/Serbian
 */
export function formatRelativeTime(timestamp: number | string): string {
  const time = typeof timestamp === "string" ? new Date(timestamp).getTime() : timestamp;
  if (!time || isNaN(time)) return "Nedavno";

  const diffMs = Date.now() - time;
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  if (diffSec < 60) return "Upravo sada";
  if (diffMin === 1) return "Prije 1 minutu";
  if (diffMin < 5) return `Prije ${diffMin} minute`;
  if (diffMin < 60) return `Prije ${diffMin} minuta`;
  if (diffHour === 1) return "Prije 1 sat";
  if (diffHour < 5) return `Prije ${diffHour} sata`;
  if (diffHour < 24) return `Prije ${diffHour} sati`;
  if (diffDay === 1) return "Jučer";
  if (diffDay < 7) return `Prije ${diffDay} dana`;

  return new Date(time).toLocaleDateString("bs-BA", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
