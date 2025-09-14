import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RefreshCw, Download, Filter } from 'lucide-react';

interface TimetableEntry {
  id: string;
  subject: string;
  faculty: string;
  room: string;
  batch: string;
  type: 'lecture' | 'lab' | 'tutorial';
}

interface TimetableGridProps {
  onGenerate: () => void;
}

export const TimetableGrid: React.FC<TimetableGridProps> = ({ onGenerate }) => {
  const [selectedBatch, setSelectedBatch] = useState<string>('all');
  const [isGenerating, setIsGenerating] = useState(false);

  const timeSlots = [
    '9:00-10:00',
    '10:00-11:00',
    '11:30-12:30',
    '12:30-1:30',
    '2:30-3:30',
    '3:30-4:30',
  ];

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  // Mock timetable data
  const mockTimetable: Record<string, Record<string, TimetableEntry | null>> = {
    Monday: {
      '9:00-10:00': {
        id: '1',
        subject: 'Data Structures',
        faculty: 'Dr. Smith',
        room: 'A-101',
        batch: 'CS-2023',
        type: 'lecture',
      },
      '10:00-11:00': {
        id: '2',
        subject: 'Database Systems',
        faculty: 'Prof. Johnson',
        room: 'B-204',
        batch: 'CS-2023',
        type: 'lecture',
      },
      '11:30-12:30': {
        id: '3',
        subject: 'Programming Lab',
        faculty: 'Dr. Wilson',
        room: 'Lab-1',
        batch: 'CS-2023',
        type: 'lab',
      },
    },
    Tuesday: {
      '9:00-10:00': {
        id: '4',
        subject: 'Algorithms',
        faculty: 'Dr. Brown',
        room: 'A-102',
        batch: 'CS-2023',
        type: 'lecture',
      },
      '2:30-3:30': {
        id: '5',
        subject: 'Machine Learning',
        faculty: 'Prof. Davis',
        room: 'B-301',
        batch: 'CS-2023',
        type: 'lecture',
      },
    },
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    // Simulate generation process
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsGenerating(false);
    onGenerate();
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'lecture':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'lab':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'tutorial':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Timetable Management</h2>
          <p className="text-muted-foreground mt-1">
            Generate and manage class schedules
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Select value={selectedBatch} onValueChange={setSelectedBatch}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select batch" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Batches</SelectItem>
              <SelectItem value="cs-2023">CS-2023</SelectItem>
              <SelectItem value="cs-2024">CS-2024</SelectItem>
              <SelectItem value="it-2023">IT-2023</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button onClick={handleGenerate} disabled={isGenerating}>
            <RefreshCw className={`h-4 w-4 mr-2 ${isGenerating ? 'animate-spin' : ''}`} />
            {isGenerating ? 'Generating...' : 'Generate'}
          </Button>
        </div>
      </div>

      {/* Timetable Grid */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Weekly Schedule - {selectedBatch === 'all' ? 'All Batches' : selectedBatch.toUpperCase()}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <div className="grid grid-cols-6 gap-2 min-w-[800px]">
              {/* Header */}
              <div className="font-semibold text-sm text-muted-foreground p-3">Time</div>
              {days.map(day => (
                <div key={day} className="font-semibold text-sm text-muted-foreground p-3 text-center">
                  {day}
                </div>
              ))}

              {/* Time slots */}
              {timeSlots.map(timeSlot => (
                <React.Fragment key={timeSlot}>
                  <div className="p-3 text-sm font-medium bg-muted/50 rounded-lg">
                    {timeSlot}
                  </div>
                  {days.map(day => {
                    const entry = mockTimetable[day]?.[timeSlot];
                    return (
                      <div
                        key={`${day}-${timeSlot}`}
                        className="p-2 min-h-[80px] border border-border rounded-lg hover:bg-accent/50 transition-colors"
                      >
                        {entry && (
                          <div className={`p-2 rounded border ${getTypeColor(entry.type)} text-xs space-y-1`}>
                            <div className="font-semibold">{entry.subject}</div>
                            <div>{entry.faculty}</div>
                            <div className="flex items-center justify-between">
                              <span>{entry.room}</span>
                              <Badge variant="outline" className="text-xs">
                                {entry.type}
                              </Badge>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </React.Fragment>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Generation Status */}
      {isGenerating && (
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <RefreshCw className="h-5 w-5 animate-spin text-primary" />
              <div>
                <p className="font-medium">Generating optimized timetable...</p>
                <p className="text-sm text-muted-foreground">
                  Processing constraints and finding optimal solution
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};