
import React, { useState } from "react";
import { HelpCircle, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/providers/ThemeProvider";

interface TutorialStep {
  title: string;
  content: string;
  image?: string;
}

interface GameTutorialProps {
  onClose: () => void;
}

const GameTutorial: React.FC<GameTutorialProps> = ({ onClose }) => {
  const { theme } = useTheme();
  const [currentStep, setCurrentStep] = useState(0);
  
  const tutorialSteps: TutorialStep[] = [
    {
      title: "Welcome to Kingdom Builder",
      content: "In this game, you'll build and manage your own medieval kingdom. Let's learn how to play!",
    },
    {
      title: "Create Your Kingdom",
      content: "Start by giving your kingdom a name and choosing a ruler. This will be your identity in the game world.",
    },
    {
      title: "Resource Management",
      content: "Monitor your resources at the top of the screen. You'll need gold, food, wood, stone, and population to grow your kingdom.",
    },
    {
      title: "Building Construction",
      content: "Construct buildings to produce more resources and expand your kingdom. Each building has a cost and provides different benefits.",
    },
    {
      title: "Research & Technology",
      content: "Advance your kingdom through research. New technologies will unlock more powerful buildings and abilities.",
    },
    {
      title: "Military & Diplomacy",
      content: "Train troops to defend your kingdom, and establish diplomatic relations with neighboring realms.",
    },
    {
      title: "Ready to Begin?",
      content: "That's all you need to know to get started! Remember, building a great kingdom takes time and strategy. Good luck, ruler!",
    },
  ];

  const handleNext = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onClose();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className={`neu-card ${theme} max-w-2xl w-full relative`}>
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute right-2 top-2" 
          onClick={onClose}
        >
          <X className="h-5 w-5" />
        </Button>
        
        <div className="flex items-center mb-4">
          <HelpCircle className="w-6 h-6 mr-2 text-amber-600" />
          <h2 className="text-2xl font-bold">Tutorial</h2>
        </div>
        
        <div className="mb-8">
          <div className="h-1 w-full bg-amber-900/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-amber-600 transition-all"
              style={{ width: `${((currentStep + 1) / tutorialSteps.length) * 100}%` }}
            ></div>
          </div>
        </div>
        
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-3">{tutorialSteps[currentStep].title}</h3>
          <p className="text-muted-foreground">{tutorialSteps[currentStep].content}</p>
        </div>
        
        {tutorialSteps[currentStep].image && (
          <div className="mb-6 p-4 border border-amber-800/30 rounded-md bg-amber-900/5">
            <img 
              src={tutorialSteps[currentStep].image} 
              alt={tutorialSteps[currentStep].title} 
              className="w-full h-auto rounded-md" 
            />
          </div>
        )}
        
        <div className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={handlePrevious} 
            disabled={currentStep === 0}
            className="flex items-center gap-1"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </Button>
          
          <Button 
            onClick={handleNext} 
            className="flex items-center gap-1"
          >
            {currentStep === tutorialSteps.length - 1 ? "Finish" : "Next"}
            {currentStep !== tutorialSteps.length - 1 && <ChevronRight className="w-4 h-4" />}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GameTutorial;
