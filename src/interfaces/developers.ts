interface IDevelopers {
  name: string;
  email: string;
  developerInfoId: any;
}

interface IDeveloperInfos {
  developerSince: Date;
  preferredOs: string;
}

export { IDevelopers, IDeveloperInfos };
