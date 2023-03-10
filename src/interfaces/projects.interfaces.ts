interface IProjects {
  name: string;
  description: string;
  estimatedTime: string;
  repository: string;
  startDate: Date;
  endDate: Date;
  developerId: number | null;
}

interface IProjectTech {
  addedIn: Date;
  technologyId: number;
}

export { IProjects, IProjectTech };
