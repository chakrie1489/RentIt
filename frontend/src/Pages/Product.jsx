import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { getItem } from "../api";
import { toast } from "react-toastify";

const Product = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { token } = useContext(ShopContext);
  const [item, setItem] = useState(null);
  const [image, setImage] = useState("");
  const [galleryIndex, setGalleryIndex] = useState(0);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getItem(productId);
        if (res.success) {
          setItem(res.item);
          const imgs = res.item.images || [];
          setImage((imgs && imgs[0]) || "");
        } else {
          toast.error(res.message || "Item not found");
          navigate("/");
        }
      } catch (err) {
        toast.error(err.message);
        navigate("/");
      }
    };
    fetch();
  }, [productId]);

  if (!item) return <div className="opacity-0"></div>;

  return (
    <main className="w-full min-h-screen bg-blue-50 py-8">
      <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
        <button
          onClick={() => navigate("/collection")}
          className="text-blue-600 hover:text-blue-700 font-semibold mb-6 flex items-center gap-1"
        >
          ← Back to Listings
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-md p-4">
            {item.images && item.images.length > 0 ? (
              <div>
                <div className="mb-4">
                  <img
                    src={image}
                    alt={item.title}
                    className="w-full h-96 object-cover rounded-lg"
                  />
                </div>
                {item.images.length > 1 && (
                  <div className="grid grid-cols-4 gap-2">
                    {item.images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setGalleryIndex(idx);
                          setImage(img);
                        }}
                        className={`rounded-lg overflow-hidden border-2 transition ${
                          galleryIndex === idx
                            ? "ring-2 ring-blue-500 border-blue-500"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <img
                          src={img}
                          alt={`thumb-${idx}`}
                          className="w-full h-20 object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">No images available</p>
              </div>
            )}
          </div>

          {/* Details */}
          <div className="space-y-6">
            {/* Header Info */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-md p-6">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                {item.title}
              </h1>
              
              {item.category && (
                <div className="mb-3">
                  <span className="px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700 font-medium">
                    {item.category}
                  </span>
                </div>
              )}

              <div className="flex items-baseline gap-2 mb-4">
                <p className="text-3xl font-bold text-blue-600">
                  ${item.price}
                </p>
                <p className="text-lg text-gray-600">
                  per {item.priceUnit || "day"}
                </p>
              </div>

              <p className="text-gray-700 leading-relaxed mb-4">
                {item.description}
              </p>

              {/* Condition & Status */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                {item.condition && (
                  <div className="bg-gray-50 rounded p-3 border border-gray-200">
                    <p className="text-xs text-gray-600 font-semibold mb-1">
                      Condition
                    </p>
                    <p className="text-sm font-semibold text-gray-800 capitalize">
                      {item.condition}
                    </p>
                  </div>
                )}
                <div className="bg-gray-50 rounded p-3 border border-gray-200">
                  <p className="text-xs text-gray-600 font-semibold mb-1">
                    Availability
                  </p>
                  <p
                    className={`text-sm font-semibold ${
                      item.available ? "text-green-700" : "text-red-700"
                    }`}
                  >
                    {item.available ? "✓ Available" : "✗ Not Available"}
                  </p>
                </div>
              </div>
            </div>

            {/* Owner Info */}
            {item.owner && (
              <div className="bg-white rounded-lg border border-gray-200 shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Lender
                </h3>
                <div className="flex items-start gap-3">
                  {item.owner.profile_photo_url && (
                    <img
                      src={item.owner.profile_photo_url}
                      alt={item.owner.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  )}
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800">
                      {item.owner.name}
                    </p>
                    {item.owner.email && (
                      <p className="text-sm text-gray-600">{item.owner.email}</p>
                    )}
                    {item.owner.rating_average && (
                      <p className="text-sm font-medium text-gray-700 mt-1">
                        ⭐ {item.owner.rating_average.toFixed(1)} rating
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Additional Details */}
            {(item.deposit_amount || item.remarks || item.minimumRental) && (
              <div className="bg-white rounded-lg border border-gray-200 shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Details
                </h3>
                <div className="space-y-3">
                  {item.deposit_amount && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Security Deposit:</span>
                      <span className="font-semibold text-gray-800">
                        ${item.deposit_amount}
                      </span>
                    </div>
                  )}
                  {item.minimumRental && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Minimum Rental:</span>
                      <span className="font-semibold text-gray-800">
                        {item.minimumRental} days
                      </span>
                    </div>
                  )}
                  {item.remarks && (
                    <div>
                      <p className="text-gray-600 text-sm">Rules & Notes:</p>
                      <p className="text-gray-800 text-sm mt-1 italic">
                        {item.remarks}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* CTA Buttons */}
            <div className="flex gap-4">
              {item.available ? (
                <>
                  <button
                    onClick={() => {
                      if (!token) {
                        navigate("/login");
                        return;
                      }
                      // Navigate to booking/cart
                      navigate(`/booking/${productId}`);
                    }}
                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold transition"
                  >
                    Book Now
                  </button>
                  <button
                    onClick={() => {
                      if (!token) {
                        navigate("/login");
                        return;
                      }
                      // Navigate to requests
                      navigate("/requests");
                    }}
                    className="flex-1 border-2 border-blue-500 text-blue-600 hover:bg-blue-50 py-3 px-6 rounded-lg font-semibold transition"
                  >
                    Message
                  </button>
                </>
              ) : (
                <button
                  disabled
                  className="flex-1 bg-gray-400 text-white py-3 px-6 rounded-lg font-semibold cursor-not-allowed"
                >
                  Not Available
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Product;
