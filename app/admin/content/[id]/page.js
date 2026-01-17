"use client";

import AboutContentForm from "@/components/admin/AboutContentForm";
import HomeContentForm from "@/components/admin/HomeContentForm";

import Toast from "@/components/admin/Toast";
import { getSiteSettings, updateSiteSettings } from "@/lib/api";
import gsap from "gsap";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

// Mock data for other pages
const pageContent = {
  about: {
    title: "About Page Content",
    fields: [
      {
        id: "intro",
        label: "Introduction",
        type: "textarea",
        value: "Bio here...",
      },
    ],
  },
};

export default function ContentEditorPage() {
  const pathname = usePathname();
  const pageId = pathname.split("/").pop();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef(null);

  // Toast State
  const [toast, setToast] = useState({
    isVisible: false,
    message: "",
    type: "success",
  });

  const showToast = (message, type = "success") => {
    setToast({ isVisible: true, message, type });
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (pageId === "home") {
          const response = await getSiteSettings();
          if (response.success && response.data) {
            // Transform nested backend data to flat frontend form data
            const b = response.data;
            const flatData = {
              hero_line1: b.hero?.heading?.[0] || "",
              hero_line2: b.hero?.heading?.[1] || "",
              hero_line3: b.hero?.heading?.[2] || "",
              hero_icon: b.hero?.decalIcon || "",

              about_title_line1: b.about?.heading?.[0] || "About",
              about_title_line2: b.about?.heading?.[1] || "Me.",
              about_availability: b.about?.availabilityStatus || "",
              about_intro_text: b.about?.mainIntroText || "",
              about_location_node: b.about?.locationNode || "",
              about_location_desc: b.about?.locationDescription || "",

              about_pillar1_title: b.about?.pillarCards?.[0]?.title || "",
              about_pillar1_label: b.about?.pillarCards?.[0]?.subLabel || "",
              about_pillar1_icon: b.about?.pillarCards?.[0]?.iconName || "",
              about_pillar1_desc: b.about?.pillarCards?.[0]?.description || "",

              about_pillar2_title: b.about?.pillarCards?.[1]?.title || "",
              about_pillar2_label: b.about?.pillarCards?.[1]?.subLabel || "",
              about_pillar2_icon: b.about?.pillarCards?.[1]?.iconName || "",
              about_pillar2_desc: b.about?.pillarCards?.[1]?.description || "",

              about_pillar3_title: b.about?.pillarCards?.[2]?.title || "",
              about_pillar3_label: b.about?.pillarCards?.[2]?.subLabel || "",
              about_pillar3_icon: b.about?.pillarCards?.[2]?.iconName || "",
              about_pillar3_desc: b.about?.pillarCards?.[2]?.description || "",

              about_tech_stack: b.about?.techStack || "",
              about_version: b.about?.version || "",

              services_tag: b.services?.tag || "",
              services_title_line1: b.services?.title?.split(" ")?.[0] || "",
              services_title_line2:
                b.services?.title?.split(" ")?.slice(1)?.join(" ") || "",
              services_desc: b.services?.description || "",

              projects_tag: b.projects?.tag || "",
              projects_title_line1: b.projects?.title?.split(" ")?.[0] || "",
              projects_title_line2:
                b.projects?.title?.split(" ")?.slice(1)?.join(" ") || "",
              projects_desc: b.projects?.description || "",

              pricing_tag: b.pricing?.tag || "",
              pricing_title_line1: b.pricing?.title?.split(" ")?.[0] || "",
              pricing_title_line2:
                b.pricing?.title?.split(" ")?.slice(1)?.join(" ") || "",

              testimonials_tag: b.testimonials?.tag || "",
              testimonials_title_line1:
                b.testimonials?.title?.split(" ")?.[0] || "",
              testimonials_title_line2:
                b.testimonials?.title?.split(" ")?.slice(1)?.join(" ") || "",

              cta_tag: b.cta?.tag || "",
              cta_title_line1: b.cta?.title?.split(" ")?.[0] || "",
              cta_title_line2:
                b.cta?.title?.split(" ")?.slice(1)?.join(" ") || "",
              cta_linkedin: b.cta?.socialLinks?.linkedin || "",
              cta_github: b.cta?.socialLinks?.github || "",
              cta_email: b.cta?.contactEmail || "",
              cta_availability: b.cta?.availabilityStatus || "",
              cta_location_status: b.cta?.locationStatus || "",
            };
            setData(flatData);
          } else {
            setData({}); // Empty state if no data
          }
        } else if (pageId === "about") {
          const response = await getSiteSettings();
          if (response.success && response.data) {
            const b = response.data.aboutPage || {};
            const flatData = {
              hero_image: b.hero?.coverImage || "",
              hero_firstname: b.hero?.firstName || "Mezanur",
              hero_lastname: b.hero?.lastName || "Rahman",
              hero_tags: b.hero?.roleTags?.join(", ") || "",

              intro_text: b.introduction?.introductionText || "",
              stat_years: b.introduction?.yearsExperience || "",
              stat_projects: b.introduction?.projectsCount || "",
              stat_clients: b.introduction?.clientsCount || "",
              stat_dedication: b.introduction?.dedication || "",

              skills_title: b.skills?.title || "",
              skills_desc: b.skills?.description || "",
              skills_list: b.skills?.skillItems?.join(", ") || "",

              skills_title: b.skills?.title || "",
              skills_desc: b.skills?.description || "",
              skills_list: b.skills?.skillItems?.join(", ") || "",

              // Awards (Dynamic)
              awards: b.recognition?.awards || [],

              // Experience (Dynamic)
              experience: b.experience?.jobs || [],
            };
            setData(flatData);
          } else {
            setData({});
          }
        } else {
          setData(pageContent[pageId] || null);
        }
      } catch (error) {
        console.error("Error fetching page data:", error);
        setData({});
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [pageId]);

  useEffect(() => {
    if (!loading) {
      const ctx = gsap.context(() => {
        gsap.from(".parent-animate-in", {
          opacity: 0,
          y: 20,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
        });
      }, containerRef);
      return () => ctx.revert();
    }
  }, [loading]);

  const handleSave = async (formData) => {
    try {
      if (pageId === "home") {
        // ... (Existing Home Logic)
        const nestedData = {
          hero: {
            heading: [
              formData.hero_line1,
              formData.hero_line2,
              formData.hero_line3,
            ],
            decalIcon: formData.hero_icon,
          },
          about: {
            heading: [formData.about_title_line1, formData.about_title_line2],
            availabilityStatus: formData.about_availability,
            mainIntroText: formData.about_intro_text,
            locationNode: formData.about_location_node,
            locationDescription: formData.about_location_desc,
            pillarCards: [
              {
                title: formData.about_pillar1_title,
                subLabel: formData.about_pillar1_label,
                description: formData.about_pillar1_desc,
                iconName: formData.about_pillar1_icon,
              },
              {
                title: formData.about_pillar2_title,
                subLabel: formData.about_pillar2_label,
                description: formData.about_pillar2_desc,
                iconName: formData.about_pillar2_icon,
              },
              {
                title: formData.about_pillar3_title,
                subLabel: formData.about_pillar3_label,
                description: formData.about_pillar3_desc,
                iconName: formData.about_pillar3_icon,
              },
            ],
            techStack: formData.about_tech_stack,
            version: formData.about_version,
          },
          services: {
            tag: formData.services_tag,
            title:
              `${formData.services_title_line1} ${formData.services_title_line2}`.trim(),
            description: formData.services_desc,
          },
          projects: {
            tag: formData.projects_tag,
            title:
              `${formData.projects_title_line1} ${formData.projects_title_line2}`.trim(),
            description: formData.projects_desc,
          },
          pricing: {
            tag: formData.pricing_tag,
            title:
              `${formData.pricing_title_line1} ${formData.pricing_title_line2}`.trim(),
          },
          testimonials: {
            tag: formData.testimonials_tag,
            title:
              `${formData.testimonials_title_line1} ${formData.testimonials_title_line2}`.trim(),
          },
          cta: {
            tag: formData.cta_tag,
            title:
              `${formData.cta_title_line1} ${formData.cta_title_line2}`.trim(),
            socialLinks: {
              linkedin: formData.cta_linkedin,
              github: formData.cta_github,
            },
            contactEmail: formData.cta_email,
            availabilityStatus: formData.cta_availability,
            locationStatus: formData.cta_location_status,
          },
        };

        await updateSiteSettings(nestedData);
        showToast("Site settings updated successfully.");
      } else if (pageId === "about") {
        console.log("ADMIN PAGE: Saving About formData:", formData);
        const nestedData = {
          aboutPage: {
            hero: {
              coverImage: formData.hero_image,
              firstName: formData.hero_firstname,
              lastName: formData.hero_lastname,
              roleTags: formData.hero_tags.split(",").map((s) => s.trim()),
            },
            introduction: {
              introductionText: formData.intro_text,
              yearsExperience: formData.stat_years,
              projectsCount: formData.stat_projects,
              clientsCount: formData.stat_clients,
              dedication: formData.stat_dedication,
            },
            skills: {
              title: formData.skills_title,
              description: formData.skills_desc,
              skillItems: formData.skills_list.split(",").map((s) => s.trim()),
            },
            recognition: {
              title: "Recognition",
              awards: formData.awards || [],
            },
            experience: {
              title: "Career",
              jobs: formData.experience || [],
            },
          },
        };
        console.log("ADMIN PAGE: Saving About Payload:", nestedData);

        await updateSiteSettings(nestedData);
        showToast("About page content updated.");
      } else {
        console.log("Saving Generic Content:", formData);
        showToast(`${data.title} updated successfully.`);
      }
    } catch (error) {
      console.error("Error saving content:", error);
      showToast("Failed to update page content.", "error");
      throw error;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="animate-spin text-primary" size={40} />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center p-8">
        <h1 className="text-4xl font-black font-syne text-white mb-4 uppercase">
          Page Not Found
        </h1>
        <Link
          href="/admin/content"
          className="flex items-center gap-2 text-primary hover:text-white transition-colors"
        >
          <ArrowLeft size={18} />
          <span>Back to Content Pages</span>
        </Link>
      </div>
    );
  }

  // Specialized Home Form
  if (pageId === "home") {
    return (
      <div
        ref={containerRef}
        className="min-h-screen bg-black rounded-3xl text-white relative"
      >
        <Toast
          isVisible={toast.isVisible}
          message={toast.message}
          type={toast.type}
          onClose={() => setToast((prev) => ({ ...prev, isVisible: false }))}
        />

        <div>
          <header className="parent-animate-in p-8 md:p-12">
            <h1 className="text-6xl md:text-8xl font-black font-syne uppercase tracking-tighter mb-4">
              Edit <span className="text-primary">Home</span>
            </h1>
            <p className="text-gray-500 font-mono uppercase tracking-widest text-sm">
              Global Static Content Management
            </p>
          </header>

          <HomeContentForm initialData={data} onSubmit={handleSave} />
        </div>
      </div>
    );
  }

  // Specialized About Form
  if (pageId === "about") {
    return (
      <div
        ref={containerRef}
        className="min-h-screen bg-black rounded-3xl text-white relative"
      >
        <Toast
          isVisible={toast.isVisible}
          message={toast.message}
          type={toast.type}
          onClose={() => setToast((prev) => ({ ...prev, isVisible: false }))}
        />

        <div>
          <header className="parent-animate-in p-8 md:p-12">
            <h1 className="text-6xl md:text-8xl font-black font-syne uppercase tracking-tighter mb-4">
              Edit <span className="text-primary">About</span>
            </h1>
            <p className="text-gray-500 font-mono uppercase tracking-widest text-sm">
              About Page Content Management
            </p>
          </header>

          <AboutContentForm initialData={data} onSubmit={handleSave} />
        </div>
      </div>
    );
  }

  // Generic fallback for other pages
  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-black text-white p-8 md:p-12 relative"
    >
      <Toast
        isVisible={toast.isVisible}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast((prev) => ({ ...prev, isVisible: false }))}
      />

      <div className="max-w-4xl mx-auto">
        <Link
          href="/admin/content"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-white mb-12 transition-colors parent-animate-in"
        >
          <ArrowLeft size={18} />
          <span className="uppercase tracking-widest text-xs font-bold">
            Back
          </span>
        </Link>

        <header className="mb-16 parent-animate-in">
          <h1 className="text-6xl font-black font-syne uppercase tracking-tighter">
            {data.title}
          </h1>
        </header>

        <div className="space-y-8 parent-animate-in">
          {data.fields.map((field) => (
            <div key={field.id} className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-gray-500 font-bold">
                {field.label}
              </label>
              {field.type === "textarea" ? (
                <textarea
                  defaultValue={field.value}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:border-primary/50 transition-all h-32"
                />
              ) : (
                <input
                  type="text"
                  defaultValue={field.value}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:border-primary/50 transition-all"
                />
              )}
            </div>
          ))}
          <button
            onClick={() => handleSave(data)}
            className="px-12 py-4 bg-primary text-black font-bold font-syne uppercase tracking-widest rounded-full hover:bg-white transition-all"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
