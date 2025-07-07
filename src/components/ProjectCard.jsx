import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiArrowRight, FiCalendar, FiUser } = FiIcons;

const ProjectCard = ({ project }) => {
  const getStageLabel = (stage) => {
    const stages = {
      1: 'Discovery',
      2: 'Insight Index',
      3: 'Solution Studio',
      4: 'Roadmap'
    };
    return stages[stage] || 'Unknown';
  };

  const getStatusColor = (status) => {
    const colors = {
      active: 'bg-green-100 text-green-800',
      paused: 'bg-yellow-100 text-yellow-800',
      completed: 'bg-blue-100 text-blue-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:border-primary-200 transition-colors"
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-semibold text-gray-900 mb-1">{project.name}</h3>
          <p className="text-sm text-gray-600">{project.client}</p>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
          {project.status}
        </span>
      </div>

      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-4 text-sm text-gray-500">
          <div className="flex items-center space-x-1">
            <SafeIcon icon={FiCalendar} className="w-4 h-4" />
            <span>{new Date(project.startDate).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center space-x-1">
            <SafeIcon icon={FiUser} className="w-4 h-4" />
            <span>Stage {project.stage}: {getStageLabel(project.stage)}</span>
          </div>
        </div>
      </div>

      <div className="mb-3">
        <div className="flex items-center justify-between text-sm mb-1">
          <span className="text-gray-600">Progress</span>
          <span className="font-medium text-gray-900">{project.progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-primary-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${project.progress}%` }}
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-500">
          {project.metrics.interviewsCompleted} interviews completed
        </div>
        <Link
          to={`/projects/${project.id}`}
          className="inline-flex items-center text-primary-600 hover:text-primary-700 text-sm font-medium"
        >
          View Details
          <SafeIcon icon={FiArrowRight} className="w-4 h-4 ml-1" />
        </Link>
      </div>
    </motion.div>
  );
};

export default ProjectCard;