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

interface IProjects {
  name: string;
  description: string;
  estimated_time: string;
  repository: string;
  start_date: Date;
  end_date: Date;
  developer_id: number;
}

export { IDevelopers, IDeveloperInfos, IProjects };
