import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

// Components
import Navigation from './components/Navigation';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import Connectors from './pages/Connectors';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import { ProjectProvider } from './context/ProjectContext';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <ProjectProvider>
        <DndProvider backend={HTML5Backend}>
          <Router>
            <div className="min-h-screen bg-gray-50">
              <Navigation />
              <main className="pt-16">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/projects/:id" element={<ProjectDetail />} />
                    <Route path="/connectors" element={<Connectors />} />
                    <Route path="/reports" element={<Reports />} />
                    <Route path="/settings" element={<Settings />} />
                  </Routes>
                </motion.div>
              </main>
            </div>
          </Router>
        </DndProvider>
      </ProjectProvider>
    </AuthProvider>
  );
}

export default App;