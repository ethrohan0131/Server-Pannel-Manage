import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Eye, EyeOff, Server, Shield, Key, Clock } from 'lucide-react';
import { getPanelOptions, getPanelById } from '../data/mock';

const ServerPanelSelector = () => {
  const [selectedPanel, setSelectedPanel] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showTwoFa, setShowTwoFa] = useState(false);
  const [showOneTime, setShowOneTime] = useState(false);

  const panelOptions = getPanelOptions();
  const currentPanel = selectedPanel ? getPanelById(selectedPanel) : null;

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <Server className="h-8 w-8 text-slate-700" />
            <h1 className="text-4xl font-bold text-slate-900">Server Panel Manager</h1>
          </div>
          <p className="text-slate-600 text-lg">Select and manage your server panel credentials securely</p>
        </div>

        {/* Panel Selection */}
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-slate-800">
              <Shield className="h-5 w-5" />
              Select Server Panel
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={selectedPanel} onValueChange={setSelectedPanel}>
              <SelectTrigger className="w-full h-12 text-lg">
                <SelectValue placeholder="Choose a server panel..." />
              </SelectTrigger>
              <SelectContent>
                {panelOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
                <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">
                  Active
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Panel IP */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                  <Server className="h-4 w-4" />
                  Panel IP Address
                </label>
                <div className="p-4 bg-slate-50 rounded-lg border">
                  <code className="text-lg font-mono text-slate-900">{currentPanel.panelIp}</code>
                </div>
              </div>

              {/* Username/ID */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                  <Key className="h-4 w-4" />
                  Username / ID
                </label>
                <div className="p-4 bg-slate-50 rounded-lg border">
                  <code className="text-lg font-mono text-slate-900">{currentPanel.username}</code>
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Password
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
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  2FA Authentication Code
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

              {/* One-Time Code */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  One-Time Access Code
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

              {/* Security Notice */}
              <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-amber-600" />
                  <span className="text-sm font-medium text-amber-800">Security Notice</span>
                </div>
                <p className="text-sm text-amber-700 mt-1">
                  Keep your credentials secure and never share them. Use the show/hide toggles responsibly.
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
              <h3 className="text-xl font-semibold text-slate-600">No Panel Selected</h3>
              <p className="text-slate-500">Choose a server panel from the dropdown above to view its details.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ServerPanelSelector;