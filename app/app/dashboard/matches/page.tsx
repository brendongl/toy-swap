/**
 * Matches Page - View all matches and active swaps
 */

'use client';

export default function MatchesPage() {
  return (
    <div className="p-4">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Matches</h1>
        <p className="text-gray-600 text-sm">
          Parents who liked your toys
        </p>
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 mb-6 overflow-x-auto">
        <button className="px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-medium whitespace-nowrap">
          Active (0)
        </button>
        <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium whitespace-nowrap hover:bg-gray-200">
          Negotiating (0)
        </button>
        <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium whitespace-nowrap hover:bg-gray-200">
          Completed (0)
        </button>
      </div>

      {/* Empty State */}
      <div className="text-center py-12">
        <div className="text-6xl mb-4">💝</div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          No matches yet
        </h3>
        <p className="text-gray-600 mb-6 max-w-sm mx-auto">
          Start swiping on toys to match with other parents. When you both like each other's toys, you'll see them here!
        </p>
      </div>
    </div>
  );
}
