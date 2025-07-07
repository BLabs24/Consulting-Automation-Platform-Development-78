import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiCheckCircle, FiAlertCircle, FiClock, FiSettings, FiRefreshCw } = FiIcons;

const ConnectorCard = ({ connector }) => {
  const getStatusIcon = (status) => {
    switch (status) {
      case 'connected': return FiCheckCircle;
      case 'error': return FiAlertCircle;
      case 'pending': return FiClock;
      default: return FiClock;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'connected': return 'text-green-600 bg-green-50';
      case 'error': return 'text-red-600 bg-red-50';
      case 'pending': return 'text-yellow-600 bg-yellow-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'meeting': return FiIcons.FiVideo;
      case 'document': return FiIcons.FiFileText;
      case 'webhook': return FiIcons.FiLink;
      case 'form': return FiIcons.FiEdit;
      default: return FiIcons.FiZap;
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      className="bg-gray-50 rounded-lg p-6 border border-gray-200 hover:border-primary-200 transition-colors"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
            <SafeIcon icon={getTypeIcon(connector.type)} className="w-6 h-6 text-primary-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{connector.name}</h3>
            <p className="text-sm text-gray-500 capitalize">{connector.type} connector</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getStatusColor(connector.status)}`}>
            <SafeIcon icon={getStatusIcon(connector.status)} className="w-4 h-4" />
          </div>
          <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-200">
            <SafeIcon icon={FiSettings} className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-sm text-gray-500">Status</p>
          <p className="font-medium text-gray-900 capitalize">{connector.status}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Items Processed</p>
          <p className="font-medium text-gray-900">{connector.itemsProcessed}</p>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-500">
          {connector.lastSync ? (
            <span>Last sync: {new Date(connector.lastSync).toLocaleString()}</span>
          ) : (
            <span>Never synced</span>
          )}
        </div>
        <button className="inline-flex items-center px-3 py-1 text-sm bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
          <SafeIcon icon={FiRefreshCw} className="w-3 h-3 mr-1" />
          Sync Now
        </button>
      </div>
    </motion.div>
  );
};

export default ConnectorCard;