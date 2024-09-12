import React, { useState } from "react";

const CricketCard = ({ id, title, description, review, isAdmin, onEditClick, isEditing }) => {
  const [showReview, setShowReview] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 text-black">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-600 mb-4">{description}</p>
      <button
        onClick={() => setShowReview(!showReview)}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
      >
        {showReview ? "Hide Review" : "Show Review"}
      </button>
      {showReview && (
        <div className="mt-4">
          {review ? (
            <div>
              <div dangerouslySetInnerHTML={{ __html: review }} />
              {isAdmin && !isEditing && (
                <button
                  onClick={onEditClick}
                  className="mt-2 bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition duration-300"
                >
                  Edit Review
                </button>
              )}
            </div>
          ) : (
            isAdmin && !isEditing && (
              <button
                onClick={onEditClick}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300"
              >
                Create Review
              </button>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default CricketCard;