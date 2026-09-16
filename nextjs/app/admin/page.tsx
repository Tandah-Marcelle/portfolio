"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
    LogOut, Layout, BookOpen, Briefcase, Image, Save, Plus, Trash2, Edit2,
    Check, AlertCircle, RefreshCw, Upload, PlusSquare, ArrowLeft, Zap, Award, FileText, Mail, HeartHandshake
} from 'lucide-react';

interface Project {
    id: string;
    title: string;
    description: string;
    category?: string;
    image?: string;
    images?: string[];
    videoPath?: string;
    isPrivateApp: boolean;
    isTestVersion: boolean;
    liveUrl: string;
    githubUrl: string;
    featured: boolean;
    hasDemo: boolean;
    stars: number;
    summary: string;
    background: string;
    skillSet: string[];
    contribution: string;
    features: string[] | any;
    order: number;
}

interface Experience {
    id: string;
    title: string;
    company: string;
    location: string;
    period: string;
    description: string;
    logoUrl?: string | null;
    order: number;
}

interface VolunteeringItem {
    id: string;
    role: string;
    organization: string;
    period: string;
    location?: string | null;
    description: string;
    logoUrl?: string | null;
    images: string[];
    order: number;
}

interface SkillItem {
    id: string;
    category: string;
    name: string;
    level: number;
    color?: string | null;
    order: number;
}

interface AchievementItem {
    id: string;
    title: string;
    organization: string;
    date: string;
    location?: string | null;
    description: string;
    category?: string | null;
    imageUrl?: string | null;
    images?: string[];
    order: number;
}

interface CertificateItem {
    id: string;
    name: string;
    displayName: string;
    path: string;
    type: string;
    verified: boolean;
    order: number;
}

