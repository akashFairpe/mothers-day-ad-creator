import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Upload, Type } from 'lucide-react';
import { ElementProperties } from './ElementProperties';
import { TextElement } from './DraggableElement';

interface ControlPanelProps {
  isEditing: boolean;
  setIsEditing: (editing: boolean) => void;
  onAddElement: (type: TextElement['type']) => void;
  onImageUpload: () => void;
  backgroundColor: string;
  onBackgroundChange: (color: string) => void;
  selectedElement: TextElement | undefined;
  onUpdateElement: (id: string, updates: Partial<TextElement>) => void;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
  isEditing,
  setIsEditing,
  onAddElement,
  onImageUpload,
  backgroundColor,
  onBackgroundChange,
  selectedElement,
  onUpdateElement
}) => {
  return (
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
        <div className="space-y-4">
          {/* Add Elements */}
          <div className="flex flex-wrap gap-2">
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => onAddElement('heading')}
              className="flex items-center gap-1"
            >
              <Plus size={16} /> Heading
            </Button>
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => onAddElement('paragraph')}
              className="flex items-center gap-1"
            >
              <Type size={16} /> Text
            </Button>
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => onAddElement('button')}
              className="flex items-center gap-1"
            >
              <Plus size={16} /> Button
            </Button>
            <Button 
              size="sm" 
              variant="outline"
              onClick={onImageUpload}
              className="flex items-center gap-1"
            >
              <Upload size={16} /> Change Image
            </Button>
          </div>

          {/* Background Controls */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Background Color</label>
              <input
                type="color"
                value={backgroundColor}
                onChange={(e) => onBackgroundChange(e.target.value)}
                className="w-full h-10 border rounded-md"
              />
            </div>
          </div>

          <ElementProperties 
            selectedElement={selectedElement}
            onUpdate={onUpdateElement}
          />
        </div>
      )}
    </div>
  );
};