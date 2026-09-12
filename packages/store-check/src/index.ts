import fs from 'fs';
import path from 'path';

export interface AppAuditResult {
  appName: string;
  packageId: string;
  hasTarget36: boolean;
  hasCapacitorConfig: boolean;
  passed: boolean;
}

export interface MonorepoAuditSummary {
  nodeVersion: string;
  gitSecurityPassed: boolean;
  appsAudited: AppAuditResult[];
  allPassed: boolean;
}

export function auditMonorepo(rootDir: string): MonorepoAuditSummary {
  const gitignorePath = path.join(rootDir, '.gitignore');
  let gitSecurityPassed = false;

  if (fs.existsSync(gitignorePath)) {
    const gitignoreContent = fs.readFileSync(gitignorePath, 'utf-8');
    gitSecurityPassed = gitignoreContent.includes('*.keystore') && gitignoreContent.includes('.env');
  }

  const appsDir = path.join(rootDir, 'apps');
  const appsAudited: AppAuditResult[] = [];

  if (fs.existsSync(appsDir)) {
    const appFolders = fs.readdirSync(appsDir).filter((folder) => {
      return fs.statSync(path.join(appsDir, folder)).isDirectory();
    });

    for (const folder of appFolders) {
      const appPath = path.join(appsDir, folder);
      const capConfigPath = path.join(appPath, 'capacitor.config.ts');
      const gradlePath = path.join(appPath, 'android/app/build.gradle');

      let packageId = 'unknown';
      let hasCapacitorConfig = fs.existsSync(capConfigPath);
      let hasTarget36 = true;

      if (hasCapacitorConfig) {
        const capContent = fs.readFileSync(capConfigPath, 'utf-8');
        const match = capContent.match(/appId:\s*['"]([^'"]+)['"]/);
        if (match) packageId = match[1];
      }

      if (fs.existsSync(gradlePath)) {
        const gradleContent = fs.readFileSync(gradlePath, 'utf-8');
        hasTarget36 = gradleContent.includes('targetSdkVersion 36') || gradleContent.includes('targetSdk = 36');
      }

      const validId = packageId.startsWith('com.jstudio.');
      const passed = hasCapacitorConfig && validId && hasTarget36;

      appsAudited.push({
        appName: folder,
        packageId,
        hasTarget36,
        hasCapacitorConfig,
        passed,
      });
    }
  }

  const allPassed = gitSecurityPassed && appsAudited.every((app) => app.passed);

  return {
    nodeVersion: process.version,
    gitSecurityPassed,
    appsAudited,
    allPassed,
  };
}
