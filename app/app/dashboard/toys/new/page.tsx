/**
 * Add New Toy Page - Form to list a new toy
 */

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth, useToys } from '@/lib/hooks';
import { Button, Input } from '@/components/ui';
import type { AgeRange, ToyCondition } from '@/types';

const AGE_RANGES: { value: AgeRange; label: string }[] = [
  { value: '0-1yr', label: '0-12 months' },
  { value: '1-3yr', label: '1-3 years' },
  { value: '3-5yr', label: '3-5 years' },
  { value: '5-8yr', label: '5-8 years' },
  { value: '8+', label: '8+ years' },
];

const CONDITIONS: { value: ToyCondition; label: string; description: string }[] = [
  { value: 'Like New', label: 'Like New', description: 'Barely used, no visible wear' },
  { value: 'Good', label: 'Good', description: 'Minor signs of use, fully functional' },
  { value: 'Fair', label: 'Fair', description: 'Moderate wear, still works well' },
  { value: 'Well-Loved', label: 'Well-Loved', description: 'Heavily used but still playable' },
];

export default function NewToyPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { createToy } = useToys(user?.id);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    age_range: '1-3yr' as AgeRange,
    condition: 'Good' as ToyCondition,
    brand: '',
    original_price: '',
    is_available: true,
  });

  const [photos, setPhotos] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    setUploading(true);

    // In a real app, you would upload to Supabase Storage here
    // For now, we'll use FileReader to convert to data URLs (demo only)
    Array.from(files).forEach((file) => {
      if (photos.length >= 5) {
        setError('Maximum 5 photos allowed');
        setUploading(false);
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotos((prev) => [...prev, reader.result as string]);
        setUploading(false);
      };
      reader.readAsDataURL(file);
    });
  };

  const removePhoto = (index: number) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.title.trim()) {
      setError('Please enter a toy title');
      return;
    }

    if (photos.length === 0) {
      setError('Please add at least one photo');
      return;
    }

    try {
      await createToy.mutateAsync({
        ...formData,
        photos,
      });

      router.push('/dashboard/toys');
    } catch (err: any) {
      setError(err.message || 'Failed to add toy');
    }
  };

  return (
    <div className="p-4 pb-24">
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={() => router.back()}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
        >
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>
        <h1 className="text-2xl font-bold text-gray-900">Add a Toy</h1>
        <p className="text-gray-600 text-sm">
          List a toy you'd like to swap
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Error Message */}
        {error && (
          <div className="p-3 rounded-lg bg-red-50 border border-red-200">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {/* Photos */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Photos <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-3 gap-3 mb-3">
            {photos.map((photo, index) => (
              <div key={index} className="relative aspect-square">
                <img
                  src={photo}
                  alt={`Photo ${index + 1}`}
                  className="w-full h-full object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => removePhoto(index)}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
                >
                  ×
                </button>
              </div>
            ))}

            {photos.length < 5 && (
              <label className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors">
                <svg className="w-8 h-8 text-gray-400 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span className="text-xs text-gray-500">Add Photo</span>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handlePhotoUpload}
                  className="hidden"
                  disabled={uploading}
                />
              </label>
            )}
          </div>
          <p className="text-xs text-gray-500">
            Add up to 5 photos. First photo will be the cover image.
          </p>
        </div>

        {/* Title */}
        <Input
          label="Toy Name"
          type="text"
          placeholder="e.g., Wooden Building Blocks"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            placeholder="Describe the toy, what makes it fun, any special features..."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={4}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-base focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <p className="text-xs text-gray-500 mt-1">
            {formData.description.length}/200 characters
          </p>
        </div>

        {/* Age Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Age Range <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.age_range}
            onChange={(e) => setFormData({ ...formData, age_range: e.target.value as AgeRange })}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-base focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
          >
            {AGE_RANGES.map((range) => (
              <option key={range.value} value={range.value}>
                {range.label}
              </option>
            ))}
          </select>
        </div>

        {/* Condition */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Condition <span className="text-red-500">*</span>
          </label>
          <div className="space-y-2">
            {CONDITIONS.map((condition) => (
              <label
                key={condition.value}
                className={`block p-3 border-2 rounded-lg cursor-pointer transition-colors ${
                  formData.condition === condition.value
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <input
                  type="radio"
                  name="condition"
                  value={condition.value}
                  checked={formData.condition === condition.value}
                  onChange={(e) => setFormData({ ...formData, condition: e.target.value as ToyCondition })}
                  className="sr-only"
                />
                <div className="flex items-start">
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{condition.label}</div>
                    <div className="text-sm text-gray-600">{condition.description}</div>
                  </div>
                  {formData.condition === condition.value && (
                    <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Brand (Optional) */}
        <Input
          label="Brand (Optional)"
          type="text"
          placeholder="e.g., LEGO, Fisher-Price"
          value={formData.brand}
          onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
        />

        {/* Original Price (Optional) */}
        <Input
          label="Original Price (Optional)"
          type="text"
          placeholder="e.g., 500,000 VND or $25"
          value={formData.original_price}
          onChange={(e) => setFormData({ ...formData, original_price: e.target.value })}
        />

        {/* Available Toggle */}
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <div className="font-medium text-gray-900">Available for Swap</div>
            <div className="text-sm text-gray-600">
              Make this toy visible to other parents
            </div>
          </div>
          <button
            type="button"
            onClick={() => setFormData({ ...formData, is_available: !formData.is_available })}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              formData.is_available ? 'bg-blue-600' : 'bg-gray-300'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                formData.is_available ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <Button
            type="submit"
            className="w-full"
            size="lg"
            loading={createToy.isPending}
          >
            Add Toy
          </Button>
        </div>
      </form>
    </div>
  );
}
