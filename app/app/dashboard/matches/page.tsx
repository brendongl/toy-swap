/**
 * Matches Page - View all matches and active swaps
 */

'use client';

import { useState } from 'react';
import { useAuth, useMatches } from '@/lib/hooks';
import { formatTrustScore, formatRelativeTime } from '@/lib/utils';
import Link from 'next/link';

export default function MatchesPage() {
  const { user } = useAuth();
  const { matches, isMatchesLoading } = useMatches(user?.id);
  const [selectedTab, setSelectedTab] = useState<'active' | 'negotiating' | 'completed'>('active');

  const filteredMatches = matches?.filter((match) => match.status === selectedTab) || [];

  if (isMatchesLoading) {
    return (
      <div className="p-4 flex items-center justify-center h-[calc(100vh-200px)]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading matches...</p>
        </div>
      </div>
    );
  }

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
        <button
          onClick={() => setSelectedTab('active')}
          className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
            selectedTab === 'active'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Active ({matches?.filter((m) => m.status === 'active').length || 0})
        </button>
        <button
          onClick={() => setSelectedTab('negotiating')}
          className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
            selectedTab === 'negotiating'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Negotiating ({matches?.filter((m) => m.status === 'negotiating').length || 0})
        </button>
        <button
          onClick={() => setSelectedTab('completed')}
          className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
            selectedTab === 'completed'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Completed ({matches?.filter((m) => m.status === 'completed').length || 0})
        </button>
      </div>

      {/* Matches List */}
      {filteredMatches.length > 0 ? (
        <div className="space-y-4">
          {filteredMatches.map((match) => {
            const otherUser = match.other_user;
            if (!otherUser) return null;

            return (
              <Link
                key={match.id}
                href={`/dashboard/matches/${match.id}`}
                className="block"
              >
                <div className="bg-white rounded-lg border border-gray-200 p-4 hover:border-blue-300 transition-colors">
                  <div className="flex items-start space-x-4">
                    {/* Avatar */}
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
                      {otherUser.name?.charAt(0).toUpperCase()}
                    </div>

                    <div className="flex-1 min-w-0">
                      {/* User Info */}
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-gray-900">{otherUser.name}</h3>
                          <p className="text-sm text-gray-600">{otherUser.district}</p>
                        </div>
                        <div className="flex items-center text-yellow-500 text-sm">
                          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <span>{formatTrustScore(otherUser.trust_score)}</span>
                        </div>
                      </div>

                      {/* Matched Toys Summary */}
                      <div className="grid grid-cols-2 gap-2 mb-3">
                        {/* Toys you liked from them */}
                        <div className="bg-pink-50 rounded-lg p-2">
                          <p className="text-xs text-pink-700 font-medium mb-1">You liked:</p>
                          <div className="flex -space-x-2">
                            {match.toys_i_liked?.slice(0, 3).map((toy: any, idx: number) => (
                              <div
                                key={idx}
                                className="w-8 h-8 bg-pink-200 rounded-full border-2 border-white flex items-center justify-center text-xs"
                                title={toy?.title}
                              >
                                🧸
                              </div>
                            ))}
                            {(match.toys_i_liked?.length || 0) > 3 && (
                              <div className="w-8 h-8 bg-pink-300 rounded-full border-2 border-white flex items-center justify-center text-xs font-semibold">
                                +{(match.toys_i_liked?.length || 0) - 3}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Toys they liked from you */}
                        <div className="bg-blue-50 rounded-lg p-2">
                          <p className="text-xs text-blue-700 font-medium mb-1">They liked:</p>
                          <div className="flex -space-x-2">
                            {match.toys_they_liked?.slice(0, 3).map((toy: any, idx: number) => (
                              <div
                                key={idx}
                                className="w-8 h-8 bg-blue-200 rounded-full border-2 border-white flex items-center justify-center text-xs"
                                title={toy?.title}
                              >
                                🧸
                              </div>
                            ))}
                            {(match.toys_they_liked?.length || 0) > 3 && (
                              <div className="w-8 h-8 bg-blue-300 rounded-full border-2 border-white flex items-center justify-center text-xs font-semibold">
                                +{(match.toys_they_liked?.length || 0) - 3}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Match Info */}
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">
                          Matched {formatRelativeTime(match.created_at)}
                        </span>
                        <span className="text-blue-600 font-medium">
                          Start Swapping →
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        // Empty State
        <div className="text-center py-12">
          <div className="text-6xl mb-4">💝</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No {selectedTab} matches
          </h3>
          <p className="text-gray-600 mb-6 max-w-sm mx-auto">
            {selectedTab === 'active'
              ? "Start swiping on toys to match with other parents. When you both like each other's toys, you'll see them here!"
              : selectedTab === 'negotiating'
              ? 'Matches that are in negotiation will appear here.'
              : 'Completed swaps will appear here.'}
          </p>
          {selectedTab === 'active' && (
            <Link
              href="/dashboard"
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
            >
              Start Browsing
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
