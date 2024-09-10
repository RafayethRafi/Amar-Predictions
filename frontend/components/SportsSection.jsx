import Image from 'next/image';

export default function SportsSection({ title, image, buttonText }) {
  const renderImage = () => {
    if (!image || !image.image) {
      return null; // Or you could return a placeholder image
    }

    if (typeof image.image === 'string' && (image.image.startsWith('data:image') || image.image.startsWith('iVBORw0KGgoAAAANSUhEUgAA'))) {
      return (
        <img 
          src={image.image.startsWith('data:image') ? image.image : `data:image/png;base64,${image.image}`}
          alt={image.altText || `${title} image`}
          className="absolute inset-0 w-full h-full object-cover"
        />
      );
    }

    // Assume it's a URL if it's not base64
    return (
      <Image
        src={image.image}
        alt={image.altText || `${title} image`}
        layout="fill"
        objectFit="cover"
      />
    );
  };

  return (
    <div className="relative h-96 w-full md:w-1/2">
      {renderImage()}
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center">
        <h2 className="text-3xl text-white font-bold mb-4">{title}</h2>
        <button className="bg-white text-black py-2 px-4 rounded hover:bg-gray-200 transition-colors">
          {buttonText}
        </button>
      </div>
    </div>
  );
}