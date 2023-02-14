interface IDevelopers {
  name: string;
  email: string;
  developerInfoId: number | null;
}

interface IDeveloperInfos {
  developerSince: Date;
  preferredOs: string;
}

export { IDevelopers, IDeveloperInfos };
