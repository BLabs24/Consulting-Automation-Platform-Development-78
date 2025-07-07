import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useProject } from '../context/ProjectContext';
import StatsCard from '../components/StatsCard';
import ProjectCard from '../components/ProjectCard';
import RecentActivity from '../components/RecentActivity';

const { FiPlus, FiTrendingUp, FiUsers, FiClock, FiTarget } = FiIcons;

const Dashboard = () => {
  const { projects, connectors } = useProject();

  const activeProjects = projects.filter(p => p.status === 'active');
  const totalInterviews = projects.reduce((sum, p) => sum + p.metrics.interviewsCompleted, 0);
  const totalHours = projects.reduce((sum, p) => sum + p.metrics.timeSpentHours, 0);
  const connectedSources = connectors.filter(c => c.status === 'connected').length;

  const stats = [
    {
      title: 'Active Projects',
      value: activeProjects.length,
      icon: FiTarget,
      color: 'primary',
      trend: '+2 this month'
    },
    {
      title: 'Interviews Completed',
      value: totalInterviews,
      icon: FiUsers,
      color: 'accent',
      trend: '+12 this week'
    },
    {
      title: 'Hours Tracked',
      value: totalHours,
      icon: FiClock,
      color: 'secondary',
      trend: '+28 this month'
    },
    {
      title: 'Connected Sources',
      value: connectedSources,
      icon: FiTrendingUp,
      color: 'primary',
      trend: 'All systems active'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, Founder
          </h1>
          <p className="text-gray-600">
            Here's what's happening with your consulting projects today.
          </p>
        </motion.div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <StatsCard {...stat} />
          </motion.div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Active Projects */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200"
          >
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">
                  Active Projects
                </h2>
                <Link
                  to="/projects"
                  className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                  <SafeIcon icon={FiPlus} className="w-4 h-4 mr-2" />
                  New Project
                </Link>
              </div>
            </div>
            <div className="p-6">
              {activeProjects.length > 0 ? (
                <div className="space-y-4">
                  {activeProjects.slice(0, 3).map((project) => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <SafeIcon icon={FiTarget} className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No active projects
                  </h3>
                  <p className="text-gray-500 mb-4">
                    Start your first consulting project to see it here.
                  </p>
                  <Link
                    to="/projects"
                    className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    <SafeIcon icon={FiPlus} className="w-4 h-4 mr-2" />
                    Create Project
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <RecentActivity />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;