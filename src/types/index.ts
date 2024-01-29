export interface IAlarmProps {
  id: number;
  hour: string;
  minute: string;
  isActive: boolean;
  occurrence: string | string[];
}
