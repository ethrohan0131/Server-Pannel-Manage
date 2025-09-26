import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Eye, EyeOff, Server, Shield, Key, Clock, Trash2 } from 'lucide-react';
import { serverPanels as initialPanels } from '../data/mock';
import AddPanelModal from './AddPanelModal';
import { useToast } from '../hooks/use-toast';

const ServerPanelSelector = () => {
  const [selectedPanel, setSelectedPanel] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showTwoFa, setShowTwoFa] = useState(false);
  const [showOneTime, setShowOneTime] = useState(false);
  const [panels, setPanels] = useState({});
  const { toast } = useToast();

  // Load panels from localStorage or use initial data
  useEffect(() => {
    const savedPanels = localStorage.getItem('serverPanels');
    if (savedPanels) {
      setPanels(JSON.parse(savedPanels));
    } else {
      setPanels(initialPanels);
      localStorage.setItem('serverPanels', JSON.stringify(initialPanels));
    }
  }, []);

  const getPanelOptions = () => {
    return Object.keys(panels).map(key => ({
      value: key,
      label: panels[key].name
    }));
  };

  const currentPanel = selectedPanel ? panels[selectedPanel] : null;

  const toggleVisibility = (field) => {
    switch (field) {
      case 'password':
        setShowPassword(!showPassword);
        break;
      case 'twoFa':
        setShowTwoFa(!showTwoFa);
        break;
      case 'oneTime':
        setShowOneTime(!showOneTime);
        break;
    }
  };

  const maskText = (text, show) => {
    return show ? text : '•'.repeat(text.length);
  };

  const handleAddPanel = (newPanel) => {
    const updatedPanels = {
      ...panels,
      [newPanel.id]: newPanel
    };
    setPanels(updatedPanels);
    localStorage.setItem('serverPanels', JSON.stringify(updatedPanels));
    console.log('Panel added:', newPanel.id, 'Total panels:', Object.keys(updatedPanels).length);
  };

  const handleDeletePanel = (panelId) => {
    if (window.confirm(`আপনি কি নিশ্চিত যে ${panels[panelId].name} মুছে ফেলতে চান?`)) {
      const updatedPanels = { ...panels };
      delete updatedPanels[panelId];
      setPanels(updatedPanels);
      localStorage.setItem('serverPanels', JSON.stringify(updatedPanels));
      
      if (selectedPanel === panelId) {
        setSelectedPanel('');
      }
      
      toast({
        title: "সফল!",
        description: `${panels[panelId].name} সফলভাবে মুছে ফেলা হয়েছে।`,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <Server className="h-8 w-8 text-slate-700" />
            <h1 className="text-4xl font-bold text-slate-900">সার্ভার প্যানেল ম্যানেজার</h1>
          </div>
          <p className="text-slate-600 text-lg">আপনার সার্ভার প্যানেল ক্রেডেন্শিয়ালগুলি নিরাপদে পরিচালনা করুন</p>
        </div>

        {/* Panel Selection and Add Button */}
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center justify-between text-slate-800">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                সার্ভার প্যানেল নির্বাচন করুন
              </div>
              <AddPanelModal onAddPanel={handleAddPanel} />
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Select value={selectedPanel} onValueChange={setSelectedPanel}>
              <SelectTrigger className="w-full h-12 text-lg">
                <SelectValue placeholder="একটি সার্ভার প্যানেল বেছে নিন..." />
              </SelectTrigger>
              <SelectContent>
                {getPanelOptions().map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Panel count info */}
            <div className="text-sm text-slate-600 text-center">
              মোট প্যানেল: {Object.keys(panels).length}টি
            </div>
          </CardContent>
        </Card>

        {/* Panel Details */}
        {currentPanel && (
          <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Server className="h-5 w-5 text-slate-700" />
                  {currentPanel.name}
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">
                    সক্রিয়
                  </Badge>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeletePanel(selectedPanel)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Panel IP */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                  <Server className="h-4 w-4" />
                  প্যানেল IP অ্যাড্রেস
                </label>
                <div className="p-4 bg-slate-50 rounded-lg border">
                  <code className="text-lg font-mono text-slate-900">{currentPanel.panelIp}</code>
                </div>
              </div>

              {/* Username/ID */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                  <Key className="h-4 w-4" />
                  ইউজারনেম / ID
                </label>
                <div className="p-4 bg-slate-50 rounded-lg border">
                  <code className="text-lg font-mono text-slate-900">{currentPanel.username}</code>
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  পাসওয়ার্ড
                </label>
                <div className="flex items-center gap-2">
                  <div className="flex-1 p-4 bg-slate-50 rounded-lg border">
                    <code className="text-lg font-mono text-slate-900">
                      {maskText(currentPanel.password, showPassword)}
                    </code>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleVisibility('password')}
                    className="px-3"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              {/* 2FA Code */}
              {currentPanel.twoFaCode && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    2FA অথেনটিকেশন কোড
                  </label>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 p-4 bg-slate-50 rounded-lg border">
                      <code className="text-lg font-mono text-slate-900">
                        {maskText(currentPanel.twoFaCode, showTwoFa)}
                      </code>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleVisibility('twoFa')}
                      className="px-3"
                    >
                      {showTwoFa ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
              )}

              {/* One-Time Code */}
              {currentPanel.oneTimeCode && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    ওয়ান-টাইম অ্যাক্সেস কোড
                  </label>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 p-4 bg-slate-50 rounded-lg border">
                      <code className="text-lg font-mono text-slate-900">
                        {maskText(currentPanel.oneTimeCode, showOneTime)}
                      </code>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleVisibility('oneTime')}
                      className="px-3"
                    >
                      {showOneTime ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
              )}

              {/* Security Notice */}
              <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-amber-600" />
                  <span className="text-sm font-medium text-amber-800">নিরাপত্তা বিজ্ঞপ্তি</span>
                </div>
                <p className="text-sm text-amber-700 mt-1">
                  আপনার ক্রেডেন্শিয়ালগুলি নিরাপদ রাখুন এবং কখনও শেয়ার করবেন না। show/hide টগলগুলি দায়িত্বশীলতার সাথে ব্যবহার করুন।
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Empty State */}
        {!selectedPanel && (
          <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
            <CardContent className="py-12 text-center space-y-4">
              <Server className="h-16 w-16 text-slate-400 mx-auto" />
              <h3 className="text-xl font-semibold text-slate-600">কোন প্যানেল নির্বাচিত নয়</h3>
              <p className="text-slate-500">উপরের ড্রপডাউন থেকে একটি সার্ভার প্যানেল বেছে নিন বা নতুন একটি যোগ করুন।</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ServerPanelSelector;