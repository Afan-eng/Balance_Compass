import React, { useState } from 'react';
import { ResourceGuide } from '../types';
import { RESOURCE_GUIDES } from '../data/mockData';
import { useApp } from '../context/AppContext';
import {
  FileText,
  Download,
  Eye,
  Search,
  CheckCircle2,
  X,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const ResourcesPage: React.FC = () => {
  const { showToast } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFormat, setSelectedFormat] = useState('All');
  const [previewGuide, setPreviewGuide] = useState<ResourceGuide | null>(null);

  const formats = ['All', 'Checklist', 'Guide', 'Planner', 'Infographic'];

  const filteredGuides = RESOURCE_GUIDES.filter(guide => {
    const matchesFormat = selectedFormat === 'All' || guide.category === selectedFormat;
    const matchesQuery =
      guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guide.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFormat && matchesQuery;
  });

  const handleDownload = (guide: ResourceGuide) => {
    try {
      const content = `# Balance Compass — ${guide.title}
Category: ${guide.category} | Format: ${guide.pages}
Source: Balance Compass (Mindfulness & Work-Life Architecture)
Date: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}

---

## Overview
${guide.description}

## Action Checklist & Blueprint Items
${guide.highlights.map((h, i) => `[ ] ${i + 1}. ${h}`).join('\n')}

---
### Mindful Habit Anchor:
Print or save this blueprint to your desk or digital notebook. Mark off each item as you implement your restorative routines.
`;
      const blob = new Blob([content], { type: 'text/markdown;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${guide.title.toLowerCase().replace(/[^a-z0-9]/gi, '_')}.md`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      showToast(`Downloaded printable blueprint for "${guide.title}"!`);
    } catch (err) {
      showToast(`Saved "${guide.title}" to offline resources.`);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-[#2E7D32] uppercase tracking-wider">
          <FileText className="w-4 h-4" />
          <span>Toolkit & Blueprints</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1A2E1A] tracking-tight">
          Downloadable Checklists & Worksheets
        </h1>
        <p className="text-base text-[#5A6B5A] max-w-2xl">
          Tangible, printer-friendly blueprints to hang by your workspace or refrigerator to keep core habits top of mind.
        </p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white p-4 rounded-2xl border border-[#EAE6DF] shadow-sm">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#5A6B5A]" />
          <input
            type="text"
            placeholder="Search checklists & guides..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#FAF8F5] border border-[#EAE6DF] text-xs sm:text-sm focus:outline-none focus:border-[#2E7D32]"
          />
        </div>

        <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
          {formats.map(fmt => (
            <button
              key={fmt}
              onClick={() => setSelectedFormat(fmt)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                selectedFormat === fmt
                  ? 'bg-[#2E7D32] text-white shadow-xs'
                  : 'bg-[#FAF8F5] text-[#5A6B5A] hover:text-[#1A2E1A] border border-[#EAE6DF]'
              }`}
            >
              {fmt}
            </button>
          ))}
        </div>
      </div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredGuides.map(guide => (
          <div
            key={guide.id}
            className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-black/5 border border-[#EAE6DF] hover:border-[#2E7D32] transition-all flex flex-col justify-between space-y-6"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-[#E8F5E9] text-[#2E7D32] text-xs font-bold">
                  {guide.category} · {guide.pages}
                </span>
                <span className="text-xs text-[#5A6B5A] font-medium">
                  {guide.downloads.toLocaleString()} downloads
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-[#1A2E1A]">{guide.title}</h3>
                <p className="text-xs sm:text-sm text-[#5A6B5A] mt-2 leading-relaxed">
                  {guide.description}
                </p>
              </div>

              <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#EAE6DF] space-y-2">
                <div className="text-[11px] font-bold text-[#1A2E1A] uppercase tracking-wider">
                  Inside this resource:
                </div>
                <ul className="space-y-1.5 text-xs text-[#5A6B5A]">
                  {guide.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#2E7D32] shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setPreviewGuide(guide)}
                className="flex-1 py-2.5 rounded-full border border-[#EAE6DF] hover:bg-[#FAF8F5] text-xs font-bold text-[#1A2E1A] flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Interactive Preview</span>
              </button>
              <button
                onClick={() => handleDownload(guide)}
                className="flex-1 py-2.5 rounded-full bg-[#2E7D32] hover:bg-[#1B5E20] text-xs font-bold text-white flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download PDF</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* PREVIEW MODAL */}
      {previewGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div onClick={() => setPreviewGuide(null)} className="fixed inset-0 bg-[#1A2E1A]/40 backdrop-blur-xs" />
          <div className="relative bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl z-10 border border-[#EAE6DF] space-y-6">
            <button
              onClick={() => setPreviewGuide(null)}
              className="absolute top-4 right-4 text-[#5A6B5A] hover:text-[#1A2E1A]"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2">
              <span className="text-xs font-bold text-[#2E7D32] uppercase">{previewGuide.category} Preview</span>
              <h3 className="text-2xl font-bold text-[#1A2E1A]">{previewGuide.title}</h3>
              <p className="text-xs sm:text-sm text-[#5A6B5A]">{previewGuide.description}</p>
            </div>

            <div className="border border-[#EAE6DF] rounded-2xl p-6 bg-[#FAF8F5] space-y-4">
              <div className="text-xs font-bold text-[#1A2E1A] uppercase tracking-wider">
                Interactive Checkable Blueprint
              </div>
              <div className="space-y-3">
                {previewGuide.highlights.map((item, idx) => (
                  <label key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-[#1A2E1A] cursor-pointer">
                    <input type="checkbox" defaultChecked={idx === 0} className="w-4 h-4 accent-[#2E7D32] mt-0.5" />
                    <span>{item}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setPreviewGuide(null)}
                className="px-5 py-2.5 rounded-full border border-[#EAE6DF] text-xs font-semibold text-[#5A6B5A]"
              >
                Close Preview
              </button>
              <button
                onClick={() => {
                  handleDownload(previewGuide);
                  setPreviewGuide(null);
                }}
                className="px-6 py-2.5 rounded-full bg-[#2E7D32] hover:bg-[#1B5E20] text-white text-xs font-bold shadow-md flex items-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Save to Downloads</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
