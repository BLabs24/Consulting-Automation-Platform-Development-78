import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useProject } from '../context/ProjectContext';
import BlockCard from './BlockCard';
import CreateBlockModal from './CreateBlockModal';

const { FiPlus, FiGrid, FiList } = FiIcons;

const BlockGrid = ({ projectId, stage, blocks }) => {
  const [viewMode, setViewMode] = useState('grid');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const stageBlocks = {
    1: [ // Discovery
      { type: 'interview-summary', title: 'Interview Summary', icon: FiIcons.FiUsers },
      { type: 'sop-uploader', title: 'SOP Uploader', icon: FiIcons.FiUpload },
      { type: 'stakeholder-map', title: 'Stakeholder Map', icon: FiIcons.FiMap },
    ],
    2: [ // Insight Index
      { type: 'friction-cards', title: 'Friction Cards', icon: FiIcons.FiAlertTriangle },
      { type: 'impact-matrix', title: 'Impact Matrix', icon: FiIcons.FiGrid },
      { type: 'feasibility-review', title: 'Feasibility Review', icon: FiIcons.FiCheckCircle },
    ],
    3: [ // Solution Studio
      { type: 'spec-sheet', title: 'Spec Sheet', icon: FiIcons.FiFileText },
      { type: 'risk-map', title: 'Risk Map', icon: FiIcons.FiShield },
      { type: 'implementation-tracker', title: 'Implementation Tracker', icon: FiIcons.FiTrendingUp },
    ],
    4: [ // Roadmap
      { type: 'strategy-deck', title: 'Strategy Deck', icon: FiIcons.FiPresentation },
      { type: 'quick-wins', title: 'Quick Wins', icon: FiIcons.FiZap },
      { type: 'change-plan', title: 'Change Plan (Bee Hat)', icon: FiIcons.FiMap },
    ]
  };

  const availableBlocks = stageBlocks[stage] || [];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">
            Stage {stage} Blocks
          </h2>
          <div className="flex items-center space-x-3">
            <div className="flex items-center bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'grid' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
                }`}
              >
                <SafeIcon icon={FiGrid} className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'list' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
                }`}
              >
                <SafeIcon icon={FiList} className="w-4 h-4" />
              </button>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              <SafeIcon icon={FiPlus} className="w-4 h-4 mr-2" />
              Add Block
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        {blocks.length > 0 ? (
          <div className={`${
            viewMode === 'grid' 
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
              : 'space-y-4'
          }`}>
            {blocks.map((block, index) => (
              <motion.div
                key={block.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <BlockCard block={block} viewMode={viewMode} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <SafeIcon icon={FiGrid} className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No blocks yet</h3>
            <p className="text-gray-500 mb-4">
              Add your first block to start organizing your project work
            </p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              <SafeIcon icon={FiPlus} className="w-4 h-4 mr-2" />
              Add First Block
            </button>
          </div>
        )}
      </div>

      <CreateBlockModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        projectId={projectId}
        stage={stage}
        availableBlocks={availableBlocks}
      />
    </div>
  );
};

export default BlockGrid;