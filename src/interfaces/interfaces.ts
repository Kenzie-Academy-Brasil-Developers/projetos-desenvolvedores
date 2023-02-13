interface IDevelopers {
  id: number;
  name: string;
  email: string;
  developer_info_id: number;
}

interface IDeveloperInfos {
  id: number;
  developer_since: Date;
  preferred_os: string;
}

export { IDevelopers, IDeveloperInfos };
