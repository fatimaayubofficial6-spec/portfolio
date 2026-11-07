import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Lenis from 'lenis'
import Hero from './components/Hero'
import ProjectBrowserSlider from './components/ProjectBrowserSlider'

import img1 from './assets/project-1/img1.png'
import img2 from './assets/project-1/img2.png'
import img3 from './assets/project-1/img3.png'
import img4 from './assets/project-1/img4.png'
import img5 from './assets/project-1/img5.png'

import pro2 from './assets/project-2/pro2.jpg'
import pro3 from './assets/project-2/pro3.jpg'
import pro4 from './assets/project-2/pro4.jpg'
import vid3 from './assets/project-2/vid3.mp4'
import vid4 from './assets/project-2/vid4.mp4'

import wallart1 from './assets/project3/aiwallart1.png'
import wallart2 from './assets/project3/wallart2.jpg'
import wallart3 from './assets/project3/wallart3.png'

import buyuae1 from './assets/project4/buyuae1.jpg'
import buyuae2 from './assets/project4/buyuae2.jpg'
import buyuae3 from './assets/project4/buyuae3.jpg'

import dprinto1 from './assets/project5/dprinto1.jpg'
import dprinto2 from './assets/project5/dprinto2.jpg'
import dprinto3 from './assets/project5/dprinto3.jpg'

import wisecode1 from './assets/Project6/wisecode1.jpg'
import wisecode2 from './assets/Project6/wisecode2.jpg'
import wisecode3 from './assets/Project6/wisecode3.jpg'
import wisecode4 from './assets/Project6/wisecode4.jpg'

import bkwash1 from './assets/project7/bkwash1.jpg'
import bkwash2 from './assets/project7/bkwash2.png'

import stratify1 from './assets/project8/stratify.jpg'

import workspace1 from './assets/project9/workspace1.jpg'
import workspace2 from './assets/project9/workspace2.jpg'

import Preloader from './components/Preloader'
import Separator from './components/Separator'
import ConnectFooter from './components/ConnectFooter'
import useIsMobile from './hooks/useIsMobile';

