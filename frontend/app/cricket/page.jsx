'use client';

import React, { useState } from "react";
import CricketCard from "@/components/CricketCard";
import ReviewEditor from "@/components/ReviewEditor";
import useAuth from "@/lib/hooks/useAuth";

const cricketData = [
  { id: 1, title: "IPL 2024", description: "Indian Premier League 2024 season preview" },
  { id: 2, title: "T20 World Cup", description: "Upcoming T20 World Cup analysis" },
  { id: 3, title: "Test Championship", description: "ICC World Test Championship final predictions" },
  { id: 4, title: "Ashes Series", description: "England vs Australia Ashes series breakdown" },
  { id: 5, title: "ODI Rankings", description: "Latest ODI team and player rankings" },
  { id: 6, title: "Emerging Players", description: "Top 10 emerging cricket talents to watch" },
  { id: 7, title: "Cricket Technology", description: "Impact of technology on modern cricket" },
  { id: 8, title: "Women's Cricket", description: "Growth and future of women's cricket" },
  { id: 9, title: "Cricket Leagues", description: "Comparison of major T20 leagues around the world" },
  { id: 10, title: "Cricket Stadiums", description: "Most iconic cricket stadiums and their histories" },
];

export default function Cricket() {
  const { user } = useAuth();
  const [reviews, setReviews] = useState({});
  const [editingReviewId, setEditingReviewId] = useState(null);

  const handleReviewUpdate = (id, review) => {
    setReviews(prevReviews => ({
      ...prevReviews,
      [id]: review
    }));
    setEditingReviewId(null);
  };

  const handleEditClick = (id) => {
    setEditingReviewId(id);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Cricket Insights</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cricketData.map((item) => (
          <React.Fragment key={item.id}>
            <CricketCard
              id={item.id}
              title={item.title}
              description={item.description}
              review={reviews[item.id] || ""}
              isAdmin={user?.isAdmin}
              onEditClick={() => handleEditClick(item.id)}
              isEditing={editingReviewId === item.id}
            />
            {editingReviewId === item.id && (
              <div className="col-span-1 md:col-span-2 lg:col-span-3">
                <ReviewEditor
                  initialValue={reviews[item.id] || ""}
                  onSubmit={(review) => handleReviewUpdate(item.id, review)}
                  onCancel={() => setEditingReviewId(null)}
                />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}