import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import MothersAdTemplate from '@/components/MothersAdTemplate';

const Index = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-gradient-mothers-day p-6">
        <div className="container mx-auto">
          <MothersAdTemplate />
        </div>
      </div>
    </DndProvider>
  );
};

export default Index;
