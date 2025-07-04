const fs = require('fs');
const path = require('path');

// First, let's check what files we have
console.log('Current directory contents:');
const files = fs.readdirSync('.');
files.forEach(file => {
  const stats = fs.statSync(file);
  console.log(`${stats.isDirectory() ? 'DIR' : 'FILE'}: ${file}`);
});

// Check if the zip file exists
const zipFile = 'Library Model 01.zip';
if (fs.existsSync(zipFile)) {
  console.log(`\nFound ${zipFile}`);
  const stats = fs.statSync(zipFile);
  console.log(`Size: ${stats.size} bytes`);
  
  // Since we can't use unzip, let's try to use Node.js built-in capabilities
  // We'll need to install a zip extraction library
  console.log('\nTo extract this zip file, we need to install a zip library...');
} else {
  console.log(`\n${zipFile} not found in current directory`);
}

// Alternative file discovery using Node.js instead of find command
function findProjectFiles(dir = '.', maxDepth = 3, currentDepth = 0) {
  const results = [];
  
  if (currentDepth >= maxDepth) return results;
  
  try {
    const items = fs.readdirSync(dir);
    
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stats = fs.statSync(fullPath);
      
      if (stats.isFile()) {
        const ext = path.extname(item).toLowerCase();
        const fileName = item.toLowerCase();
        
        // Check for project files
        if (fileName === 'package.json' || 
            fileName === 'requirements.txt' ||
            ext === '.py' || 
            ext === '.js' || 
            ext === '.html' || 
            ext === '.php') {
          results.push(fullPath);
        }
      } else if (stats.isDirectory() && !item.startsWith('.')) {
        results.push(...findProjectFiles(fullPath, maxDepth, currentDepth + 1));
      }
    }
  } catch (error) {
    console.log(`Error reading directory ${dir}: ${error.message}`);
  }
  
  return results;
}

console.log('\nSearching for project files...');
const projectFiles = findProjectFiles();
console.log('\nFound project files:');
projectFiles.slice(0, 20).forEach(file => console.log(file));

if (projectFiles.length > 20) {
  console.log(`... and ${projectFiles.length - 20} more files`);
}