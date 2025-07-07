import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useProject } from '../context/ProjectContext';
import BlockGrid from '../components/BlockGrid';
import ProjectMetrics from '../components/ProjectMetrics';
import StageNavigation from '../components/StageNavigation';

const { FiArrowLeft, FiSettings, FiShare2, FiDownload } = FiIcons;

const ProjectDetail = () => {
  const { id } = useParams();
  const { projects, getProjectBlocks } = useProject();
  const [activeStage, setActiveStage] = useState(1);

  const project = projects.find(p => p.id === id);
  const blocks = getProjectBlocks(id);

  if (!project) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Project Not Found</h2>
          <Link to="/projects" className="text-primary-600 hover:text-primary-700">
            ← Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  const stages = [
    { id: 1, name: 'Discovery', description: 'Stakeholder interviews and initial assessment' },
    { id: 2, name: 'Insight Index', description: 'Analysis and friction identification' },
    { id: 3, name: 'Solution Studio', description: 'Strategy development and planning' },
    { id: 4, name: 'Roadmap', description: 'Implementation planning and delivery' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <Link
              to="/projects"
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
            >
              <SafeIcon icon={FiArrowLeft} className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{project.name}</h1>
              <p className="text-gray-600">{project.client}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
              <SafeIcon icon={FiShare2} className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
              <SafeIcon icon={FiDownload} className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
              <SafeIcon icon={FiSettings} className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Project Status */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="text-sm text-gray-500 mb-1">Current Stage</div>
              <div className="text-lg font-semibold text-gray-900">
                Stage {project.stage}: {stages[project.stage - 1]?.name}
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-500 mb-1">Progress</div>
              <div className="flex items-center space-x-3">
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-primary-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
                <span className="text-sm font-medium text-gray-900">{project.progress}%</span>
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-500 mb-1">Status</div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                project.status === 'active' ? 'bg-green-100 text-green-800' : 
                project.status === 'paused' ? 'bg-yellow-100 text-yellow-800' : 
                'bg-blue-100 text-blue-800'
              }`}>
                {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stage Navigation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-8"
      >
        <StageNavigation
          stages={stages}
          activeStage={activeStage}
          currentStage={project.stage}
          onStageChange={setActiveStage}
        />
      </motion.div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Blocks */}
        <div className="lg:col-span-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <BlockGrid 
              projectId={project.id} 
              stage={activeStage} 
              blocks={blocks.filter(b => b.stage === activeStage)} 
            />
          </motion.div>
        </div>

        {/* Metrics Sidebar */}
        <div className="lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <ProjectMetrics project={project} />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;