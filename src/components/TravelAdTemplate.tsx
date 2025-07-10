import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

interface AdContent {
  mainTitle: string;
  subtitle: string;
  discountText: string;
  motivationalLine: string;
  ctaText: string;
  backgroundColor: string;
  borderColor: string;
  titleColor: string;
  subtitleColor: string;
  discountColor: string;
  motivationalColor: string;
  ctaBackgroundColor: string;
  ctaTextColor: string;
  travelerImage: string;
}

const TravelAdTemplate = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState<AdContent>({
    mainTitle: "GLOBAL",
    subtitle: "ADVENTURES",
    discountText: "DISCOUNT UP TO 50%",
    motivationalLine: "WE TAKE THE THRILL OF TRAVEL TO THE NEXT LEVEL",
    ctaText: "SWIPE UP",
    backgroundColor: "#7c3aed", // Purple
    borderColor: "#fbbf24", // Yellow
    titleColor: "#fbbf24", // Yellow
    subtitleColor: "#ffffff", // White
    discountColor: "#000000", // Black
    motivationalColor: "#ffffff", // White
    ctaBackgroundColor: "#fbbf24", // Yellow
    ctaTextColor: "#000000", // Black
    travelerImage: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=400&fit=crop&crop=face"
  });

  const handleContentChange = (field: keyof AdContent, value: string) => {
    setContent(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        handleContentChange('travelerImage', result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Controls */}
      <div className="mb-6 p-4 bg-white rounded-lg shadow-soft">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-mothers-day-gray">Travel Ad Template</h2>
          <Button 
            onClick={() => setIsEditing(!isEditing)}
            variant={isEditing ? "destructive" : "default"}
          >
            {isEditing ? "Preview" : "Edit"}
          </Button>
        </div>
        
        {isEditing && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Main Title</label>
              <input
                type="text"
                value={content.mainTitle}
                onChange={(e) => handleContentChange('mainTitle', e.target.value)}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Subtitle</label>
              <input
                type="text"
                value={content.subtitle}
                onChange={(e) => handleContentChange('subtitle', e.target.value)}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Discount Text</label>
              <input
                type="text"
                value={content.discountText}
                onChange={(e) => handleContentChange('discountText', e.target.value)}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Motivational Line</label>
              <textarea
                value={content.motivationalLine}
                onChange={(e) => handleContentChange('motivationalLine', e.target.value)}
                className="w-full p-2 border rounded-md"
                rows={2}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">CTA Text</label>
              <input
                type="text"
                value={content.ctaText}
                onChange={(e) => handleContentChange('ctaText', e.target.value)}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Traveler Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Background Color</label>
              <input
                type="color"
                value={content.backgroundColor}
                onChange={(e) => handleContentChange('backgroundColor', e.target.value)}
                className="w-full h-10 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Border Color</label>
              <input
                type="color"
                value={content.borderColor}
                onChange={(e) => handleContentChange('borderColor', e.target.value)}
                className="w-full h-10 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Title Color</label>
              <input
                type="color"
                value={content.titleColor}
                onChange={(e) => handleContentChange('titleColor', e.target.value)}
                className="w-full h-10 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">CTA Background</label>
              <input
                type="color"
                value={content.ctaBackgroundColor}
                onChange={(e) => handleContentChange('ctaBackgroundColor', e.target.value)}
                className="w-full h-10 border rounded-md"
              />
            </div>
          </div>
        )}
      </div>

      {/* Travel Ad Template */}
      <div 
        className="relative w-full h-[600px] rounded-lg shadow-soft overflow-hidden"
        style={{ 
          backgroundColor: content.backgroundColor,
          border: `3px solid ${content.borderColor}`
        }}
      >
        {/* Top Section - Title */}
        <div className="text-center pt-8 pb-4">
          <h1 
            className="text-4xl font-bold tracking-wider"
            style={{ color: content.titleColor }}
          >
            {content.mainTitle}
          </h1>
          <div className="w-24 h-0.5 bg-white mx-auto my-2"></div>
          <h2 
            className="text-lg font-semibold tracking-widest"
            style={{ color: content.subtitleColor }}
          >
            {content.subtitle}
          </h2>
        </div>

        {/* Central Circle with Traveler Image */}
        <div className="flex justify-center my-6">
          <div 
            className="w-48 h-48 rounded-full overflow-hidden border-4"
            style={{ borderColor: content.borderColor }}
          >
            <img 
              src={content.travelerImage} 
              alt="Happy Traveler" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Discount Banner */}
        <div 
          className="w-full py-4 my-6"
          style={{ backgroundColor: content.ctaBackgroundColor }}
        >
          <h3 
            className="text-2xl font-bold text-center tracking-wide"
            style={{ color: content.discountColor }}
          >
            {content.discountText}
          </h3>
        </div>

        {/* Motivational Line */}
        <div className="px-8 text-center">
          <p 
            className="text-sm font-bold tracking-wide leading-tight"
            style={{ color: content.motivationalColor }}
          >
            {content.motivationalLine}
          </p>
        </div>

        {/* CTA Button */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div 
            className="px-12 py-3 rounded-md shadow-lg cursor-pointer hover:scale-105 transition-transform"
            style={{ 
              backgroundColor: content.ctaBackgroundColor,
              border: `2px solid ${content.borderColor}`
            }}
          >
            <span 
              className="text-lg font-bold tracking-wider"
              style={{ color: content.ctaTextColor }}
            >
              {content.ctaText}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TravelAdTemplate;