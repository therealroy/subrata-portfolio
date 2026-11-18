import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
}

export const TechLogo: React.FC<{ name: string; className?: string }> = ({ name, className = "w-6 h-6" }) => {
  switch (name) {
    case 'C#':
      return (
        <svg viewBox="0 0 128 128" className={className} fill="none">
          <path d="M115.4 31.6L67.1 3.7c-1.9-1.1-4.3-1.1-6.2 0L12.6 31.6c-1.9 1.1-3.1 3.2-3.1 5.4v55.9c0 2.2 1.2 4.3 3.1 5.4l48.3 27.9c1 0.6 2.1 0.8 3.1 0.8s2.2-0.3 3.1-0.8l48.3-27.9c1.9-1.1 3.1-3.2 3.1-5.4V37c0-2.2-1.2-4.3-3.1-5.4z" fill="#9B4993"/>
          <path d="M64 5.9L15.7 33.8c-1.2 0.7-2 2-2 3.5v55.9c0 1.4 0.8 2.7 2 3.5L64 124.5V5.9z" fill="#68217A"/>
          <path d="M64.2 39.8c-13.4 0-24.3 10.9-24.3 24.2s10.9 24.2 24.3 24.2c8.2 0 15.5-4.1 19.9-10.4l-7.7-4.5c-2.7 4.2-7.2 7-12.2 7-8.1 0-14.7-6.6-14.7-14.7s6.6-14.7 14.7-14.7c5.1 0 9.7 2.8 12.3 7.1l7.6-4.5c-4.4-6.6-11.8-10.7-19.9-10.7z" fill="#FFFFFF"/>
          <path d="M84.4 56.4h3.1l-0.7 4.4h4.4l0.7-4.4h3.1l-0.7 4.4h3.1v3.1h-3.6l-0.6 3.7h3.7v3.1h-4.2l-0.7 4.4h-3.1l0.7-4.4h-4.4l-0.7 4.4h-3.1l0.7-4.4h-3.1v-3.1h3.6l0.6-3.7h-3.7v-3.1h4.2l0.7-4.4zm3.6 7.5l-0.6 3.7h4.4l0.6-3.7h-4.4z" fill="#FFFFFF"/>
        </svg>
      );

    case 'ASP.NET Core':
    case '.NET':
    case '.NET 8 / 9':
      return (
        <svg viewBox="0 0 128 128" className={className} fill="none">
          <circle cx="64" cy="64" r="60" fill="#512BD4"/>
          <path d="M25 88V40h12v38h20v10H25zm35 0V40h13l18 31V40h12v48H90L72 56v32H60z" fill="#FFFFFF"/>
        </svg>
      );

    case 'TypeScript':
      return (
        <svg viewBox="0 0 128 128" className={className}>
          <rect width="128" height="128" rx="20" fill="#3178C6"/>
          <path d="M68 64h18v8H78v34H68V72H58v-8h10zm28 22c3 2 7 3 11 3 5 0 8-2 8-6 0-4-3-6-8-8l-3-1c-8-4-12-8-12-14 0-9 7-15 18-15 5 0 9 1 12 3l-3 8c-3-2-6-3-9-3-5 0-8 2-8 5 0 3 2 5 7 7l3 1c9 4 13 8 13 15 0 9-7 15-19 15-6 0-11-1-15-4l3-8z" fill="#FFFFFF"/>
        </svg>
      );

    case 'Tailwind CSS':
      return (
        <svg viewBox="0 0 128 128" className={className} fill="none">
          <rect width="128" height="128" rx="28" fill="#0B1120"/>
          <path d="M42 66c5-10 13-14 24-12 11 2 17 9 22 15 6 7 12 11 20 11 8 0 16-5 20-14-5 10-13 14-24 12-11-2-17-9-22-15-6-7-12-11-20-11-8 0-16 5-20 14zm-22 28c5-10 13-14 24-12 11 2 17 9 22 15 6 7 12 11 20 11 8 0 16-5 20-14-5 10-13 14-24 12-11-2-17-9-22-15-6-7-12-11-20-11-8 0-16 5-20 14z" fill="#38BDF8"/>
        </svg>
      );

    case 'Next.js & Vite':
    case 'Next.js':
      return (
        <svg viewBox="0 0 128 128" className={className} fill="none">
          <circle cx="64" cy="64" r="60" fill="#000000"/>
          <path d="M44 42v44h10V58l34 32h14L54 42H44zm36 0h10v26l-10-10V42z" fill="#FFFFFF"/>
          <circle cx="98" cy="88" r="8" fill="#BD34FE"/>
        </svg>
      );

    case 'Semantic Kernel & LLM Agents':
    case 'Semantic Kernel':
      return (
        <svg viewBox="0 0 128 128" className={className} fill="none">
          <rect width="128" height="128" rx="28" fill="#0078D4"/>
          <circle cx="64" cy="64" r="28" stroke="#FFFFFF" strokeWidth="6" strokeDasharray="6 4"/>
          <circle cx="64" cy="64" r="14" fill="var(--theme-accent, #F04B20)"/>
          <path d="M64 22v14M64 92v14M22 64h14M92 64h14" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round"/>
        </svg>
      );

    case 'OpenAI & Gemini APIs':
    case 'OpenAI':
      return (
        <svg viewBox="0 0 128 128" className={className} fill="none">
          <rect width="128" height="128" rx="28" fill="#10A37F"/>
          <path d="M64 36c-5 0-9 2-12 5l-8-5c-7 4-11 12-9 20l-6 3c-4 7-2 16 4 21v10c7 4 15 2 21-3l7 4c8 0 15-5 17-13l8-3c4-7 3-16-3-22v-9c-7-4-15-3-21 2l-8-5zm0 10c2 0 4 1 6 2l-10 6c-2 1-3 3-3 5v8l-7-4c-4-2-5-7-3-11 2-4 6-6 10-6h4zm14 8c4 2 5 7 3 11l-7 4-7-4v-8c0-2 1-4 3-5l8-5c1 0 2 0 3 1zm-32 8l7 4v8c0 2-1 4-3 5l-8 5c-4 2-9 0-11-4-2-4 0-9 4-11l8-5v-2zm32 10v8c0 2-1 4-3 5l-8 5c-4 2-9 0-11-4-2-4 0-9 4-11l8-5v2l10 5zm-14 8c-2 0-4-1-6-2l10-6c2-1 3-3 3-5v-8l7 4c4 2 5 7 3 11-2 4-6 6-10 6h-4z" fill="#FFFFFF"/>
        </svg>
      );

    case 'RAG & Vector Search':
      return (
        <svg viewBox="0 0 128 128" className={className} fill="none">
          <rect width="128" height="128" rx="28" fill="#18181b"/>
          <path d="M34 40h36v10H34zM34 60h48v10H34zM34 80h28v10H34z" fill="#A1A1AA"/>
          <circle cx="86" cy="80" r="18" stroke="var(--theme-accent, #F04B20)" strokeWidth="6" fill="var(--theme-accent, #F04B20)" fillOpacity="0.2"/>
          <path d="M98 92l14 14" stroke="var(--theme-accent, #F04B20)" strokeWidth="6" strokeLinecap="round"/>
        </svg>
      );

    case 'Dapper & ADO.NET':
      return (
        <svg viewBox="0 0 128 128" className={className} fill="none">
          <rect width="128" height="128" rx="28" fill="#3D0066"/>
          <path d="M38 34h28c18 0 28 12 28 30s-10 30-28 30H38V34zm16 46h12c8 0 12-6 12-16s-4-16-12-16H54v32z" fill="#FFFFFF"/>
          <path d="M92 48l16 16-16 16" stroke="var(--theme-accent, #F04B20)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );

    case 'Entity Framework Core':
      return (
        <svg viewBox="0 0 128 128" className={className} fill="none">
          <rect width="128" height="128" rx="28" fill="#512BD4"/>
          <path d="M42 36h44v14H58v18h24v14H58v20h30v14H42V36z" fill="#FFFFFF"/>
          <path d="M96 64a8 8 0 11-16 0 8 8 0 0116 0z" fill="var(--theme-accent, #F04B20)"/>
        </svg>
      );

    case 'PHP':
      return (
        <svg viewBox="0 0 128 128" className={className}>
          <ellipse cx="64" cy="64" rx="58" ry="34" fill="#777BB4"/>
          <path d="M34 50h12c7 0 11 3 10 9-1 7-6 10-13 10h-5l-3 15h-8l7-34zm12 13c3 0 5-1 6-4 0-2-1-3-4-3h-4l-1 7h3zm22-13h8l-7 34h-8l3-15h-6l-3 15h-8l7-34h8l-2 13h6l2-13zm26 0h12c7 0 11 3 10 9-1 7-6 10-13 10h-5l-3 15h-8l7-34zm12 13c3 0 5-1 6-4 0-2-1-3-4-3h-4l-1 7h3z" fill="#FFFFFF"/>
        </svg>
      );

    case 'CodeIgniter 4':
      return (
        <svg viewBox="0 0 128 128" className={className}>
          <rect width="128" height="128" rx="28" fill="#EE4623"/>
          <path d="M64 16c-4 12-14 26-14 38 0 16 11 26 11 38 0 11-6 20-14 24 16 0 32-12 32-34 0-16-10-28-10-42 0-9 5-16 9-24-8 0-14 0-14 0z" fill="#FFFFFF"/>
          <path d="M62 44c-2 8-8 16-8 24 0 12 7 18 7 26 0 7-4 13-9 16 10 0 20-8 20-22 0-10-6-18-6-27 0-6 3-11 6-17-5 0-10 0-10 0z" fill="#FFC107"/>
        </svg>
      );

    case 'REST API Development':
      return (
        <svg viewBox="0 0 128 128" className={className} fill="none">
          <rect width="128" height="128" rx="28" fill="#18181b"/>
          <circle cx="36" cy="64" r="14" stroke="var(--theme-accent, #F04B20)" strokeWidth="6" fill="var(--theme-accent, #F04B20)" fillOpacity="0.2"/>
          <circle cx="92" cy="40" r="12" stroke="#10B981" strokeWidth="6" fill="#10B981" fillOpacity="0.2"/>
          <circle cx="92" cy="88" r="12" stroke="#3B82F6" strokeWidth="6" fill="#3B82F6" fillOpacity="0.2"/>
          <path d="M49 59l32-14M49 69l32 14" stroke="#A1A1AA" strokeWidth="5" strokeLinecap="round"/>
        </svg>
      );

    case 'Microservices Architecture':
      return (
        <svg viewBox="0 0 128 128" className={className} fill="none">
          <rect width="128" height="128" rx="28" fill="#18181b"/>
          <rect x="24" y="24" width="32" height="32" rx="8" stroke="var(--theme-accent, #F04B20)" strokeWidth="5" fill="var(--theme-accent, #F04B20)" fillOpacity="0.25"/>
          <rect x="72" y="24" width="32" height="32" rx="8" stroke="#38BDF8" strokeWidth="5" fill="#38BDF8" fillOpacity="0.25"/>
          <rect x="24" y="72" width="32" height="32" rx="8" stroke="#A855F7" strokeWidth="5" fill="#A855F7" fillOpacity="0.25"/>
          <rect x="72" y="72" width="32" height="32" rx="8" stroke="#10B981" strokeWidth="5" fill="#10B981" fillOpacity="0.25"/>
          <path d="M56 40h16M56 88h16M40 56v16M88 56v16" stroke="#71717A" strokeWidth="4" strokeLinecap="round"/>
        </svg>
      );

    case 'Microsoft SQL Server':
      return (
        <svg viewBox="0 0 128 128" className={className}>
          <rect width="128" height="128" rx="28" fill="#CC292B"/>
          <path d="M64 24C41.9 24 24 31.2 24 40v48c0 8.8 17.9 16 40 16s40-7.2 40-16V40c0-8.8-17.9-16-40-16zm0 10c18.8 0 30 5.6 30 6s-11.2 6-30 6-30-5.6-30-6 11.2-6 30-6zm30 54c0 .4-11.2 6-30 6s-30-5.6-30-6V74c7.6 4.3 18.2 6 30 6s22.4-1.7 30-6v14zm0-20c0 .4-11.2 6-30 6s-30-5.6-30-6V54c7.6 4.3 18.2 6 30 6s22.4-1.7 30-6v14z" fill="#FFFFFF"/>
        </svg>
      );

    case 'MySQL':
      return (
        <svg viewBox="0 0 128 128" className={className} fill="none">
          <rect width="128" height="128" rx="28" fill="#00618A"/>
          <path d="M64 28c-18 0-32 10-34 26 7-6 18-9 28-7-8 4-15 11-18 19 6-2 14-3 20-1-6 5-11 11-13 18 12-4 25-1 34 8 2-6 5-12 9-16-5-1-10-4-13-8 6 1 12 0 17-3-7-3-12-8-14-14 7 1 14 0 19-3-6-4-10-10-11-17 6 3 13 4 19 3-8-9-19-15-33-15z" fill="#E48E00"/>
          <path d="M82 78c-5-2-10-2-15 0-3 1-5 4-6 7 4-1 8 0 12 2 3-3 6-6 9-9z" fill="#FFFFFF"/>
        </svg>
      );

    case 'Database Design':
      return (
        <svg viewBox="0 0 128 128" className={className} fill="none">
          <rect width="128" height="128" rx="28" fill="#18181b"/>
          <ellipse cx="64" cy="34" rx="36" ry="14" stroke="#F59E0B" strokeWidth="6" fill="#F59E0B" fillOpacity="0.2"/>
          <path d="M28 34v30c0 7.7 16.1 14 36 14s36-6.3 36-14V34" stroke="#F59E0B" strokeWidth="6"/>
          <path d="M28 64v30c0 7.7 16.1 14 36 14s36-6.3 36-14V64" stroke="#F59E0B" strokeWidth="6"/>
        </svg>
      );

    case 'Query Optimization':
      return (
        <svg viewBox="0 0 128 128" className={className} fill="none">
          <rect width="128" height="128" rx="28" fill="#18181b"/>
          <path d="M28 88a44 44 0 1172 0" stroke="#3F3F46" strokeWidth="8" strokeLinecap="round"/>
          <path d="M28 88a44 44 0 0164-32" stroke="#10B981" strokeWidth="8" strokeLinecap="round"/>
          <circle cx="64" cy="80" r="8" fill="var(--theme-accent, #F04B20)"/>
          <path d="M64 80l22-26" stroke="var(--theme-accent, #F04B20)" strokeWidth="6" strokeLinecap="round"/>
        </svg>
      );

    case 'HTML5':
      return (
        <svg viewBox="0 0 128 128" className={className}>
          <path d="M19 116L9 4h110l-10 112-45 12z" fill="#E44D26"/>
          <path d="M64 117l36-10 8-93H64v103z" fill="#F16529"/>
          <path d="M64 54H46l-2-18h40l1-13H30l5 56h29V54zm0 39l-19-5-1-14H31l2 25 31 9v-15z" fill="#EBEBEB"/>
          <path d="M64 54v25l19-5 2-20H64zm0-31v13h21l-1 13H64v13h34l-3 36-31 9V93z" fill="#FFFFFF"/>
        </svg>
      );

    case 'CSS3':
      return (
        <svg viewBox="0 0 128 128" className={className}>
          <path d="M19 116L9 4h110l-10 112-45 12z" fill="#1572B6"/>
          <path d="M64 117l36-10 8-93H64v103z" fill="#33A9DC"/>
          <path d="M64 54H46l-2-18h40l1-13H30l5 56h29V54zm0 39l-19-5-1-14H31l2 25 31 9v-15z" fill="#EBEBEB"/>
          <path d="M64 54v25l19-5 2-20H64zm0-31v13h21l-1 13H64v13h34l-3 36-31 9V93z" fill="#FFFFFF"/>
        </svg>
      );

    case 'JavaScript':
      return (
        <svg viewBox="0 0 128 128" className={className}>
          <rect width="128" height="128" rx="20" fill="#F7DF1E"/>
          <path d="M34 100c4 3 9 5 15 5 8 0 13-4 13-11 0-7-4-10-12-14l-4-2c-12-5-17-12-17-21 0-13 10-22 26-22 6 0 12 2 16 4l-4 12c-3-2-7-3-12-3-7 0-11 4-11 9 0 6 4 9 11 12l4 2c13 5 18 12 18 23 0 15-11 23-28 23-7 0-15-2-20-5l4-13zm48-43h15v35c0 7 3 9 8 9 4 0 7-1 9-2l2 11c-4 2-9 3-15 3-12 0-19-6-19-19V57z" fill="#000000"/>
        </svg>
      );

    case 'React':
      return (
        <svg viewBox="0 0 128 128" className={className} fill="none">
          <rect width="128" height="128" rx="28" fill="#18181b"/>
          <circle cx="64" cy="64" r="11" fill="#61DAFB"/>
          <ellipse cx="64" cy="64" rx="46" ry="18" stroke="#61DAFB" strokeWidth="6" transform="rotate(0 64 64)"/>
          <ellipse cx="64" cy="64" rx="46" ry="18" stroke="#61DAFB" strokeWidth="6" transform="rotate(60 64 64)"/>
          <ellipse cx="64" cy="64" rx="46" ry="18" stroke="#61DAFB" strokeWidth="6" transform="rotate(120 64 64)"/>
        </svg>
      );

    case 'Angular':
      return (
        <svg viewBox="0 0 128 128" className={className}>
          <path d="M64 12L12 30l8 68 44 24 44-24 8-68z" fill="#DD0031"/>
          <path d="M64 12v102l44-24 8-68z" fill="#C3002F"/>
          <path d="M64 32L38 88h12l5-13h18l5 13h12L64 32zm0 24l6 14H58l6-14z" fill="#FFFFFF"/>
        </svg>
      );

    case 'Zoho Books API':
      return (
        <svg viewBox="0 0 128 128" className={className}>
          <rect width="128" height="128" rx="28" fill="#005B94"/>
          <path d="M30 40h28v14H44v14h14v14H30V40zm38 0h28v14H82v14h14v14H68V40z" fill="#FFFFFF"/>
          <rect x="30" y="88" width="66" height="10" rx="3" fill="var(--theme-accent, #F04B20)"/>
        </svg>
      );

    case 'OAuth 2.0':
      return (
        <svg viewBox="0 0 128 128" className={className} fill="none">
          <rect width="128" height="128" rx="28" fill="#18181b"/>
          <circle cx="64" cy="64" r="44" stroke="#4F46E5" strokeWidth="6" strokeDasharray="10 6"/>
          <circle cx="56" cy="56" r="16" stroke="var(--theme-accent, #F04B20)" strokeWidth="6"/>
          <path d="M68 68l26 26m-8-12l6 6m-12-6l6 6" stroke="var(--theme-accent, #F04B20)" strokeWidth="6" strokeLinecap="round"/>
        </svg>
      );

    case 'Amazon SP-API':
      return (
        <svg viewBox="0 0 128 128" className={className} fill="none">
          <rect width="128" height="128" rx="28" fill="#131921"/>
          <path d="M34 50h14v28h-14zm23-14h14v42H57zm23 8h14v34H80z" fill="#FFFFFF"/>
          <path d="M32 94c20 12 44 12 64 0" stroke="#FF9900" strokeWidth="6" strokeLinecap="round"/>
          <path d="M96 94l-8-1 4-6z" fill="#FF9900"/>
        </svg>
      );

    case 'Flipkart API':
      return (
        <svg viewBox="0 0 128 128" className={className}>
          <rect width="128" height="128" rx="28" fill="#2874F0"/>
          <path d="M46 36h36c3 0 6 3 5 6l-3 18H58l-2 10h22l-2 12H54l-4 22H38l12-68h-4z" fill="#FFE500"/>
        </svg>
      );

    case 'Git & GitHub':
      return (
        <svg viewBox="0 0 128 128" className={className} fill="none">
          <rect width="128" height="128" rx="28" fill="#18181b"/>
          <path fillRule="evenodd" clipRule="evenodd" d="M64 24C41.9 24 24 41.9 24 64c0 17.7 11.5 32.7 27.4 38 2 .4 2.7-.9 2.7-1.9v-7.4c-11.1 2.4-13.5-4.7-13.5-4.7-1.8-4.6-4.4-5.8-4.4-5.8-3.6-2.5.3-2.4.3-2.4 4 .3 6.1 4.1 6.1 4.1 3.6 6.1 9.4 4.3 11.6 3.3.4-2.6 1.4-4.3 2.5-5.3-8.9-1-18.2-4.4-18.2-19.8 0-4.4 1.6-7.9 4.1-10.7-.4-1-.18-5.1.4-10.6 0 0 3.4-1.1 11 4.1 3.2-.9 6.7-1.3 10.1-1.3s6.9.4 10.1 1.3c7.6-5.2 11-4.1 11-4.1 2.2 5.5 0.8 9.6.4 10.6 2.6 2.8 4.1 6.3 4.1 10.7 0 15.4-9.4 18.7-18.3 19.7 1.4 1.2 2.7 3.6 2.7 7.3v10.8c0 1 .7 2.3 2.8 1.9C92.5 96.7 104 81.7 104 64c0-22.1-17.9-40-40-40z" fill="#FFFFFF"/>
          <circle cx="92" cy="36" r="8" fill="#F05032"/>
        </svg>
      );

    case 'Postman':
      return (
        <svg viewBox="0 0 128 128" className={className}>
          <rect width="128" height="128" rx="28" fill="#FF6C37"/>
          <path d="M64 28a36 36 0 100 72 36 36 0 000-72zm-8 20c3 0 6 2 7 5l12-3c1 0 2 1 2 2l1 6c0 1-1 2-2 2l-12 3c-1 3-4 5-8 5a9 9 0 01-9-9c0-5 4-9 9-9zm20 32l-12-8c-1-1-1-2 0-3l4-4c1-1 2-1 3 0l12 8c1 1 1 2 0 3l-4 4c-1 1-2 1-3 0z" fill="#FFFFFF"/>
        </svg>
      );

    case 'ChatGPT':
      return (
        <svg viewBox="0 0 128 128" className={className} fill="none">
          <rect width="128" height="128" rx="28" fill="#10A37F"/>
          <path d="M64 36c-5 0-9 2-12 5l-8-5c-7 4-11 12-9 20l-6 3c-4 7-2 16 4 21v10c7 4 15 2 21-3l7 4c8 0 15-5 17-13l8-3c4-7 3-16-3-22v-9c-7-4-15-3-21 2l-8-5zm0 10c2 0 4 1 6 2l-10 6c-2 1-3 3-3 5v8l-7-4c-4-2-5-7-3-11 2-4 6-6 10-6h4zm14 8c4 2 5 7 3 11l-7 4-7-4v-8c0-2 1-4 3-5l8-5c1 0 2 0 3 1zm-32 8l7 4v8c0 2-1 4-3 5l-8 5c-4 2-9 0-11-4-2-4 0-9 4-11l8-5v-2zm32 10v8c0 2-1 4-3 5l-8 5c-4 2-9 0-11-4-2-4 0-9 4-11l8-5v2l10 5zm-14 8c-2 0-4-1-6-2l10-6c2-1 3-3 3-5v-8l7 4c4 2 5 7 3 11-2 4-6 6-10 6h-4z" fill="#FFFFFF"/>
        </svg>
      );

    case 'GitHub Copilot':
      return (
        <svg viewBox="0 0 128 128" className={className} fill="none">
          <rect width="128" height="128" rx="28" fill="#18181b"/>
          <path d="M40 50c0-10 11-18 24-18s24 8 24 18c0 14-11 26-24 26S40 64 40 50z" fill="#FFFFFF"/>
          <path d="M52 50a6 6 0 11-12 0 6 6 0 0112 0zm36 0a6 6 0 11-12 0 6 6 0 0112 0z" fill="#09090b"/>
          <path d="M50 78c4 4 9 6 14 6s10-2 14-6" stroke="#9333EA" strokeWidth="6" strokeLinecap="round"/>
        </svg>
      );

    case 'Claude':
      return (
        <svg viewBox="0 0 128 128" className={className}>
          <rect width="128" height="128" rx="28" fill="#D97757"/>
          <path d="M72 38L52 90h12l4-12h18l4 12h12L82 38H72zm-2 30l5-16 5 16H70z" fill="#FFFFFF"/>
          <circle cx="44" cy="54" r="6" fill="#FFFFFF"/>
        </svg>
      );

    case 'Gemini':
      return (
        <svg viewBox="0 0 128 128" className={className} fill="none">
          <rect width="128" height="128" rx="28" fill="#18181b"/>
          <path d="M64 20C64 44 44 64 20 64c24 0 44 20 44 44 0-24 20-44 44-44-24 0-44-20-44-44z" fill="url(#gemini-grad)"/>
          <defs>
            <linearGradient id="gemini-grad" x1="20" y1="20" x2="108" y2="108" gradientUnits="userSpaceOnUse">
              <stop stopColor="#1A73E8"/>
              <stop offset="0.5" stopColor="#8AB4F8"/>
              <stop offset="1" stopColor="#FF7769"/>
            </linearGradient>
          </defs>
        </svg>
      );

    case 'Cursor':
      return (
        <svg viewBox="0 0 128 128" className={className} fill="none">
          <rect width="128" height="128" rx="28" fill="#000000"/>
          <path d="M36 28l58 32-26 8-8 26L36 28z" fill="#FFFFFF"/>
          <path d="M68 68l24 24" stroke="var(--theme-accent, #F04B20)" strokeWidth="6" strokeLinecap="round"/>
        </svg>
      );

    default:
      return (
        <div className={`rounded-lg bg-zinc-800 flex items-center justify-center text-brand-orange font-mono font-bold text-xs ${className}`}>
          {name.slice(0, 2).toUpperCase()}
        </div>
      );
  }
};

