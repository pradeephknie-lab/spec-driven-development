import path from 'path';
import { promises as fs } from 'fs';
import type { DirectoryEntry, DirectoryReport } from '../types/directory';

export async function writeDirectoryReport(jobTitle: string, employees: DirectoryEntry[]): Promise<string> {
  const report: DirectoryReport = {
    searchedJobTitle: jobTitle,
    generatedAt: new Date().toISOString(),
    totalResults: employees.length,
    employees
  };

  const artifactDir = path.join(process.cwd(), 'artifacts');
  const artifactPath = path.join(artifactDir, 'hr-managers.json');

  await fs.mkdir(artifactDir, { recursive: true });
  await fs.writeFile(artifactPath, JSON.stringify(report, null, 2), 'utf-8');

  return artifactPath;
}
