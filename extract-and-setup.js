const fs = require('fs');
const path = require('path');
const AdmZip = require('adm-zip');

console.log('Starting zip extraction and project setup...\n');

// Check if zip file exists
const zipFile = 'Library Model 01.zip';
if (!fs.existsSync(zipFile)) {
  console.log(`Error: ${zipFile} not found in current directory`);
  process.exit(1);
}

try {
  // Extract the zip file
  console.log(`Extracting ${zipFile}...`);
  const zip = new AdmZip(zipFile);
  zip.extractAllTo('./', true);
  console.log('Zip file extracted successfully!\n');
  
  // List extracted contents
  console.log('Extracted contents:');
  const files = fs.readdirSync('.');
  files.forEach(file => {
    if (file !== zipFile) {
      const stats = fs.statSync(file);
      console.log(`${stats.isDirectory() ? 'DIR' : 'FILE'}: ${file}`);
    }
  });
  
  // Find project files recursively
  function findProjectFiles(dir = '.', maxDepth = 3, currentDepth = 0) {
    const results = [];
    
    if (currentDepth >= maxDepth) return results;
    
    try {
      const items = fs.readdirSync(dir);
      
      for (const item of items) {
        if (item === 'node_modules' || item.startsWith('.')) continue;
        
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
              ext === '.php' ||
              ext === '.json' ||
              ext === '.md') {
            results.push(fullPath);
          }
        } else if (stats.isDirectory()) {
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
  
  // Check for package.json to determine if it's a Node.js project
  const packageJsonFiles = projectFiles.filter(file => path.basename(file) === 'package.json');
  if (packageJsonFiles.length > 0) {
    console.log('\nFound Node.js project(s):');
    packageJsonFiles.forEach(file => {
      console.log(`- ${file}`);
      try {
        const packageContent = JSON.parse(fs.readFileSync(file, 'utf8'));
        console.log(`  Name: ${packageContent.name || 'Unknown'}`);
        console.log(`  Version: ${packageContent.version || 'Unknown'}`);
      } catch (error) {
        console.log(`  Error reading package.json: ${error.message}`);
      }
    });
  }
  
  // Check for Python projects
  const pythonFiles = projectFiles.filter(file => path.extname(file) === '.py');
  const requirementsFiles = projectFiles.filter(file => path.basename(file) === 'requirements.txt');
  
  if (pythonFiles.length > 0 || requirementsFiles.length > 0) {
    console.log('\nFound Python project files:');
    if (requirementsFiles.length > 0) {
      console.log('Requirements files:');
      requirementsFiles.forEach(file => console.log(`- ${file}`));
    }
    if (pythonFiles.length > 0) {
      console.log(`Python files: ${pythonFiles.length} found`);
    }
  }
  
} catch (error) {
  console.log(`Error extracting zip file: ${error.message}`);
  process.exit(1);
}