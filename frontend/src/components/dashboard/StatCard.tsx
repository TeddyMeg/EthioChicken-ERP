import { Card, Text, Metric } from '@tremor/react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  metric: string | number;
  icon: LucideIcon;
  color: 'blue' | 'cyan' | 'fuchsia' | 'gray' | 'green' | 'indigo' | 'lime' | 'orange' | 'pink' | 'purple' | 'red' | 'teal' | 'violet' | 'yellow' | 'slate' | 'zinc' | 'neutral' | 'stone';
}

const StatCard = ({ title, metric, icon: Icon, color }: StatCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="max-w-xs mx-auto">
        <div className="flex items-center justify-between">
          <div>
            <Text className="text-gray-600">{title}</Text>
            <Metric className="mt-2 text-2xl font-bold" color={color}>
              {metric}
            </Metric>
          </div>
          <Icon className={`text-${color}-600`} size={24} />
        </div>
      </Card>
    </motion.div>
  );
};

export default StatCard;