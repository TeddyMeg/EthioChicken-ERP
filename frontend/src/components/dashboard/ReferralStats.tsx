import { Card, Title, BarList } from '@tremor/react';

interface ReferralStat {
  name: string;
  value: number;
  color: string;
}

interface ReferralStatsProps {
  data: ReferralStat[];
}

const ReferralStats = ({ data }: ReferralStatsProps) => {
  return (
    <Card className="max-w-lg">
      <Title>Agent Acquisition Channels</Title>
      <BarList data={data} className="mt-4" />
    </Card>
  );
};

export default ReferralStats;