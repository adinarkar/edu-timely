import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Upload, Edit, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface DataManagementProps {
  type: 'rooms' | 'subjects' | 'faculty' | 'batches';
}

export const DataManagement: React.FC<DataManagementProps> = ({ type }) => {
  const [showAddForm, setShowAddForm] = useState(false);

  const getTitle = () => {
    switch (type) {
      case 'rooms':
        return 'Room Management';
      case 'subjects':
        return 'Subject Management';
      case 'faculty':
        return 'Faculty Management';
      case 'batches':
        return 'Batch Management';
      default:
        return 'Data Management';
    }
  };

  const getColumns = () => {
    switch (type) {
      case 'rooms':
        return ['Name', 'Capacity', 'Type', 'Equipment', 'Actions'];
      case 'subjects':
        return ['Subject Code', 'Name', 'Credits', 'Type', 'Weekly Hours', 'Actions'];
      case 'faculty':
        return ['ID', 'Name', 'Department', 'Max Load', 'Status', 'Actions'];
      case 'batches':
        return ['Batch Code', 'Department', 'Year', 'Students', 'Status', 'Actions'];
      default:
        return [];
    }
  };

  const getMockData = () => {
    switch (type) {
      case 'rooms':
        return [
          { id: 1, name: 'A-101', capacity: 60, type: 'Lecture Hall', equipment: 'Projector, AC' },
          { id: 2, name: 'B-204', capacity: 40, type: 'Classroom', equipment: 'Whiteboard' },
          { id: 3, name: 'Lab-1', capacity: 30, type: 'Computer Lab', equipment: '30 PCs, Projector' },
          { id: 4, name: 'Lab-2', capacity: 25, type: 'Physics Lab', equipment: 'Equipment Set' },
        ];
      case 'subjects':
        return [
          { id: 1, code: 'CS101', name: 'Data Structures', credits: 4, type: 'Core', hours: 6 },
          { id: 2, code: 'CS102', name: 'Database Systems', credits: 3, type: 'Core', hours: 4 },
          { id: 3, code: 'CS103', name: 'Machine Learning', credits: 3, type: 'Elective', hours: 4 },
          { id: 4, code: 'CS104', name: 'Web Development', credits: 2, type: 'Elective', hours: 3 },
        ];
      case 'faculty':
        return [
          { id: 1, empId: 'F001', name: 'Dr. Smith', department: 'Computer Science', maxLoad: 18, status: 'Active' },
          { id: 2, empId: 'F002', name: 'Prof. Johnson', department: 'Computer Science', maxLoad: 16, status: 'Active' },
          { id: 3, empId: 'F003', name: 'Dr. Wilson', department: 'Information Technology', maxLoad: 20, status: 'Active' },
          { id: 4, empId: 'F004', name: 'Prof. Brown', department: 'Computer Science', maxLoad: 15, status: 'On Leave' },
        ];
      case 'batches':
        return [
          { id: 1, code: 'CS-2023', department: 'Computer Science', year: '2nd Year', students: 45, status: 'Active' },
          { id: 2, code: 'CS-2024', department: 'Computer Science', year: '1st Year', students: 48, status: 'Active' },
          { id: 3, code: 'IT-2023', department: 'Information Technology', year: '2nd Year', students: 42, status: 'Active' },
          { id: 4, code: 'EC-2023', department: 'Electronics', year: '2nd Year', students: 38, status: 'Active' },
        ];
      default:
        return [];
    }
  };

  const renderTableRow = (item: any) => {
    switch (type) {
      case 'rooms':
        return (
          <TableRow key={item.id}>
            <TableCell className="font-medium">{item.name}</TableCell>
            <TableCell>{item.capacity}</TableCell>
            <TableCell>
              <Badge variant={item.type === 'Computer Lab' ? 'secondary' : 'outline'}>
                {item.type}
              </Badge>
            </TableCell>
            <TableCell className="text-sm text-muted-foreground">{item.equipment}</TableCell>
            <TableCell>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        );
      case 'subjects':
        return (
          <TableRow key={item.id}>
            <TableCell className="font-medium">{item.code}</TableCell>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.credits}</TableCell>
            <TableCell>
              <Badge variant={item.type === 'Core' ? 'default' : 'secondary'}>
                {item.type}
              </Badge>
            </TableCell>
            <TableCell>{item.hours}</TableCell>
            <TableCell>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        );
      case 'faculty':
        return (
          <TableRow key={item.id}>
            <TableCell className="font-medium">{item.empId}</TableCell>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.department}</TableCell>
            <TableCell>{item.maxLoad} hrs</TableCell>
            <TableCell>
              <Badge variant={item.status === 'Active' ? 'default' : 'secondary'}>
                {item.status}
              </Badge>
            </TableCell>
            <TableCell>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        );
      case 'batches':
        return (
          <TableRow key={item.id}>
            <TableCell className="font-medium">{item.code}</TableCell>
            <TableCell>{item.department}</TableCell>
            <TableCell>{item.year}</TableCell>
            <TableCell>{item.students}</TableCell>
            <TableCell>
              <Badge variant="default">{item.status}</Badge>
            </TableCell>
            <TableCell>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">{getTitle()}</h2>
          <p className="text-muted-foreground mt-1">
            Manage {type} data for your institution
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm">
            <Upload className="h-4 w-4 mr-2" />
            Import CSV
          </Button>
          <Button onClick={() => setShowAddForm(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add {type.slice(0, -1)}
          </Button>
        </div>
      </div>

      {/* Add Form */}
      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle>Add New {type.charAt(0).toUpperCase() + type.slice(1, -1)}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {type === 'rooms' && (
                <>
                  <div>
                    <Label htmlFor="name">Room Name</Label>
                    <Input id="name" placeholder="e.g., A-101" />
                  </div>
                  <div>
                    <Label htmlFor="capacity">Capacity</Label>
                    <Input id="capacity" type="number" placeholder="e.g., 60" />
                  </div>
                  <div>
                    <Label htmlFor="type">Type</Label>
                    <Input id="type" placeholder="e.g., Lecture Hall" />
                  </div>
                </>
              )}
              {type === 'subjects' && (
                <>
                  <div>
                    <Label htmlFor="code">Subject Code</Label>
                    <Input id="code" placeholder="e.g., CS101" />
                  </div>
                  <div>
                    <Label htmlFor="name">Subject Name</Label>
                    <Input id="name" placeholder="e.g., Data Structures" />
                  </div>
                  <div>
                    <Label htmlFor="credits">Credits</Label>
                    <Input id="credits" type="number" placeholder="e.g., 4" />
                  </div>
                </>
              )}
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <Button variant="outline" onClick={() => setShowAddForm(false)}>
                Cancel
              </Button>
              <Button onClick={() => setShowAddForm(false)}>
                Save
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Data Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                {getColumns().map(column => (
                  <TableHead key={column}>{column}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {getMockData().map(item => renderTableRow(item))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};