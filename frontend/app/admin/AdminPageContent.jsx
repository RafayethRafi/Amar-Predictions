import React from 'react';
import ImageUploadForm from '@/components/Forms/ImageUploadForm';

const AdminPageContent = ({ auth }) => {
  const api = process.env.NEXT_PUBLIC_API_URL;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Page</h1>
      <div className="space-y-8">
        <ImageUploadForm 
          title="Update Hero Image" 
          endpoint="/admin/hero_image_update" 
          token={auth.token} 
        />
        <ImageUploadForm 
          title="Update Cricket Background Image" 
          endpoint="/admin/cricket_image_update" 
          token={auth.token} 
        />
        <ImageUploadForm 
          title="Update Football Background Image" 
          endpoint="/admin/football_image_update" 
          token={auth.token} 
        />
      </div>
    </div>
  );
};

export default AdminPageContent;