import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
import { EducationCertifications } from './components/EducationCertifications';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ResumeModal } from './components/ResumeModal';
import { CustomCursor } from './components/CustomCursor';
import { DeveloperModeModal } from './components/DeveloperModeModal';
import { PortfolioProvider } from './context/PortfolioContext';

export function App() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  return (
    <PortfolioProvider>
      <div className="min-h-screen bg-brand-burgundy-dark text-white selection:bg-brand-orange selection:text-white relative">
        {/* Website Content (Hidden on Print) */}
        <div className="print-hide">
          {/* Sleek Custom Agency Cursor */}
          <CustomCursor />

          {/* Navigation */}
          <Navbar onOpenResume={() => setIsResumeOpen(true)} />

          {/* Main Content */}
          <main>
            {/* Hero Section matching the exact visual composition in master prompt */}
            <Hero onOpenResume={() => setIsResumeOpen(true)} />

            {/* Technical Skills Section */}
            <Skills />

            {/* About Section */}
            <About onOpenResume={() => setIsResumeOpen(true)} />

            {/* Experience Timeline */}
            <Experience />

            {/* Featured Projects Showcase */}
            <Projects />

            {/* Education & Certifications */}
            <EducationCertifications />

            {/* Contact Section */}
            <Contact onOpenResume={() => setIsResumeOpen(true)} />
          </main>

          {/* Footer */}
          <Footer />

          {/* Developer Mode CMS & Authentication Modal */}
          <DeveloperModeModal />
        </div>

        {/* Interactive Printable / Downloadable Resume Modal (Formatted for Screen & Print) */}
        <ResumeModal
          isOpen={isResumeOpen}
          onClose={() => setIsResumeOpen(false)}
        />
      </div>
    </PortfolioProvider>
  );
}

export default App;