const AdminDashboard: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'hero-about' | 'projects' | 'experience' | 'volunteering' | 'graphics' | 'skills' | 'achievements' | 'certificates' | 'contact'>('hero-about');
    const [isLoading, setIsLoading] = useState(true);
    const [saveStatus, setSaveStatus] = useState<string | null>(null);
    const [errorStatus, setErrorStatus] = useState<string | null>(null);
    const router = useRouter();

    // Portfolio states
    const [hero, setHero] = useState({ title: '', subtitle: '', description: '', cvPath: '', cvPath2: '', avatarUrl: '', name: '', roleBadge: '', chipOne: '', chipTwo: '', linkedinUrl: '', streamTitle: '', streamHint: '' });
    const [about, setAbout] = useState({ description: '', secondaryDescription: '', imageUrl: '', badgeText: '', titlePrefix: '', titleAccent: '', quote: '', pillars: [] as { kicker: string; title: string; text: string }[], motionKicker: '', motionTitle: '', motionBadge: '', interpretTitle: '', interpretText: '' });
    const [projects, setProjects] = useState<Project[]>([]);
    const [experiences, setExperiences] = useState<Experience[]>([]);
    const [volunteerings, setVolunteerings] = useState<VolunteeringItem[]>([]);
    const [graphics, setGraphics] = useState<{ id: string; imageUrl: string; title?: string | null; category?: string | null }[]>([]);
    const [skills, setSkills] = useState<SkillItem[]>([]);
    const [achievements, setAchievements] = useState<AchievementItem[]>([]);
    const [certificates, setCertificates] = useState<CertificateItem[]>([]);
    const [contact, setContact] = useState({ email: '', phone: '', location: '', github: '', linkedin: '', whatsapp: '' });

    // Editing forms state
    const [editingProject, setEditingProject] = useState<Partial<Project> | null>(null);
    const [editingExp, setEditingExp] = useState<Partial<Experience> | null>(null);
    const [editingVolunteering, setEditingVolunteering] = useState<Partial<VolunteeringItem> | null>(null);
    const [editingSkill, setEditingSkill] = useState<Partial<SkillItem> | null>(null);
    const [editingAchievement, setEditingAchievement] = useState<Partial<AchievementItem> | null>(null);
    const [projectImageFile, setProjectImageFile] = useState<File | null>(null);
    const [projectGalleryFiles, setProjectGalleryFiles] = useState<File[]>([]);
    const [projectVideoFile, setProjectVideoFile] = useState<File | null>(null);
    const [flyerImageFile, setFlyerImageFile] = useState<File | null>(null);
    const [editingGraphic, setEditingGraphic] = useState<{ id: string; title: string; category: string } | null>(null);
    const [heroAvatarFile, setHeroAvatarFile] = useState<File | null>(null);
    const [heroCvFile, setHeroCvFile] = useState<File | null>(null);
    const [heroCvFile2, setHeroCvFile2] = useState<File | null>(null);
    const [aboutImageFile, setAboutImageFile] = useState<File | null>(null);
    const [certFile, setCertFile] = useState<File | null>(null);
    const [achievementImageFiles, setAchievementImageFiles] = useState<File[]>([]);
    const [volunteeringImageFile, setVolunteeringImageFile] = useState<File | null>(null);
    const [volunteeringLogoFile, setVolunteeringLogoFile] = useState<File | null>(null);
    const [experienceLogoFile, setExperienceLogoFile] = useState<File | null>(null);

    // Same-origin API (Next.js Route Handlers). Auth is an httpOnly cookie.
    const apiUrl = '/api';

    useEffect(() => {
        fetchPortfolioData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getHeaders = (): Record<string, string> => ({});

    // Same-origin API wrapper: an expired/missing admin session (401)
    // sends the user back to /login instead of failing silently.
    const authFetch = async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
        // NOTE: globalThis.fetch — never authFetch, or this recurses forever.
        const res = await globalThis.fetch(input, init);
        if (res.status === 401) {
            router.push('/login');
            throw new Error('Session expired. Redirecting to login...');
        }
        return res;
    };

    const fetchPortfolioData = async () => {
        setIsLoading(true);
        setErrorStatus(null);
        try {
            // 1. Fetch public portfolio view
            const response = await authFetch(`${apiUrl}/portfolio`);
            if (!response.ok) throw new Error('Failed to load portfolio specifications.');
            const data = await response.json();

            if (data.hero) setHero({ title: '', subtitle: '', description: '', cvPath: '', cvPath2: '', avatarUrl: '', name: '', roleBadge: '', chipOne: '', chipTwo: '', linkedinUrl: '', streamTitle: '', streamHint: '', ...data.hero });
            if (data.about) setAbout({ description: '', secondaryDescription: '', imageUrl: '', badgeText: '', titlePrefix: '', titleAccent: '', quote: '', motionKicker: '', motionTitle: '', motionBadge: '', interpretTitle: '', interpretText: '', ...data.about, pillars: Array.isArray(data.about.pillars) ? data.about.pillars : [] });
            if (data.projects) setProjects(data.projects);
            if (data.experiences) setExperiences(data.experiences);
            if (data.volunteerings) setVolunteerings(data.volunteerings);
            if (data.skills) setSkills(data.skills);
            if (data.achievements) setAchievements(data.achievements.map((a: AchievementItem) => ({ ...a, images: Array.isArray(a.images) ? a.images : [] })));
            if (data.certificates) setCertificates(data.certificates);
            if (data.contact) setContact({ email: '', phone: '', location: '', github: '', linkedin: '', whatsapp: '', ...data.contact });

            // 2. Set admin graphics list
            const parsedGraphics = data.graphics || [];
            setGraphics(parsedGraphics);
        } catch (err: any) {
            setErrorStatus(err.message || 'Could not connect to the backend server.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogout = async () => {
        await authFetch('/api/auth/logout', { method: 'POST' });
        router.push('/login');
    };

    // 1. Save Hero & About
    const handleSaveHeroAbout = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaveStatus('Saving Hero & About...');
        setErrorStatus(null);

        try {
            const hRes = await authFetch(`${apiUrl}/admin/hero`, {
                method: 'PATCH',
                headers: { ...getHeaders(), 'Content-Type': 'application/json' },
                body: JSON.stringify(hero),
            });

            const aRes = await authFetch(`${apiUrl}/admin/about`, {
                method: 'PATCH',
                headers: { ...getHeaders(), 'Content-Type': 'application/json' },
                body: JSON.stringify(about),
            });

            if (!hRes.ok || !aRes.ok) throw new Error('Failed to update text configurations.');

            setSaveStatus('Hero & About section updated successfully!');
            setTimeout(() => setSaveStatus(null), 3000);
            fetchPortfolioData();
        } catch (err: any) {
            setErrorStatus(err.message || 'Failed to save modifications.');
        }
    };

    // 2. Projects actions
    const handleSaveProject = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingProject) return;

        setSaveStatus('Saving Project...');
        setErrorStatus(null);

        const formData = new FormData();
        Object.keys(editingProject).forEach((key) => {
            const val = (editingProject as any)[key];
            // Never send literal "null"/"undefined" strings for empty fields.
            if (val === null || val === undefined) return;
            if (key === 'skillSet' || key === 'features' || key === 'images') {
                formData.append(key, JSON.stringify(val ?? (key === 'images' ? [] : val)));
            } else {
                formData.append(key, String(val));
            }
        });

        if (projectImageFile) {
            formData.append('image', projectImageFile);
        }
        for (const f of projectGalleryFiles) {
            formData.append('gallery', f);
        }
        if (projectVideoFile) {
            formData.append('video', projectVideoFile);
        }

        try {
            const url = editingProject.id
                ? `${apiUrl}/admin/projects/${editingProject.id}`
                : `${apiUrl}/admin/projects`;

            const method = editingProject.id ? 'PATCH' : 'POST';

            const response = await authFetch(url, {
                method,
                headers: getHeaders(), // Don't set Content-Type header when using FormData
                body: formData,
            });

            if (!response.ok) throw new Error('Failed to save project.');

            setSaveStatus('Project saved successfully!');
            setEditingProject(null);
            setProjectImageFile(null);
            setProjectGalleryFiles([]);
            setProjectVideoFile(null);
            setTimeout(() => setSaveStatus(null), 3000);
            fetchPortfolioData();
        } catch (err: any) {
            setErrorStatus(err.message || 'Failed to save project.');
        }
    };

    const handleDeleteProject = async (id: string) => {
        if (!window.confirm('Are you sure you want to delete this project?')) return;
        setSaveStatus('Deleting project...');
        setErrorStatus(null);

        try {
            const res = await authFetch(`${apiUrl}/admin/projects/${id}`, {
                method: 'DELETE',
                headers: getHeaders(),
            });

            if (!res.ok) throw new Error('Failed to delete project.');

            setSaveStatus('Project deleted successfully.');
            setTimeout(() => setSaveStatus(null), 3000);
            fetchPortfolioData();
        } catch (err: any) {
            setErrorStatus(err.message || 'Failed to delete.');
        }
    };

    // 3. Experience Actions
    const handleSaveExperience = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingExp) return;

        setSaveStatus('Saving work experience...');
        setErrorStatus(null);

        try {
            let expData = { ...editingExp };

            if (experienceLogoFile) {
                setSaveStatus('Uploading company logo...');
                const uploaded = await uploadFileTo('/admin/experience/logo', experienceLogoFile, 'image');
                if (uploaded.logoUrl) expData.logoUrl = uploaded.logoUrl;
            }

            const url = expData.id
                ? `${apiUrl}/admin/experience/${expData.id}`
                : `${apiUrl}/admin/experience`;
            const method = expData.id ? 'PATCH' : 'POST';

            const res = await authFetch(url, {
                method,
                headers: { ...getHeaders(), 'Content-Type': 'application/json' },
                body: JSON.stringify(expData),
            });

            if (!res.ok) throw new Error('Failed to save experience.');

            setSaveStatus('Experience saved successfully!');
            setEditingExp(null);
            setExperienceLogoFile(null);
            setTimeout(() => setSaveStatus(null), 3000);
            fetchPortfolioData();
        } catch (err: any) {
            setErrorStatus(err.message || 'Failed to save.');
        }
    };

    const handleDeleteExperience = async (id: string) => {
        if (!window.confirm('Are you sure you want to delete this experience record?')) return;
        setSaveStatus('Deleting experience...');
        setErrorStatus(null);

        try {
            const res = await authFetch(`${apiUrl}/admin/experience/${id}`, {
                method: 'DELETE',
                headers: getHeaders(),
            });

            if (!res.ok) throw new Error('Failed to delete experience.');

            setSaveStatus('Experience deleted.');
            setTimeout(() => setSaveStatus(null), 3000);
            fetchPortfolioData();
        } catch (err: any) {
            setErrorStatus(err.message);
        }
    };

    // 4. Graphics upload
    const handleUploadFlyer = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!flyerImageFile) return;

        setSaveStatus('Uploading flyer to Cloudinary...');
        setErrorStatus(null);

        const formData = new FormData();
        formData.append('image', flyerImageFile);
        formData.append('title', (document.getElementById('flyer-title') as HTMLInputElement)?.value || 'Untitled Design');
        formData.append('category', (document.getElementById('flyer-category') as HTMLInputElement)?.value || 'Promotional Flyers');

        try {
            const res = await authFetch(`${apiUrl}/admin/graphics`, {
                method: 'POST',
                headers: getHeaders(),
                body: formData,
            });

            if (!res.ok) throw new Error('Failed to upload flyer.');

            setSaveStatus('Flyer uploaded successfully!');
            setFlyerImageFile(null);
            const fileInput = document.getElementById('flyer-file-input') as HTMLInputElement;
            if (fileInput) fileInput.value = '';

            setTimeout(() => setSaveStatus(null), 3000);
            fetchPortfolioData();
        } catch (err: any) {
            setErrorStatus(err.message || 'Upload failed.');
        }
    };

    // Graphic label edit (title + category shown in the gallery)
    const handleSaveGraphic = async () => {
        if (!editingGraphic) return;
        try {
            const res = await authFetch(`${apiUrl}/admin/graphics/${editingGraphic.id}`, {
                method: 'PATCH',
                headers: { ...getHeaders(), 'Content-Type': 'application/json' },
                body: JSON.stringify({ title: editingGraphic.title, category: editingGraphic.category }),
            });
            if (!res.ok) throw new Error('Failed to save design details.');
            setEditingGraphic(null);
            setSaveStatus('Design details saved!');
            setTimeout(() => setSaveStatus(null), 3000);
            fetchPortfolioData();
        } catch (err: any) { setErrorStatus(err.message); }
    };

    // 5. Hero avatar + CV uploads, About image upload
    const uploadFileTo = async (endpoint: string, file: File, fieldName: string) => {
        const formData = new FormData();
        formData.append(fieldName, file);
        const res = await authFetch(`${apiUrl}${endpoint}`, {
            method: 'POST',
            headers: getHeaders(),
            body: formData,
        });
        if (!res.ok) throw new Error(`Upload to ${endpoint} failed.`);
        return res.json();
    };

    const handleUploadHeroAvatar = async () => {
        if (!heroAvatarFile) return;
        setSaveStatus('Uploading avatar...');
        try {
            const updated = await uploadFileTo('/admin/hero/avatar', heroAvatarFile, 'image');
            setHero((h) => ({ ...h, avatarUrl: updated.avatarUrl || h.avatarUrl }));
            setHeroAvatarFile(null);
            setSaveStatus('Avatar uploaded!');
            setTimeout(() => setSaveStatus(null), 3000);
            fetchPortfolioData();
        } catch (err: any) { setErrorStatus(err.message); }
    };

    const handleUploadHeroCv = async (slot: 1 | 2 = 1) => {
        const file = slot === 2 ? heroCvFile2 : heroCvFile;
        if (!file) return;
        setSaveStatus(`Uploading CV ${slot} (PDF)...`);
        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('slot', String(slot));
            const res = await authFetch(`${apiUrl}/admin/hero/cv`, { method: 'POST', headers: getHeaders(), body: formData });
            if (!res.ok) throw new Error('CV upload failed.');
            const updated = await res.json();
            setHero((h) => ({ ...h, cvPath: updated.cvPath || h.cvPath, cvPath2: updated.cvPath2 ?? h.cvPath2 }));
            if (slot === 2) setHeroCvFile2(null); else setHeroCvFile(null);
            setSaveStatus(`CV ${slot} uploaded!`);
            setTimeout(() => setSaveStatus(null), 3000);
            fetchPortfolioData();
        } catch (err: any) { setErrorStatus(err.message); }
    };

    const handleUploadAboutImage = async () => {
        if (!aboutImageFile) return;
        setSaveStatus('Uploading about image...');
        try {
            const updated = await uploadFileTo('/admin/about/image', aboutImageFile, 'image');
            setAbout((a) => ({ ...a, imageUrl: updated.imageUrl || a.imageUrl }));
            setAboutImageFile(null);
            setSaveStatus('About image uploaded!');
            setTimeout(() => setSaveStatus(null), 3000);
            fetchPortfolioData();
        } catch (err: any) { setErrorStatus(err.message); }
    };

    // 6. Skills CRUD
    const handleSaveSkill = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingSkill) return;
        setSaveStatus('Saving skill...');
        try {
            const url = editingSkill.id ? `${apiUrl}/admin/skills/${editingSkill.id}` : `${apiUrl}/admin/skills`;
            const res = await authFetch(url, {
                method: editingSkill.id ? 'PATCH' : 'POST',
                headers: { ...getHeaders(), 'Content-Type': 'application/json' },
                body: JSON.stringify(editingSkill),
            });
            if (!res.ok) throw new Error('Failed to save skill.');
            setEditingSkill(null);
            setSaveStatus('Skill saved!');
            setTimeout(() => setSaveStatus(null), 3000);
            fetchPortfolioData();
        } catch (err: any) { setErrorStatus(err.message); }
    };

    const handleDeleteSkill = async (id: string) => {
        if (!window.confirm('Delete this skill?')) return;
        const res = await authFetch(`${apiUrl}/admin/skills/${id}`, { method: 'DELETE', headers: getHeaders() });
        if (!res.ok) { setErrorStatus('Failed to delete skill.'); return; }
        setSaveStatus('Skill deleted.');
        setTimeout(() => setSaveStatus(null), 3000);
        fetchPortfolioData();
    };

    // Volunteering CRUD
    const handleSaveVolunteering = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingVolunteering) return;
        setSaveStatus('Saving volunteering activity...');
        try {
            let finalData = {
                ...editingVolunteering,
                images: editingVolunteering.images || [],
            };

            if (volunteeringLogoFile) {
                setSaveStatus('Uploading association logo...');
                const uploaded = await uploadFileTo('/admin/volunteering/logo', volunteeringLogoFile, 'image');
                if (uploaded.logoUrl) finalData.logoUrl = uploaded.logoUrl;
            }

            if (volunteeringImageFile) {
                const uploaded = await uploadFileTo('/admin/volunteering/image', volunteeringImageFile, 'image');
                if (uploaded.imageUrl) {
                    finalData.images = [...finalData.images, uploaded.imageUrl];
                }
            }

            const url = finalData.id ? `${apiUrl}/admin/volunteering/${finalData.id}` : `${apiUrl}/admin/volunteering`;
            const res = await authFetch(url, {
                method: finalData.id ? 'PATCH' : 'POST',
                headers: { ...getHeaders(), 'Content-Type': 'application/json' },
                body: JSON.stringify(finalData),
            });
            if (!res.ok) throw new Error('Failed to save volunteering entry.');
            setEditingVolunteering(null);
            setVolunteeringImageFile(null);
            setVolunteeringLogoFile(null);
            setSaveStatus('Volunteering activity saved!');
            setTimeout(() => setSaveStatus(null), 3000);
            fetchPortfolioData();
        } catch (err: any) { setErrorStatus(err.message); }
    };

    const handleDeleteVolunteering = async (id: string) => {
        if (!window.confirm('Delete this volunteering item?')) return;
        const res = await authFetch(`${apiUrl}/admin/volunteering/${id}`, { method: 'DELETE', headers: getHeaders() });
        if (!res.ok) { setErrorStatus('Failed to delete volunteering item.'); return; }
        setSaveStatus('Volunteering item deleted.');
        setTimeout(() => setSaveStatus(null), 3000);
        fetchPortfolioData();
    };

    // 7. Achievements CRUD
    const handleSaveAchievement = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingAchievement) return;
        setSaveStatus('Saving achievement...');
        try {
            const gallery = [...(editingAchievement.images || [])];

            setSaveStatus(`Uploading ${achievementImageFiles.length} image(s)...`);
            for (const file of achievementImageFiles) {
                const uploaded = await uploadFileTo('/admin/achievements/image', file, 'image');
                if (uploaded.imageUrl) gallery.push(uploaded.imageUrl);
            }

            const finalAchievementData = { ...editingAchievement, images: gallery };
            // Keep the legacy cover image in sync (first gallery image wins).
            if (gallery.length > 0 && !finalAchievementData.imageUrl) {
                finalAchievementData.imageUrl = gallery[0];
            }

            const url = finalAchievementData.id ? `${apiUrl}/admin/achievements/${finalAchievementData.id}` : `${apiUrl}/admin/achievements`;
            const res = await authFetch(url, {
                method: finalAchievementData.id ? 'PATCH' : 'POST',
                headers: { ...getHeaders(), 'Content-Type': 'application/json' },
                body: JSON.stringify(finalAchievementData),
            });
            if (!res.ok) throw new Error('Failed to save achievement.');
            setEditingAchievement(null);
            setAchievementImageFiles([]);
            setSaveStatus('Achievement saved!');
            setTimeout(() => setSaveStatus(null), 3000);
            fetchPortfolioData();
        } catch (err: any) { setErrorStatus(err.message); }
    };

    const handleDeleteAchievement = async (id: string) => {
        if (!window.confirm('Delete this achievement?')) return;
        const res = await authFetch(`${apiUrl}/admin/achievements/${id}`, { method: 'DELETE', headers: getHeaders() });
        if (!res.ok) { setErrorStatus('Failed to delete.'); return; }
        fetchPortfolioData();
    };

    // 8. Certificates (PDF/image upload)
    const handleSaveCertificate = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaveStatus('Saving certificate...');
        try {
            const formData = new FormData();
            const nameInput = (document.getElementById('cert-name') as HTMLInputElement)?.value || '';
            const displayInput = (document.getElementById('cert-display') as HTMLInputElement)?.value || nameInput;
            const verifiedInput = (document.getElementById('cert-verified') as HTMLInputElement)?.checked || false;
            formData.append('name', nameInput);
            formData.append('displayName', displayInput);
            formData.append('verified', String(verifiedInput));
            if (certFile) formData.append('file', certFile);
            const res = await authFetch(`${apiUrl}/admin/certificates`, {
                method: 'POST',
                headers: getHeaders(),
                body: formData,
            });
            if (!res.ok) throw new Error('Failed to save certificate. Upload a PDF/image or check fields.');
            setCertFile(null);
            setSaveStatus('Certificate uploaded!');
            setTimeout(() => setSaveStatus(null), 3000);
            fetchPortfolioData();
        } catch (err: any) { setErrorStatus(err.message); }
    };

    const handleToggleCertificateVerified = async (id: string, verified: boolean) => {
        try {
            const formData = new FormData();
            formData.append('verified', String(verified));
            const res = await authFetch(`${apiUrl}/admin/certificates/${id}`, {
                method: 'PATCH',
                headers: getHeaders(),
                body: formData,
            });
            if (!res.ok) throw new Error('Failed to update certificate.');
            setSaveStatus(verified ? 'Certificate added to hero verified stream!' : 'Certificate removed from hero stream.');
            setTimeout(() => setSaveStatus(null), 3000);
            fetchPortfolioData();
        } catch (err: any) { setErrorStatus(err.message); }
    };

    const handleDeleteCertificate = async (id: string) => {
        if (!window.confirm('Delete this certificate?')) return;
        const res = await authFetch(`${apiUrl}/admin/certificates/${id}`, { method: 'DELETE', headers: getHeaders() });
        if (!res.ok) { setErrorStatus('Failed to delete.'); return; }
        fetchPortfolioData();
    };

    // 9. Contact info
    const handleSaveContact = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaveStatus('Saving contact info...');
        try {
            const res = await authFetch(`${apiUrl}/admin/contact`, {
                method: 'PATCH',
                headers: { ...getHeaders(), 'Content-Type': 'application/json' },
                body: JSON.stringify(contact),
            });
            if (!res.ok) throw new Error('Failed to save contact.');
            setSaveStatus('Contact info saved!');
            setTimeout(() => setSaveStatus(null), 3000);
        } catch (err: any) { setErrorStatus(err.message); }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white font-sans">
            {/* Top Navbar */}
            <header className="bg-gray-950/80 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
                <div className="container mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <span className="text-xl font-black tracking-tight self-center">
                            PORTFOLIO <span className="text-secondary-400">ADMIN</span>
                        </span>
                    </div>
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={() => router.push('/')}
                            className="flex items-center space-x-1.5 px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs hover:bg-white/10 transition-colors"
                        >
                            <ArrowLeft size={14} />
                            <span>View Site</span>
                        </button>
                        <button
                            onClick={handleLogout}
                            className="flex items-center space-x-1.5 px-3 py-1.5 bg-red-600 hover:bg-red-500 rounded-lg text-xs font-bold transition-colors"
                        >
                            <LogOut size={14} />
                            <span>Log Out</span>
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Layout Grid */}
            <div className="container mx-auto px-6 py-8">
                {saveStatus && (
                    <div className="fixed bottom-6 right-6 bg-emerald-500 text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center space-x-3 z-50 border border-emerald-400/50 animate-slide-up">
                        <Check size={20} />
                        <span className="text-sm font-semibold">{saveStatus}</span>
                    </div>
                )}

                {errorStatus && (
                    <div className="fixed bottom-6 right-6 bg-red-600 text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center space-x-3 z-50 border border-red-500/50 animate-slide-up">
                        <AlertCircle size={20} />
                        <span className="text-sm font-semibold">{errorStatus}</span>
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Sidebar Navigation */}
                    <aside className="lg:col-span-1 space-y-2">
                        <button
                            onClick={() => { setActiveTab('hero-about'); setEditingProject(null); setEditingExp(null); }}
                            className={`w-full flex items-center space-x-3 px-5 py-4 rounded-2xl text-left border transitioning duration-300 font-semibold text-sm ${activeTab === 'hero-about'
                                ? 'bg-secondary-600/10 border-secondary-500/50 text-secondary-300'
                                : 'bg-white/5 border-white/5 text-gray-400 hover:bg-white/10'
                                }`}
                        >
                            <Layout size={18} />
                            <span>Hero & About Info</span>
                        </button>

                        <button
                            onClick={() => { setActiveTab('projects'); setEditingProject(null); setEditingExp(null); }}
                            className={`w-full flex items-center space-x-3 px-5 py-4 rounded-2xl text-left border transitioning duration-300 font-semibold text-sm ${activeTab === 'projects'
                                ? 'bg-secondary-600/10 border-secondary-500/50 text-secondary-300'
                                : 'bg-white/5 border-white/5 text-gray-400 hover:bg-white/10'
                                }`}
                        >
                            <BookOpen size={18} />
                            <span>Technical Projects</span>
                        </button>

                        <button
                            onClick={() => { setActiveTab('experience'); setEditingProject(null); setEditingExp(null); setEditingVolunteering(null); }}
                            className={`w-full flex items-center space-x-3 px-5 py-4 rounded-2xl text-left border transitioning duration-300 font-semibold text-sm ${activeTab === 'experience'
                                ? 'bg-secondary-600/10 border-secondary-500/50 text-secondary-300'
                                : 'bg-white/5 border-white/5 text-gray-400 hover:bg-white/10'
                                }`}
                        >
                            <Briefcase size={18} />
                            <span>Experiences</span>
                        </button>

                        <button
                            onClick={() => { setActiveTab('volunteering'); setEditingProject(null); setEditingExp(null); setEditingVolunteering(null); }}
                            className={`w-full flex items-center space-x-3 px-5 py-4 rounded-2xl text-left border transitioning duration-300 font-semibold text-sm ${activeTab === 'volunteering'
                                ? 'bg-secondary-600/10 border-secondary-500/50 text-secondary-300'
                                : 'bg-white/5 border-white/5 text-gray-400 hover:bg-white/10'
                                }`}
                        >
                            <HeartHandshake size={18} />
                            <span>Volunteering</span>
                        </button>

                        <button
                            onClick={() => { setActiveTab('graphics'); setEditingProject(null); setEditingExp(null); }}
                            className={`w-full flex items-center space-x-3 px-5 py-4 rounded-2xl text-left border transitioning duration-300 font-semibold text-sm ${activeTab === 'graphics'
                                ? 'bg-secondary-600/10 border-secondary-500/50 text-secondary-300'
                                : 'bg-white/5 border-white/5 text-gray-400 hover:bg-white/10'
                                }`}
                        >
                            <Image size={18} />
                            <span>Graphic Design Flyers</span>
                        </button>

                        <button
                            onClick={() => { setActiveTab('skills'); setEditingProject(null); setEditingExp(null); }}
                            className={`w-full flex items-center space-x-3 px-5 py-4 rounded-2xl text-left border transitioning duration-300 font-semibold text-sm ${activeTab === 'skills'
                                ? 'bg-secondary-600/10 border-secondary-500/50 text-secondary-300'
                                : 'bg-white/5 border-white/5 text-gray-400 hover:bg-white/10'
                                }`}
                        >
                            <Zap size={18} />
                            <span>Skills</span>
                        </button>

                        <button
                            onClick={() => { setActiveTab('achievements'); setEditingProject(null); setEditingExp(null); }}
                            className={`w-full flex items-center space-x-3 px-5 py-4 rounded-2xl text-left border transitioning duration-300 font-semibold text-sm ${activeTab === 'achievements'
                                ? 'bg-secondary-600/10 border-secondary-500/50 text-secondary-300'
                                : 'bg-white/5 border-white/5 text-gray-400 hover:bg-white/10'
                                }`}
                        >
                            <Award size={18} />
                            <span>Achievements</span>
                        </button>

                        <button
                            onClick={() => { setActiveTab('certificates'); setEditingProject(null); setEditingExp(null); }}
                            className={`w-full flex items-center space-x-3 px-5 py-4 rounded-2xl text-left border transitioning duration-300 font-semibold text-sm ${activeTab === 'certificates'
                                ? 'bg-secondary-600/10 border-secondary-500/50 text-secondary-300'
                                : 'bg-white/5 border-white/5 text-gray-400 hover:bg-white/10'
                                }`}
                        >
                            <FileText size={18} />
                            <span>Certificates (PDF)</span>
                        </button>

                        <button
                            onClick={() => { setActiveTab('contact'); setEditingProject(null); setEditingExp(null); }}
                            className={`w-full flex items-center space-x-3 px-5 py-4 rounded-2xl text-left border transitioning duration-300 font-semibold text-sm ${activeTab === 'contact'
                                ? 'bg-secondary-600/10 border-secondary-500/50 text-secondary-300'
                                : 'bg-white/5 border-white/5 text-gray-400 hover:bg-white/10'
                                }`}
                        >
                            <Mail size={18} />
                            <span>Contact Info</span>
                        </button>
                    </aside>

                    {/* Active Content Area */}
                    <main className="lg:col-span-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 shadow-2xl min-h-[60vh]">
                        {isLoading ? (
                            <div className="h-full flex flex-col items-center justify-center py-20">
                                <RefreshCw size={40} className="text-secondary-500 animate-spin mb-4" />
                                <p className="text-gray-400 text-sm font-semibold">Syncing with database...</p>
                            </div>
                        ) : (
                            <>
                                {/* 1. Hero & About tab */}
                                {activeTab === 'hero-about' && (
                                    <form onSubmit={handleSaveHeroAbout} className="space-y-8 animate-fade-in">
                                        <div>
                                            <h3 className="text-xl font-bold mb-1">Hero Section Editor</h3>
                                            <p className="text-gray-400 text-xs">Configure how the top fold of your portfolio site appears</p>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">Display Name</label>
                                                <input
                                                    type="text"
                                                    value={hero.title}
                                                    onChange={(e) => setHero({ ...hero, title: e.target.value })}
                                                    required
                                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:border-secondary-500 text-sm"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">Main Subheading</label>
                                                <input
                                                    type="text"
                                                    value={hero.subtitle}
                                                    onChange={(e) => setHero({ ...hero, subtitle: e.target.value })}
                                                    required
                                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:border-secondary-500 text-sm"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">Hero Intro Summary</label>
                                            <textarea
                                                rows={3}
                                                value={hero.description}
                                                onChange={(e) => setHero({ ...hero, description: e.target.value })}
                                                required
                                                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:border-secondary-500 text-sm"
                                            />
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">Full Name (big headline)</label>
                                                <input
                                                    type="text"
                                                    value={hero.name || ''}
                                                    onChange={(e) => setHero({ ...hero, name: e.target.value })}
                                                    placeholder="Tandah Djimeli Marcelle"
                                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:border-secondary-500 text-sm"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">Role Badge (status pill)</label>
                                                <input
                                                    type="text"
                                                    value={hero.roleBadge || ''}
                                                    onChange={(e) => setHero({ ...hero, roleBadge: e.target.value })}
                                                    placeholder="Software Developer & Group Lead"
                                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:border-secondary-500 text-sm"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">Floating Chip 1 (top right)</label>
                                                <input
                                                    type="text"
                                                    value={hero.chipOne || ''}
                                                    onChange={(e) => setHero({ ...hero, chipOne: e.target.value })}
                                                    placeholder="Full-Stack Dev"
                                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:border-secondary-500 text-sm"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">Floating Chip 2 (bottom left)</label>
                                                <input
                                                    type="text"
                                                    value={hero.chipTwo || ''}
                                                    onChange={(e) => setHero({ ...hero, chipTwo: e.target.value })}
                                                    placeholder="Tech for Good"
                                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:border-secondary-500 text-sm"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">LinkedIn URL</label>
                                                <input
                                                    type="text"
                                                    value={hero.linkedinUrl || ''}
                                                    onChange={(e) => setHero({ ...hero, linkedinUrl: e.target.value })}
                                                    placeholder="https://www.linkedin.com/in/..."
                                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:border-secondary-500 text-sm"
                                                />
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">Stream Title</label>
                                                    <input
                                                        type="text"
                                                        value={hero.streamTitle || ''}
                                                        onChange={(e) => setHero({ ...hero, streamTitle: e.target.value })}
                                                        placeholder="Verified Credentials Stream"
                                                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:border-secondary-500 text-sm"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">Stream Hint</label>
                                                    <input
                                                        type="text"
                                                        value={hero.streamHint || ''}
                                                        onChange={(e) => setHero({ ...hero, streamHint: e.target.value })}
                                                        placeholder="Click to Preview"
                                                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:border-secondary-500 text-sm"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                            <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                                                <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">Profile Avatar (image upload)</label>
                                                {hero.avatarUrl && <img src={hero.avatarUrl} className="w-16 h-16 rounded-full object-cover mb-3" alt="avatar" />}
                                                <input type="file" accept="image/*" onChange={(e) => e.target.files && setHeroAvatarFile(e.target.files[0])} className="text-xs text-gray-300 mb-3" />
                                                <button type="button" onClick={handleUploadHeroAvatar} disabled={!heroAvatarFile} className="px-4 py-2 bg-secondary-600 rounded-xl text-xs font-bold disabled:opacity-40">Upload Avatar</button>
                                            </div>
                                            <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                                                <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">CV 1 — Main (PDF upload)</label>
                                                {hero.cvPath && <p className="text-[11px] text-secondary-300 truncate mb-2">{hero.cvPath}</p>}
                                                <input type="file" accept=".pdf,.doc,.docx" onChange={(e) => e.target.files && setHeroCvFile(e.target.files[0])} className="text-xs text-gray-300 mb-3" />
                                                <button type="button" onClick={() => handleUploadHeroCv(1)} disabled={!heroCvFile} className="px-4 py-2 bg-secondary-600 rounded-xl text-xs font-bold disabled:opacity-40">Upload CV 1</button>
                                            </div>
                                            <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                                                <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">CV 2 — Alternate (PDF upload)</label>
                                                {hero.cvPath2 && <p className="text-[11px] text-secondary-300 truncate mb-2">{hero.cvPath2}</p>}
                                                {!hero.cvPath2 && <p className="text-[11px] text-gray-500 mb-2">No alternate CV yet.</p>}
                                                <input type="file" accept=".pdf,.doc,.docx" onChange={(e) => e.target.files && setHeroCvFile2(e.target.files[0])} className="text-xs text-gray-300 mb-3" />
                                                <div className="flex items-center gap-2">
                                                    <button type="button" onClick={() => handleUploadHeroCv(2)} disabled={!heroCvFile2} className="px-4 py-2 bg-secondary-600 rounded-xl text-xs font-bold disabled:opacity-40">Upload CV 2</button>
                                                    {hero.cvPath2 && (
                                                        <button type="button" onClick={() => setHero({ ...hero, cvPath2: '' })} className="px-3 py-2 border border-red-500/40 text-red-400 hover:bg-red-500 hover:text-white rounded-xl text-xs transition">Remove</button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="border-t border-white/10 pt-8">
                                            <h3 className="text-xl font-bold mb-1">About Me Section</h3>
                                            <p className="text-gray-400 text-xs mb-6 font-medium">Detailed biography text displayed in the profile grid</p>

                                            <div>
                                                <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">Detailed Biography</label>
                                                <textarea
                                                    rows={6}
                                                    value={about.description}
                                                    onChange={(e) => setAbout({ ...about, description: e.target.value })}
                                                    required
                                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:border-secondary-500 text-sm leading-relaxed"
                                                />
                                            </div>
                                            <div className="mt-4">
                                                <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">Secondary Paragraph</label>
                                                <textarea
                                                    rows={3}
                                                    value={about.secondaryDescription}
                                                    onChange={(e) => setAbout({ ...about, secondaryDescription: e.target.value })}
                                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white text-sm leading-relaxed"
                                                />
                                            </div>
                                            <div className="mt-6 border-t border-white/10 pt-6">
                                                <h4 className="text-sm font-bold mb-1">Beyond the Code — Headings</h4>
                                                <p className="text-gray-400 text-xs mb-4">Badge, title and quote above the pillars</p>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div>
                                                        <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">Badge Text</label>
                                                        <input type="text" value={about.badgeText || ''} onChange={(e) => setAbout({ ...about, badgeText: e.target.value })} placeholder="Philosophy, Vision & Motion" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white text-sm" />
                                                    </div>
                                                    <div>
                                                        <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">Quote Line</label>
                                                        <input type="text" value={about.quote || ''} onChange={(e) => setAbout({ ...about, quote: e.target.value })} placeholder="Where Engineering Discipline Meets..." className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white text-sm" />
                                                    </div>
                                                    <div>
                                                        <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">Title First Part</label>
                                                        <input type="text" value={about.titlePrefix || ''} onChange={(e) => setAbout({ ...about, titlePrefix: e.target.value })} placeholder="BEYOND THE" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white text-sm" />
                                                    </div>
                                                    <div>
                                                        <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">Title Accent (orange)</label>
                                                        <input type="text" value={about.titleAccent || ''} onChange={(e) => setAbout({ ...about, titleAccent: e.target.value })} placeholder="CODE" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white text-sm" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mt-6 border-t border-white/10 pt-6">
                                                <h4 className="text-sm font-bold mb-1">Pillar Cards (4 containers)</h4>
                                                <p className="text-gray-400 text-xs mb-4">Kicker, heading and text of each floating card</p>
                                                <div className="space-y-4">
                                                    {[0, 1, 2, 3].map((i) => {
                                                        const pillar = (about.pillars || [])[i] || { kicker: '', title: '', text: '' };
                                                        const setPillar = (patch: { kicker?: string; title?: string; text?: string }) => {
                                                            const next = [0, 1, 2, 3].map((j) => {
                                                                const e = ((about.pillars || [])[j] || {}) as { kicker?: string; title?: string; text?: string };
                                                                return { kicker: e.kicker || '', title: e.title || '', text: e.text || '' };
                                                            });
                                                            next[i] = { ...next[i], ...patch };
                                                            setAbout({ ...about, pillars: next });
                                                        };
                                                        return (
                                                            <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-3">
                                                                <p className="text-[11px] font-bold text-secondary-300 uppercase tracking-wider">Pillar {i + 1}</p>
                                                                <input type="text" placeholder="Kicker (e.g. 01 / Purposeful Impact)" value={pillar.kicker || ''} onChange={(e) => setPillar({ kicker: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 px-4 text-white text-sm" />
                                                                <input type="text" placeholder="Heading" value={pillar.title || ''} onChange={(e) => setPillar({ title: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 px-4 text-white text-sm" />
                                                                <textarea rows={2} placeholder="Card text" value={pillar.text || ''} onChange={(e) => setPillar({ text: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 px-4 text-white text-sm leading-relaxed" />
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                            <div className="mt-6 border-t border-white/10 pt-6">
                                                <h4 className="text-sm font-bold mb-1">Motion Portrait Captions</h4>
                                                <p className="text-gray-400 text-xs mb-4">Overlay texts on the center animation</p>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div>
                                                        <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">Overlay Kicker</label>
                                                        <input type="text" value={about.motionKicker || ''} onChange={(e) => setAbout({ ...about, motionKicker: e.target.value })} placeholder="Dynamic 3D Motion Portrait" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white text-sm" />
                                                    </div>
                                                    <div>
                                                        <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">Overlay Title</label>
                                                        <input type="text" value={about.motionTitle || ''} onChange={(e) => setAbout({ ...about, motionTitle: e.target.value })} placeholder="Symbol of Continuous Evolution..." className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white text-sm" />
                                                    </div>
                                                    <div>
                                                        <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">Frames Badge</label>
                                                        <input type="text" value={about.motionBadge || ''} onChange={(e) => setAbout({ ...about, motionBadge: e.target.value })} placeholder="130 Frames" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white text-sm" />
                                                    </div>
                                                    <div>
                                                        <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">Interpretation Title</label>
                                                        <input type="text" value={about.interpretTitle || ''} onChange={(e) => setAbout({ ...about, interpretTitle: e.target.value })} placeholder="The Motion Portrait..." className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white text-sm" />
                                                    </div>
                                                </div>
                                                <div className="mt-4">
                                                    <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">Interpretation Text</label>
                                                    <textarea rows={4} value={about.interpretText || ''} onChange={(e) => setAbout({ ...about, interpretText: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white text-sm leading-relaxed" />
                                                </div>
                                            </div>
                                            <div className="mt-4 bg-white/5 border border-white/10 rounded-2xl p-5">
                                                <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">About Image (upload)</label>
                                                {about.imageUrl && <img src={about.imageUrl} className="w-24 h-24 rounded-xl object-cover mb-3" alt="about" />}
                                                <input type="file" accept="image/*" onChange={(e) => e.target.files && setAboutImageFile(e.target.files[0])} className="text-xs text-gray-300 mb-3" />
                                                <button type="button" onClick={handleUploadAboutImage} disabled={!aboutImageFile} className="px-4 py-2 bg-secondary-600 rounded-xl text-xs font-bold disabled:opacity-40">Upload Image</button>
                                            </div>
                                        </div>

                                        <div className="flex justify-end pt-4">
                                            <button
                                                type="submit"
                                                className="flex items-center space-x-2 bg-gradient-to-r from-secondary-600 to-secondary-700 hover:from-secondary-500 hover:to-secondary-600 text-white font-bold py-3 px-8 rounded-xl transition duration-300 hover:shadow-lg active:scale-95 text-sm"
                                            >
                                                <Save size={16} />
                                                <span>Save Modifications</span>
                                            </button>
                                        </div>
                                    </form>
                                )}

                                {/* 2. Projects tab */}
                                {activeTab === 'projects' && (
                                    <div className="space-y-6 animate-fade-in">
                                        {!editingProject ? (
                                            <>
                                                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                                                    <div>
                                                        <h3 className="text-xl font-bold">Manage Technical Projects</h3>
                                                        <p className="text-gray-400 text-xs mt-1">Add, update, or hide projects in the slider showcase</p>
                                                    </div>
                                                    <button
                                                        onClick={() => setEditingProject({
                                                            title: '', description: '', category: 'Web Development', liveUrl: '#', githubUrl: '#',
                                                            featured: false, hasDemo: true, stars: 0, summary: '',
                                                            background: '', skillSet: [], contribution: '', features: [], images: [], order: 0
                                                        })}
                                                        className="flex items-center space-x-1.5 px-4 py-2.5 bg-secondary-600 hover:bg-secondary-500 rounded-xl text-xs font-bold transition-all duration-300"
                                                    >
                                                        <Plus size={16} />
                                                        <span>Add New Project</span>
                                                    </button>
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    {projects.map((proj) => (
                                                        <div key={proj.id} className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col justify-between">
                                                            <div>
                                                                <div className="flex items-center justify-between mb-2">
                                                                    <h4 className="font-bold text-lg leading-tight line-clamp-1">{proj.title}</h4>
                                                                    {proj.featured && (
                                                                        <span className="px-2 py-0.5 bg-dashed border border-secondary-500 text-secondary-300 text-[8px] rounded uppercase font-bold tracking-wider">Featured</span>
                                                                    )}
                                                                </div>
                                                                <p className="text-gray-400 text-xs line-clamp-2 leading-relaxed mb-4">{proj.description}</p>
                                                            </div>
                                                            <div className="flex items-center justify-between pt-4 border-t border-white/5">
                                                                <div className="text-[10px] text-gray-500">
                                                                    Order index: {proj.order}
                                                                </div>
                                                                <div className="flex space-x-2">
                                                                    <button
                                                                        onClick={() => { setEditingProject({ ...proj, images: Array.isArray(proj.images) ? proj.images : [] }); setProjectGalleryFiles([]); }}
                                                                        className="p-2 bg-yellow-500/10 hover:bg-yellow-500 text-yellow-500 hover:text-gray-900 rounded-lg transition"
                                                                        title="Edit Project"
                                                                    >
                                                                        <Edit2 size={14} />
                                                                    </button>
                                                                    <button
                                                                        onClick={() => handleDeleteProject(proj.id)}
                                                                        className="p-2 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-lg transition"
                                                                        title="Delete Project"
                                                                    >
                                                                        <Trash2 size={14} />
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </>
                                        ) : (
                                            <form onSubmit={handleSaveProject} className="space-y-6">
                                                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                                                    <div>
                                                        <h3 className="text-xl font-bold">{editingProject.id ? 'Edit Case Study' : 'Create Case Study'}</h3>
                                                        <p className="text-gray-400 text-xs mt-1">Define details for {editingProject.title || 'new project'}</p>
                                                    </div>
                                                    <button
                                                        type="button"
                                                        onClick={() => { setEditingProject(null); setProjectImageFile(null); setProjectGalleryFiles([]); setProjectVideoFile(null); }}
                                                        className="px-4 py-2 border border-white/10 hover:bg-white/10 rounded-xl text-xs font-semibold"
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    <div>
                                                        <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">Project Title</label>
                                                        <input
                                                            type="text"
                                                            value={editingProject.title || ''}
                                                            onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                                                            required
                                                            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white text-sm"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">Short Description</label>
                                                        <input
                                                            type="text"
                                                            value={editingProject.description || ''}
                                                            onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                                                            required
                                                            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white text-sm"
                                                        />
                                                    </div>
                                                </div>

                                                <div>
                                                    <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">Category (groups it on the site)</label>
                                                    <input
                                                        type="text"
                                                        list="project-categories"
                                                        value={editingProject.category || ''}
                                                        onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value })}
                                                        placeholder="Web Development"
                                                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white text-sm"
                                                    />
                                                    <datalist id="project-categories">
                                                        <option value="Web Development" />
                                                        <option value="Mobile Apps" />
                                                        <option value="Data & AI" />
                                                    </datalist>
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                                    <div>
                                                        <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">Live Solution Link (URL)</label>
                                                        <input
                                                            type="text"
                                                            value={editingProject.liveUrl || ''}
                                                            onChange={(e) => setEditingProject({ ...editingProject, liveUrl: e.target.value })}
                                                            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white text-sm"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">Github Link (URL)</label>
                                                        <input
                                                            type="text"
                                                            value={editingProject.githubUrl || ''}
                                                            onChange={(e) => setEditingProject({ ...editingProject, githubUrl: e.target.value })}
                                                            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white text-sm"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">Video/MP4 Path (Optional)</label>
                                                        <input
                                                            type="text"
                                                            value={editingProject.videoPath || ''}
                                                            onChange={(e) => setEditingProject({ ...editingProject, videoPath: e.target.value })}
                                                            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white text-sm"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
                                                    <label className="flex items-center space-x-2 cursor-pointer mt-4">
                                                        <input
                                                            type="checkbox"
                                                            checked={!!editingProject.featured}
                                                            onChange={(e) => setEditingProject({ ...editingProject, featured: e.target.checked })}
                                                            className="rounded border-white/10 bg-white/5 text-secondary-500"
                                                        />
                                                        <span className="text-xs font-bold text-gray-300 uppercase tracking-wider">Featured Project</span>
                                                    </label>

                                                    <label className="flex items-center space-x-2 cursor-pointer mt-4">
                                                        <input
                                                            type="checkbox"
                                                            checked={!!editingProject.isPrivateApp}
                                                            onChange={(e) => setEditingProject({ ...editingProject, isPrivateApp: e.target.checked })}
                                                            className="rounded border-white/10 bg-white/5 text-secondary-500"
                                                        />
                                                        <span className="text-xs font-bold text-gray-300 uppercase tracking-wider">Private App</span>
                                                    </label>

                                                    <label className="flex items-center space-x-2 cursor-pointer mt-4">
                                                        <input
                                                            type="checkbox"
                                                            checked={!!editingProject.isTestVersion}
                                                            onChange={(e) => setEditingProject({ ...editingProject, isTestVersion: e.target.checked })}
                                                            className="rounded border-white/10 bg-white/5 text-secondary-500"
                                                        />
                                                        <span className="text-xs font-bold text-gray-300 uppercase tracking-wider">Test Version</span>
                                                    </label>

                                                    <div>
                                                        <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">Display Order</label>
                                                        <input
                                                            type="number"
                                                            value={editingProject.order ?? 0}
                                                            onChange={(e) => setEditingProject({ ...editingProject, order: parseInt(e.target.value) || 0 })}
                                                            className="w-full bg-white/5 border border-white/10 rounded-xl py-2 px-3 text-white text-sm"
                                                        />
                                                    </div>
                                                </div>

                                                <hr className="border-white/10" />

                                                {/* AISS Compliant Section */}
                                                <div className="space-y-4">
                                                    <h4 className="text-sm font-bold text-secondary-400 uppercase tracking-widest">AISS / Social Case Study Contents</h4>

                                                    <div>
                                                        <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">Summary (Mission Statement)</label>
                                                        <input
                                                            type="text"
                                                            value={editingProject.summary || ''}
                                                            onChange={(e) => setEditingProject({ ...editingProject, summary: e.target.value })}
                                                            required
                                                            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white text-sm"
                                                        />
                                                    </div>

                                                    <div>
                                                        <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">Context & Background (Societal/Sustainability impact)</label>
                                                        <textarea
                                                            rows={3}
                                                            value={editingProject.background || ''}
                                                            onChange={(e) => setEditingProject({ ...editingProject, background: e.target.value })}
                                                            required
                                                            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white text-sm leading-relaxed"
                                                        />
                                                    </div>

                                                    <div>
                                                        <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">Personal Contribution (Role & Leadership decisions)</label>
                                                        <textarea
                                                            rows={3}
                                                            value={editingProject.contribution || ''}
                                                            onChange={(e) => setEditingProject({ ...editingProject, contribution: e.target.value })}
                                                            required
                                                            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white text-sm leading-relaxed"
                                                        />
                                                    </div>

                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                        <div>
                                                            <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">Skill Set Chips (Comma separated list)</label>
                                                            <input
                                                                type="text"
                                                                value={Array.isArray(editingProject.skillSet) ? editingProject.skillSet.join(', ') : ''}
                                                                onChange={(e) => setEditingProject({ ...editingProject, skillSet: e.target.value.split(',').map(s => s.trim()) })}
                                                                placeholder="React, Node.js, Leadership"
                                                                required
                                                                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white text-sm"
                                                            />
                                                        </div>

                                                        <div>
                                                            <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">Technical Highlights (Comma separated items)</label>
                                                            <textarea
                                                                rows={2}
                                                                value={
                                                                    Array.isArray(editingProject.features)
                                                                        ? editingProject.features.join('\n')
                                                                        : typeof editingProject.features === 'object'
                                                                            ? JSON.stringify(editingProject.features)
                                                                            : ''
                                                                }
                                                                onChange={(e) => setEditingProject({ ...editingProject, features: e.target.value.split('\n').filter(s => s.trim()) })}
                                                                placeholder="Feature item 1&#10;Feature item 2&#10;Feature item 3"
                                                                required
                                                                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white text-sm leading-relaxed"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div>
                                                    <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">Upload Display Image (Cloudinary Storage)</label>
                                                    <div className="flex items-center space-x-4">
                                                        <label className="flex items-center justify-center px-4 py-3 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 cursor-pointer text-xs font-bold transition-all">
                                                            <Upload size={14} className="mr-2" />
                                                            <span>Select Image</span>
                                                            <input
                                                                type="file"
                                                                accept="image/*"
                                                                onChange={(e) => {
                                                                    if (e.target.files && e.target.files[0]) {
                                                                        setProjectImageFile(e.target.files[0]);
                                                                    }
                                                                }}
                                                                className="hidden"
                                                            />
                                                        </label>
                                                        {projectImageFile ? (
                                                            <span className="text-xs text-secondary-300 truncate max-w-xs">{projectImageFile.name} (ready)</span>
                                                        ) : editingProject.image ? (
                                                            <div className="flex items-center space-x-2">
                                                                <span className="text-[10px] text-gray-500">Current Image:</span>
                                                                <img src={editingProject.image} className="w-8 h-8 rounded object-cover" />
                                                            </div>
                                                        ) : (
                                                            <span className="text-[10px] text-gray-500">No Image file uploaded.</span>
                                                        )}
                                                    </div>
                                                </div>

                                                <div>
                                                    <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">Gallery Images (slide in the case study)</label>
                                                    {(editingProject.images || []).length > 0 && (
                                                        <div className="flex flex-wrap gap-3 mb-3">
                                                            {(editingProject.images || []).map((src) => (
                                                                <div key={src} className="relative group">
                                                                    <img src={src} alt="Project gallery" className="w-20 h-20 rounded-xl object-cover border border-white/15" />
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => setEditingProject({ ...editingProject, images: (editingProject.images || []).filter((i) => i !== src) })}
                                                                        className="absolute -top-2 -right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition"
                                                                        title="Remove image"
                                                                    >
                                                                        <Trash2 size={12} />
                                                                    </button>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                    <label className="flex items-center justify-center px-4 py-3 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 cursor-pointer text-xs font-bold transition-all">
                                                        <Upload size={14} className="mr-2" />
                                                        <span>Select Gallery Images (multiple)</span>
                                                        <input
                                                            type="file"
                                                            accept="image/*"
                                                            multiple
                                                            onChange={(e) => { e.target.files && setProjectGalleryFiles(Array.from(e.target.files)); }}
                                                            className="hidden"
                                                        />
                                                    </label>
                                                    {projectGalleryFiles.length > 0 && (
                                                        <p className="text-[11px] text-emerald-400 mt-2">{projectGalleryFiles.length} new image(s) will upload on save</p>
                                                    )}
                                                </div>

                                                <div>
                                                    <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">Upload Demo Video (MP4, Cloudinary video)</label>
                                                    <div className="flex items-center space-x-4">
                                                        <label className="flex items-center justify-center px-4 py-3 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 cursor-pointer text-xs font-bold transition-all">
                                                            <Upload size={14} className="mr-2" />
                                                            <span>Select Video</span>
                                                            <input
                                                                type="file"
                                                                accept="video/*"
                                                                onChange={(e) => {
                                                                    if (e.target.files && e.target.files[0]) {
                                                                        setProjectVideoFile(e.target.files[0]);
                                                                    }
                                                                }}
                                                                className="hidden"
                                                            />
                                                        </label>
                                                        {projectVideoFile ? (
                                                            <span className="text-xs text-secondary-300 truncate max-w-xs">{projectVideoFile.name} (ready)</span>
                                                        ) : editingProject.videoPath ? (
                                                            <span className="text-[10px] text-gray-500 truncate max-w-xs">Current: {editingProject.videoPath}</span>
                                                        ) : (
                                                            <span className="text-[10px] text-gray-500">No video uploaded.</span>
                                                        )}
                                                    </div>
                                                </div>

                                                <div className="flex justify-end space-x-4 border-t border-white/10 pt-6">
                                                    <button
                                                        type="button"
                                                        onClick={() => { setEditingProject(null); setProjectImageFile(null); setProjectGalleryFiles([]); setProjectVideoFile(null); }}
                                                        className="px-6 py-3 border border-white/10 rounded-xl text-xs font-semibold hover:bg-white/10 transition"
                                                    >
                                                        Cancel
                                                    </button>
                                                    <button
                                                        type="submit"
                                                        className="bg-secondary-600 hover:bg-secondary-500 text-white font-bold py-3 px-8 rounded-xl transition duration-300 hover:shadow-lg active:scale-95 text-xs flex items-center space-x-1"
                                                    >
                                                        <Save size={14} />
                                                        <span>Save Project Changes</span>
                                                    </button>
                                                </div>
                                            </form>
                                        )}
                                    </div>
                                )}

                                {/* 3. Experiences tab */}
                                {activeTab === 'experience' && (
                                    <div className="space-y-6 animate-fade-in">
                                        {!editingExp ? (
                                            <>
                                                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                                                    <div>
                                                        <h3 className="text-xl font-bold">Work Experience</h3>
                                                        <p className="text-gray-400 text-xs">Manage roles and projects displayed on the chronological career line</p>
                                                    </div>
                                                    <button
                                                        onClick={() => setEditingExp({
                                                            title: '', company: '', location: '', period: '', description: '', logoUrl: '', order: 0
                                                        })}
                                                        className="flex items-center space-x-1.5 px-4 py-2.5 bg-secondary-600 hover:bg-secondary-500 rounded-xl text-xs font-bold transition-all duration-300"
                                                    >
                                                        <Plus size={16} />
                                                        <span>Add New Role</span>
                                                    </button>
                                                </div>

                                                <div className="space-y-4">
                                                    {experiences.map((exp) => (
                                                        <div key={exp.id} className="bg-white/5 border border-white/10 rounded-2xl p-5 flex items-center justify-between gap-4">
                                                            {exp.logoUrl && (
                                                                <img src={exp.logoUrl} alt={`${exp.company} logo`} className="w-12 h-12 rounded-xl object-cover border border-white/15 bg-white shrink-0" />
                                                            )}
                                                            <div className="flex-1">
                                                                <h4 className="font-bold text-base text-secondary-300 leading-tight">{exp.title}</h4>
                                                                <h5 className="font-semibold text-sm text-gray-200 mt-1">{exp.company} — <span className="font-normal text-xs text-gray-400">{exp.period}</span></h5>
                                                                <p className="text-gray-400 text-xs line-clamp-1 mt-2">{exp.description}</p>
                                                            </div>
                                                            <div className="flex space-x-2 pl-4">
                                                                <button
                                                                    onClick={() => setEditingExp(exp)}
                                                                    className="p-2.5 bg-yellow-500/10 hover:bg-yellow-500 text-yellow-500 hover:text-gray-900 rounded-xl transition"
                                                                    title="Edit Experience"
                                                                >
                                                                    <Edit2 size={14} />
                                                                </button>
                                                                <button
                                                                    onClick={() => handleDeleteExperience(exp.id)}
                                                                    className="p-2.5 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-xl transition"
                                                                    title="Delete Experience"
                                                                >
                                                                    <Trash2 size={14} />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </>
                                        ) : (
                                            <form onSubmit={handleSaveExperience} className="space-y-6">
                                                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                                                    <div>
                                                        <h3 className="text-xl font-bold">{editingExp.id ? 'Edit Experience' : 'Create Experience'}</h3>
                                                        <p className="text-gray-400 text-xs">Set parameters for the professional role</p>
                                                    </div>
                                                    <button
                                                        type="button"
                                                        onClick={() => { setEditingExp(null); setExperienceLogoFile(null); }}
                                                        className="px-4 py-2 border border-white/10 hover:bg-white/10 rounded-xl text-xs font-semibold"
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    <div>
                                                        <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">Job Title / Position</label>
                                                        <input
                                                            type="text"
                                                            value={editingExp.title || ''}
                                                            onChange={(e) => setEditingExp({ ...editingExp, title: e.target.value })}
                                                            required
                                                            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white text-sm"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">Company / Institution</label>
                                                        <input
                                                            type="text"
                                                            value={editingExp.company || ''}
                                                            onChange={(e) => setEditingExp({ ...editingExp, company: e.target.value })}
                                                            required
                                                            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white text-sm"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-semibold">
                                                    <div>
                                                        <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">Location (City, Country)</label>
                                                        <input
                                                            type="text"
                                                            value={editingExp.location || ''}
                                                            onChange={(e) => setEditingExp({ ...editingExp, location: e.target.value })}
                                                            required
                                                            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white text-sm"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">Period (Ex: Aug 2025 - Present)</label>
                                                        <input
                                                            type="text"
                                                            value={editingExp.period || ''}
                                                            onChange={(e) => setEditingExp({ ...editingExp, period: e.target.value })}
                                                            required
                                                            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white text-sm"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">Sorting Index (Order)</label>
                                                        <input
                                                            type="number"
                                                            value={editingExp.order ?? 0}
                                                            onChange={(e) => setEditingExp({ ...editingExp, order: parseInt(e.target.value) || 0 })}
                                                            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white text-sm"
                                                        />
                                                    </div>
                                                </div>

                                                <div>
                                                    <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">Role description (Highlighting Certification & Leadership)</label>
                                                    <textarea
                                                        rows={4}
                                                        value={editingExp.description || ''}
                                                        onChange={(e) => setEditingExp({ ...editingExp, description: e.target.value })}
                                                        required
                                                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white text-sm leading-relaxed"
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">Company Logo (uploads to Cloudinary on save)</label>
                                                    <div className="flex items-center gap-4">
                                                        {editingExp.logoUrl ? (
                                                            <img src={editingExp.logoUrl} alt="Company logo preview" className="w-16 h-16 rounded-xl object-cover border border-white/15 bg-white shrink-0" />
                                                        ) : (
                                                            <div className="w-16 h-16 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-500 text-[10px] text-center shrink-0">No logo</div>
                                                        )}
                                                        <div className="flex-1">
                                                            <input
                                                                type="file"
                                                                accept="image/*"
                                                                onChange={(e) => e.target.files && setExperienceLogoFile(e.target.files[0])}
                                                                className="text-xs text-gray-300"
                                                            />
                                                            {experienceLogoFile && (
                                                                <p className="text-[11px] text-emerald-400 mt-1">New logo selected: {experienceLogoFile.name} (uploads on save)</p>
                                                            )}
                                                        </div>
                                                        {editingExp.logoUrl && (
                                                            <button
                                                                type="button"
                                                                onClick={() => setEditingExp({ ...editingExp, logoUrl: null })}
                                                                className="px-3 py-2 border border-red-500/40 text-red-400 hover:bg-red-500 hover:text-white rounded-xl text-xs transition shrink-0"
                                                            >
                                                                Remove
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>

                                                <div className="flex justify-end space-x-4 border-t border-white/10 pt-6">
                                                    <button
                                                        type="button"
                                                        onClick={() => { setEditingExp(null); setExperienceLogoFile(null); }}
                                                        className="px-6 py-3 border border-white/10 rounded-xl text-xs font-semibold hover:bg-white/10 transition"
                                                    >
                                                        Cancel
                                                    </button>
                                                    <button
                                                        type="submit"
                                                        className="bg-secondary-600 hover:bg-secondary-500 text-white font-bold py-3 px-8 rounded-xl transition duration-300 hover:shadow-lg active:scale-95 text-xs flex items-center space-x-1"
                                                    >
                                                        <Save size={14} />
                                                        <span>Save Experience Changes</span>
                                                    </button>
                                                </div>
                                            </form>
                                        )}
                                    </div>
                                )}

                                {/* Volunteering tab */}
                                {activeTab === 'volunteering' && (
                                    <div className="space-y-6 animate-fade-in">
                                        <div className="flex items-center justify-between pb-4 border-b border-white/10">
                                            <div>
                                                <h3 className="text-xl font-bold">Volunteering Manager</h3>
                                                <p className="text-gray-400 text-xs mt-1">Community roles with sliding photo galleries</p>
                                            </div>
                                            {!editingVolunteering && (
                                                <button
                                                    onClick={() => setEditingVolunteering({ role: '', organization: '', period: '', location: '', description: '', logoUrl: '', images: [], order: 0 })}
                                                    className="flex items-center space-x-1.5 px-4 py-2.5 bg-secondary-600 hover:bg-secondary-500 rounded-xl text-xs font-bold"
                                                >
                                                    <Plus size={16} /><span>Add Volunteering</span>
                                                </button>
                                            )}
                                        </div>
                                        {!editingVolunteering ? (
                                            <div className="space-y-2">
                                                {volunteerings.map((v) => (
                                                    <div key={v.id} className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center justify-between gap-4">
                                                        {v.logoUrl && (
                                                            <img src={v.logoUrl} alt={`${v.organization} logo`} className="w-12 h-12 rounded-xl object-cover border border-white/15 bg-white shrink-0" />
                                                        )}
                                                        <div className="flex-1">
                                                            <h4 className="font-bold">{v.role}</h4>
                                                            <p className="text-xs text-gray-400 mt-0.5">{v.organization} — {v.period}</p>
                                                            <p className="text-[11px] text-gray-500 mt-1">{(v.images || []).length} photo(s)</p>
                                                        </div>
                                                        <div className="flex space-x-2 shrink-0">
                                                            <button onClick={() => setEditingVolunteering({ ...v, images: v.images || [] })} className="p-2 bg-yellow-500/10 hover:bg-yellow-500 text-yellow-500 hover:text-gray-900 rounded-lg"><Edit2 size={14} /></button>
                                                            <button onClick={() => handleDeleteVolunteering(v.id)} className="p-2 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-lg"><Trash2 size={14} /></button>
                                                        </div>
                                                    </div>
                                                ))}
                                                {volunteerings.length === 0 && (
                                                    <p className="text-gray-500 text-sm">No volunteering entries yet — click Add Volunteering.</p>
                                                )}
                                            </div>
                                        ) : (
                                            <form onSubmit={handleSaveVolunteering} className="space-y-4">
                                                <div className="grid md:grid-cols-2 gap-4">
                                                    <input placeholder="Role" value={editingVolunteering.role || ''} onChange={(e) => setEditingVolunteering({ ...editingVolunteering, role: e.target.value })} required className="bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm" />
                                                    <input placeholder="Organization" value={editingVolunteering.organization || ''} onChange={(e) => setEditingVolunteering({ ...editingVolunteering, organization: e.target.value })} required className="bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm" />
                                                    <input placeholder="Period (Ex: 2023 - Present)" value={editingVolunteering.period || ''} onChange={(e) => setEditingVolunteering({ ...editingVolunteering, period: e.target.value })} required className="bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm" />
                                                    <input placeholder="Location" value={editingVolunteering.location || ''} onChange={(e) => setEditingVolunteering({ ...editingVolunteering, location: e.target.value })} className="bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm" />
                                                    <input type="number" placeholder="Order" value={editingVolunteering.order ?? 0} onChange={(e) => setEditingVolunteering({ ...editingVolunteering, order: parseInt(e.target.value) || 0 })} className="bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm" />
                                                </div>
                                                <textarea placeholder="Description" rows={3} value={editingVolunteering.description || ''} onChange={(e) => setEditingVolunteering({ ...editingVolunteering, description: e.target.value })} required className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm" />
                                                <div>
                                                    <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">Association Logo (uploads to Cloudinary on save)</label>
                                                    <div className="flex items-center gap-4">
                                                        {editingVolunteering.logoUrl ? (
                                                            <img src={editingVolunteering.logoUrl} alt="Association logo preview" className="w-16 h-16 rounded-xl object-cover border border-white/15 bg-white shrink-0" />
                                                        ) : (
                                                            <div className="w-16 h-16 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-500 text-[10px] text-center shrink-0">No logo</div>
                                                        )}
                                                        <div className="flex-1">
                                                            <input
                                                                type="file"
                                                                accept="image/*"
                                                                onChange={(e) => { e.target.files && setVolunteeringLogoFile(e.target.files[0]); }}
                                                                className="text-xs text-gray-300"
                                                            />
                                                            {volunteeringLogoFile && (
                                                                <p className="text-[11px] text-emerald-400 mt-1">New logo selected: {volunteeringLogoFile.name} (uploads on save)</p>
                                                            )}
                                                        </div>
                                                        {editingVolunteering.logoUrl && (
                                                            <button
                                                                type="button"
                                                                onClick={() => setEditingVolunteering({ ...editingVolunteering, logoUrl: null })}
                                                                className="px-3 py-2 border border-red-500/40 text-red-400 hover:bg-red-500 hover:text-white rounded-xl text-xs transition shrink-0"
                                                            >
                                                                Remove
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">Gallery photos (slide on the site)</label>
                                                    {(editingVolunteering.images || []).length > 0 && (
                                                        <div className="flex flex-wrap gap-3 mb-3">
                                                            {(editingVolunteering.images || []).map((src) => (
                                                                <div key={src} className="relative group">
                                                                    <img src={src} alt="Volunteering gallery" className="w-20 h-20 rounded-xl object-cover border border-white/15" />
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => setEditingVolunteering({ ...editingVolunteering, images: (editingVolunteering.images || []).filter((i) => i !== src) })}
                                                                        className="absolute -top-2 -right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition"
                                                                        title="Remove photo"
                                                                    >
                                                                        <Trash2 size={12} />
                                                                    </button>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={(e) => { e.target.files && setVolunteeringImageFile(e.target.files[0]); }}
                                                        className="text-xs text-gray-300"
                                                    />
                                                    <p className="text-[11px] text-gray-500 mt-1">One photo uploads per save — save, then edit again to add more.</p>
                                                </div>
                                                <div className="flex justify-end space-x-3">
                                                    <button type="button" onClick={() => { setEditingVolunteering(null); setVolunteeringImageFile(null); setVolunteeringLogoFile(null); }} className="px-5 py-2.5 border border-white/10 rounded-xl text-xs">Cancel</button>
                                                    <button type="submit" className="px-5 py-2.5 bg-secondary-600 rounded-xl text-xs font-bold">Save Volunteering</button>
                                                </div>
                                            </form>
                                        )}
                                    </div>
                                )}

                                {/* 4. Graphic Design tab */}
                                {activeTab === 'graphics' && (
                                    <div className="space-y-8 animate-fade-in">
                                        <div>
                                            <h3 className="text-xl font-bold">Graphic Design Gallery Manager</h3>
                                            <p className="text-gray-400 text-xs">Manage promotional flyers displayed in your creative slider block</p>
                                        </div>

                                        <form onSubmit={handleUploadFlyer} className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
                                            <h4 className="font-bold text-sm">Upload New Flyer</h4>
                                            <div className="grid md:grid-cols-2 gap-4">
                                                <input id="flyer-title" placeholder="Design title (e.g. Tech Conference Flyer)" className="bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm" />
                                                <input id="flyer-category" placeholder="Collection (e.g. Event Flyers)" list="flyer-categories" className="bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm" />
                                                <datalist id="flyer-categories">
                                                    <option value="Event Flyers" />
                                                    <option value="Brand Identity" />
                                                    <option value="Social Media" />
                                                    <option value="Promotional Flyers" />
                                                </datalist>
                                            </div>
                                            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                                                <label className="flex-1 flex items-center justify-center p-4 bg-white/5 hover:bg-white/10 border-2 border-dashed border-white/20 rounded-xl cursor-pointer text-xs font-semibold transition-all">
                                                    <PlusSquare size={16} className="mr-2" />
                                                    <span>{flyerImageFile ? flyerImageFile.name : 'Choose Flyer image asset'}</span>
                                                    <input
                                                        id="flyer-file-input"
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={(e) => {
                                                            if (e.target.files && e.target.files[0]) {
                                                                setFlyerImageFile(e.target.files[0]);
                                                            }
                                                        }}
                                                        className="hidden"
                                                    />
                                                </label>
                                                <button
                                                    type="submit"
                                                    disabled={!flyerImageFile}
                                                    className="bg-secondary-600 hover:bg-secondary-500 disabled:bg-gray-700 disabled:text-gray-500 hover:shadow-blue-500/10 text-white font-bold py-4 px-6 rounded-xl transition text-xs flex items-center justify-center"
                                                >
                                                    <Upload size={14} className="mr-1.5" />
                                                    <span>Upload Flyer</span>
                                                </button>
                                            </div>
                                        </form>

                                        <div className="border-t border-white/10 pt-6">
                                            <h4 className="font-bold mb-4">Total flyers in Database: {graphics.length}</h4>

                                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                                {graphics.map((imgUrl, index) => (
                                                    <div key={imgUrl.id || index} className="group relative aspect-[3/4] border border-white/15 rounded-xl overflow-hidden shadow-md bg-white/5">
                                                        <img src={imgUrl.imageUrl} className="w-full h-full object-cover" />
                                                        <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
                                                            <p className="text-[11px] font-bold truncate">{imgUrl.title || 'Untitled Design'}</p>
                                                            <p className="text-[10px] text-gray-400 truncate">{imgUrl.category || 'Promotional Flyers'}</p>
                                                        </div>
                                                        {editingGraphic?.id === imgUrl.id ? (
                                                            <div className="absolute inset-0 bg-[#0F131D]/95 p-3 flex flex-col justify-center gap-2">
                                                                <input value={editingGraphic.title} onChange={(e) => setEditingGraphic({ ...editingGraphic, title: e.target.value })} placeholder="Title" className="bg-white/5 border border-white/10 rounded-lg py-2 px-3 text-xs" />
                                                                <input value={editingGraphic.category} onChange={(e) => setEditingGraphic({ ...editingGraphic, category: e.target.value })} placeholder="Collection" list="flyer-categories" className="bg-white/5 border border-white/10 rounded-lg py-2 px-3 text-xs" />
                                                                <div className="flex gap-2">
                                                                    <button onClick={handleSaveGraphic} className="flex-1 px-2 py-2 bg-secondary-600 rounded-lg text-[11px] font-bold">Save</button>
                                                                    <button onClick={() => setEditingGraphic(null)} className="flex-1 px-2 py-2 border border-white/10 rounded-lg text-[11px]">Cancel</button>
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                                                                <button
                                                                    onClick={() => setEditingGraphic({ id: imgUrl.id, title: imgUrl.title || '', category: imgUrl.category || '' })}
                                                                    className="p-3 bg-yellow-500 rounded-full text-gray-900 hover:scale-110 transition duration-300"
                                                                    title="Edit title & collection"
                                                                >
                                                                    <Edit2 size={16} />
                                                                </button>
                                                                <button
                                                                    onClick={async () => {
                                                                        if (!window.confirm('Delete this flyer image?')) return;
                                                                        setSaveStatus('Deleting graphic design assets...');
                                                                        try {
                                                                            const res = await authFetch(`${apiUrl}/admin/graphics/${imgUrl.id}`, {
                                                                                method: 'DELETE',
                                                                                headers: getHeaders(),
                                                                            });
                                                                            if (!res.ok) throw new Error('Failed to delete flyer.');
                                                                            setSaveStatus('Flyer deleted successfully.');
                                                                            setTimeout(() => setSaveStatus(null), 3000);
                                                                            fetchPortfolioData();
                                                                        } catch (err: any) {
                                                                            setErrorStatus(err.message || 'Failed to delete flyer.');
                                                                        }
                                                                    }}
                                                                    className="p-3 bg-red-600 rounded-full text-white hover:scale-110 transition duration-300"
                                                                    title="Delete Image"
                                                                >
                                                                    <Trash2 size={16} />
                                                                </button>
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* 5. Skills tab */}
                                {activeTab === 'skills' && (
                                    <div className="space-y-6 animate-fade-in">
                                        <div className="flex items-center justify-between pb-4 border-b border-white/10">
                                            <div>
                                                <h3 className="text-xl font-bold">Skills Manager</h3>
                                                <p className="text-gray-400 text-xs mt-1">Group by category (Frontend, Backend, Tools & Others)</p>
                                            </div>
                                            <button onClick={() => setEditingSkill({ category: 'Frontend', name: '', level: 80, order: 0 })} className="flex items-center space-x-1.5 px-4 py-2.5 bg-secondary-600 hover:bg-secondary-500 rounded-xl text-xs font-bold">
                                                <Plus size={16} /><span>Add Skill</span>
                                            </button>
                                        </div>
                                        {!editingSkill ? (
                                            <div className="space-y-2">
                                                {skills.map((s) => (
                                                    <div key={s.id} className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center justify-between">
                                                        <div>
                                                            <span className="text-[10px] uppercase tracking-wider text-secondary-300 font-bold">{s.category}</span>
                                                            <h4 className="font-bold">{s.name} — {s.level}%</h4>
                                                        </div>
                                                        <div className="flex space-x-2">
                                                            <button onClick={() => setEditingSkill(s)} className="p-2 bg-yellow-500/10 hover:bg-yellow-500 text-yellow-500 hover:text-gray-900 rounded-lg"><Edit2 size={14} /></button>
                                                            <button onClick={() => handleDeleteSkill(s.id)} className="p-2 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-lg"><Trash2 size={14} /></button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <form onSubmit={handleSaveSkill} className="space-y-4">
                                                <div className="grid md:grid-cols-2 gap-4">
                                                    <input placeholder="Category" value={editingSkill.category || ''} onChange={(e) => setEditingSkill({ ...editingSkill, category: e.target.value })} required className="bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm" />
                                                    <input placeholder="Skill name" value={editingSkill.name || ''} onChange={(e) => setEditingSkill({ ...editingSkill, name: e.target.value })} required className="bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm" />
                                                    <input type="number" min={0} max={100} placeholder="Level" value={editingSkill.level ?? 80} onChange={(e) => setEditingSkill({ ...editingSkill, level: parseInt(e.target.value) })} className="bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm" />
                                                    <input type="number" placeholder="Order" value={editingSkill.order ?? 0} onChange={(e) => setEditingSkill({ ...editingSkill, order: parseInt(e.target.value) })} className="bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm" />
                                                </div>
                                                <div className="flex justify-end space-x-3">
                                                    <button type="button" onClick={() => setEditingSkill(null)} className="px-5 py-2.5 border border-white/10 rounded-xl text-xs">Cancel</button>
                                                    <button type="submit" className="px-5 py-2.5 bg-secondary-600 rounded-xl text-xs font-bold">Save Skill</button>
                                                </div>
                                            </form>
                                        )}
                                    </div>
                                )}

                                {/* 6. Achievements tab */}
                                {activeTab === 'achievements' && (
                                    <div className="space-y-6 animate-fade-in">
                                        <div className="flex items-center justify-between pb-4 border-b border-white/10">
                                            <div>
                                                <h3 className="text-xl font-bold">Achievements Manager</h3>
                                                <p className="text-gray-400 text-xs mt-1">Competitions, awards, datathons</p>
                                            </div>
                                            <button onClick={() => setEditingAchievement({ title: '', organization: '', date: '', location: '', description: '', category: '', images: [], order: 0 })} className="flex items-center space-x-1.5 px-4 py-2.5 bg-secondary-600 hover:bg-secondary-500 rounded-xl text-xs font-bold">
                                                <Plus size={16} /><span>Add Achievement</span>
                                            </button>
                                        </div>
                                        {!editingAchievement ? (
                                            <div className="space-y-2">
                                                {achievements.map((a) => (
                                                    <div key={a.id} className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center justify-between">
                                                        <div>
                                                            <h4 className="font-bold">{a.title}</h4>
                                                            <p className="text-xs text-gray-400">{a.organization} — {a.date}</p>
                                                        </div>
                                                        <div className="flex space-x-2">
                                                            <button onClick={() => setEditingAchievement(a)} className="p-2 bg-yellow-500/10 hover:bg-yellow-500 text-yellow-500 hover:text-gray-900 rounded-lg"><Edit2 size={14} /></button>
                                                            <button onClick={() => handleDeleteAchievement(a.id)} className="p-2 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-lg"><Trash2 size={14} /></button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <form onSubmit={handleSaveAchievement} className="space-y-4">
                                                <div className="grid md:grid-cols-2 gap-4">
                                                    <input placeholder="Title" value={editingAchievement.title || ''} onChange={(e) => setEditingAchievement({ ...editingAchievement, title: e.target.value })} required className="bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm" />
                                                    <input placeholder="Organization" value={editingAchievement.organization || ''} onChange={(e) => setEditingAchievement({ ...editingAchievement, organization: e.target.value })} required className="bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm" />
                                                    <input placeholder="Date (2024)" value={editingAchievement.date || ''} onChange={(e) => setEditingAchievement({ ...editingAchievement, date: e.target.value })} required className="bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm" />
                                                    <input placeholder="Location" value={editingAchievement.location || ''} onChange={(e) => setEditingAchievement({ ...editingAchievement, location: e.target.value })} className="bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm" />
                                                    <input placeholder="Category" value={editingAchievement.category || ''} onChange={(e) => setEditingAchievement({ ...editingAchievement, category: e.target.value })} className="bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm" />
                                                    <input type="number" placeholder="Order" value={editingAchievement.order ?? 0} onChange={(e) => setEditingAchievement({ ...editingAchievement, order: parseInt(e.target.value) })} className="bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm" />
                                                </div>
                                                <textarea placeholder="Description" rows={3} value={editingAchievement.description || ''} onChange={(e) => setEditingAchievement({ ...editingAchievement, description: e.target.value })} required className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm" />
                                                <div>
                                                    <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">Sliding gallery images (uploads to Cloudinary on save)</label>
                                                    {(editingAchievement.images || []).length > 0 && (
                                                        <div className="flex flex-wrap gap-3 mb-3">
                                                            {(editingAchievement.images || []).map((src) => (
                                                                <div key={src} className="relative group">
                                                                    <img src={src} alt="Achievement gallery" className="w-20 h-20 rounded-xl object-cover border border-white/15" />
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => setEditingAchievement({ ...editingAchievement, images: (editingAchievement.images || []).filter((i) => i !== src) })}
                                                                        className="absolute -top-2 -right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition"
                                                                        title="Remove image"
                                                                    >
                                                                        <Trash2 size={12} />
                                                                    </button>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        multiple
                                                        onChange={(e) => { e.target.files && setAchievementImageFiles(Array.from(e.target.files)); }}
                                                        className="text-xs text-gray-300"
                                                    />
                                                    {achievementImageFiles.length > 0 && (
                                                        <p className="text-[11px] text-emerald-400 mt-1">{achievementImageFiles.length} new image(s) will upload on save</p>
                                                    )}
                                                </div>
                                                <div className="flex justify-end space-x-3">
                                                    <button type="button" onClick={() => { setEditingAchievement(null); setAchievementImageFiles([]); }} className="px-5 py-2.5 border border-white/10 rounded-xl text-xs">Cancel</button>
                                                    <button type="submit" className="px-5 py-2.5 bg-secondary-600 rounded-xl text-xs font-bold">Save Achievement</button>
                                                </div>
                                            </form>
                                        )}
                                    </div>
                                )}

                                {/* 7. Certificates tab */}
                                {activeTab === 'certificates' && (
                                    <div className="space-y-6 animate-fade-in">
                                        <h3 className="text-xl font-bold">Certificates Manager (PDF / image upload to Cloudinary)</h3>
                                        <form onSubmit={handleSaveCertificate} className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
                                            <div className="grid md:grid-cols-2 gap-4">
                                                <input id="cert-name" placeholder="File name" required className="bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm" />
                                                <input id="cert-display" placeholder="Display name" className="bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm" />
                                            </div>
                                            <input type="file" accept=".pdf,image/*" onChange={(e) => e.target.files && setCertFile(e.target.files[0])} className="text-xs text-gray-300" />
                                            <label className="flex items-center gap-2 text-xs text-gray-300 cursor-pointer">
                                                <input id="cert-verified" type="checkbox" defaultChecked className="w-4 h-4 accent-orange-500" />
                                                <span>Show in hero Verified Credentials stream</span>
                                            </label>
                                            <button type="submit" className="px-5 py-2.5 bg-secondary-600 rounded-xl text-xs font-bold">Upload Certificate</button>
                                        </form>
                                        <div className="space-y-2">
                                            {certificates.map((c) => (
                                                <div key={c.id} className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center justify-between gap-4">
                                                    <div className="flex-1 min-w-0">
                                                        <h4 className="font-bold text-sm flex items-center gap-2">
                                                            {c.displayName}
                                                            {c.verified && (
                                                                <span className="text-[10px] font-mono text-[#00C853] bg-[#00C853]/10 border border-[#00C853]/30 px-2 py-0.5 rounded-md">HERO ✓</span>
                                                            )}
                                                        </h4>
                                                        <p className="text-[11px] text-gray-400 truncate max-w-md">{c.path} ({c.type})</p>
                                                    </div>
                                                    <div className="flex space-x-2 shrink-0">
                                                        <button
                                                            onClick={() => handleToggleCertificateVerified(c.id, !c.verified)}
                                                            title={c.verified ? 'Remove from hero verified stream' : 'Show in hero verified stream'}
                                                            className={`px-3 py-2 rounded-lg text-[11px] font-bold transition ${c.verified ? 'bg-[#00C853]/15 text-[#00C853] border border-[#00C853]/40 hover:bg-[#00C853] hover:text-white' : 'bg-white/5 text-gray-400 border border-white/10 hover:border-[#00C853]/50 hover:text-[#00C853]'}`}
                                                        >
                                                            {c.verified ? 'In Hero ✓' : 'To Hero'}
                                                        </button>
                                                        <button onClick={() => handleDeleteCertificate(c.id)} className="p-2 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-lg"><Trash2 size={14} /></button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* 8. Contact tab */}
                                {activeTab === 'contact' && (
                                    <form onSubmit={handleSaveContact} className="space-y-6 animate-fade-in">
                                        <h3 className="text-xl font-bold">Contact Info & Socials</h3>
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <input placeholder="Email" value={contact.email} onChange={(e) => setContact({ ...contact, email: e.target.value })} className="bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm" />
                                            <input placeholder="Phone" value={contact.phone} onChange={(e) => setContact({ ...contact, phone: e.target.value })} className="bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm" />
                                            <input placeholder="Location" value={contact.location} onChange={(e) => setContact({ ...contact, location: e.target.value })} className="bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm" />
                                            <input placeholder="WhatsApp number" value={contact.whatsapp} onChange={(e) => setContact({ ...contact, whatsapp: e.target.value })} className="bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm" />
                                            <input placeholder="GitHub URL" value={contact.github} onChange={(e) => setContact({ ...contact, github: e.target.value })} className="bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm" />
                                            <input placeholder="LinkedIn URL" value={contact.linkedin} onChange={(e) => setContact({ ...contact, linkedin: e.target.value })} className="bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm" />
                                        </div>
                                        <div className="flex justify-end">
                                            <button type="submit" className="flex items-center space-x-2 bg-secondary-600 px-6 py-3 rounded-xl text-sm font-bold"><Save size={14} /><span>Save Contact</span></button>
                                        </div>
                                    </form>
                                )}
                            </>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
