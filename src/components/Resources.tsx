
import React from 'react';
import { Resources as ResourcesType } from '../utils/types';
import { Coins, Map, Users, Wheat, Trees, Pickaxe } from 'lucide-react';

interface ResourcesProps {
  resources: ResourcesType;
}

const Resources: React.FC<ResourcesProps> = ({ resources }) => {
  const resourceItems = [
    { icon: <Coins className="w-5 h-5 text-royal-gold" />, name: 'Gold', value: resources.gold },
    { icon: <Map className="w-5 h-5 text-wood-dark" />, name: 'Land', value: resources.land },
    { icon: <Users className="w-5 h-5 text-royal-blue" />, name: 'Population', value: resources.population },
    { icon: <Wheat className="w-5 h-5 text-royal-gold" />, name: 'Food', value: resources.food },
    { icon: <Trees className="w-5 h-5 text-wood-dark" />, name: 'Wood', value: resources.wood },
    { icon: <Pickaxe className="w-5 h-5 text-stone" />, name: 'Stone', value: resources.stone },
  ];

  return (
    <div className="parchment mb-4">
      <h2 className="medieval-heading text-xl mb-2">Kingdom Resources</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
        {resourceItems.map((item) => (
          <div key={item.name} className="bg-parchment-light p-2 rounded-sm border border-wood flex items-center">
            <div className="mr-2">{item.icon}</div>
            <div>
              <div className="text-sm font-medium">{item.name}</div>
              <div className="text-lg">{item.value.toLocaleString()}</div>
            </div>
          </div>
        ))}
      </div>
      
      <h3 className="medieval-heading text-lg mt-4 mb-2">Specialists</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        <div className="bg-parchment-light p-2 rounded-sm border border-wood">
          <div className="text-sm font-medium">Farmers</div>
          <div className="text-lg">{resources.specialists.farmers}</div>
        </div>
        <div className="bg-parchment-light p-2 rounded-sm border border-wood">
          <div className="text-sm font-medium">Miners</div>
          <div className="text-lg">{resources.specialists.miners}</div>
        </div>
        <div className="bg-parchment-light p-2 rounded-sm border border-wood">
          <div className="text-sm font-medium">Soldiers</div>
          <div className="text-lg">{resources.specialists.soldiers}</div>
        </div>
        <div className="bg-parchment-light p-2 rounded-sm border border-wood">
          <div className="text-sm font-medium">Scholars</div>
          <div className="text-lg">{resources.specialists.scholars}</div>
        </div>
      </div>
    </div>
  );
};

export default Resources;
