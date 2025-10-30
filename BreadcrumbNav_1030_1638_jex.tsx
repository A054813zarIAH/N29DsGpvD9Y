// 代码生成时间: 2025-10-30 16:38:55
import React from 'react';

// Type definitions
interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

// Breadcrumb component
const BreadcrumbNav: React.FC<BreadcrumbProps> = ({ items }) => {
  // Check if items is an array and not empty
  if (!Array.isArray(items) || items.length === 0) {
    return null;
  }

  return (
    <nav aria-label="Breadcrumb">
      <ol className="breadcrumb">
        {items.map((item, index) => (
          <li key={index} className="breadcrumb-item">
            {item.href ? (
              <a href={item.href}>{item.label}</a>
            ) : (
              <span>{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

// Export the BreadcrumbNav component
export default BreadcrumbNav;

/*
 * Usage Example:
 * <BreadcrumbNav items={[
 *   { label: 'Home', href: '/' },
 *   { label: 'Library', href: '/library' },
 *   { label: 'Data' },
 * ]} />
 */