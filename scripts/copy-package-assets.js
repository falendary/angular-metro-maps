const fs = require('fs');
const packages = require('./packages');

packages.forEach(pkgName => {
  console.log(`Copy asstets for ${pkgName}`);
  const readmeFile = `./packages/${pkgName}/README.md`;

  if(!fs.existsSync(`dist/${pkgName}`)) {
      fs.mkdirSync(`dist/${pkgName}`);
  }

  if (fs.existsSync(readmeFile)) {
    fs.writeFileSync(`dist/${pkgName}/README.md`, fs.readFileSync(readmeFile));
  }

  fs.writeFileSync(`dist/${pkgName}/LICENSE`, fs.readFileSync('LICENSE'));
});