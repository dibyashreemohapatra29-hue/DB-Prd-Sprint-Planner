import React, { useState } from "react";
import { 
  CheckCircle2, 
  Circle, 
  Clock, 
  FileText, 
  History, 
  Layout, 
  ListTodo, 
  MessageSquare, 
  MoreHorizontal, 
  PenTool, 
  Play, 
  Search, 
  Sparkles,
  Target,
  Users
} from "lucide-react";

export default function Studio() {
  const [activeTab, setActiveTab] = useState<"output" | "history">("output");

  return (
    <div className="flex h-screen w-full bg-[#F9F8F6] text-[#33312E] font-sans overflow-hidden selection:bg-[#E8DCC4]">
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..900;1,9..144,300..900&family=Outfit:wght@300;400;500;600&display=swap');
        
        .font-serif {
          font-family: 'Fraunces', serif;
        }
        .font-sans {
          font-family: 'Outfit', sans-serif;
        }
        
        ::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        ::-webkit-scrollbar-track {
          background: transparent;
        }
        ::-webkit-scrollbar-thumb {
          background: #E0DBD2;
          border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #CFC8BB;
        }
      `}} />

      {/* Sidebar */}
      <aside className="w-[320px] flex-shrink-0 bg-[#F4F1EC] border-r border-[#E8E4DB] flex flex-col h-full z-10">
        <div className="p-8 pb-6">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-8 h-8 rounded-full bg-[#33312E] flex items-center justify-center text-[#F9F8F6]">
              <PenTool size={16} strokeWidth={2.5} />
            </div>
            <h1 className="font-serif text-2xl font-semibold tracking-tight">Studio</h1>
          </div>
          
          <div className="mb-6">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-[#8A857A] mb-1">Current Draft</h2>
            <p className="font-serif text-lg leading-tight">Dark mode for dashboard</p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-8 pb-8 space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-[#5C5852] flex items-center gap-2">
              <FileText size={14} />
              Feature Title
            </label>
            <input 
              type="text" 
              defaultValue="Dark mode for dashboard"
              className="w-full bg-white border border-[#E8E4DB] rounded-lg px-4 py-2.5 text-[15px] focus:outline-none focus:ring-2 focus:ring-[#C67C63]/30 focus:border-[#C67C63] transition-all shadow-sm"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-[#5C5852] flex items-center gap-2">
              <Users size={14} />
              Target Users
            </label>
            <input 
              type="text" 
              defaultValue="Power users, developers, night owls"
              className="w-full bg-white border border-[#E8E4DB] rounded-lg px-4 py-2.5 text-[15px] focus:outline-none focus:ring-2 focus:ring-[#C67C63]/30 focus:border-[#C67C63] transition-all shadow-sm"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-[#5C5852] flex items-center gap-2">
              <Target size={14} />
              Business Goal
            </label>
            <textarea 
              rows={2}
              defaultValue="Reduce eye strain complaints and align with OS-level theme preferences to improve retention."
              className="w-full bg-white border border-[#E8E4DB] rounded-lg px-4 py-2.5 text-[15px] resize-none focus:outline-none focus:ring-2 focus:ring-[#C67C63]/30 focus:border-[#C67C63] transition-all shadow-sm"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-[#5C5852] flex items-center gap-2">
              <MessageSquare size={14} />
              Description
            </label>
            <textarea 
              rows={4}
              defaultValue="Implement a system-wide dark mode toggle that respects the user's OS preference by default, but allows manual override. Needs to update all chart color palettes as well."
              className="w-full bg-white border border-[#E8E4DB] rounded-lg px-4 py-2.5 text-[15px] resize-none focus:outline-none focus:ring-2 focus:ring-[#C67C63]/30 focus:border-[#C67C63] transition-all shadow-sm"
            />
          </div>
        </div>

        <div className="p-6 border-t border-[#E8E4DB] bg-[#F4F1EC] space-y-3">
          <button className="w-full bg-[#C67C63] hover:bg-[#B56A52] text-white rounded-lg px-4 py-3 text-[15px] font-medium flex items-center justify-center gap-2 transition-colors shadow-sm">
            <Sparkles size={16} />
            Generate Plan
          </button>
          <button 
            onClick={() => setActiveTab("history")}
            className="w-full bg-white hover:bg-[#F9F8F6] border border-[#E8E4DB] text-[#5C5852] rounded-lg px-4 py-3 text-[15px] font-medium flex items-center justify-center gap-2 transition-colors shadow-sm"
          >
            <History size={16} />
            View History
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-full h-[300px] bg-gradient-to-b from-[#F2F0EA]/50 to-transparent pointer-events-none" />
        
        {/* Topbar */}
        <header className="px-12 pt-10 pb-4 flex items-center justify-between z-10 relative">
          <div className="flex items-center gap-8 border-b border-[#E8E4DB] w-full">
            <button 
              onClick={() => setActiveTab("output")}
              className={`pb-4 text-[15px] font-medium transition-all relative ${activeTab === "output" ? "text-[#33312E]" : "text-[#8A857A] hover:text-[#5C5852]"}`}
            >
              Current Output
              {activeTab === "output" && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#C67C63] rounded-t-full" />
              )}
            </button>
            <button 
              onClick={() => setActiveTab("history")}
              className={`pb-4 text-[15px] font-medium transition-all relative ${activeTab === "history" ? "text-[#33312E]" : "text-[#8A857A] hover:text-[#5C5852]"}`}
            >
              Document History
              {activeTab === "history" && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#C67C63] rounded-t-full" />
              )}
            </button>
          </div>
        </header>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto px-12 pb-24 z-10">
          {activeTab === "output" ? (
            <div className="max-w-4xl mx-auto space-y-10 mt-6 animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out">
              
              {/* PRD Section */}
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-6 h-6 rounded bg-[#E8E4DB] flex items-center justify-center text-[#5C5852]">
                    <FileText size={12} />
                  </div>
                  <h3 className="font-serif text-xl font-medium text-[#33312E]">Product Requirements</h3>
                </div>
                
                <div className="bg-white rounded-xl border border-[#E8E4DB] shadow-[0_4px_20px_rgba(0,0,0,0.02)] overflow-hidden">
                  <div className="p-8 space-y-8">
                    <div>
                      <h4 className="text-xs font-semibold uppercase tracking-widest text-[#8A857A] mb-2">Executive Summary</h4>
                      <p className="text-[15px] leading-relaxed text-[#5C5852]">
                        Implementation of a comprehensive dark mode theme across the entire dashboard application. 
                        This feature will respond to OS-level preferences by default while providing user-level overrides 
                        in the settings panel. Expected to reduce eye strain for our primary developer demographic and 
                        increase session lengths during evening hours.
                      </p>
                    </div>
                    
                    <div className="h-px w-full bg-[#F4F1EC]" />
                    
                    <div className="grid grid-cols-2 gap-8">
                      <div>
                        <h4 className="text-xs font-semibold uppercase tracking-widest text-[#8A857A] mb-3">Key Requirements</h4>
                        <ul className="space-y-2">
                          {["CSS variable refactoring for all components", "New 'Theme' section in user settings", "Auto-detect OS preference on load", "Dark variations for all data charts"].map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-[15px] text-[#5C5852]">
                              <Circle size={6} className="mt-2 text-[#C67C63] fill-current flex-shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold uppercase tracking-widest text-[#8A857A] mb-3">Out of Scope</h4>
                        <ul className="space-y-2">
                          {["Custom theme color picking", "Dark mode for marketing site", "High contrast accessibility mode (v2)"].map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-[15px] text-[#5C5852]">
                              <div className="mt-1.5 w-1.5 h-1.5 rounded-full border border-[#8A857A] flex-shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Tasks Section */}
              <section>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded bg-[#E8E4DB] flex items-center justify-center text-[#5C5852]">
                      <ListTodo size={12} />
                    </div>
                    <h3 className="font-serif text-xl font-medium text-[#33312E]">Engineering Tasks</h3>
                  </div>
                  <button className="text-sm text-[#8A857A] hover:text-[#33312E] transition-colors flex items-center gap-1">
                    Export to Jira
                  </button>
                </div>

                <div className="bg-white rounded-xl border border-[#E8E4DB] shadow-[0_4px_20px_rgba(0,0,0,0.02)] overflow-hidden">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-[#F4F1EC] bg-[#FAFAF9]">
                        <th className="py-3 px-6 text-xs font-medium uppercase tracking-wider text-[#8A857A] w-1/2">Task Description</th>
                        <th className="py-3 px-6 text-xs font-medium uppercase tracking-wider text-[#8A857A]">Effort</th>
                        <th className="py-3 px-6 text-xs font-medium uppercase tracking-wider text-[#8A857A]">Priority</th>
                        <th className="py-3 px-6 text-xs font-medium uppercase tracking-wider text-[#8A857A]">Risk</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F4F1EC]">
                      {[
                        { title: "Extract hardcoded hex values to CSS variables", effort: "XL", priority: "High", risk: "Low", priorityColor: "text-[#C67C63] bg-[#C67C63]/10", riskColor: "text-green-700 bg-green-50" },
                        { title: "Design & implement dark mode color palette", effort: "M", priority: "High", risk: "Low", priorityColor: "text-[#C67C63] bg-[#C67C63]/10", riskColor: "text-green-700 bg-green-50" },
                        { title: "Update Chart.js config for dark theme support", effort: "L", priority: "Medium", risk: "Medium", priorityColor: "text-[#D4A373] bg-[#D4A373]/10", riskColor: "text-amber-700 bg-amber-50" },
                        { title: "Build settings toggle UI and user preference API", effort: "S", priority: "Medium", risk: "Low", priorityColor: "text-[#D4A373] bg-[#D4A373]/10", riskColor: "text-green-700 bg-green-50" },
                      ].map((task, i) => (
                        <tr key={i} className="hover:bg-[#FAFAF9] transition-colors">
                          <td className="py-4 px-6 text-[14px] text-[#33312E]">{task.title}</td>
                          <td className="py-4 px-6 text-[14px] text-[#5C5852] font-mono">{task.effort}</td>
                          <td className="py-4 px-6">
                            <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${task.priorityColor}`}>
                              {task.priority}
                            </span>
                          </td>
                          <td className="py-4 px-6">
                            <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${task.riskColor}`}>
                              {task.risk}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Sprint Plan Section */}
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-6 h-6 rounded bg-[#E8E4DB] flex items-center justify-center text-[#5C5852]">
                    <Layout size={12} />
                  </div>
                  <h3 className="font-serif text-xl font-medium text-[#33312E]">Sprint Plan</h3>
                </div>

                <div className="grid grid-cols-3 gap-6">
                  {/* Column 1 */}
                  <div className="bg-[#F4F1EC] rounded-xl p-4 flex flex-col gap-3 border border-[#E8E4DB]/50">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-sm font-medium text-[#33312E]">Sprint 1: Foundation</h4>
                      <span className="text-xs text-[#8A857A] bg-white px-2 py-0.5 rounded-full border border-[#E8E4DB]">12 pts</span>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-[#E8E4DB] shadow-sm flex flex-col gap-2">
                      <span className="text-[13px] text-[#33312E] leading-snug">Extract hardcoded hex values to CSS variables</span>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs text-[#8A857A]">DEV-101</span>
                        <div className="w-5 h-5 rounded-full bg-[#E8E4DB] flex items-center justify-center text-[10px] text-[#5C5852]">XL</div>
                      </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-[#E8E4DB] shadow-sm flex flex-col gap-2">
                      <span className="text-[13px] text-[#33312E] leading-snug">Design & implement dark mode color palette</span>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs text-[#8A857A]">DES-42</span>
                        <div className="w-5 h-5 rounded-full bg-[#E8E4DB] flex items-center justify-center text-[10px] text-[#5C5852]">M</div>
                      </div>
                    </div>
                  </div>

                  {/* Column 2 */}
                  <div className="bg-[#F4F1EC] rounded-xl p-4 flex flex-col gap-3 border border-[#E8E4DB]/50">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-sm font-medium text-[#33312E]">Sprint 2: Implementation</h4>
                      <span className="text-xs text-[#8A857A] bg-white px-2 py-0.5 rounded-full border border-[#E8E4DB]">8 pts</span>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-[#E8E4DB] shadow-sm flex flex-col gap-2">
                      <span className="text-[13px] text-[#33312E] leading-snug">Update Chart.js config for dark theme support</span>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs text-[#8A857A]">DEV-105</span>
                        <div className="w-5 h-5 rounded-full bg-[#E8E4DB] flex items-center justify-center text-[10px] text-[#5C5852]">L</div>
                      </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-[#E8E4DB] shadow-sm flex flex-col gap-2">
                      <span className="text-[13px] text-[#33312E] leading-snug">Build settings toggle UI</span>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs text-[#8A857A]">DEV-108</span>
                        <div className="w-5 h-5 rounded-full bg-[#E8E4DB] flex items-center justify-center text-[10px] text-[#5C5852]">S</div>
                      </div>
                    </div>
                  </div>

                  {/* Column 3 */}
                  <div className="bg-[#F4F1EC] rounded-xl p-4 flex flex-col gap-3 border border-[#E8E4DB]/50 opacity-60">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-sm font-medium text-[#33312E]">Sprint 3: Polish</h4>
                      <span className="text-xs text-[#8A857A] bg-white px-2 py-0.5 rounded-full border border-[#E8E4DB]">5 pts</span>
                    </div>
                    <div className="bg-white/50 border border-dashed border-[#CFC8BB] p-4 rounded-lg flex items-center justify-center text-[#8A857A] text-sm py-8">
                      QA & Bug Fixes
                    </div>
                  </div>
                </div>
              </section>

              <div className="py-8 text-center border-t border-[#E8E4DB]/50">
                <p className="text-sm text-[#8A857A] italic font-serif">End of Document</p>
              </div>

            </div>
          ) : (
            <div className="max-w-3xl mx-auto mt-6 animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out">
              <div className="flex items-center justify-between mb-8">
                <h2 className="font-serif text-2xl font-medium text-[#33312E]">Generation History</h2>
                <div className="relative">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8A857A]" />
                  <input 
                    type="text" 
                    placeholder="Search past drafts..." 
                    className="pl-9 pr-4 py-2 bg-white border border-[#E8E4DB] rounded-full text-sm focus:outline-none focus:border-[#C67C63] focus:ring-1 focus:ring-[#C67C63] w-64 shadow-sm transition-all"
                  />
                </div>
              </div>

              <div className="space-y-4">
                {[
                  { title: "Dark mode for dashboard", date: "Today, 2:45 PM", status: "Current", icon: Play },
                  { title: "User roles & permissions revamp", date: "Yesterday, 10:15 AM", status: "Archived", icon: CheckCircle2 },
                  { title: "Stripe checkout integration", date: "Oct 12, 2023", status: "Archived", icon: CheckCircle2 },
                  { title: "Email notification preferences", date: "Oct 05, 2023", status: "Archived", icon: CheckCircle2 },
                ].map((item, i) => (
                  <div key={i} className="bg-white border border-[#E8E4DB] rounded-xl p-5 hover:border-[#CFC8BB] transition-colors cursor-pointer group shadow-sm flex items-start gap-4">
                    <div className={`mt-0.5 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${i === 0 ? 'bg-[#C67C63]/10 text-[#C67C63]' : 'bg-[#F4F1EC] text-[#8A857A]'}`}>
                      <item.icon size={14} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="text-[16px] font-medium text-[#33312E] group-hover:text-[#C67C63] transition-colors">{item.title}</h4>
                        <span className="text-xs text-[#8A857A] flex items-center gap-1">
                          <Clock size={12} /> {item.date}
                        </span>
                      </div>
                      <p className="text-sm text-[#5C5852] line-clamp-1">
                        {i === 0 
                          ? "Implement a system-wide dark mode toggle that respects the user's OS preference..." 
                          : "Detailed breakdown of engineering tasks for the upcoming feature release."}
                      </p>
                    </div>
                    <button className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-[#F4F1EC] rounded-md text-[#5C5852]">
                      <MoreHorizontal size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
