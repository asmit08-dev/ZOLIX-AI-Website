import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { insightLinks } from "@/lib/insights-data";
import Breadcrumbs, { type Crumb } from "@/components/Breadcrumbs";

function prettify(path: string) {
  const slug = path.split("/").pop() ?? "";
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

const industryImages: Record<string, { src: string; alt: string }> = {
  "/industries/financial-services": {
    src: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=1200&q=80",
    alt: "Modern financial district buildings",
  },
  "/industries/manufacturing-logistics": {
    src: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&w=1200&q=80",
    alt: "Organized warehouse logistics operation",
  },
  "/industries/healthcare-life-sciences": {
    src: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
    alt: "Healthcare professional using digital technology",
  },
  "/industries/retail-ecommerce": {
    src: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80",
    alt: "Contemporary retail store interior",
  },
  "/industries/government": {
    src: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&w=1200&q=80",
    alt: "Government building viewed from below",
  },
  "/industries/education": {
    src: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80",
    alt: "Students collaborating in a learning space",
  },
  "/industries/media-entertainment": {
    src: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1200&q=80",
    alt: "Film production camera on set",
  },
  "/industries/technology": {
    src: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
    alt: "Close-up of computer hardware",
  },
  "/industries/gaming": {
    src: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80",
    alt: "Gaming setup with a computer display",
  },
};

const technologyImages: Record<string, { src: string; alt: string }> = {
  "/technologies/aws": { src: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=85", alt: "Connected global cloud infrastructure" },
  "/technologies/azure": {
    src: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1200&q=85",
    alt: "Data center infrastructure for cloud computing",
  },
  "/technologies/google-cloud": { src: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=85", alt: "Modern computer hardware for cloud services" },
  "/technologies/oracle-cloud": { src: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=85", alt: "Network servers and cloud infrastructure" },
  "/technologies/generative-ai": { src: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=85", alt: "Abstract artificial intelligence visualization" },
  "/technologies/gpu-infrastructure": { src: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=85", alt: "High-performance computing workstation" },
  "/technologies/cloud-cost-management-software": { src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=85", alt: "Business analytics dashboard" },
  "/technologies/cloud-infrastructure-optimization": { src: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1200&q=85", alt: "Cloud infrastructure operations" },
  "/technologies/best-finops-tools": { src: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=85", alt: "Financial planning and analytics" },
  "/technologies/cloud-monitoring-tools": { src: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=85", alt: "Technology monitoring workspace" },
  "/technologies/cloud-finops": { src: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=85", alt: "Financial cloud operations data" },
  "/technologies/ai-finops": { src: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=85", alt: "Artificial intelligence and financial operations technology" },
  "/technologies/learning-model": { src: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=85", alt: "Machine learning development workspace" },
  "/technologies/cloud-cost-management": { src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=85", alt: "Cloud cost management workspace" },
  "/technologies/cloud-cost-optimization": { src: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=85", alt: "Cloud optimization engineering screen" },
  "/technologies/cloud-cost-optimization-tools": { src: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=1200&q=85", alt: "Cloud operations laptop workstation" },
  "/technologies/cloud-cost-optimization-services": { src: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&w=1200&q=85", alt: "Cloud services development workstation" },
  "/technologies/cloud-cost-management-solutions": { src: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=1200&q=85", alt: "Cost management planning workspace" },
  "/technologies/cloud-cost-monitoring": { src: "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?auto=format&fit=crop&w=1200&q=85", alt: "Data center monitoring equipment" },
  "/technologies/cloud-optimization-tools": { src: "https://images.unsplash.com/photo-1560732488-6b0df240254a?auto=format&fit=crop&w=1200&q=85", alt: "Cloud engineering tools on screen" },
  "/technologies/cloud-cost-reduction": { src: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=85", alt: "Efficient modern technology workspace" },
  "/technologies/best-cloud-cost-optimization-tools": { src: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=85", alt: "Cloud technology collaboration workspace" },
  "/technologies/cloud-cost-management-platform": { src: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=85", alt: "Cloud platform team at work" },
  "/technologies/cloud-performance-optimization": { src: "https://images.unsplash.com/photo-1484417894907-623942c8ee29?auto=format&fit=crop&w=1200&q=85", alt: "High-performance engineering workstation" },
  "/technologies/cloud-optimization-platform": { src: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1200&q=85", alt: "Cloud platform technology team" },
  "/technologies/cloud-optimization-software": { src: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?auto=format&fit=crop&w=1200&q=85", alt: "Cloud software development screen" },
  "/technologies/cloud-cost-control": { src: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=1200&q=85", alt: "Cloud cost control code workspace" },
  "/technologies/cloud-cost-monitoring-tools": { src: "https://images.unsplash.com/photo-1496171367470-9ed9a91ea931?auto=format&fit=crop&w=1200&q=85", alt: "Cloud monitoring desk setup" },
  "/technologies/cloud-computing-cost-management": { src: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=85", alt: "Cloud computing source code" },
  "/technologies/cloud-optimization-companies": { src: "https://images.unsplash.com/photo-1518773553398-650c184e0bb3?auto=format&fit=crop&w=1200&q=85", alt: "Cloud technology collaboration" },
  "/technologies/cloud-cost-tools": { src: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=85", alt: "Cloud cost tools and digital security" },
  "/technologies/best-cloud-cost-management-tools": { src: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=1200&q=85", alt: "Cloud management software code" },
  "/technologies/best-cloud-monitoring-tools": { src: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=85", alt: "Technology monitoring professional at work" },
};

const technologyGradientPalettes = [
  ["#ffb2c0", "#77c6ff", "#8f84ff"], ["#ffd36e", "#74dfc9", "#5b94fb"], ["#e9a6ff", "#7c78ff", "#38d7c6"],
  ["#ff9b78", "#ffc76f", "#bf72eb"], ["#9ee8bd", "#51b7d9", "#647cef"], ["#ff9cbd", "#91b8ff", "#f6db70"],
  ["#ab8eff", "#70e1d2", "#ff9f83"], ["#83d3ff", "#4ca5e6", "#f18fbe"], ["#f69dff", "#fbc57b", "#7f98ff"],
  ["#52e4c4", "#4ca7f7", "#b17fea"], ["#ffcd70", "#f8838e", "#b37bff"], ["#59c5ea", "#78e0b5", "#e8d46d"],
  ["#ff9a8b", "#9b74e9", "#5fc8f2"], ["#87e6d5", "#6d8df0", "#ffb06c"], ["#d98bff", "#5fd3e5", "#ff9d9a"],
  ["#ffb869", "#ee82bc", "#7fa5ff"], ["#72d7ff", "#88df8d", "#b28cf3"], ["#ff8e9b", "#ffce82", "#60bff0"],
  ["#a9e3ff", "#d18bf0", "#ff9c76"], ["#79e0cf", "#8099f7", "#ff91ba"], ["#ffb970", "#80caef", "#df8ede"],
  ["#c68cff", "#65c7fa", "#f9c570"], ["#f682a5", "#7ee0c8", "#91a0ff"], ["#ffcf78", "#df7eca", "#63aef1"],
  ["#70d3f6", "#a47eea", "#ff9c98"], ["#a2e88e", "#7a9cf3", "#ffad76"], ["#ef87c4", "#5dc7ef", "#ffc46f"],
  ["#ff9e7c", "#cc7be3", "#6ec9f0"], ["#71e0dd", "#ab85f1", "#ffac87"], ["#f4bd6e", "#80a2fa", "#f381b9"],
  ["#f58599", "#74d5ec", "#a488ee"], ["#6fdbbf", "#ba8ce8", "#ffd078"], ["#e88fd2", "#79c9ef", "#ffac75"],
] as const;

function technologyGradient(index: number) {
  const [coral, sky, lilac] = technologyGradientPalettes[index % technologyGradientPalettes.length];
  const softBase = `linear-gradient(135deg, ${coral}88 0%, ${sky}77 50%, ${lilac}77 100%)`;
  const patterns = [
    `${softBase}, linear-gradient(${sky}2e 1px, transparent 1px), linear-gradient(90deg, ${sky}2e 1px, transparent 1px)`,
    `${softBase}, radial-gradient(${lilac}88 1.25px, transparent 1.5px)`,
    `${softBase}, repeating-radial-gradient(circle at 15% 120%, transparent 0 26px, ${coral}43 27px 29px, transparent 30px 56px)`,
    `${softBase}, repeating-linear-gradient(125deg, transparent 0 28px, ${sky}48 29px 30px, transparent 31px 62px)`,
    `${softBase}, radial-gradient(ellipse at 18% 50%, transparent 0 18%, ${lilac}4d 18.5% 19.5%, transparent 20% 30%, ${lilac}35 30.5% 31.5%, transparent 32%)`,
    `${softBase}, linear-gradient(90deg, transparent 0 18%, ${coral}52 18.5% 19.5%, transparent 20% 42%, ${coral}52 42.5% 43.5%, transparent 44% 68%, ${coral}52 68.5% 69.5%, transparent 70%)`,
    `${softBase}, repeating-linear-gradient(0deg, transparent 0 13px, ${sky}38 14px 15px, transparent 16px 30px)`,
    `${softBase}, conic-gradient(from ${index * 17}deg at 78% 28%, ${coral}35, transparent 22%, ${sky}35 44%, transparent 62%, ${lilac}35 83%, transparent)`,
    `${softBase}, radial-gradient(circle at 82% 20%, ${sky}72 0 3px, transparent 4px), radial-gradient(circle at 63% 52%, ${sky}58 0 3px, transparent 4px), radial-gradient(circle at 85% 75%, ${sky}72 0 3px, transparent 4px)`,
    `${softBase}, linear-gradient(145deg, transparent 0 44%, ${lilac}44 44.5% 45.5%, transparent 46% 100%), linear-gradient(35deg, transparent 0 54%, ${coral}44 54.5% 55.5%, transparent 56% 100%)`,
    `${softBase}, repeating-linear-gradient(90deg, transparent 0 34px, ${coral}32 35px 36px, transparent 37px 72px), repeating-linear-gradient(0deg, transparent 0 34px, ${coral}32 35px 36px, transparent 37px 72px)`,
  ];
  return patterns[index % patterns.length];
}

function technologyName(path: string) {
  const providerNames: Record<string, string> = {
    "/technologies/aws": "AWS",
    "/technologies/azure": "Azure",
    "/technologies/google-cloud": "Google Cloud",
    "/technologies/oracle-cloud": "Oracle Cloud",
  };
  if (providerNames[path]) return providerNames[path];
  const name = prettify(path);
  return name
    .replace(/^Cloud Cost /, "")
    .replace(/^Cloud /, "")
    .replace(/^Best /, "")
    .replace(/ Solutions$/, "")
    .replace(/ Tools$/, " Tools");
}

/**
 * Server-rendered listing page that aggregates all real insight pages in a
 * given category into an on-brand card grid. Powers the /industries,
 * /technologies, and /finops-hub hubs and provides deep internal links.
 */
export default function CategoryHub({
  category,
  title,
  intro,
  hubPath,
  hubLabel,
  eyebrow,
}: {
  category: string;
  title: string;
  intro: string;
  hubPath: string;
  hubLabel: string;
  eyebrow: string;
}) {
  const items = insightLinks.filter((l) => l.category === category);
  const crumbs: Crumb[] = [
    { name: "Home", path: "/" },
    { name: hubLabel, path: hubPath },
  ];

  return (
    <div className="pt-52 pb-32 px-6 bg-white min-h-screen">
      <div className="max-w-6xl mx-auto">
        <Breadcrumbs items={crumbs} />
        <div className="inline-block bg-zolix-orange text-white px-5 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest mb-8">
          {eyebrow}
        </div>
        <h1 className="text-4xl md:text-7xl font-extrabold mb-8 leading-[0.95] text-zolix-dark tracking-tighter max-w-4xl">
          {title}
        </h1>
        <p className="text-lg md:text-2xl text-zolix-dark/40 font-bold tracking-tight max-w-3xl mb-16">
          {intro}
        </p>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => {
            const image = category === "industries" ? industryImages[item.path] : undefined;
            const isTechnologyCard = category === "technologies" && Boolean(technologyImages[item.path]);
            const gradient = isTechnologyCard ? technologyGradient(index) : undefined;
            const cardTitle = technologyName(item.path);

            return (
              <Link
                key={item.path}
                href={item.path}
                className={`group flex flex-col overflow-hidden rounded-[22px] border bg-white shadow-[0_1px_1px_rgba(25,25,25,0.03)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_22px_55px_rgba(25,25,25,0.12)] ${isTechnologyCard ? "border-zolix-dark/10 hover:border-[#7a75d6]/45 hover:shadow-[0_22px_55px_rgba(104,113,205,0.18)]" : "border-zolix-dark/[0.08] hover:border-zolix-dark/15"}`}
              >
                {(image || gradient) && (
                <div className="relative aspect-[4/3] overflow-hidden bg-zolix-dark">
                  {image && <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />}
                  {gradient && <div aria-hidden className="absolute inset-0 scale-110 transition-transform duration-700 ease-out group-hover:scale-125" style={{ backgroundImage: gradient }} />}
                  {isTechnologyCard ? <><div className="absolute inset-0 bg-white/10" /><span className="absolute left-1/2 top-1/2 max-w-[82%] -translate-x-1/2 -translate-y-1/2 rounded-[18px] bg-white px-5 py-3 text-center text-sm font-bold leading-tight tracking-[-.035em] text-[#252137] shadow-[0_14px_30px_rgba(62,54,106,.18)] transition-transform duration-500 group-hover:-translate-y-[58%] group-hover:scale-105">{cardTitle}</span></> : <><div className="absolute inset-0 bg-gradient-to-t from-zolix-dark/65 via-zolix-dark/5 to-transparent" /><div className="absolute left-5 top-5 rounded-full border border-white/35 bg-zolix-dark/20 px-3 py-1.5 text-[8px] font-bold uppercase tracking-[0.16em] text-white backdrop-blur-sm">Industry / {String(index + 1).padStart(2, "0")}</div><span className="absolute bottom-5 right-5 grid h-10 w-10 place-items-center rounded-full bg-white text-zolix-dark shadow-lg transition-all duration-300 group-hover:rotate-45 group-hover:bg-zolix-orange group-hover:text-white"><ArrowUpRight size={17} strokeWidth={2.5} /></span></>}
                </div>
                )}
                <div className="flex flex-1 flex-col p-7 md:p-8">
                  {!isTechnologyCard && <><div className="mb-5 flex items-center gap-3 text-[9px] font-bold uppercase tracking-[0.16em] text-zolix-orange"><span className="h-px w-5 bg-zolix-orange" />{category}</div><h2 className="mb-4 text-2xl font-bold leading-[1.05] tracking-[-0.035em] text-zolix-dark transition-colors group-hover:text-zolix-orange">{prettify(item.path)}</h2></>}
                  <p className="flex-1 text-[14px] font-medium leading-relaxed text-zolix-dark/55">
                    {item.metaDesc}
                  </p>
                  <div className={`mt-7 flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-[0.15em] transition-colors ${isTechnologyCard ? "rounded-full bg-zolix-dark/[.06] px-4 py-4 text-zolix-dark/65 group-hover:bg-[#38314f] group-hover:text-white" : "border-t border-zolix-dark/10 pt-5 text-zolix-dark/45 group-hover:text-zolix-dark"}`}>
                    <span>{isTechnologyCard ? "Explore technology" : "Explore solution"}</span>
                    <ArrowUpRight size={15} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
