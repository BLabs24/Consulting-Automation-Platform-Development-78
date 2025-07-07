import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiDownload, FiShare2, FiClock, FiCheckCircle, FiLoader } = FiIcons;

const ReportCard = ({ report }) => {
  const getStatusIcon = (status) => {
    switch (status) {
      case 'ready': return FiCheckCircle;
      case 'generating': return FiLoader;
      case 'error': return FiIcons.FiAlertCircle;
      default: return FiClock;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'ready': return 'text-green-600 bg-green-50';
      case 'generating': return 'text-blue-600 bg-blue-50';
      case 'error': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'overview': return FiIcons.FiBarChart3;
      case 'interviews': return FiIcons.FiUsers;
      case 'friction': return FiIcons.FiAlertTriangle;
      case 'roadmap': return FiIcons.FiMap;
      default: return FiIcons.FiFileText;
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-gray-50 rounded-lg p-6 border border-gray-200 hover:border-primary-200 transition-colors"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
            <SafeIcon icon={getTypeIcon(report.type)} className="w-5 h-5 text-primary-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{report.title}</h3>
            <p className="text-sm text-gray-500">{report.description}</p>
          </div>
        </div>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getStatusColor(report.status)}`}>
          <SafeIcon 
            icon={getStatusIcon(report.status)} 
            className={`w-4 h-4 ${report.status === 'generating' ? 'animate-spin' : ''}`} 
          />
        </div>
      </div>

      <div className="mb-4">
        <div className="text-sm text-gray-500">
          {report.lastGenerated ? (
            <span>Last generated: {new Date(report.lastGenerated).toLocaleDateString()}</span>
          ) : (
            <span>Not yet generated</span>
          )}
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <button
          disabled={report.status !== 'ready'}
          className="flex-1 inline-flex items-center justify-center px-3 py-2 text-sm bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <SafeIcon icon={FiDownload} className="w-4 h-4 mr-2" />
          Download
        </button>
        <button
          disabled={report.status !== 'ready'}
          className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <SafeIcon icon={FiShare2} className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
};

export default ReportCard;