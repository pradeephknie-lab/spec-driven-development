export interface DirectoryEntry {
  name: string;
  jobTitle: string;
  subUnit: string;
  location: string;
}

export interface DirectoryReport {
  searchedJobTitle: string;
  generatedAt: string;
  totalResults: number;
  employees: DirectoryEntry[];
}
