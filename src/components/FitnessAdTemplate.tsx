import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowUp } from 'lucide-react';

interface AdContent {
  mainHeading: string;
  motivationText: string;
  goalStatement: string;
  discountText: string;
  ctaText: string;
  websiteUrl: string;
  swipeText: string;
  backgroundColor: string;
  textColor: string;
  accentColor: string;
  backgroundImage: string;
}

const FitnessAdTemplate = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState<AdContent>({
    mainHeading: "NEW FITNESS CENTER",
    motivationText: "CHANGE YOUR HABITS",
    goalStatement: "BECOME STRONGER",
    discountText: "UP TO 30% OFF",
    ctaText: "JOIN NOW",
    websiteUrl: "www.fitnesscenter.site.com",
    swipeText: "SWIPE UP",
    backgroundColor: "#D4A574", // Warm orange/tan
    textColor: "#000000", // Black
    accentColor: "#FF6B35", // Orange for accents
    backgroundImage: ""
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
        handleContentChange('backgroundImage', result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Controls */}
      <div className="mb-6 p-4 bg-white rounded-lg shadow-soft">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-mothers-day-gray">Fitness Ad Template</h2>
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
              <label className="block text-sm font-medium mb-1">Main Heading</label>
              <input
                type="text"
                value={content.mainHeading}
                onChange={(e) => handleContentChange('mainHeading', e.target.value)}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Motivation Text</label>
              <input
                type="text"
                value={content.motivationText}
                onChange={(e) => handleContentChange('motivationText', e.target.value)}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Goal Statement</label>
              <input
                type="text"
                value={content.goalStatement}
                onChange={(e) => handleContentChange('goalStatement', e.target.value)}
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
              <label className="block text-sm font-medium mb-1">CTA Text</label>
              <input
                type="text"
                value={content.ctaText}
                onChange={(e) => handleContentChange('ctaText', e.target.value)}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Website URL</label>
              <input
                type="text"
                value={content.websiteUrl}
                onChange={(e) => handleContentChange('websiteUrl', e.target.value)}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Swipe Text</label>
              <input
                type="text"
                value={content.swipeText}
                onChange={(e) => handleContentChange('swipeText', e.target.value)}
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
              <label className="block text-sm font-medium mb-1">Text Color</label>
              <input
                type="color"
                value={content.textColor}
                onChange={(e) => handleContentChange('textColor', e.target.value)}
                className="w-full h-10 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Accent Color</label>
              <input
                type="color"
                value={content.accentColor}
                onChange={(e) => handleContentChange('accentColor', e.target.value)}
                className="w-full h-10 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Background Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full p-2 border rounded-md"
              />
            </div>
          </div>
        )}
      </div>

      {/* Ad Template */}
      <div 
        className="relative w-full h-[600px] rounded-lg shadow-soft overflow-hidden"
        style={{ 
          backgroundColor: content.backgroundColor,
          backgroundImage: content.backgroundImage ? `url(${content.backgroundImage})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Background Overlay */}
        {content.backgroundImage && (
          <div 
            className="absolute inset-0 opacity-70"
            style={{ backgroundColor: content.backgroundColor }}
          ></div>
        )}

        {/* Main Content Container */}
        <div className="relative z-20 h-full flex flex-col">
          {/* Top Section - Heading */}
          <div className="p-6 text-left">
            <div className="space-y-2">
              <div 
                className="text-2xl font-bold uppercase tracking-wide"
                style={{ color: content.textColor }}
              >
                NEW
              </div>
              <div 
                className="w-20 h-0.5"
                style={{ backgroundColor: content.textColor }}
              ></div>
              <div 
                className="text-2xl font-bold uppercase tracking-wide"
                style={{ color: content.textColor }}
              >
                FITNESS CENTER
              </div>
            </div>
          </div>

          {/* Vertical Banner - Right Side */}
          <div 
            className="absolute right-0 top-16 bottom-16 w-16 flex items-center justify-center"
            style={{ backgroundColor: content.textColor }}
          >
            <div 
              className="text-white text-sm font-bold uppercase tracking-wider"
              style={{ writingMode: 'vertical-rl', textOrientation: 'upright' }}
            >
              {content.motivationText}
            </div>
          </div>

          {/* Middle Section - Goal Statement */}
          <div className="flex-1 flex items-center justify-center px-6">
            <div className="text-center">
              <h2 
                className="text-4xl font-bold uppercase tracking-wide"
                style={{ 
                  color: 'white',
                  textShadow: `2px 2px 0px ${content.accentColor}`
                }}
              >
                {content.goalStatement}
              </h2>
            </div>
          </div>

          {/* Discount Strip */}
          <div className="bg-white py-4 mx-6 my-4">
            <div 
              className="text-center text-xl font-bold uppercase tracking-wide"
              style={{ color: content.accentColor }}
            >
              {content.discountText}
            </div>
          </div>

          {/* CTA Section */}
          <div 
            className="py-6 mx-6 mb-4"
            style={{ backgroundColor: content.accentColor }}
          >
            <div className="text-center text-2xl font-bold uppercase text-white tracking-wide">
              {content.ctaText}
            </div>
          </div>

          {/* Website Footer */}
          <div className="px-6 py-4 space-y-2">
            <div 
              className="w-full h-0.5"
              style={{ backgroundColor: content.textColor }}
            ></div>
            <div 
              className="text-center text-sm"
              style={{ color: content.textColor }}
            >
              {content.websiteUrl}
            </div>
            <div 
              className="w-full h-0.5"
              style={{ backgroundColor: content.textColor }}
            ></div>
          </div>

          {/* Swipe Up Button */}
          <div className="pb-6 px-6">
            <div className="flex flex-col items-center space-y-2">
              <ArrowUp 
                className="w-6 h-6"
                style={{ color: content.textColor }}
              />
              <div 
                className="bg-white px-8 py-2 rounded-full"
                style={{ border: `2px solid ${content.textColor}` }}
              >
                <span 
                  className="font-bold uppercase text-sm"
                  style={{ color: content.textColor }}
                >
                  {content.swipeText}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FitnessAdTemplate;