import { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import toast from "react-hot-toast";

interface Media {
  id: number;
  title: string;
  type: "Movie" | "TV Show";
  director: string;
  budget: string;
  location: string;
  duration: string;
  yearTime: string;
  createdAt: string;
  updatedAt: string;
}

interface MediaFormData {
  title: string;
  type: "Movie" | "TV Show";
  director: string;
  budget: string;
  location: string;
  duration: string;
  yearTime: string;
}

const MediaPage = () => {
  const [mediaList, setMediaList] = useState<Media[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingMedia, setEditingMedia] = useState<Media | null>(null);
  const [deleteMediaId, setDeleteMediaId] = useState<number | null>(null);
  const observerTarget = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState<MediaFormData>({
    title: "",
    type: "Movie",
    director: "",
    budget: "",
    location: "",
    duration: "",
    yearTime: "",
  });

  const API_URL = import.meta.env.VITE_SERVER_URL || "http://localhost:3000";

  // Fetch media entries
  const fetchMedia = useCallback(
    async (pageNum: number) => {
      if (loading || !hasMore) return;
      setLoading(true);

      try {
        const response = await axios.get(`${API_URL}/api/media`, {
          params: { page: pageNum, limit: 20 },
        });

        if (response.data.success) {
          const newMedia = response.data.data;
          setMediaList((prev) =>
            pageNum === 1 ? newMedia : [...prev, ...newMedia]
          );
          setHasMore(response.data.pagination.hasMore);
        }
      } catch (error) {
        console.error("Error fetching media:", error);
        toast.error("Failed to load media entries");
      } finally {
        setLoading(false);
      }
    },
    [loading, hasMore, API_URL]
  );

  // Infinite scroll observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 0.1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [hasMore, loading]);

  // Fetch media when page changes
  useEffect(() => {
    fetchMedia(page);
  }, [page]);

  // Handle form submission (Create/Update)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingMedia) {
        // Update existing media
        const response = await axios.put(
          `${API_URL}/api/media/${editingMedia.id}`,
          formData
        );
        if (response.data.success) {
          setMediaList((prev) =>
            prev.map((m) =>
              m.id === editingMedia.id ? response.data.data : m
            )
          );
          toast.success("Media entry updated successfully");
        }
      } else {
        // Create new media
        const response = await axios.post(`${API_URL}/api/media`, formData);
        if (response.data.success) {
          setMediaList((prev) => [response.data.data, ...prev]);
          toast.success("Media entry created successfully");
        }
      }
      handleCloseModal();
    } catch (error: any) {
      console.error("Error saving media:", error);
      toast.error(
        error.response?.data?.message || "Failed to save media entry"
      );
    }
  };

  // Handle delete
  const handleDelete = async () => {
    if (!deleteMediaId) return;

    try {
      const response = await axios.delete(
        `${API_URL}/api/media/${deleteMediaId}`
      );
      if (response.data.success) {
        setMediaList((prev) => prev.filter((m) => m.id !== deleteMediaId));
        toast.success("Media entry deleted successfully");
      }
      setShowDeleteModal(false);
      setDeleteMediaId(null);
    } catch (error) {
      console.error("Error deleting media:", error);
      toast.error("Failed to delete media entry");
    }
  };

  // Open modal for editing
  const handleEdit = (media: Media) => {
    setEditingMedia(media);
    setFormData({
      title: media.title,
      type: media.type,
      director: media.director,
      budget: media.budget,
      location: media.location,
      duration: media.duration,
      yearTime: media.yearTime,
    });
    setShowModal(true);
  };

  // Open modal for creating new entry
  const handleCreate = () => {
    setEditingMedia(null);
    setFormData({
      title: "",
      type: "Movie",
      director: "",
      budget: "",
      location: "",
      duration: "",
      yearTime: "",
    });
    setShowModal(true);
  };

  // Close modal
  const handleCloseModal = () => {
    setShowModal(false);
    setEditingMedia(null);
    setFormData({
      title: "",
      type: "Movie",
      director: "",
      budget: "",
      location: "",
      duration: "",
      yearTime: "",
    });
  };

  // Open delete confirmation modal
  const handleDeleteClick = (id: number) => {
    setDeleteMediaId(id);
    setShowDeleteModal(true);
  };

  return (
    <div className="flex-1 overflow-auto p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Favorite Movies & TV Shows</h1>
          <button
            onClick={handleCreate}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Add New Entry
          </button>
        </div>

        {/* Table */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-900">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Director
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Budget
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Duration
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Year/Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {mediaList.map((media) => (
                  <tr key={media.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      {media.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      {media.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      {media.director}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      {media.budget}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      {media.location}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      {media.duration}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      {media.yearTime}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleEdit(media)}
                        className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 mr-4"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteClick(media.id)}
                        className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Loading indicator */}
          {loading && (
            <div className="text-center py-4">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
            </div>
          )}

          {/* Infinite scroll trigger */}
          <div ref={observerTarget} className="h-4" />

          {/* No more data message */}
          {!hasMore && mediaList.length > 0 && (
            <div className="text-center py-4 text-gray-500 dark:text-gray-400">
              No more entries to load
            </div>
          )}

          {/* Empty state */}
          {!loading && mediaList.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                No media entries yet. Click "Add New Entry" to get started!
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Create/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">
              {editingMedia ? "Edit Entry" : "Add New Entry"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Type *
                  </label>
                  <select
                    required
                    value={formData.type}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        type: e.target.value as "Movie" | "TV Show",
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="Movie">Movie</option>
                    <option value="TV Show">TV Show</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Director *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.director}
                    onChange={(e) =>
                      setFormData({ ...formData, director: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Budget *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.budget}
                    onChange={(e) =>
                      setFormData({ ...formData, budget: e.target.value })
                    }
                    placeholder="e.g., $160M"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Location *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                    placeholder="e.g., Los Angeles, CA"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Duration *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.duration}
                    onChange={(e) =>
                      setFormData({ ...formData, duration: e.target.value })
                    }
                    placeholder="e.g., 148 min"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">
                    Year/Time *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.yearTime}
                    onChange={(e) =>
                      setFormData({ ...formData, yearTime: e.target.value })
                    }
                    placeholder="e.g., 2010 or 2008-2013"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                >
                  {editingMedia ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
            <p className="mb-6 text-gray-600 dark:text-gray-300">
              Are you sure you want to delete this entry? This action cannot be
              undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setDeleteMediaId(null);
                }}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MediaPage;
