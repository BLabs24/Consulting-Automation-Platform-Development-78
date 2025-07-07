import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiX, FiPlus, FiVideo, FiFileText, FiLink, FiEdit, FiUpload } = FiIcons;

const AddConnectorModal = ({ isOpen, onClose }) => {
  const [selectedType, setSelectedType] = useState('');

  const connectorTypes = [
    {
      type: 'meeting',
      title: 'Video Meeting',
      description: 'Connect Zoom, Teams, or Google Meet',
      icon: FiVideo,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      type: 'document',
      title: 'Document Storage',
      description: 'Google Drive, Dropbox, OneDrive',
      icon: FiFileText,
      color: 'bg-green-100 text-green-600'
    },
    {
      type: 'webhook',
      title: 'Webhook',
      description: 'Custom API integrations',
      icon: FiLink,
      color: 'bg-purple-100 text-purple-600'
    },
    {
      type: 'form',
      title: 'Form Input',
      description: 'Manual data entry forms',
      icon: FiEdit,
      color: 'bg-orange-100 text-orange-600'
    },
    {
      type: 'upload',
      title: 'File Upload',
      description: 'Direct file uploads',
      icon: FiUpload,
      color: 'bg-red-100 text-red-600'
    }
  ];

  const handleClose = () => {
    setSelectedType('');
    onClose();
  };

  const handleConnect = () => {
    // Here you would implement the actual connection logic
    console.log('Connecting:', selectedType);
    handleClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
              onClick={handleClose}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="inline-block w-full max-w-2xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Add New Connector
                </h3>
                <button
                  onClick={handleClose}
                  className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
                >
                  <SafeIcon icon={FiX} className="w-5 h-5" />
                </button>
              </div>

              <div className="mb-6">
                <p className="text-gray-600">
                  Choose a connector type to integrate with your data sources
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {connectorTypes.map((connector) => (
                  <button
                    key={connector.type}
                    onClick={() => setSelectedType(connector.type)}
                    className={`p-4 rounded-lg border-2 transition-all text-left ${
                      selectedType === connector.type
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${connector.color}`}>
                        <SafeIcon icon={connector.icon} className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{connector.title}</h4>
                        <p className="text-sm text-gray-500 mt-1">{connector.description}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={handleClose}
                  className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-primary-500"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConnect}
                  disabled={!selectedType}
                  className="flex-1 inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-primary-600 border border-transparent rounded-lg hover:bg-primary-700 focus:ring-2 focus:ring-primary-500 disabled:opacity-50"
                >
                  <SafeIcon icon={FiPlus} className="w-4 h-4 mr-2" />
                  Connect
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AddConnectorModal;