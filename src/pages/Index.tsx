import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Dashboard } from '@/components/Dashboard';
import { TimetableGrid } from '@/components/TimetableGrid';
import { DataManagement } from '@/components/DataManagement';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { toast } = useToast();

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handleTimetableGenerate = () => {
    toast({
      title: "Timetable Generated Successfully!",
      description: "Your optimized timetable has been created with minimal conflicts.",
    });
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard onNavigate={handleTabChange} />;
      case 'timetable':
        return <TimetableGrid onGenerate={handleTimetableGenerate} />;
      case 'rooms':
        return <DataManagement type="rooms" />;
      case 'subjects':
        return <DataManagement type="subjects" />;
      case 'faculty':
        return <DataManagement type="faculty" />;
      case 'batches':
        return <DataManagement type="batches" />;
      case 'reports':
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-foreground mb-4">Reports & Analytics</h2>
            <p className="text-muted-foreground">Coming soon - View detailed reports and analytics</p>
          </div>
        );
      default:
        return <Dashboard onNavigate={handleTabChange} />;
    }
  };

  return (
    <Layout activeTab={activeTab} onTabChange={handleTabChange}>
      {renderContent()}
    </Layout>
  );
};

export default Index;
