import React from 'react';

type ParallaxProps = {
  children: React.ReactNode;
  className?: string;
  /**
   * ScrollSmoother speed. 1 = normal. <1 moves slower than scroll (recedes),
   * >1 moves faster (comes forward). Handled automatically by the active
   * ScrollSmoother instance via the `data-speed` attribute.
   */
  speed?: number;
  /** ScrollSmoother lag — element eases behind the scroll for a fluid trail. */
  lag?: number;
  as?: React.ElementType;
  style?: React.CSSProperties;
};

/**
 * Depth/parallax wrapper. Relies on the site-wide ScrollSmoother (effects:true)
 * reading `data-speed` / `data-lag`. When smooth scroll is disabled (reduced
 * motion / mobile fallback) these attributes are simply ignored — content stays
 * put, so it degrades gracefully.
 */
const Parallax: React.FC<ParallaxProps> = ({
  children,
  className = '',
  speed,
  lag,
  as = 'div',
  style,
}) => {
  const Tag = as as any;
  const attrs: Record<string, unknown> = {};
  if (speed != null) attrs['data-speed'] = speed;
  if (lag != null) attrs['data-lag'] = lag;

  return (
    <Tag className={className} style={style} {...attrs}>
      {children}
    </Tag>
  );
};

export default Parallax;
