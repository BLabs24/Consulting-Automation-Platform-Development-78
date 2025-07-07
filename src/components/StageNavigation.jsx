import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiCheck, FiCircle, FiLock } = FiIcons;

const StageNavigation = ({ stages, activeStage, currentStage, onStageChange }) => {
  const getStageIcon = (stage) => {
    if (stage.id < currentStage) return FiCheck;
    if (stage.id === currentStage) return FiCircle;
    return FiLock;
  };

  const getStageColor = (stage) => {
    if (stage.id < currentStage) return 'text-green-600 bg-green-100';
    if (stage.id === currentStage) return 'text-primary-600 bg-primary-100';
    return 'text-gray-400 bg-gray-100';
  };

  const canAccessStage = (stage) => stage.id <= currentStage;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Stages</h3>
      <div className="space-y-3">
        {stages.map((stage, index) => (
          <motion.button
            key={stage.id}
            onClick={() => canAccessStage(stage) && onStageChange(stage.id)}
            disabled={!canAccessStage(stage)}
            className={`w-full text-left p-3 rounded-lg transition-all ${
              activeStage === stage.id
                ? 'bg-primary-50 border-2 border-primary-200'
                : 'hover:bg-gray-50 border-2 border-transparent'
            } ${!canAccessStage(stage) ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            whileHover={canAccessStage(stage) ? { scale: 1.02 } : {}}
            whileTap={canAccessStage(stage) ? { scale: 0.98 } : {}}
          >
            <div className="flex items-center space-x-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getStageColor(stage)}`}>
                <SafeIcon icon={getStageIcon(stage)} className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <div className="font-medium text-gray-900">{stage.name}</div>
                <div className="text-sm text-gray-500">{stage.description}</div>
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default StageNavigation;