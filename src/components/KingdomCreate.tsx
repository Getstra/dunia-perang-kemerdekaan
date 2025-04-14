
import React, { useState } from 'react';
import { Crown, User } from 'lucide-react';

interface KingdomCreateProps {
  onCreateKingdom: (name: string, ruler: string) => void;
}

const KingdomCreate: React.FC<KingdomCreateProps> = ({ onCreateKingdom }) => {
  const [kingdomName, setKingdomName] = useState('');
  const [rulerName, setRulerName] = useState('');
  const [error, setError] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!kingdomName.trim() || !rulerName.trim()) {
      setError('Please provide both a kingdom name and ruler name.');
      return;
    }
    
    onCreateKingdom(kingdomName.trim(), rulerName.trim());
  };
  
  return (
    <div className="parchment max-w-md mx-auto my-10">
      <h2 className="medieval-heading text-2xl mb-4 text-center">Establish Your Kingdom</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="kingdom-name" className="block text-sm font-medium mb-1">
            Kingdom Name
          </label>
          <div className="flex">
            <div className="bg-parchment-dark p-2 border border-r-0 border-wood rounded-l-sm">
              <Crown className="w-5 h-5 text-royal-gold" />
            </div>
            <input
              id="kingdom-name"
              type="text"
              value={kingdomName}
              onChange={(e) => setKingdomName(e.target.value)}
              className="flex-1 p-2 border border-wood bg-parchment-light rounded-r-sm focus:outline-none focus:ring-1 focus:ring-royal-blue"
              placeholder="Enter your kingdom's name"
              maxLength={24}
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="ruler-name" className="block text-sm font-medium mb-1">
            Ruler Name
          </label>
          <div className="flex">
            <div className="bg-parchment-dark p-2 border border-r-0 border-wood rounded-l-sm">
              <User className="w-5 h-5 text-royal-blue" />
            </div>
            <input
              id="ruler-name"
              type="text"
              value={rulerName}
              onChange={(e) => setRulerName(e.target.value)}
              className="flex-1 p-2 border border-wood bg-parchment-light rounded-r-sm focus:outline-none focus:ring-1 focus:ring-royal-blue"
              placeholder="Enter your name"
              maxLength={24}
            />
          </div>
        </div>
        
        {error && (
          <div className="text-royal-red text-sm p-2 bg-red-50 border border-royal-red rounded-sm">
            {error}
          </div>
        )}
        
        <button
          type="submit"
          className="w-full medieval-button py-2 text-center"
        >
          Establish Kingdom
        </button>
      </form>
      
      <div className="mt-6 text-sm text-center text-muted-foreground">
        <p>Your journey awaits, noble ruler!</p>
        <p>Lead your kingdom to greatness through strategic planning and wise management.</p>
      </div>
    </div>
  );
};

export default KingdomCreate;
