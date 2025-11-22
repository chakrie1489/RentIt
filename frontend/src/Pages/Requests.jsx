import React, { useEffect, useState, useContext } from "react";
import { getAllRequests, getMyRequests, deleteRequest } from "../api";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Requests = () => {
  const { token } = useContext(ShopContext);
  const navigate = useNavigate();
  const [allRequests, setAllRequests] = useState([]);
  const [myRequests, setMyRequests] = useState([]);
  const [activeView, setActiveView] = useState("all");
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const CATEGORIES = ["all", "electronics", "furniture", "tools", "vehicles", "sports", "other"];

  const loadAllRequests = async () => {
    try {
      setLoading(true);
      const res = await getAllRequests(selectedCategory === "all" ? null : selectedCategory, "newest");
      if (res.success) {
        setAllRequests(res.requests || []);
      } else {
        setAllRequests([]);
      }
    } catch (err) {
      console.error(err);
      setAllRequests([]);
    } finally {
      setLoading(false);
    }
  };

  const loadMyRequests = async () => {
    try {
      const res = await getMyRequests();
      if (res.success) {
        setMyRequests(res.requests || []);
      }
    } catch (err) {
      console.error(err);
      setMyRequests([]);
    }
  };

  useEffect(() => {
    if (activeView === "all") {
      loadAllRequests();
    } else if (activeView === "my" && token) {
      loadMyRequests();
    }
  }, [activeView, selectedCategory, token]);

  const onDeleteRequest = async (requestId) => {
    if (!confirm("Delete this request?")) return;
    try {
      const res = await deleteRequest(requestId);
      if (res.success) {
        toast.success("Request deleted");
        if (activeView === "my") {
          loadMyRequests();
        }
      } else {
        toast.error(res.message || "Failed to delete");
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const displayRequests = activeView === "all" ? allRequests : myRequests;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <main className='w-full min-h-screen bg-blue-50'>
      <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] py-16'>
        {/* Header */}
        <div className='mb-12'>
          <h1 className='text-4xl font-bold text-gray-800 mb-3'>
            📋 Rental Requests
          </h1>
          <p className='text-lg text-gray-600'>
            Browse what people are looking to rent. Post your own request to find items you need.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className='flex gap-4 mb-8 border-b-2 border-gray-300 flex-wrap'>
          <button
            onClick={() => setActiveView("all")}
            className={`py-3 px-6 font-semibold transition ${
              activeView === "all"
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Browse Requests ({allRequests.length})
          </button>
          {token && (
            <button
              onClick={() => setActiveView("my")}
              className={`py-3 px-6 font-semibold transition ${
                activeView === "my"
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              My Requests ({myRequests.length})
            </button>
          )}
          {!token && (
            <button
              onClick={() => navigate("/login")}
              className='py-3 px-6 font-semibold text-blue-600 hover:text-blue-700'
            >
              Login to Post
            </button>
          )}
        </div>

        {/* Category Filter - Only show for Browse tab */}
        {activeView === "all" && (
          <div className='mb-8'>
            <label className='block text-sm font-semibold text-gray-700 mb-3'>
              Filter by Category:
            </label>
            <div className='flex gap-2 flex-wrap'>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    selectedCategory === cat
                      ? 'bg-blue-500 text-white'
                      : 'bg-white text-gray-700 border border-gray-300 hover:border-blue-400'
                  }`}
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Action Button for My Requests */}
        {activeView === "my" && token && (
          <div className='mb-8'>
            <button
              onClick={() => navigate("/requests/new")}
              className='bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition'
            >
              + Post New Request
            </button>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className='text-center py-12'>
            <div className='inline-block animate-spin w-8 h-8 border-4 border-blue-200 border-t-blue-500 rounded-full'></div>
            <p className='text-gray-600 mt-4'>Loading requests...</p>
          </div>
        )}

        {/* Content */}
        {!loading && (
          <>
            {displayRequests.length === 0 ? (
              <div className='bg-white rounded-lg p-12 text-center shadow-md border border-gray-200'>
                <p className='text-4xl mb-4'>📭</p>
                <p className='text-2xl font-bold text-gray-800 mb-2'>No requests found</p>
                <p className='text-gray-600 mb-6'>
                  {activeView === "all"
                    ? "No requests available right now."
                    : "You haven't posted any requests yet."}
                </p>
                {activeView === "my" && token && (
                  <button
                    onClick={() => navigate("/requests/new")}
                    className='bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition'
                  >
                    Post Your First Request
                  </button>
                )}
              </div>
            ) : (
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {displayRequests.map((req) => (
                  <div
                    key={req._id}
                    className='bg-white rounded-lg border border-gray-200 shadow-md hover:shadow-lg transition overflow-hidden'
                  >
                    <div className='p-5'>
                      {/* Header */}
                      <div className='flex justify-between items-start gap-2 mb-4'>
                        <h3 className='font-bold text-lg text-gray-800 line-clamp-2'>
                          {req.title}
                        </h3>
                        <span className='px-2 py-1 rounded text-xs font-bold whitespace-nowrap bg-blue-100 text-blue-800'>
                          {req.status}
                        </span>
                      </div>

                      {/* Category Badge */}
                      {req.category && (
                        <div className='mb-3'>
                          <span className='px-2 py-1 rounded text-xs bg-gray-100 text-gray-700 font-medium'>
                            {req.category}
                          </span>
                        </div>
                      )}

                      {/* Description */}
                      <p className='text-sm text-gray-600 mb-4 line-clamp-2'>
                        {req.description}
                      </p>

                      {/* Requester Info */}
                      <div className='bg-gray-50 rounded p-3 mb-4 border border-gray-200'>
                        <p className='text-sm font-semibold text-gray-800'>
                          {req.requester?.name || "User"}
                        </p>
                        {req.requester?.rating_average && (
                          <p className='text-xs text-gray-600'>
                            ⭐ {req.requester.rating_average.toFixed(1)} rating
                          </p>
                        )}
                      </div>

                      {/* Details */}
                      <div className='space-y-2 text-sm mb-4'>
                        <div className='flex justify-between'>
                          <span className='text-gray-600'>From:</span>
                          <span className='font-semibold text-gray-800'>
                            {formatDate(req.desiredStart)}
                          </span>
                        </div>
                        <div className='flex justify-between'>
                          <span className='text-gray-600'>To:</span>
                          <span className='font-semibold text-gray-800'>
                            {formatDate(req.desiredEnd)}
                          </span>
                        </div>
                        <div className='flex justify-between'>
                          <span className='text-gray-600'>Max Price:</span>
                          <span className='font-semibold text-green-600'>
                            ${req.maxPrice}/day
                          </span>
                        </div>
                        {req.radiusKm && (
                          <div className='flex justify-between'>
                            <span className='text-gray-600'>Radius:</span>
                            <span className='font-semibold text-gray-800'>
                              {req.radiusKm} km
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Special Requirements */}
                      {req.specialRequirements && (
                        <div className='bg-blue-50 rounded p-3 mb-4 border-l-2 border-blue-400'>
                          <p className='text-xs font-semibold text-gray-700 mb-1'>Requirements:</p>
                          <p className='text-sm text-gray-700 line-clamp-2'>
                            {req.specialRequirements}
                          </p>
                        </div>
                      )}

                      {/* Actions */}
                      <div className='flex gap-2'>
                        {activeView === "all" && token ? (
                          <button
                            onClick={() => navigate(`/requests/${req._id}`)}
                            className='flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-3 rounded font-semibold text-sm transition'
                          >
                            Send Offer
                          </button>
                        ) : activeView === "all" ? (
                          <button
                            onClick={() => navigate("/login")}
                            className='flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-3 rounded font-semibold text-sm transition'
                          >
                            Login to Offer
                          </button>
                        ) : (
                          <button
                            onClick={() => navigate(`/requests/${req._id}`)}
                            className='flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-3 rounded font-semibold text-sm transition'
                          >
                            View
                          </button>
                        )}
                        {activeView === "my" && (
                          <button
                            onClick={() => onDeleteRequest(req._id)}
                            className='flex-1 bg-red-500 hover:bg-red-600 text-white py-2 px-3 rounded font-semibold text-sm transition'
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
};

export default Requests;
