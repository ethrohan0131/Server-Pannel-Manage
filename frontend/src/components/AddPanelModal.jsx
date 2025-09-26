import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent } from './ui/card';
import { Plus, Server, Key, Shield, Clock } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

const AddPanelModal = ({ onAddPanel }) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    panelIp: '',
    username: '',
    password: '',
    twoFaCode: '',
    oneTimeCode: ''
  });
  const { toast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.id || !formData.name || !formData.panelIp || !formData.username || !formData.password) {
      toast({
        title: "ত্রুটি!",
        description: "দয়া করে সকল প্রয়োজনীয় ফিল্ড পূরণ করুন।",
        variant: "destructive",
      });
      return;
    }

    // Check if panel ID already exists
    const existingPanels = JSON.parse(localStorage.getItem('serverPanels') || '{}');
    if (existingPanels[formData.id]) {
      toast({
        title: "ত্রুটি!",
        description: "এই প্যানেল ID আগে থেকেই আছে। অন্য একটি ID ব্যবহার করুন।",
        variant: "destructive",
      });
      return;
    }

    // Create new panel
    const newPanel = {
      ...formData,
      name: formData.name || `Server Panel ${formData.id}`
    };

    // Save to localStorage and notify parent
    onAddPanel(newPanel);
    
    toast({
      title: "সফল!",
      description: `${newPanel.name} সফলভাবে যোগ করা হয়েছে।`,
    });

    // Reset form and close modal
    setFormData({
      id: '',
      name: '',
      panelIp: '',
      username: '',
      password: '',
      twoFaCode: '',
      oneTimeCode: ''
    });
    setOpen(false);
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
          <Plus className="h-4 w-4 mr-2" />
          নতুন প্যানেল যোগ করুন
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-slate-800">
            <Server className="h-5 w-5" />
            নতুন সার্ভার প্যানেল যোগ করুন
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Panel ID */}
          <div className="space-y-2">
            <Label htmlFor="id" className="flex items-center gap-2 text-slate-700">
              <Key className="h-4 w-4" />
              প্যানেল ID * (যেমন: R4, R5)
            </Label>
            <Input
              id="id"
              placeholder="R4"
              value={formData.id}
              onChange={(e) => handleChange('id', e.target.value.toUpperCase())}
              className="uppercase"
              required
            />
          </div>

          {/* Panel Name */}
          <div className="space-y-2">
            <Label htmlFor="name" className="flex items-center gap-2 text-slate-700">
              <Server className="h-4 w-4" />
              প্যানেল নাম
            </Label>
            <Input
              id="name"
              placeholder="Server Panel R4"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
            />
          </div>

          {/* Panel IP */}
          <div className="space-y-2">
            <Label htmlFor="panelIp" className="flex items-center gap-2 text-slate-700">
              <Server className="h-4 w-4" />
              প্যানেল IP অ্যাড্রেস *
            </Label>
            <Input
              id="panelIp"
              placeholder="192.168.1.100"
              value={formData.panelIp}
              onChange={(e) => handleChange('panelIp', e.target.value)}
              required
            />
          </div>

          {/* Username */}
          <div className="space-y-2">
            <Label htmlFor="username" className="flex items-center gap-2 text-slate-700">
              <Key className="h-4 w-4" />
              ইউজারনেম / ID *
            </Label>
            <Input
              id="username"
              placeholder="admin"
              value={formData.username}
              onChange={(e) => handleChange('username', e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div className="space-y-2">
            <Label htmlFor="password" className="flex items-center gap-2 text-slate-700">
              <Shield className="h-4 w-4" />
              পাসওয়ার্ড *
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="শক্তিশালী পাসওয়ার্ড"
              value={formData.password}
              onChange={(e) => handleChange('password', e.target.value)}
              required
            />
          </div>

          {/* 2FA Code */}
          <div className="space-y-2">
            <Label htmlFor="twoFaCode" className="flex items-center gap-2 text-slate-700">
              <Shield className="h-4 w-4" />
              2FA কোড (ঐচ্ছিক)
            </Label>
            <Input
              id="twoFaCode"
              placeholder="ABCD1234EFGH5678"
              value={formData.twoFaCode}
              onChange={(e) => handleChange('twoFaCode', e.target.value.toUpperCase())}
            />
          </div>

          {/* One-Time Code */}
          <div className="space-y-2">
            <Label htmlFor="oneTimeCode" className="flex items-center gap-2 text-slate-700">
              <Clock className="h-4 w-4" />
              ওয়ান-টাইম কোড (ঐচ্ছিক)
            </Label>
            <Input
              id="oneTimeCode"
              placeholder="word-word-word-word"
              value={formData.oneTimeCode}
              onChange={(e) => handleChange('oneTimeCode', e.target.value.toLowerCase())}
            />
          </div>

          {/* Security Notice */}
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="pt-4">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-800">নিরাপত্তা নোট</span>
              </div>
              <p className="text-sm text-blue-700 mt-1">
                আপনার তথ্য স্থানীয়ভাবে সংরক্ষিত হবে। শক্তিশালী পাসওয়ার্ড ব্যবহার করুন।
              </p>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="flex-1"
            >
              বাতিল
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-emerald-600 hover:bg-emerald-700"
            >
              প্যানেল যোগ করুন
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddPanelModal;