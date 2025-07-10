import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Upload, Move, Type, Trash2 } from 'lucide-react';
import tulipsImage from '@/assets/tulips-footer.jpg';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

interface TextElement {
  id: string;
  type: 'heading' | 'subheading' | 'paragraph' | 'discount' | 'button' | 'link';
  content: string;
  x: number;
  y: number;
  fontSize: string;
  fontFamily: string;
  color: string;
  fontWeight: string;
}

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

const DraggableElement: React.FC<{
  element: TextElement;
  isEditing: boolean;
  onUpdate: (id: string, updates: Partial<TextElement>) => void;
  onDelete: (id: string) => void;
}> = ({ element, isEditing, onUpdate, onDelete }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'element',
    item: { type: 'element', id: element.id, x: element.x, y: element.y },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const handleContentChange = (content: string) => {
    onUpdate(element.id, { content });
  };

  const getElementStyles = () => {
    const baseStyles = {
      position: 'absolute' as const,
      left: `${element.x}%`,
      top: `${element.y}%`,
      color: element.color,
      fontSize: element.fontSize,
      fontFamily: element.fontFamily,
      fontWeight: element.fontWeight,
      cursor: isEditing ? 'move' : 'default',
      opacity: isDragging ? 0.5 : 1,
      maxWidth: '300px',
      wordWrap: 'break-word' as const,
    };

    if (element.type === 'button') {
      return {
        ...baseStyles,
        backgroundColor: element.color,
        color: 'white',
        padding: '8px 16px',
        borderRadius: '4px',
        border: 'none',
        fontWeight: 'bold',
      };
    }

    return baseStyles;
  };

  const renderElement = () => {
    if (element.type === 'button') {
      return (
        <button style={getElementStyles()}>
          {isEditing ? (
            <input
              value={element.content}
              onChange={(e) => handleContentChange(e.target.value)}
              className="bg-transparent border-none outline-none text-white"
              style={{ color: 'white' }}
            />
          ) : (
            element.content
          )}
        </button>
      );
    }

    const Tag = element.type === 'heading' ? 'h1' : 
               element.type === 'subheading' ? 'h2' : 
               element.type === 'discount' ? 'div' : 'p';

    return (
      <Tag style={getElementStyles()}>
        {isEditing ? (
          <input
            value={element.content}
            onChange={(e) => handleContentChange(e.target.value)}
            className="bg-transparent border-none outline-none"
            style={{ color: element.color, fontSize: 'inherit', fontFamily: 'inherit' }}
          />
        ) : (
          element.content
        )}
      </Tag>
    );
  };

  return (
    <div ref={isEditing ? drag : undefined}>
      {renderElement()}
      {isEditing && (
        <button
          onClick={() => onDelete(element.id)}
          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
          style={{ left: `${element.x + 20}%`, top: `${element.y - 2}%` }}
        >
          <Trash2 size={12} />
        </button>
      )}
    </div>
  );
};

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
        const newX = Math.max(0, Math.min(90, item.x + (delta.x / window.innerWidth) * 100));
        const newY = Math.max(0, Math.min(90, item.y + (delta.y / window.innerHeight) * 100));
        
        updateElement(item.id, { x: newX, y: newY });
      }
    },
  });

  const fonts = [
    'Arial, sans-serif',
    'Dancing Script, cursive',
    'Playfair Display, serif',
    'Georgia, serif',
    'Times New Roman, serif',
    'Helvetica, sans-serif',
    'Roboto, sans-serif'
  ];

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
        {/* Controls */}
        <div className="mb-6 p-4 bg-white rounded-lg shadow-soft">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-mothers-day-gray">Mother's Day Ad Template</h2>
            <div className="flex gap-2">
              <Button 
                onClick={() => setIsEditing(!isEditing)}
                variant={isEditing ? "destructive" : "default"}
              >
                {isEditing ? "Preview" : "Edit"}
              </Button>
            </div>
          </div>
          
          {isEditing && (
            <div className="space-y-4">
              {/* Add Elements */}
              <div className="flex flex-wrap gap-2">
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => addNewElement('heading')}
                  className="flex items-center gap-1"
                >
                  <Plus size={16} /> Heading
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => addNewElement('paragraph')}
                  className="flex items-center gap-1"
                >
                  <Type size={16} /> Text
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => addNewElement('button')}
                  className="flex items-center gap-1"
                >
                  <Plus size={16} /> Button
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-1"
                >
                  <Upload size={16} /> Change Image
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>

              {/* Background Controls */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Background Color</label>
                  <input
                    type="color"
                    value={content.backgroundColor}
                    onChange={(e) => setContent(prev => ({ ...prev, backgroundColor: e.target.value }))}
                    className="w-full h-10 border rounded-md"
                  />
                </div>
              </div>

              {/* Element Properties */}
              {selectedElementData && (
                <div className="border-t pt-4">
                  <h3 className="font-bold mb-2">Selected Element Properties</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Font Family</label>
                      <Select 
                        value={selectedElementData.fontFamily} 
                        onValueChange={(value) => updateElement(selectedElement, { fontFamily: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {fonts.map(font => (
                            <SelectItem key={font} value={font}>{font.split(',')[0]}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Font Size</label>
                      <input
                        type="text"
                        value={selectedElementData.fontSize}
                        onChange={(e) => updateElement(selectedElement, { fontSize: e.target.value })}
                        className="w-full p-2 border rounded-md"
                        placeholder="1rem, 24px, etc."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Color</label>
                      <input
                        type="color"
                        value={selectedElementData.color}
                        onChange={(e) => updateElement(selectedElement, { color: e.target.value })}
                        className="w-full h-10 border rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Font Weight</label>
                      <Select 
                        value={selectedElementData.fontWeight} 
                        onValueChange={(value) => updateElement(selectedElement, { fontWeight: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="normal">Normal</SelectItem>
                          <SelectItem value="bold">Bold</SelectItem>
                          <SelectItem value="lighter">Lighter</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

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