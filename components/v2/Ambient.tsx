import React from 'react';

/**
 * Site-wide ambient backdrop — the layer that stops the page reading as a
 * blank sheet, especially in light mode where hairlines alone leave too much
 * empty white.
 *
 * Four stacked layers, all CSS and all compositor-driven:
 *   mesh  — slow-drifting colour blobs, tinted per theme
 *   grid  — engineering graph paper, masked so it fades toward the edges
 *   beam  — a single diagonal sweep of light
 *   grain — fine noise that keeps large flat areas from banding
 *
 * Fixed and pointer-events-none, so it must live OUTSIDE the ScrollSmoother
 * wrapper (same rule as the navbar and cursor).
 */
const Ambient: React.FC = () => (
  <div className="ambient" aria-hidden="true">
    <div className="ambient__mesh">
      <span className="ambient__blob ambient__blob--1" />
      <span className="ambient__blob ambient__blob--2" />
      <span className="ambient__blob ambient__blob--3" />
    </div>
    <div className="ambient__grid" />
    <div className="ambient__beam" />
    <div className="ambient__grain" />
  </div>
);

export default Ambient;
