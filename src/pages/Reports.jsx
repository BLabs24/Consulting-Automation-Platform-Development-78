import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useProject } from '../context/ProjectContext';
import ReportCard from '../components/ReportCard';
import ReportChart from '../components/ReportChart';

const { FiBarChart3, FiTrendingUp, FiDownload, FiFilter, FiCalendar } = FiIcons;

const Reports = () => {
  const { projects } = useProject();
  const [selectedProject, setSelectedProject] = useState('all');
  const [dateRange, setDateRange] = useState('month');

  const totalProjects = projects.length;
  const activeProjects = projects.filter(p => p.status === 'active').length;
  const completedProjects = projects.filter(p => p.status === 'completed').length;
  const totalInterviews = projects.reduce((sum, p) => sum + p.metrics.interviewsCompleted, 0);

  const reports = [
    {
      id: 1,
      title: 'Project Overview',
      description: 'Summary of all active projects and their progress',
      type: 'overview',
      lastGenerated: '2024-01-20T10:30:00Z',
      status: 'ready'
    },
    {
      id: 2,
      title: 'Interview Analytics',
      description: 'Analysis of stakeholder interviews and feedback',
      type: 'interviews',
      lastGenerated: '2024-01-19T14:15:00Z',
      status: 'ready'
    },
    {
      id: 3,
      title: 'Friction Analysis',
      description: 'Detailed breakdown of identified friction points',
      type: 'friction',
      lastGenerated: '2024-01-18T09:45:00Z',
      status: 'ready'
    },
    {
      id: 4,
      title: 'Implementation Roadmap',
      description: 'Timeline and milestones for project execution',
      type: 'roadmap',
      lastGenerated: null,
      status: 'generating'
    }
  ];

  const chartData = [
    { name: 'Jan', projects: 2, interviews: 12, hours: 45 },
    { name: 'Feb', projects: 3, interviews: 18, hours: 72 },
    { name: 'Mar', projects: 2, interviews: 15, hours: 58 },
    { name: 'Apr', projects: 4, interviews: 22, hours: 89 },
    { name: 'May', projects: 3, interviews: 19, hours: 67 },
    { name: 'Jun', projects: 5, interviews: 28, hours: 102 }
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
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Reports</h1>
            <p className="text-gray-600">Analytics and insights for your consulting projects</p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <SafeIcon icon={FiFilter} className="text-gray-400 w-4 h-4" />
              <select
                value={selectedProject}
                onChange={(e) => setSelectedProject(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="all">All Projects</option>
                {projects.map(project => (
                  <option key={project.id} value={project.id}>{project.name}</option>
                ))}
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <SafeIcon icon={FiCalendar} className="text-gray-400 w-4 h-4" />
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="week">Last Week</option>
                <option value="month">Last Month</option>
                <option value="quarter">Last Quarter</option>
                <option value="year">Last Year</option>
              </select>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Projects</p>
                <p className="text-2xl font-bold text-gray-900">{totalProjects}</p>
              </div>
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                <SafeIcon icon={FiBarChart3} className="w-6 h-6 text-primary-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Projects</p>
                <p className="text-2xl font-bold text-gray-900">{activeProjects}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <SafeIcon icon={FiTrendingUp} className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-gray-900">{completedProjects}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <SafeIcon icon={FiBarChart3} className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Interviews</p>
                <p className="text-2xl font-bold text-gray-900">{totalInterviews}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <SafeIcon icon={FiTrendingUp} className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <ReportChart
            title="Project Progress"
            data={chartData}
            dataKey="projects"
            color="#EE6F0F"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <ReportChart
            title="Interviews Completed"
            data={chartData}
            dataKey="interviews"
            color="#10B981"
          />
        </motion.div>
      </div>

      {/* Reports List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200"
      >
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Available Reports</h2>
            <button className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
              <SafeIcon icon={FiDownload} className="w-4 h-4 mr-2" />
              Export All
            </button>
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reports.map((report, index) => (
              <motion.div
                key={report.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <ReportCard report={report} />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Reports;