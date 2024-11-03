import React from 'react';
import { Hotel, Menu, X, Download, Upload } from 'lucide-react';
import { exportData, importData } from '../utils/dataTransfer';

interface HeaderProps {
  currentView: 'dashboard' | 'guests' | 'keys' | 'history';
  onNavigate: (view: 'dashboard' | 'guests' | 'keys' | 'history') => void;
  onDataImport: (data: any) => void;
  appData: {
    guests: any[];
    movements: any[];
    rooms: any[];
  };
}

export function Header({ currentView, onNavigate, onDataImport, appData }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const menuItems = [
    { id: 'dashboard', label: 'Painel' },
    { id: 'guests', label: 'Hóspedes' },
    { id: 'keys', label: 'Chaves' },
    { id: 'history', label: 'Histórico' },
  ] as const;

  const handleNavigate = (view: typeof currentView) => {
    onNavigate(view);
    setIsMenuOpen(false);
  };

  const handleExport = () => {
    exportData(appData);
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const importedData = await importData(file);
        onDataImport(importedData);
      } catch (error) {
        alert('Erro ao importar arquivo. Verifique se o formato está correto.');
      }
      // Reset input value to allow importing the same file again
      event.target.value = '';
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-indigo-600 text-white shadow-lg z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Hotel className="h-8 w-8" />
            <div>
              <h1 className="text-2xl font-bold">Hotel Key Master</h1>
              <p className="text-indigo-200 text-sm">Gerenciamento de Chaves e Hóspedes</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <nav className="flex items-center space-x-8">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavigate(item.id)}
                  className={`py-2 transition-colors ${
                    currentView === item.id
                      ? 'text-white font-semibold border-b-2 border-white'
                      : 'text-indigo-200 hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            <div className="flex items-center space-x-4 border-l border-indigo-500 pl-8">
              <button
                onClick={handleExport}
                className="flex items-center space-x-2 px-3 py-2 bg-indigo-700 rounded-lg hover:bg-indigo-800 transition-colors"
              >
                <Download className="h-4 w-4" />
                <span>Exportar</span>
              </button>
              <button
                onClick={handleImportClick}
                className="flex items-center space-x-2 px-3 py-2 bg-indigo-700 rounded-lg hover:bg-indigo-800 transition-colors"
              >
                <Upload className="h-4 w-4" />
                <span>Importar</span>
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 hover:bg-indigo-700 rounded-lg transition-colors"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-indigo-500 mt-4">
            <div className="flex flex-col space-y-2">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavigate(item.id)}
                  className={`py-2 px-4 rounded-lg transition-colors ${
                    currentView === item.id
                      ? 'bg-indigo-700 text-white font-semibold'
                      : 'text-indigo-200 hover:bg-indigo-700 hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <div className="flex flex-col space-y-2 pt-2 border-t border-indigo-500">
                <button
                  onClick={handleExport}
                  className="flex items-center space-x-2 px-4 py-2 bg-indigo-700 rounded-lg hover:bg-indigo-800 transition-colors"
                >
                  <Download className="h-4 w-4" />
                  <span>Exportar</span>
                </button>
                <button
                  onClick={handleImportClick}
                  className="flex items-center space-x-2 px-4 py-2 bg-indigo-700 rounded-lg hover:bg-indigo-800 transition-colors"
                >
                  <Upload className="h-4 w-4" />
                  <span>Importar</span>
                </button>
              </div>
            </div>
          </nav>
        )}
      </div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".json"
        className="hidden"
      />
    </header>
  );
}