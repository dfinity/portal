// src/components/MotokoVersions.js
import React, { useState, useEffect } from 'react';
import { useHistory } from '@docusaurus/router';

export default function MotokoVersions() {
  const history = useHistory();
  const [currentVersion, setCurrentVersion] = useState('v1');

  // Version configuration
  const versions = [
    { id: 'old-base', name: '0.14.5' },
    { id: 'new-base', name: '0.14.6+' }
  ];

  // Determine current version on component mount
  useEffect(() => {
    const pathParts = window.location.pathname.split('/');
    const versionIndex = pathParts.findIndex(part => versions.some(v => v.id === part));
    if (versionIndex !== -1) {
      setCurrentVersion(pathParts[versionIndex]);
    }
  }, []);

  // Handle version change
  const handleVersionChange = (event) => {
    const newVersion = event.target.value;
    if (newVersion === currentVersion) return;

    // Get current path and replace version
    const currentPath = window.location.pathname;
    const pathParts = currentPath.split('/');
    const versionIndex = pathParts.findIndex(part => versions.some(v => v.id === part));

    if (versionIndex !== -1) {
      // Replace existing version
      pathParts[versionIndex] = newVersion;
    } else {
      // Insert version after /docs/ if it exists
      const docsIndex = pathParts.findIndex(part => part === 'docs');
      if (docsIndex !== -1) {
        pathParts.splice(docsIndex + 1, 0, newVersion);
      } else {
        // Just add at the beginning
        pathParts.splice(1, 0, newVersion);
      }
    }

    const newPath = pathParts.join('/');
    history.push(newPath);
  };

  return (
    <div className="version-selector" style={{margin: '1rem 0'}}>
      <label htmlFor="version-select" style={{marginRight: '0.5rem'}}>
        Base library version:
      </label>
      <select
        id="version-select"
        value={currentVersion}
        onChange={handleVersionChange}
        style={{
          padding: '0.5rem',
          borderRadius: '4px',
          border: '1px solid #ccc'
        }}
      >
        {versions.map(version => (
          <option key={version.id} value={version.id}>
            {version.name}
          </option>
        ))}
      </select>
    </div>
  );
}