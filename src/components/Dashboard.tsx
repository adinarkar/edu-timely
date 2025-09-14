import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Users, BookOpen, Building, Play, CheckCircle } from 'lucide-react';

interface DashboardProps {
  onNavigate: (tab: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const stats = [
    { title: 'Total Rooms', value: '24', icon: Building, color: 'text-blue-600' },
    { title: 'Active Subjects', value: '156', icon: BookOpen, color: 'text-green-600' },
    { title: 'Faculty Members', value: '48', icon: Users, color: 'text-purple-600' },
    { title: 'Student Batches', value: '32', icon: Users, color: 'text-orange-600' },
  ];

  const recentActivity = [
    { action: 'Timetable generated', time: '2 hours ago', type: 'success' },
    { action: 'Faculty data updated', time: '5 hours ago', type: 'info' },
    { action: 'Room B-204 capacity modified', time: '1 day ago', type: 'warning' },
    { action: 'New batch CS-2024 added', time: '2 days ago', type: 'info' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Dashboard</h2>
          <p className="text-muted-foreground mt-1">
            Manage your institution's timetable and resources
          </p>
        </div>
        <Button onClick={() => onNavigate('timetable')} size="lg" className="gap-2">
          <Play className="h-4 w-4" />
          Generate Timetable
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <Icon className={`h-8 w-8 ${stat.color}`} />
                  <div>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button 
              variant="outline" 
              className="w-full justify-start" 
              onClick={() => onNavigate('rooms')}
            >
              <Building className="h-4 w-4 mr-2" />
              Manage Rooms
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => onNavigate('faculty')}
            >
              <Users className="h-4 w-4 mr-2" />
              Manage Faculty
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => onNavigate('subjects')}
            >
              <BookOpen className="h-4 w-4 mr-2" />
              Manage Subjects
            </Button>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};