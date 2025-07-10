import React, { useState, useRef } from 'react';
import { DndProvider, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import tulipsImage from '@/assets/tulips-footer.jpg';
import { DraggableElement, TextElement } from './DraggableElement';
import { ControlPanel } from './ControlPanel';

interface AdContent {
  backgroundColor: string;
  backgroundImage: string;
  elements: TextElement[];
}

interface DragItem {
  type: string;
  id: string;
  x: number;
  y: number;
}

const MothersAdTemplate = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedElement, setSelectedElement] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [content, setContent] = useState<AdContent>({
    backgroundColor: "#fce7f3",
    backgroundImage: tulipsImage,
    elements: [
      {
        id: '1',
        type: 'heading',
        content: "Happy Mother's Day",
        x: 50,
        y: 15,
        fontSize: '4rem',
        fontFamily: 'Dancing Script, cursive',
        color: '#be185d',
        fontWeight: 'bold'
      },
      {
        id: '2',
        type: 'subheading',
        content: "Celebrate Mom with flowers and love!",
        x: 50,
        y: 35,
        fontSize: '1.5rem',
        fontFamily: 'Arial, sans-serif',
        color: '#374151',
        fontWeight: 'bold'
      },
      {
        id: '3',
        type: 'paragraph',
        content: "Enjoy a special discount on our floral gifts this Mother's Day",
        x: 50,
        y: 50,
        fontSize: '1.125rem',
        fontFamily: 'Arial, sans-serif',
        color: '#6b7280',
        fontWeight: 'normal'
      },
      {
        id: '4',
        type: 'discount',
        content: "15% OFF",
        x: 30,
        y: 70,
        fontSize: '3rem',
        fontFamily: 'Arial, sans-serif',
        color: '#be185d',
        fontWeight: 'bold'
      },
      {
        id: '5',
        type: 'button',
        content: "Shop Now",
        x: 60,
        y: 72,
        fontSize: '1.125rem',
        fontFamily: 'Arial, sans-serif',
        color: '#ec4899',
        fontWeight: 'bold'
      },
      {
        id: '6',
        type: 'link',
        content: "flowerstomom.site.com",
        x: 50,
        y: 90,
        fontSize: '0.875rem',
        fontFamily: 'Arial, sans-serif',
        color: '#374151',
        fontWeight: 'normal'
      }
    ]
  });

  const [, drop] = useDrop({
    accept: 'element',
    drop: (item: DragItem, monitor) => {
      const delta = monitor.getDifferenceFromInitialOffset();
      if (delta) {
        const newX = Math.max(0, Math.min(90, item.x + (delta.x / 600) * 100));
        const newY = Math.max(0, Math.min(90, item.y + (delta.y / 600) * 100));
        
        updateElement(item.id, { x: newX, y: newY });
      }
    },
  });

  const updateElement = (id: string, updates: Partial<TextElement>) => {
    setContent(prev => ({
      ...prev,
      elements: prev.elements.map(el => 
        el.id === id ? { ...el, ...updates } : el
      )
    }));
  };

  const deleteElement = (id: string) => {
    setContent(prev => ({
      ...prev,
      elements: prev.elements.filter(el => el.id !== id)
    }));
    setSelectedElement('');
  };

  const addNewElement = (type: TextElement['type']) => {
    const newElement: TextElement = {
      id: Date.now().toString(),
      type,
      content: type === 'button' ? 'New Button' : 'New Text',
      x: 50,
      y: 50,
      fontSize: type === 'heading' ? '2rem' : '1rem',
      fontFamily: 'Arial, sans-serif',
      color: '#000000',
      fontWeight: type === 'heading' ? 'bold' : 'normal'
    };

    setContent(prev => ({
      ...prev,
      elements: [...prev.elements, newElement]
    }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setContent(prev => ({
          ...prev,
          backgroundImage: e.target?.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const selectedElementData = content.elements.find(el => el.id === selectedElement);

  const hearts = Array.from({ length: 8 }, (_, i) => (
    <div
      key={i}
      className="absolute animate-pulse pointer-events-none"
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 80}%`,
        transform: `scale(${0.5 + Math.random() * 0.5})`,
        color: '#be185d',
        fontSize: `${1 + Math.random()}rem`,
        opacity: 0.6
      }}
    >
      ♥
    </div>
  ));

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="max-w-4xl mx-auto">
        <ControlPanel
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          onAddElement={addNewElement}
          onImageUpload={() => fileInputRef.current?.click()}
          backgroundColor={content.backgroundColor}
          onBackgroundChange={(color) => setContent(prev => ({ ...prev, backgroundColor: color }))}
          selectedElement={selectedElementData}
          onUpdateElement={updateElement}
        />

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />

        {/* Ad Template */}
        <div 
          ref={drop}
          className="relative w-full h-[600px] rounded-lg shadow-soft overflow-hidden"
          style={{ backgroundColor: content.backgroundColor }}
        >
          {/* Background Image */}
          <div className="absolute bottom-0 left-0 right-0 h-24 overflow-hidden">
            <img 
              src={content.backgroundImage} 
              alt="Background" 
              className="w-full h-full object-cover object-center opacity-80"
            />
          </div>

          {/* Decorative Hearts */}
          {hearts}

          {/* Glittery Ribbons in Corners */}
          <div className="absolute top-0 left-0 w-16 h-16 opacity-20">
            <div className="w-full h-full bg-gradient-hearts rounded-br-full"></div>
          </div>
          <div className="absolute top-0 right-0 w-16 h-16 opacity-20">
            <div className="w-full h-full bg-gradient-hearts rounded-bl-full"></div>
          </div>

          {/* Draggable Elements */}
          {content.elements.map((element) => (
            <div 
              key={element.id}
              onClick={() => isEditing && setSelectedElement(element.id)}
              className={selectedElement === element.id ? 'ring-2 ring-blue-500' : ''}
            >
              <DraggableElement
                element={element}
                isEditing={isEditing}
                onUpdate={updateElement}
                onDelete={deleteElement}
              />
            </div>
          ))}

          {isEditing && (
            <div className="absolute top-2 left-2 text-xs text-gray-600 bg-white/80 p-2 rounded">
              Click elements to select • Drag to move • Use controls above to customize
            </div>
          )}
        </div>
      </div>
    </DndProvider>
  );
};

export default MothersAdTemplate;