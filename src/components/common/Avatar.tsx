import React from 'react';

interface AvatarProps {
  name: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  role?: 'member' | 'trainer' | 'admin';
}

export const Avatar: React.FC<AvatarProps> = ({
  name,
  size = 'md',
  className = '',
  role,
}) => {
  const getInitials = (n: string) => {
    if (!n) return 'OL';
    const parts = n.trim().split(' ');
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return n.slice(0, 2).toUpperCase();
  };

  const sizeClasses = {
    xs: 'w-6 h-6 text-[10px]',
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-14 h-14 text-base font-semibold',
    xl: 'w-20 h-20 text-xl font-bold',
  };

  // Athletic gradient colors depending on role or hash
  const roleGradients = {
    admin: 'from-amber-600/30 to-amber-950/80 text-amber-300 border-amber-500/40',
    trainer: 'from-emerald-600/30 to-emerald-950/80 text-emerald-300 border-emerald-500/40',
    member: 'from-sky-600/30 to-slate-900 text-sky-300 border-sky-500/30',
  };

  const gradient = role
    ? roleGradients[role]
    : 'from-emerald-700/30 via-neutral-900 to-neutral-950 text-emerald-400 border-neutral-700';

  return (
    <div
      className={`inline-flex items-center justify-center rounded-xl font-medium bg-gradient-to-br border shrink-0 select-none ${sizeClasses[size]} ${gradient} ${className}`}
      title={name}
    >
      {getInitials(name)}
    </div>
  );
};
