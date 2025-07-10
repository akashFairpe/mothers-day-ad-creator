import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import tulipsImage from '@/assets/tulips-footer.jpg';

interface AdContent {
  mainHeading: string;
  subheading: string;
  paragraph: string;
  discount: string;
  buttonText: string;
  footerLink: string;
  backgroundColor: string;
  fontColor: string;
  buttonColor: string;
  backgroundImage: string;
}

const MothersAdTemplate = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState<AdContent>({
    mainHeading: "Happy Mother's Day",
    subheading: "Celebrate Mom with flowers and love!",
    paragraph: "Enjoy a special discount on our floral gifts this Mother's Day",
    discount: "15% OFF",
    buttonText: "Shop Now",
    footerLink: "flowerstomom.site.com",
    backgroundColor: "#fce7f3", // Light pink
    fontColor: "#be185d", // Dark pink
    buttonColor: "#ec4899", // Medium pink
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

  const hearts = Array.from({ length: 8 }, (_, i) => (
    <div
      key={i}
      className="absolute animate-pulse"
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 80}%`,
        transform: `scale(${0.5 + Math.random() * 0.5})`,
        color: content.fontColor,
        fontSize: `${1 + Math.random()}rem`,
        opacity: 0.6
      }}
    >
      ♥
    </div>
  ));

  return (
    <div className="max-w-2xl mx-auto">
      {/* Controls */}
      <div className="mb-6 p-4 bg-white rounded-lg shadow-soft">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-mothers-day-gray">Mother's Day Ad Template</h2>
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
              <label className="block text-sm font-medium mb-1">Subheading</label>
              <input
                type="text"
                value={content.subheading}
                onChange={(e) => handleContentChange('subheading', e.target.value)}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Paragraph Text</label>
              <textarea
                value={content.paragraph}
                onChange={(e) => handleContentChange('paragraph', e.target.value)}
                className="w-full p-2 border rounded-md"
                rows={2}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Discount Text</label>
              <input
                type="text"
                value={content.discount}
                onChange={(e) => handleContentChange('discount', e.target.value)}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Button Text</label>
              <input
                type="text"
                value={content.buttonText}
                onChange={(e) => handleContentChange('buttonText', e.target.value)}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Footer Link</label>
              <input
                type="text"
                value={content.footerLink}
                onChange={(e) => handleContentChange('footerLink', e.target.value)}
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
              <label className="block text-sm font-medium mb-1">Font Color</label>
              <input
                type="color"
                value={content.fontColor}
                onChange={(e) => handleContentChange('fontColor', e.target.value)}
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
            className="absolute inset-0 opacity-50"
            style={{ backgroundColor: content.backgroundColor }}
          ></div>
        )}
        
        {/* Decorative Hearts */}
        {hearts}

        {/* Glittery Ribbons in Corners */}
        <div className="absolute top-0 left-0 w-16 h-16 opacity-20">
          <div className="w-full h-full bg-gradient-hearts rounded-br-full"></div>
        </div>
        <div className="absolute top-0 right-0 w-16 h-16 opacity-20">
          <div className="w-full h-full bg-gradient-hearts rounded-bl-full"></div>
        </div>

        {/* Main Content */}
        <div className="relative z-20 h-full flex flex-col justify-between p-8">
          {/* Header Section */}
          <div className="text-center space-y-6">
            {/* Main Heading */}
            <h1 
              className="text-6xl font-script font-bold"
              style={{ color: content.fontColor }}
            >
              {content.mainHeading}
            </h1>

            {/* Subheading */}
            <h2 
              className="text-2xl font-bold"
              style={{ color: content.fontColor === "#be185d" ? "#374151" : content.fontColor }}
            >
              {content.subheading}
            </h2>

            {/* Paragraph */}
            <p 
              className="text-lg max-w-md mx-auto"
              style={{ color: content.fontColor === "#be185d" ? "#6b7280" : content.fontColor }}
            >
              {content.paragraph}
            </p>
          </div>

          {/* Discount Section */}
          <div className="text-center space-y-6">
            <div className="flex items-center justify-center gap-6">
              <div 
                className="text-5xl font-bold"
                style={{ color: content.fontColor }}
              >
                {content.discount}
              </div>
              <Button 
                className="px-8 py-3 text-lg font-bold text-white shadow-button transition-all duration-300 hover:scale-105"
                style={{ backgroundColor: content.buttonColor }}
              >
                {content.buttonText}
              </Button>
            </div>
          </div>

          {/* Footer Section */}
          <div className="relative">
            {/* Tulip Image */}
            <div className="absolute bottom-0 left-0 right-0 h-24 overflow-hidden">
              <img 
                src={tulipsImage} 
                alt="Tulips" 
                className="w-full h-full object-cover object-center opacity-80"
              />
            </div>
            
            {/* Footer Link */}
            <div className="relative z-10 text-center pt-4">
              <p 
                className="text-sm font-medium"
                style={{ 
                  color: content.fontColor === "#be185d" ? "#374151" : content.fontColor,
                  textShadow: "0 1px 2px rgba(255,255,255,0.8)"
                }}
              >
                {content.footerLink}
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default MothersAdTemplate;