import React, { useState, useEffect } from 'react';
import { useTrip } from '../../context/TripContext';
import { X, Check } from 'lucide-react';
import { Booking } from '../../types/trip';

export const EditBookingModal: React.FC = () => {
  const { editingBooking, setEditingBooking, updateBooking } = useTrip();

  const [formData, setFormData] = useState<Partial<Booking>>({});

  useEffect(() => {
    if (editingBooking) {
      setFormData({
        title: editingBooking.title,
        routeOrLocation: editingBooking.routeOrLocation,
        date: editingBooking.date,
        time: editingBooking.time,
        notes: editingBooking.notes || '',
        cost: editingBooking.cost,
      });
    }
  }, [editingBooking]);

  if (!editingBooking) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBooking) return;
    updateBooking(editingBooking.id, {
      ...formData,
      statusLabel: 'Updated',
      isUpdated: true,
      changeNote: `Manual edit saved at ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
    });
    setEditingBooking(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <div>
            <span className="text-xs uppercase font-bold tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
              Edit Itinerary Item
            </span>
            <h3 className="text-lg font-semibold text-slate-900 mt-1">
              {editingBooking.title}
            </h3>
          </div>
          <button
            onClick={() => setEditingBooking(null)}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSave} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Title
            </label>
            <input
              type="text"
              value={formData.title || ''}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Location / Route
            </label>
            <input
              type="text"
              value={formData.routeOrLocation || ''}
              onChange={(e) => setFormData({ ...formData, routeOrLocation: e.target.value })}
              required
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Date
              </label>
              <input
                type="text"
                value={formData.date || ''}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Time
              </label>
              <input
                type="text"
                value={formData.time || ''}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                required
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Estimated Cost (₹ INR)
            </label>
            <input
              type="number"
              value={formData.cost || 0}
              onChange={(e) => setFormData({ ...formData, cost: Number(e.target.value) })}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Booking Notes & Confirmation Info
            </label>
            <textarea
              rows={2}
              value={formData.notes || ''}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 resize-none"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setEditingBooking(null)}
              className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors shadow-sm"
            >
              <Check className="w-4 h-4" />
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
