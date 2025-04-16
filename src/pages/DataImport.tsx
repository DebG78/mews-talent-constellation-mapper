
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { FileUp, Upload, FileCheck, FileX, FileWarning, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

const DataImport = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'validating' | 'success' | 'error'>('idle');
  const { toast } = useToast();

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files).filter(
      file => file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || 
             file.type === 'text/csv'
    );
    
    if (files.length === 0) {
      toast({
        variant: "destructive",
        title: "Invalid file format",
        description: "Please upload Excel (.xlsx) or CSV files only.",
      });
      return;
    }
    
    setUploadedFiles(files);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files).filter(
        file => file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || 
               file.type === 'text/csv'
      );
      
      if (files.length === 0) {
        toast({
          variant: "destructive",
          title: "Invalid file format",
          description: "Please upload Excel (.xlsx) or CSV files only.",
        });
        return;
      }
      
      setUploadedFiles(files);
    }
  };

  const processFiles = () => {
    setUploadStatus('validating');
    
    // Simulate processing
    setTimeout(() => {
      const success = Math.random() > 0.3; // 70% chance of success for demo
      
      if (success) {
        setUploadStatus('success');
        toast({
          title: "Import successful",
          description: `Successfully imported ${uploadedFiles.length} file(s).`,
        });
      } else {
        setUploadStatus('error');
        toast({
          variant: "destructive",
          title: "Import failed",
          description: "There was an error processing your files. Please check the format and try again.",
        });
      }
    }, 2000);
  };

  const resetUpload = () => {
    setUploadedFiles([]);
    setUploadStatus('idle');
  };

  return (
    <MainLayout>
      <div className="space-y-6 animate-fade-in">
        <h1 className="text-3xl font-bold tracking-tight">Data Import</h1>
        <p className="text-muted-foreground">
          Import employee data from Excel or CSV files to update your talent map, including performance scores and readiness assessments.
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Upload Files</CardTitle>
              <CardDescription>
                Drag and drop your Excel (.xlsx) or CSV files here
              </CardDescription>
            </CardHeader>
            <CardContent>
              {uploadedFiles.length === 0 ? (
                <div
                  className={cn(
                    "border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors",
                    isDragging ? "border-acceleration bg-blue-50" : "border-gray-200 hover:border-gray-300"
                  )}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => document.getElementById('file-upload')?.click()}
                >
                  <FileUp className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-lg text-gray-600 font-medium mb-1">
                    Drag files here or click to browse
                  </p>
                  <p className="text-sm text-gray-500">
                    Supports Excel (.xlsx) and CSV files
                  </p>
                  <input
                    id="file-upload"
                    type="file"
                    accept=".xlsx,.csv"
                    className="hidden"
                    multiple
                    onChange={handleFileInput}
                  />
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="border rounded-lg divide-y">
                    {uploadedFiles.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-3">
                        <div className="flex items-center space-x-3">
                          {file.name.endsWith('.xlsx') ? (
                            <FileUp className="h-5 w-5 text-green-600" />
                          ) : (
                            <FileUp className="h-5 w-5 text-blue-600" />
                          )}
                          <div className="flex flex-col">
                            <span className="text-sm font-medium">{file.name}</span>
                            <span className="text-xs text-gray-500">
                              {(file.size / 1024).toFixed(1)} KB
                            </span>
                          </div>
                        </div>
                        {uploadStatus === 'validating' && (
                          <RefreshCw className="h-5 w-5 text-blue-500 animate-spin" />
                        )}
                        {uploadStatus === 'success' && (
                          <FileCheck className="h-5 w-5 text-green-500" />
                        )}
                        {uploadStatus === 'error' && (
                          <FileX className="h-5 w-5 text-red-500" />
                        )}
                        {uploadStatus === 'idle' && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setUploadedFiles(uploadedFiles.filter((_, i) => i !== index));
                            }}
                          >
                            Remove
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      onClick={resetUpload}
                      disabled={uploadStatus === 'validating'}
                    >
                      Cancel
                    </Button>
                    {uploadStatus === 'idle' && (
                      <Button onClick={processFiles}>
                        <Upload className="h-4 w-4 mr-2" />
                        Process Files
                      </Button>
                    )}
                    {uploadStatus === 'validating' && (
                      <Button disabled>
                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                        Processing...
                      </Button>
                    )}
                    {(uploadStatus === 'success' || uploadStatus === 'error') && (
                      <Button onClick={resetUpload}>
                        Upload More Files
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Import Guidelines</CardTitle>
              <CardDescription>
                Follow these guidelines to ensure successful data import
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-sm font-semibold flex items-center">
                  <FileCheck className="h-4 w-4 mr-2 text-green-500" />
                  Required Columns
                </h3>
                <ul className="text-sm pl-6 list-disc text-muted-foreground space-y-1">
                  <li>Employee ID (unique identifier)</li>
                  <li>Employee Name</li>
                  <li>Position/Title</li>
                  <li>Department</li>
                  <li>Performance Rating (1-5 scale)</li>
                </ul>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-sm font-semibold flex items-center">
                  <FileWarning className="h-4 w-4 mr-2 text-amber-500" />
                  Optional Columns
                </h3>
                <ul className="text-sm pl-6 list-disc text-muted-foreground space-y-1">
                  <li><strong>Readiness</strong> (Ready Now, Ready Soon, Not Ready)</li>
                  <li>Skill Enablers: Drive (1-5 scale)</li>
                  <li>Skill Enablers: Learning Agility (1-5 scale)</li>
                  <li>Skill Enablers: Innovation (1-5 scale)</li>
                  <li>Skill Enablers: Adaptability (1-5 scale)</li>
                  <li>Join Date (YYYY-MM-DD format)</li>
                </ul>
              </div>
              
              <div className="bg-blue-50 p-3 rounded-md text-sm">
                <h3 className="font-medium text-blue-700 mb-1">Tip:</h3>
                <p className="text-blue-600">
                  Download our template file with proper formatting for both performance scores and readiness data.
                </p>
                <Button variant="link" className="p-0 h-auto text-blue-700 mt-1">
                  Download Template
                </Button>
              </div>
              
              <div className="bg-green-50 p-3 rounded-md text-sm">
                <h3 className="font-medium text-green-700 mb-1">About Readiness Levels:</h3>
                <p className="text-green-600">
                  Importing readiness data alongside performance ratings provides a more complete view of your talent. 
                  Readiness levels indicate promotion timeline (Ready Now, Ready Soon, Not Ready).
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default DataImport;
