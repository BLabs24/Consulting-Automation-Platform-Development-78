import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiMoreVertical, FiEdit, FiTrash2, FiShare2, FiDownload, FiMessageSquare } = FiIcons;

const BlockCard = ({ block, viewMode }) => {
  const [showMenu, setShowMenu] = useState(false);

  const getBlockIcon = (type) => {
    const icons = {
      'interview-summary': FiIcons.FiUsers,
      'sop-uploader': FiIcons.FiUpload,
      'stakeholder-map': FiIcons.FiMap,
      'friction-cards': FiIcons.FiAlertTriangle,
      'impact-matrix': FiIcons.FiGrid,
      'feasibility-review': FiIcons.FiCheckCircle,
      'spec-sheet': FiIcons.FiFileText,
      'risk-map': FiIcons.FiShield,
      'implementation-tracker': FiIcons.FiTrendingUp,
      'strategy-deck': FiIcons.FiPresentation,
      'quick-wins': FiIcons.FiZap,
      'change-plan': FiIcons.FiMap,
    };
    return icons[type] || FiIcons.FiFile;
  };

  const getStatusColor = (status) => {
    const colors = {
      draft: 'bg-gray-100 text-gray-800',
      in_progress: 'bg-yellow-100 text-yellow-800',
      completed: 'bg-green-100 text-green-800',
      review: 'bg-blue-100 text-blue-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  if (viewMode === 'list') {
    return (
      <motion.div
        whileHover={{ scale: 1.01 }}
        className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:border-primary-200 transition-colors"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
              <SafeIcon icon={getBlockIcon(block.type)} className="w-5 h-5 text-primary-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">{block.title}</h3>
              <p className="text-sm text-gray-500">{block.description}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(block.status)}`}>
              {block.status?.replace('_', ' ')}
            </span>
            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-200"
              >
                <SafeIcon icon={FiMoreVertical} className="w-4 h-4" />
              </button>
              {showMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                  <div className="py-1">
                    <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                      <SafeIcon icon={FiEdit} className="w-4 h-4 mr-2" />
                      Edit
                    </button>
                    <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                      <SafeIcon icon={FiShare2} className="w-4 h-4 mr-2" />
                      Share
                    </button>
                    <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                      <SafeIcon icon={FiDownload} className="w-4 h-4 mr-2" />
                      Export
                    </button>
                    <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center">
                      <SafeIcon icon={FiTrash2} className="w-4 h-4 mr-2" />
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-gray-50 rounded-lg p-6 border border-gray-200 hover:border-primary-200 transition-colors"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
          <SafeIcon icon={getBlockIcon(block.type)} className="w-6 h-6 text-primary-600" />
        </div>
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-200"
          >
            <SafeIcon icon={FiMoreVertical} className="w-4 h-4" />
          </button>
          {showMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
              <div className="py-1">
                <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                  <SafeIcon icon={FiEdit} className="w-4 h-4 mr-2" />
                  Edit
                </button>
                <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                  <SafeIcon icon={FiShare2} className="w-4 h-4 mr-2" />
                  Share
                </button>
                <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                  <SafeIcon icon={FiDownload} className="w-4 h-4 mr-2" />
                  Export
                </button>
                <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center">
                  <SafeIcon icon={FiTrash2} className="w-4 h-4 mr-2" />
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mb-4">
        <h3 className="font-semibold text-gray-900 mb-2">{block.title}</h3>
        <p className="text-sm text-gray-600 mb-3">{block.description}</p>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(block.status)}`}>
          {block.status?.replace('_', ' ')}
        </span>
      </div>

      <div className="flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center space-x-2">
          <SafeIcon icon={FiMessageSquare} className="w-4 h-4" />
          <span>{block.comments?.length || 0} comments</span>
        </div>
        <div>
          v{block.version || 1}
        </div>
      </div>
    </motion.div>
  );
};

export default BlockCard;