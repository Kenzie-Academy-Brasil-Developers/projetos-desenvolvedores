interface IProjects {
  name: string;
  description: string;
  estimated_time: string;
  repository: string;
  start_date: Date;
  end_date: Date;
  developer_id: number | null;
}

export { IProjects };
