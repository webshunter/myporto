'use client';
import dynamic from 'next/dynamic';

const GoogleAnalytics = dynamic(
  () => import("nextjs-google-analytics").then(mod => mod.GoogleAnalytics),
  { ssr: false }
);

const Analytics = () => {
  return <GoogleAnalytics trackPageViews />;
};

export default Analytics;