function App() {
  const isMobile = useIsMobile();
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (isLoading) {
      document.body.classList.add('preloader-active');
      window.scrollTo(0, 0);
      return;
    }
    document.body.classList.remove('preloader-active');

    // On mobile, use native 120Hz touch scrolling for maximum performance & zero hang!
    if (isMobile) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [isLoading, isMobile])

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <Preloader key="preloader" onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      <div
        className="text-white min-h-screen selection:bg-[#10b981] selection:text-black overflow-clip relative"
        style={{
          background: 'linear-gradient(180deg, #03120c 0%, #020d09 20%, #041710 40%, #020c08 60%, #041a12 80%, #020805 100%)',
        }}
        onContextMenu={(e) => e.preventDefault()}
      >
        {/* Fixed Ambient Cyber Grid Texture */}
        <div 
          className="ambient-bg-grid"
          style={{
            position: 'fixed',
            inset: 0,
            pointerEvents: 'none',
            zIndex: 0,
            opacity: 0.75,
          }} 
        />

        {/* Floating Emerald Ambient Glows (Desktop Only - disabled on mobile to prevent severe GPU memory & blur lag) */}
        {!isMobile && (
          <>
            <div style={{
              position: 'fixed',
              top: '-12%',
              left: '-8%',
              width: '45vw',
              height: '45vw',
              background: 'radial-gradient(circle, rgba(16, 185, 129, 0.18) 0%, rgba(5, 150, 105, 0.08) 50%, transparent 70%)',
              filter: 'blur(120px)',
              pointerEvents: 'none',
              zIndex: 0,
            }} />

            <div style={{
              position: 'fixed',
              top: '35%',
              right: '-10%',
              width: '50vw',
              height: '50vw',
              background: 'radial-gradient(circle, rgba(52, 211, 153, 0.14) 0%, rgba(4, 120, 87, 0.08) 50%, transparent 70%)',
              filter: 'blur(130px)',
              pointerEvents: 'none',
              zIndex: 0,
            }} />

            <div style={{
              position: 'fixed',
              top: '70%',
              left: '-10%',
              width: '50vw',
              height: '50vw',
              background: 'radial-gradient(circle, rgba(16, 185, 129, 0.16) 0%, rgba(6, 78, 59, 0.08) 50%, transparent 70%)',
              filter: 'blur(130px)',
              pointerEvents: 'none',
              zIndex: 0,
            }} />

            <div style={{
              position: 'fixed',
              bottom: '-10%',
              left: '30%',
              width: '55vw',
              height: '45vw',
              background: 'radial-gradient(circle, rgba(16, 185, 129, 0.18) 0%, transparent 70%)',
              filter: 'blur(140px)',
              pointerEvents: 'none',
              zIndex: 0,
            }} />
          </>
        )}

        <div style={{ position: 'relative', zIndex: 1 }}>
        <Hero />
        <Separator />
        {/* 1. AI Wall Studio */}
        <ProjectBrowserSlider 
          title="AI Wall Studio" 
          subtitle="" 
          link="https://aiwallstudio.com/"
          description="AI Wall Studio (Wall Art Pro) is a commercial-grade, cross-platform desktop application (built with Electron) paired with a high-conversion web platform built using React 19 and Vite. Engineered for digital wall art creators and print-on-demand sellers, the application automates the full production pipeline—integrating Fal.ai APIs for multi-model text/reference-to-image synthesis, 8× neural upscaling, and real-time room mockup simulation. It automatically resizes master artworks into 5 industry-standard print ratios at 300 DPI into client-ready ZIP packages. The ecosystem features Cloudflare R2 for fast, high-bandwidth installer binary distribution, Supabase (PostgreSQL & Edge Functions) for automated license key generation, Stripe for payments, and Resend for transactional onboarding."
          tags={["Electron", "React 19", "Vite", "Fal.ai APIs", "Cloudflare R2", "Supabase", "Stripe", "Resend", "300 DPI Print Ratios"]}
          autoScroll={false}
          slides={[
            { title: "Landing Page", route: "/", image: wallart1, label: "01. AI Art Creation & Pipeline" },
            { title: "Room Mockups", route: "/mockups", image: wallart2, label: "02. Photorealistic Mockups" },
            { title: "Mockup Studio", route: "/studio", image: wallart3, label: "03. Desktop Preview Studio" },
          ]}
        />
        <Separator />
        {/* 2. Buy UAE Homes */}
        <ProjectBrowserSlider 
          title="Buy UAE Homes" 
          subtitle="" 
          link="https://buyuaehomes.com/"
          description="Buy UAE Homes is a modern real estate platform for the UAE market that enables users to buy, sell, rent, or build custom properties across Dubai, Abu Dhabi, and Sharjah. It features advanced property search, ready-to-move listings, custom home options, Golden Visa guidance, and a full Admin Panel for managing properties, media, reviews, and content. Built with Next.js on the frontend and Node.js + Express on the backend, deployed on Hetzner with Nginx."
          tags={["Next.js", "Bootstrap", "Swiper.js", "Node.js", "Express", "Nginx", "Hetzner"]}
          autoScroll={true}
          slides={[
            { title: "Homepage", route: "/", image: buyuae1, label: "01. Homepage Experience" },
            { title: "Properties Listing", route: "/properties", image: buyuae2, label: "02. Search & Filter Listings" },
            { title: "Property Details", route: "/property/park-heights-1", image: buyuae3, label: "03. Property Showcase Detail" },
          ]}
        />
        <Separator />
        {/* 3. AI Video Content Studio (Address Bar Hidden) */}
        <ProjectBrowserSlider 
          title="AI Video Content Studio" 
          subtitle="" 
          link=""
          status="Under Development"
          description="AI Video Content Studio is an all-in-one, browser-native AI video production platform currently under development as a startup idea. Designed to generate social media-ready, high-retention viral videos, it empowers creators to produce polished content through three distinct workflows: Script-to-Video, Chat-to-Video (AI Co-Pilot), and Audio-to-Video (Auto-Transcription & Sync). The studio features multimodal visual generation with reference-based style training (allowing creators to clone any visual aesthetic from a reference image), multiple viral script rewriting engines, native LLM voiceover synthesis with frame-accurate PCM audio sync, dynamic captioning (Bold Pop, Karaoke), and cinematic camera movements. Operating on a BYOK (Bring Your Own Key) architecture powered by Supabase for secure authentication, project database, and user settings, users connect their own LLM API key—eliminating expensive cloud GPU server costs, ensuring user privacy, and enabling seamless, real-time client-side video rendering directly in the browser."
          tags={["AI & Multimodal Engine", "Real-time Video & Audio Pipeline", "React 19", "TypeScript", "Vite", "Tailwind CSS", "Supabase", "BYOK Model"]}
          autoScroll={false}
          videos={[
            { title: "Timeline & Captions", video: vid4 },
            { title: "Visual Direction", video: vid3 },
          ]}
          slides={[
            { title: "AI Copilot", route: "/concept", image: pro2, label: "01. AI Copilot" },
            { title: "Visual Direction", route: "/visuals", image: pro3, label: "02. Visual Direction" },
            { title: "Timeline Editor", route: "/editor", image: pro4, label: "03. Timeline Editor" },
          ]}
        />
        <Separator />
        {/* 4. NebulaFinder */}
        <ProjectBrowserSlider 
          title="NebulaFinder" 
          subtitle="" 
          link="https://nebulafinder.live/"
          description="NebulaFinder is an AI-powered niche research engine that helps creators, marketers, and builders uncover hidden, high-profit online business opportunities in seconds. It scans live web data to reveal low-competition micro-niches, buyer-intent keywords, and high-paying affiliate offers, then automatically generates viral video scripts (TikTok/Reels), YouTube outlines, and marketing copy tailored directly to your target audience. Built with React and Tailwind CSS on the frontend, Supabase for backend & auth, Resend for automated emails, and deployed on Vercel."
          tags={["React", "Tailwind CSS", "Supabase", "Resend", "Vercel", "AI & LLM APIs", "Live Web Scraper", "Micro-Niche Analytics"]}
          autoScroll={true}
          slides={[
            { title: "Market Analysis", route: "/", image: img1, label: "01. Niche & Market Analysis" },
            { title: "Niches Explorer", route: "/niches", image: img4, label: "02. Micro-Niches & Strategic Entry" },
            { title: "Keyword Vector", route: "/keywords", image: img5, label: "03. High-Intent Keyword Dominance" },
            { title: "Viral Scripts", route: "/viral-engine", image: img3, label: "04. Viral Velocity Script Engine" },
            { title: "Affiliate Offers", route: "/revenue", image: img2, label: "05. High-Ticket Revenue Ecosystem" },
          ]}
        />
        <Separator />
        {/* 5. Dprinto */}
        <ProjectBrowserSlider 
          title="Dprinto" 
          subtitle="" 
          link="https://www.dprinto.shop/"
          description="Dprinto is a modern digital products platform that enables users to browse and instantly download high-quality printable wall art, planners, greeting cards, and creative designs. It features a clean e-commerce experience with product categories, featured collections, wishlist, secure checkout, and a full Admin Panel for managing products, categories, media, and content. Built with React + Vite on the frontend and Supabase on the backend, with Stripe for payments and Resend for emails, deployed on Vercel."
          tags={["React", "Vite", "Tailwind CSS", "Supabase", "Stripe", "Resend", "Vercel"]}
          autoScroll={true}
          slides={[
            { title: "Homepage", route: "/", image: dprinto1, label: "01. Digital Marketplace Landing" },
            { title: "Wall Art Shop", route: "/categories/wall-art", image: dprinto2, label: "02. Category & Collection Catalog" },
            { title: "Product Checkout", route: "/product/sunset-over-amalfi", image: dprinto3, label: "03. Instant Download Product Detail" },
          ]}
        />
        <Separator />
        {/* 6. Wise Code Studio */}
        <ProjectBrowserSlider 
          title="Wise Code Studio" 
          subtitle="" 
          link="https://wisecodestudio.com/"
          description="Wise Code Studio features a Headless WordPress CMS for dynamic blogs, GoHighLevel (GHL) integration for lead generation forms and CRM workflows, custom transactional email templates, and production VPS Nginx deployment on Hetzner. Serving clients across the USA and UAE for custom app, web, and AI development, the platform also includes interactive appointment booking, Stripe subscriptions, and a modern full-stack architecture built with Next.js, Node.js, Express.js, and Tailwind CSS."
          tags={["Headless WordPress (Blogs)", "GoHighLevel Integration (Forms)", "VPS Nginx (Hetzner)", "Email Templates", "Next.js", "Tailwind CSS", "Node.js", "Express.js", "Stripe"]}
          autoScroll={true}
          slides={[
            { title: "Homepage", route: "/", image: wisecode1, label: "01. Agency Experience & Services" },
            { title: "Services", route: "/services", image: wisecode2, label: "02. Custom App, Web & AI Solutions" },
            { title: "Case Studies", route: "/case-studies", image: wisecode3, label: "03. Client Portfolio & Case Studies" },
            { title: "Booking & Contact", route: "/contact", image: wisecode4, label: "04. Appointment Booking & Contact" },
          ]}
        />
        <Separator />
        {/* 7. BK Car Wash */}
        <ProjectBrowserSlider 
          title="BK Car Wash" 
          subtitle="" 
          link="https://bkcarswash.com/"
          description="BK Car Wash is a modern mobile car wash and detailing website serving customers across Dubai, Sharjah, and Abu Dhabi. Features include service packages, vehicle-based pricing, online booking, WhatsApp integration, appointment scheduling, and a responsive booking system. Built with modern web technologies."
          tags={["Car Detailing", "Online Booking", "WhatsApp Integration", "Appointment Scheduling", "Vehicle-Based Pricing", "Responsive Design"]}
          autoScroll={true}
          slides={[
            { title: "Homepage", route: "/", image: bkwash1, label: "01. Mobile Car Wash & Detailing Showcase" },
            { title: "Service Booking", route: "/booking", image: bkwash2, label: "02. Packages & Scheduling System" },
          ]}
        />
        <Separator />
        {/* 8. Stratify Labs Digital */}
        <ProjectBrowserSlider 
          title="Stratify Labs Digital" 
          subtitle="" 
          link="https://stratifylabs.digital/"
          description="Stratify Labs Digital is a UAE-based digital growth and AI automation agency that specializes in AI Calling Agents, Voice Chatbots, and intelligent chat systems, along with paid ads, organic marketing, automation, and custom SaaS development. The platform highlights live AI voice agents, text chat support, and 24/7 AI workforce solutions. Built with React + Vite on the frontend, styled with Tailwind CSS, using Lucide icons, and deployed on Vercel with Vercel Analytics."
          tags={["AI Calling Agents", "Voice Chatbots", "AI Chat Systems", "24/7 AI Workforce", "React", "Vite", "Tailwind CSS", "Lucide Icons", "Vercel Analytics"]}
          autoScroll={true}
          slides={[
            { title: "Homepage", route: "/", image: stratify1, label: "01. AI Calling Agents & Automation Showcase" },
          ]}
        />
        <Separator />
        {/* 9. Stratify Workspace */}
        <ProjectBrowserSlider 
          title="Stratify Workspace" 
          subtitle="" 
          link="https://stratify-workspace-alpha.vercel.app/"
          description="Stratify Workspace is an enterprise portal for team members and admins featuring real-time shift check-in/out, automated daily hours tracking, isolated member profiles, and dedicated daily reports chat threads. Built with Next.js and Supabase for real-time authentication and database management, deployed on Vercel."
          tags={["Next.js", "Supabase", "Vercel", "Real-Time Shift Tracking", "Daily Hours Automation", "Isolated Member Profiles", "Reports Chat Threads"]}
          autoScroll={true}
          slides={[
            { title: "Daily Reports & Chat", route: "/reports", image: workspace2, label: "01. Automated Daily Reports & Threads" },
            { title: "Team Dashboard", route: "/dashboard", image: workspace1, label: "02. Shift Check-In & Tracking Portal" },
          ]}
        />
        <ConnectFooter />
      </div>
    </div>
    </>
  )
}

export default App
