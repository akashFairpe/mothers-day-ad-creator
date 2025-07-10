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
    buttonColor: "#ec4899" // Medium pink
  });

  const handleContentChange = (field: keyof AdContent, value: string) => {
    setContent(prev => ({ ...prev, [field]: value }));
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
          </div>
        )}
      </div>

      {/* Ad Template */}
      <div 
        className="relative w-full h-[600px] rounded-lg shadow-soft overflow-hidden"
        style={{ backgroundColor: content.backgroundColor }}
      >
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
        <div className="relative z-10 h-full flex flex-col justify-between p-8">
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

      {/* HTML Export */}
      {isEditing && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-bold mb-2">HTML Code:</h3>
          <pre className="text-xs bg-white p-4 rounded border overflow-x-auto">
{`<!DOCTYPE html>
<html>
<head>
  <style>
    .mothers-day-ad {
      position: relative;
      width: 100%;
      max-width: 600px;
      height: 600px;
      background-color: ${content.backgroundColor};
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 4px 20px rgba(190, 24, 93, 0.1);
      font-family: Arial, sans-serif;
    }
    .main-heading {
      font-family: 'Dancing Script', cursive;
      font-size: 4rem;
      font-weight: bold;
      color: ${content.fontColor};
      text-align: center;
      margin: 2rem 0;
    }
    .subheading {
      font-size: 1.5rem;
      font-weight: bold;
      color: #374151;
      text-align: center;
      margin: 1rem 0;
    }
    .paragraph {
      font-size: 1.125rem;
      color: #6b7280;
      text-align: center;
      max-width: 400px;
      margin: 0 auto 2rem;
    }
    .discount-section {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 2rem;
      margin: 2rem 0;
    }
    .discount-text {
      font-size: 3rem;
      font-weight: bold;
      color: ${content.fontColor};
    }
    .shop-button {
      background-color: ${content.buttonColor};
      color: white;
      padding: 12px 32px;
      font-size: 1.125rem;
      font-weight: bold;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      box-shadow: 0 2px 8px rgba(236, 72, 153, 0.2);
    }
    .footer {
      position: absolute;
      bottom: 0;
      width: 100%;
      text-align: center;
      padding: 1rem;
      background: linear-gradient(transparent, rgba(255,255,255,0.8));
    }
    .hearts {
      position: absolute;
      color: ${content.fontColor};
      opacity: 0.6;
      animation: pulse 2s infinite;
    }
  </style>
  <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&display=swap" rel="stylesheet">
</head>
<body>
  <div class="mothers-day-ad">
    <div class="hearts" style="left: 10%; top: 20%;">♥</div>
    <div class="hearts" style="left: 85%; top: 15%;">♥</div>
    <div class="hearts" style="left: 15%; top: 70%;">♥</div>
    <div class="hearts" style="left: 80%; top: 60%;">♥</div>
    
    <div style="padding: 2rem; height: 100%; display: flex; flex-direction: column; justify-content: space-between;">
      <div>
        <h1 class="main-heading" contenteditable="true">${content.mainHeading}</h1>
        <h2 class="subheading" contenteditable="true">${content.subheading}</h2>
        <p class="paragraph" contenteditable="true">${content.paragraph}</p>
      </div>
      
      <div class="discount-section">
        <div class="discount-text" contenteditable="true">${content.discount}</div>
        <button class="shop-button" contenteditable="true">${content.buttonText}</button>
      </div>
      
      <div class="footer">
        <p contenteditable="true">${content.footerLink}</p>
      </div>
    </div>
  </div>
</body>
</html>`}
          </pre>
        </div>
      )}
    </div>
  );
};

export default MothersAdTemplate;