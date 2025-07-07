import React, { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const ProjectContext = createContext();

export const useProject = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProject must be used within a ProjectProvider');
  }
  return context;
};

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [blocks, setBlocks] = useState([]);
  const [connectors, setConnectors] = useState([]);

  useEffect(() => {
    // Initialize with mock data
    const mockProjects = [
      {
        id: '1',
        name: 'TechCorp Digital Transformation',
        client: 'TechCorp Inc.',
        status: 'active',
        stage: 2,
        startDate: '2024-01-15',
        progress: 45,
        team: ['founder'],
        description: 'Complete digital transformation initiative for TechCorp',
        metrics: {
          interviewsCompleted: 8,
          interviewsScheduled: 12,
          sopsReceived: 15,
          frictionCards: 23,
          risksIdentified: 7,
          timeSpentHours: 120
        }
      },
      {
        id: '2',
        name: 'RetailChain Process Optimization',
        client: 'RetailChain LLC',
        status: 'active',
        stage: 1,
        startDate: '2024-02-01',
        progress: 20,
        team: ['founder'],
        description: 'Streamline operations and improve efficiency',
        metrics: {
          interviewsCompleted: 3,
          interviewsScheduled: 8,
          sopsReceived: 5,
          frictionCards: 12,
          risksIdentified: 3,
          timeSpentHours: 45
        }
      }
    ];

    const mockConnectors = [
      {
        id: '1',
        name: 'Zoom Integration',
        type: 'meeting',
        status: 'connected',
        lastSync: '2024-01-20T10:30:00Z',
        itemsProcessed: 45
      },
      {
        id: '2',
        name: 'Google Drive',
        type: 'document',
        status: 'connected',
        lastSync: '2024-01-20T09:15:00Z',
        itemsProcessed: 128
      },
      {
        id: '3',
        name: 'Slack Webhooks',
        type: 'webhook',
        status: 'pending',
        lastSync: null,
        itemsProcessed: 0
      }
    ];

    setProjects(mockProjects);
    setConnectors(mockConnectors);
  }, []);

  const createProject = (projectData) => {
    const newProject = {
      id: uuidv4(),
      ...projectData,
      status: 'active',
      stage: 1,
      progress: 0,
      team: ['founder'],
      metrics: {
        interviewsCompleted: 0,
        interviewsScheduled: 0,
        sopsReceived: 0,
        frictionCards: 0,
        risksIdentified: 0,
        timeSpentHours: 0
      }
    };
    setProjects(prev => [...prev, newProject]);
    return newProject;
  };

  const updateProject = (projectId, updates) => {
    setProjects(prev => prev.map(project => 
      project.id === projectId ? { ...project, ...updates } : project
    ));
  };

  const deleteProject = (projectId) => {
    setProjects(prev => prev.filter(project => project.id !== projectId));
  };

  const createBlock = (blockData) => {
    const newBlock = {
      id: uuidv4(),
      ...blockData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      version: 1,
      comments: [],
      tags: []
    };
    setBlocks(prev => [...prev, newBlock]);
    return newBlock;
  };

  const updateBlock = (blockId, updates) => {
    setBlocks(prev => prev.map(block => 
      block.id === blockId 
        ? { ...block, ...updates, updatedAt: new Date().toISOString(), version: block.version + 1 }
        : block
    ));
  };

  const deleteBlock = (blockId) => {
    setBlocks(prev => prev.filter(block => block.id !== blockId));
  };

  const getProjectBlocks = (projectId) => {
    return blocks.filter(block => block.projectId === projectId);
  };

  const value = {
    projects,
    blocks,
    connectors,
    createProject,
    updateProject,
    deleteProject,
    createBlock,
    updateBlock,
    deleteBlock,
    getProjectBlocks
  };

  return (
    <ProjectContext.Provider value={value}>
      {children}
    </ProjectContext.Provider>
  );
};