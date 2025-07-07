import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useProject } from '../context/ProjectContext';

const { FiX, FiSave } = FiIcons;

const CreateBlockModal = ({ isOpen, onClose, projectId, stage, availableBlocks }) => {
  const { createBlock } = useProject();
  const [selectedType, setSelectedType] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const selectedBlock = availableBlocks.find(b => b.type === selectedType);
      await createBlock({
        ...data,
        projectId,
        stage,
        type: selectedType,
        status: 'draft'
      });
      reset();
      setSelectedType('');
      onClose();
    } catch (error) {
      console.error('Error creating block:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    reset();
    setSelectedType('');
    onClose();
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
                  Add New Block - Stage {stage}
                </h3>
                <button
                  onClick={handleClose}
                  className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
                >
                  <SafeIcon icon={FiX} className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Block Type Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Select Block Type
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {availableBlocks.map((blockType) => (
                      <button
                        key={blockType.type}
                        type="button"
                        onClick={() => setSelectedType(blockType.type)}
                        className={`p-4 rounded-lg border-2 transition-all text-left ${
                          selectedType === blockType.type
                            ? 'border-primary-500 bg-primary-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            selectedType === blockType.type
                              ? 'bg-primary-100 text-primary-600'
                              : 'bg-gray-100 text-gray-600'
                          }`}>
                            <SafeIcon icon={blockType.icon} className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{blockType.title}</div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                  {!selectedType && (
                    <p className="mt-1 text-sm text-red-600">Please select a block type</p>
                  )}
                </div>

                {/* Block Details */}
                {selectedType && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    <div>
                      <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                        Block Title
                      </label>
                      <input
                        {...register('title', { required: 'Title is required' })}
                        type="text"
                        id="title"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter block title"
                      />
                      {errors.title && (
                        <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                      </label>
                      <textarea
                        {...register('description')}
                        id="description"
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Brief description of this block"
                      />
                    </div>
                  </motion.div>
                )}

                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-primary-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting || !selectedType}
                    className="flex-1 inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-primary-600 border border-transparent rounded-lg hover:bg-primary-700 focus:ring-2 focus:ring-primary-500 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    ) : (
                      <SafeIcon icon={FiSave} className="w-4 h-4 mr-2" />
                    )}
                    Create Block
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CreateBlockModal;