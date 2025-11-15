/**
 * My Toys Page - List and manage user's toys
 */

'use client';

import { useAuth, useToys } from '@/lib/hooks';
import { Button } from '@/components/ui';
import Link from 'next/link';
import { getAgeRangeLabel, getConditionColor } from '@/lib/utils';

export default function MyToysPage() {
  const { user } = useAuth();
  const { myToys, isMyToysLoading } = useToys(user?.id);

  if (isMyToysLoading) {
    return (
      <div className="p-4">
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading your toys...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Toys</h1>
          <p className="text-gray-600 text-sm">
            {myToys?.length || 0} {myToys?.length === 1 ? 'toy' : 'toys'} listed
          </p>
        </div>
        <Link href="/dashboard/toys/new">
          <Button size="sm">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Toy
          </Button>
        </Link>
      </div>

      {/* Filter Tabs */}
      <div className="flex space-x-2 mb-6 overflow-x-auto">
        <button className="px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-medium whitespace-nowrap">
          All ({myToys?.length || 0})
        </button>
        <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium whitespace-nowrap hover:bg-gray-200">
          Available ({myToys?.filter(t => t.is_available).length || 0})
        </button>
        <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium whitespace-nowrap hover:bg-gray-200">
          Unavailable ({myToys?.filter(t => !t.is_available).length || 0})
        </button>
      </div>

      {/* Toys List */}
      {myToys && myToys.length > 0 ? (
        <div className="space-y-3">
          {myToys.map((toy) => (
            <div
              key={toy.id}
              className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:border-blue-300 transition-colors"
            >
              <div className="flex">
                {/* Toy Image */}
                <div className="w-24 h-24 bg-gray-100 flex-shrink-0">
                  {toy.photos && toy.photos.length > 0 ? (
                    <img
                      src={toy.photos[0]}
                      alt={toy.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Toy Info */}
                <div className="flex-1 p-3">
                  <div className="flex items-start justify-between mb-1">
                    <h3 className="font-semibold text-gray-900 line-clamp-1">
                      {toy.title}
                    </h3>
                    {toy.is_available ? (
                      <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium">
                        Available
                      </span>
                    ) : (
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-medium">
                        Unavailable
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-gray-600 line-clamp-1 mb-2">
                    {toy.description || 'No description'}
                  </p>

                  <div className="flex items-center space-x-2 text-xs">
                    <span className={`px-2 py-1 rounded ${getConditionColor(toy.condition)}`}>
                      {toy.condition}
                    </span>
                    <span className="text-gray-500">
                      {getAgeRangeLabel(toy.age_range)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center space-x-3 text-xs text-gray-500">
                      <span>❤️ {toy.swipe_count} swipes</span>
                      <span>✨ {toy.match_count} matches</span>
                    </div>
                    <Link href={`/dashboard/toys/${toy.id}`}>
                      <button className="text-blue-600 text-sm font-medium hover:text-blue-700">
                        Edit
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        // Empty State
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🧸</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No toys yet
          </h3>
          <p className="text-gray-600 mb-6">
            Add your first toy to start swapping with other parents in your area
          </p>
          <Link href="/dashboard/toys/new">
            <Button>Add Your First Toy</Button>
          </Link>
        </div>
      )}
    </div>
  );
}
