interface AppData {
  guests: any[];
  movements: any[];
  rooms: any[];
  version: string;
}

export const exportData = (data: Omit<AppData, 'version'>) => {
  const exportData: AppData = {
    ...data,
    version: '1.0.0', // Add version control for future compatibility
  };

  const blob = new Blob([JSON.stringify(exportData, null, 2)], {
    type: 'application/json',
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `hotel-key-master-export-${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const importData = async (file: File): Promise<AppData> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target?.result as string);
        
        // Validate data structure
        if (!data.guests || !data.movements || !data.rooms) {
          throw new Error('Invalid file format');
        }

        // Version check (for future compatibility)
        if (data.version !== '1.0.0') {
          console.warn('Different version detected, attempting to import anyway');
        }

        resolve(data);
      } catch (error) {
        reject(new Error('Failed to parse import file'));
      }
    };

    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };

    reader.readAsText(file);
  });
};