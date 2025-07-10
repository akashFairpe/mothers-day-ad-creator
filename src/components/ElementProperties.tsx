import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TextElement } from './DraggableElement';

interface ElementPropertiesProps {
  selectedElement: TextElement | undefined;
  onUpdate: (id: string, updates: Partial<TextElement>) => void;
}

const fonts = [
  'Arial, sans-serif',
  'Dancing Script, cursive',
  'Playfair Display, serif',
  'Georgia, serif',
  'Times New Roman, serif',
  'Helvetica, sans-serif',
  'Roboto, sans-serif'
];

export const ElementProperties: React.FC<ElementPropertiesProps> = ({ 
  selectedElement, 
  onUpdate 
}) => {
  if (!selectedElement) return null;

  return (
    <div className="border-t pt-4">
      <h3 className="font-bold mb-2">Selected Element Properties</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Font Family</label>
          <Select 
            value={selectedElement.fontFamily} 
            onValueChange={(value) => onUpdate(selectedElement.id, { fontFamily: value })}
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
            value={selectedElement.fontSize}
            onChange={(e) => onUpdate(selectedElement.id, { fontSize: e.target.value })}
            className="w-full p-2 border rounded-md"
            placeholder="1rem, 24px, etc."
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Color</label>
          <input
            type="color"
            value={selectedElement.color}
            onChange={(e) => onUpdate(selectedElement.id, { color: e.target.value })}
            className="w-full h-10 border rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Font Weight</label>
          <Select 
            value={selectedElement.fontWeight} 
            onValueChange={(value) => onUpdate(selectedElement.id, { fontWeight: value })}
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
  );
};