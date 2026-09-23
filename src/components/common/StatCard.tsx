import React, { ReactNode } from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  icon?: ReactNode;
  subtitle?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  trend,
  icon,
  subtitle,
}) => {
  return (
    <div className="p-5 rounded-xl bg-[#0f1319] border border-neutral-800/80 hover:border-neutral-700/80 transition-all duration-150">
      <div className="flex items-center justify-between text-neutral-400">
        <span className="text-xs font-medium uppercase tracking-wider text-neutral-400">{title}</span>
        {icon && <div className="p-2 rounded-lg bg-neutral-900 border border-neutral-800 text-emerald-400">{icon}</div>}
      </div>

      <div className="mt-3 flex items-baseline gap-2">
        <span className="text-2xl lg:text-3xl font-bold tracking-tight text-white tabular-nums">
          {value}
        </span>
        {change && (
          <span
            className={`text-xs font-medium ${
              trend === 'up'
                ? 'text-emerald-400'
                : trend === 'down'
                ? 'text-rose-400'
                : 'text-neutral-400'
            }`}
          >
            {change}
          </span>
        )}
      </div>

      {subtitle && <p className="text-xs text-neutral-500 mt-1">{subtitle}</p>}
    </div>
  );
};
