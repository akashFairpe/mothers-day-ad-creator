import React from 'react';
import { useDrag } from 'react-dnd';
import { Trash2 } from 'lucide-react';

export interface TextElement {
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

interface DraggableElementProps {
  element: TextElement;
  isEditing: boolean;
  onUpdate: (id: string, updates: Partial<TextElement>) => void;
  onDelete: (id: string) => void;
}

export const DraggableElement: React.FC<DraggableElementProps> = ({ 
  element, 
  isEditing, 
  onUpdate, 
  onDelete 
}) => {
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
          className="absolute bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
          style={{ 
            left: `${element.x + 20}%`, 
            top: `${element.y - 2}%`,
            transform: 'translate(-50%, -50%)'
          }}
        >
          <Trash2 size={12} />
        </button>
      )}
    </div>
  );
};