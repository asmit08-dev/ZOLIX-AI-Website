interface LegalContentProps {
  type: 'privacy' | 'terms' | 'cookies';
}

const LegalContent = ({ type }: LegalContentProps) => {
  const content = {
    privacy: {
      title: "Privacy Policy",
      updated: "Last Updated: January 2026",
      sections: [
        { h: "Data Sovereignty", p: "ZOLIX AI is built on a private-first architecture. We do not ingest your sensitive business data into public LLMs. All infrastructure metadata processed by the C2O engine is encrypted and isolated." },
        { h: "Information Collection", p: "We collect billing metadata, infrastructure telemetry, and user interaction data to provide optimization recommendations. We do not access your source code, customer databases, or production logs." },
        { h: "Compliance", p: "ZOLIX AI is fully compliant with ISO 27001, SOC 2 Type II, GDPR, and DPDPA. Our security protocols are audited annually by independent third-party firms." }
      ]
    },
    terms: {
      title: "Terms of Service",
      updated: "Last Updated: January 2026",
      sections: [
        { h: "Service Usage", p: "By using ZOLIX AI, you agree to provide accurate billing metadata for the purpose of cloud cost optimization. ZOLIX provides recommendations; the final implementation of remediation actions is the responsibility of the user." },
        { h: "IP Rights", p: "The C2O AI Engine, its 9B parameter model, and all proprietary algorithms remain the exclusive intellectual property of ZOLIX CLOUD INFRA SERVICES LLC." },
        { h: "Liability", p: "ZOLIX is not liable for infrastructure downtime resulting from the implementation of optimization recommendations. We recommend testing all changes in a staging environment." }
      ]
    },
    cookies: {
      title: "Cookie Policy",
      updated: "Last Updated: January 2026",
      sections: [
        { h: "Essential Cookies", p: "These are necessary for the platform to function, including authentication and session management for the ZOLIX portal." },
        { h: "Analytics", p: "We use Google Tag Manager and internal telemetry to understand how users interact with our optimization reports to improve engine accuracy." },
        { h: "Control", p: "You can manage your cookie preferences through your browser settings. However, disabling essential cookies may impact platform functionality." }
      ]
    }
  };

  const page = content[type];

  return (
    <div className="pt-52 pb-32 px-6 bg-white min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4 text-zolix-dark">{page.title}</h1>
        <p className="text-zolix-orange font-bold uppercase tracking-widest text-[10px] mb-16">{page.updated}</p>
        
        <div className="space-y-16">
          {page.sections.map((s, i) => (
            <div key={i} className="space-y-6">
              <h2 className="text-2xl font-bold text-zolix-dark">{s.h}</h2>
              <p className="text-gray-500 leading-relaxed font-medium text-lg">{s.p}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LegalContent;
