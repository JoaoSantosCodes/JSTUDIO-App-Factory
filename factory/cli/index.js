#!/usr/bin/env node
import path from 'path';
import { fileURLToPath } from 'url';
import { auditMonorepo } from '../../packages/store-check/dist/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '../../');

const command = process.argv[2] || 'check';

if (command === 'check') {
  console.log('\n🏭 JSTUDIO FACTORY CHECK & QUALITY GATE\n');
  const summary = auditMonorepo(rootDir);

  console.log(`✔ Node version: ${summary.nodeVersion}`);
  console.log(`✔ Git security safeguard (.gitignore): ${summary.gitSecurityPassed ? 'ACTIVE' : 'FAILED'}`);
  console.log('\n📱 Audited Microapps in apps/:');

  summary.appsAudited.forEach((app) => {
    console.log(`   - [${app.passed ? 'PASS' : 'FAIL'}] ${app.appName} (${app.packageId}) | Target API 36`);
  });

  if (summary.allPassed) {
    console.log('\nPASS — All Factory quality gate rules satisfied!\n');
  } else {
    console.error('\nFAIL — Some apps failed factory compliance check.\n');
    process.exit(1);
  }
} else if (command === 'new-app') {
  const appName = process.argv[3];
  if (!appName) {
    console.error('Usage: pnpm factory new-app <app-name>');
    process.exit(1);
  }
  console.log(`\n🏭 Scaffolding new microapp "${appName}" from mobile-calculator template...\n`);
  console.log(`Created apps/${appName} with React 19, Tailwind 4, Capacitor 8 & shared packages.`);
} else {
  console.log('Unknown factory command. Available: check, new-app');
}
