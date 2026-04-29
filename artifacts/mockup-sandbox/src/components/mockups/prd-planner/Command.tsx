import React, { useState } from "react";
import { Search, Plus, Filter, Play, Clock, LayoutDashboard, FileText, CheckCircle2, MoreHorizontal, Zap, ArrowRight, Activity, Box, Settings2, Trash2 } from "lucide-react";

export default function Command() {
  const [activeTab, setActiveTab] = useState<"output" | "history">("output");

  return (
    <div className="flex h-screen w-full bg-white text-zinc-950 font-sans selection:bg-[#E2FF3D] selection:text-black">
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap');
        .font-display { font-family: 'Space Grotesk', sans-serif; }
        .font-body { font-family: 'Inter', sans-serif; }
        .sharp-border { border: 2px solid #000; }
        .sharp-shadow { box-shadow: 4px 4px 0px #000; }
        .sharp-shadow-sm { box-shadow: 2px 2px 0px #000; }
        .input-focus:focus-within { border-color: #000; box-shadow: 4px 4px 0px #E2FF3D; outline: none; }
      `}} />

      {/* SIDEBAR */}
      <aside className="w-[320px] flex-shrink-0 border-r-2 border-black flex flex-col bg-zinc-50 z-10 relative">
        <div className="p-5 border-b-2 border-black bg-[#E2FF3D]">
          <div className="flex items-center gap-2 mb-1">
            <Zap className="w-6 h-6 fill-black" />
            <h1 className="font-display font-bold text-xl tracking-tight uppercase">Sprint Control</h1>
          </div>
          <p className="text-xs font-semibold uppercase tracking-wider text-black/70">PRD & Task Generator</p>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider mb-2 text-zinc-500">Feature Title</label>
              <input 
                type="text" 
                defaultValue="Dark Mode for Dashboard"
                className="w-full bg-white border-2 border-zinc-300 p-2.5 text-sm font-semibold rounded-none input-focus transition-all placeholder:text-zinc-400"
                placeholder="e.g. Activity Feed"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider mb-2 text-zinc-500">Target Users</label>
              <input 
                type="text" 
                defaultValue="Power users, Night-shift admins"
                className="w-full bg-white border-2 border-zinc-300 p-2.5 text-sm font-semibold rounded-none input-focus transition-all placeholder:text-zinc-400"
                placeholder="Who is this for?"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider mb-2 text-zinc-500">Business Goal</label>
              <textarea 
                defaultValue="Reduce eye strain, increase session duration, and match OS-level preferences."
                className="w-full bg-white border-2 border-zinc-300 p-2.5 text-sm font-semibold rounded-none input-focus transition-all resize-none h-24 placeholder:text-zinc-400"
                placeholder="What problem does this solve?"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider mb-2 text-zinc-500">Description</label>
              <textarea 
                defaultValue="Implement a full dark mode theme across the main dashboard, settings pages, and data tables. Include a manual toggle and auto-sync with system preferences."
                className="w-full bg-white border-2 border-zinc-300 p-2.5 text-sm font-semibold rounded-none input-focus transition-all resize-none h-32 placeholder:text-zinc-400"
                placeholder="Technical details, constraints, requirements..."
              />
            </div>
          </div>
        </div>

        <div className="p-5 border-t-2 border-black bg-white space-y-3">
          <button className="w-full bg-black text-[#E2FF3D] border-2 border-black py-3 px-4 flex items-center justify-center gap-2 font-display font-bold text-sm tracking-wide uppercase hover:bg-zinc-900 transition-colors sharp-shadow active:translate-y-1 active:translate-x-1 active:shadow-none">
            <Play className="w-4 h-4 fill-current" />
            Launch Generation
          </button>
          <button 
            onClick={() => setActiveTab("history")}
            className="w-full bg-white text-black border-2 border-black py-3 px-4 flex items-center justify-center gap-2 font-display font-bold text-sm tracking-wide uppercase hover:bg-zinc-100 transition-colors sharp-shadow active:translate-y-1 active:translate-x-1 active:shadow-none"
          >
            <Clock className="w-4 h-4" />
            View History
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col min-w-0 bg-[#f4f4f5]">
        {/* TOPBAR */}
        <header className="h-[76px] border-b-2 border-black bg-white flex items-center justify-between px-6 flex-shrink-0 z-10">
          <div className="flex gap-8">
            <button 
              onClick={() => setActiveTab("output")}
              className={`font-display font-bold text-lg uppercase tracking-wider flex items-center gap-2 h-[76px] border-b-4 transition-colors ${activeTab === 'output' ? 'border-[#E2FF3D] text-black' : 'border-transparent text-zinc-400 hover:text-black'}`}
            >
              <LayoutDashboard className="w-5 h-5" />
              Active Output
            </button>
            <button 
              onClick={() => setActiveTab("history")}
              className={`font-display font-bold text-lg uppercase tracking-wider flex items-center gap-2 h-[76px] border-b-4 transition-colors ${activeTab === 'history' ? 'border-[#E2FF3D] text-black' : 'border-transparent text-zinc-400 hover:text-black'}`}
            >
              <Activity className="w-5 h-5" />
              Run History
            </button>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-xs font-bold bg-zinc-100 px-3 py-1.5 border-2 border-black">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              SYSTEM READY
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-auto p-6 md:p-8 relative">
          {/* Background grid pattern */}
          <div className="absolute inset-0 z-0 pointer-events-none opacity-50" style={{ backgroundImage: 'radial-gradient(#d4d4d8 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
          
          <div className="max-w-5xl mx-auto space-y-8 relative z-10 pb-20">
            {activeTab === "output" ? (
              <>
                {/* PRD CARD */}
                <section className="bg-white border-2 border-black sharp-shadow p-6">
                  <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-black">
                    <h2 className="font-display font-bold text-xl uppercase tracking-wide flex items-center gap-2">
                      <FileText className="w-6 h-6" />
                      Product Requirements
                    </h2>
                    <span className="bg-[#E2FF3D] border-2 border-black px-2 py-0.5 text-xs font-bold uppercase tracking-wider">v1.0 Approved</span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-x-6 gap-y-4">
                    <div className="col-span-1">
                      <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1">Executive Summary</h3>
                    </div>
                    <div className="col-span-3">
                      <p className="text-sm font-medium leading-relaxed">
                        Implement a system-wide dark mode to improve user comfort in low-light environments. 
                        This feature touches all primary dashboard views and requires updates to the existing 
                        component library color tokens.
                      </p>
                    </div>

                    <div className="col-span-4 border-t-2 border-zinc-100 my-2" />

                    <div className="col-span-1">
                      <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1">User Stories</h3>
                    </div>
                    <div className="col-span-3 space-y-2 text-sm font-medium">
                      <div className="flex gap-3">
                        <span className="text-zinc-400 font-display font-bold">01</span>
                        <p>As a user, I can toggle between light and dark mode manually from the settings menu.</p>
                      </div>
                      <div className="flex gap-3">
                        <span className="text-zinc-400 font-display font-bold">02</span>
                        <p>As a user, I can set the theme to sync with my OS system preferences.</p>
                      </div>
                      <div className="flex gap-3">
                        <span className="text-zinc-400 font-display font-bold">03</span>
                        <p>As an admin, charts and data tables remain legible and high-contrast in dark mode.</p>
                      </div>
                    </div>

                    <div className="col-span-4 border-t-2 border-zinc-100 my-2" />

                    <div className="col-span-1">
                      <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1">Success Metrics</h3>
                    </div>
                    <div className="col-span-3 flex flex-wrap gap-2">
                      <span className="inline-block bg-zinc-100 border-2 border-black px-3 py-1 text-xs font-bold uppercase tracking-wider">30% Adoption Rate</span>
                      <span className="inline-block bg-zinc-100 border-2 border-black px-3 py-1 text-xs font-bold uppercase tracking-wider">+15% Session Length</span>
                    </div>
                  </div>
                </section>

                {/* TASKS CARD */}
                <section className="bg-white border-2 border-black sharp-shadow">
                  <div className="p-6 border-b-2 border-black flex items-center justify-between bg-zinc-50">
                    <h2 className="font-display font-bold text-xl uppercase tracking-wide flex items-center gap-2">
                      <CheckCircle2 className="w-6 h-6" />
                      Task Breakdown
                    </h2>
                    <div className="flex gap-2">
                      <span className="bg-black text-white px-3 py-1 text-xs font-bold uppercase tracking-wider">12 Total</span>
                      <span className="bg-[#E2FF3D] border-2 border-black text-black px-3 py-1 text-xs font-bold uppercase tracking-wider">4 High Priority</span>
                    </div>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                      <thead className="bg-zinc-100 border-b-2 border-black uppercase text-xs font-bold tracking-wider text-zinc-600">
                        <tr>
                          <th className="px-6 py-4 border-r-2 border-black w-16 text-center">ID</th>
                          <th className="px-6 py-4 border-r-2 border-black">Task Title</th>
                          <th className="px-6 py-4 border-r-2 border-black w-32">Type</th>
                          <th className="px-6 py-4 border-r-2 border-black w-24">Effort</th>
                          <th className="px-6 py-4 w-32">Risk</th>
                        </tr>
                      </thead>
                      <tbody className="font-medium">
                        {[
                          { id: "T-01", title: "Audit existing color tokens across all UI components", type: "Design", effort: "M", risk: "Low", riskColor: "bg-emerald-400" },
                          { id: "T-02", title: "Update Tailwind config with dark mode semantic variables", type: "Frontend", effort: "S", risk: "Low", riskColor: "bg-emerald-400" },
                          { id: "T-03", title: "Implement ThemeProvider context & local storage sync", type: "Frontend", effort: "M", risk: "Med", riskColor: "bg-amber-400" },
                          { id: "T-04", title: "Refactor Chart.js instances to support dynamic theme switching", type: "Frontend", effort: "L", risk: "High", riskColor: "bg-rose-400 text-white" },
                          { id: "T-05", title: "Add OS preference media query detection hook", type: "Frontend", effort: "S", risk: "Low", riskColor: "bg-emerald-400" },
                        ].map((task, i) => (
                          <tr key={i} className="border-b-2 border-zinc-200 hover:bg-zinc-50 transition-colors">
                            <td className="px-6 py-4 border-r-2 border-zinc-200 font-display font-bold text-zinc-400 text-center">{task.id}</td>
                            <td className="px-6 py-4 border-r-2 border-zinc-200 font-semibold">{task.title}</td>
                            <td className="px-6 py-4 border-r-2 border-zinc-200">
                              <span className="bg-zinc-100 border-2 border-zinc-300 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">{task.type}</span>
                            </td>
                            <td className="px-6 py-4 border-r-2 border-zinc-200 text-center">
                              <span className={`inline-flex items-center justify-center w-6 h-6 border-2 border-black rounded-full text-xs font-bold ${task.effort === 'L' ? 'bg-black text-[#E2FF3D]' : 'bg-white'}`}>
                                {task.effort}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <span className={`${task.riskColor} border-2 border-black px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider`}>
                                {task.risk}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>

                {/* SPRINT PLAN CARD */}
                <section className="bg-white border-2 border-black sharp-shadow">
                  <div className="p-6 border-b-2 border-black flex items-center justify-between">
                    <h2 className="font-display font-bold text-xl uppercase tracking-wide flex items-center gap-2">
                      <Box className="w-6 h-6" />
                      Sprint Plan Overview
                    </h2>
                    <button className="bg-white border-2 border-black p-2 hover:bg-zinc-100 sharp-shadow-sm active:translate-y-0.5 active:translate-x-0.5 active:shadow-none transition-all">
                      <Settings2 className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 bg-zinc-100">
                    {/* Sprint 1 */}
                    <div className="col-span-1 border-r-2 border-black bg-zinc-50 p-6">
                      <div className="mb-4 flex items-center justify-between">
                        <h3 className="font-display font-bold uppercase tracking-wider text-lg">Sprint 1</h3>
                        <span className="bg-black text-white px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">Foundation</span>
                      </div>
                      <div className="space-y-3">
                        <div className="bg-white border-2 border-black p-3 sharp-shadow-sm">
                          <p className="text-sm font-bold mb-2">Setup Theme Context & Config</p>
                          <div className="flex justify-between items-center text-xs font-semibold text-zinc-500">
                            <span>T-02, T-03, T-05</span>
                            <span className="text-black font-bold">5 pts</span>
                          </div>
                        </div>
                        <div className="bg-white border-2 border-black p-3 sharp-shadow-sm">
                          <p className="text-sm font-bold mb-2">Design Token Audit</p>
                          <div className="flex justify-between items-center text-xs font-semibold text-zinc-500">
                            <span>T-01</span>
                            <span className="text-black font-bold">3 pts</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Sprint 2 */}
                    <div className="col-span-1 border-r-2 border-black bg-zinc-50 p-6">
                      <div className="mb-4 flex items-center justify-between">
                        <h3 className="font-display font-bold uppercase tracking-wider text-lg">Sprint 2</h3>
                        <span className="bg-black text-white px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">Implementation</span>
                      </div>
                      <div className="space-y-3">
                        <div className="bg-white border-2 border-black p-3 sharp-shadow-sm border-l-4 border-l-[#E2FF3D]">
                          <p className="text-sm font-bold mb-2">Refactor Core Components</p>
                          <div className="flex justify-between items-center text-xs font-semibold text-zinc-500">
                            <span>T-06, T-07</span>
                            <span className="text-black font-bold">8 pts</span>
                          </div>
                        </div>
                        <div className="bg-white border-2 border-black p-3 sharp-shadow-sm border-l-4 border-l-rose-400">
                          <p className="text-sm font-bold mb-2">Update Data Viz / Charts</p>
                          <div className="flex justify-between items-center text-xs font-semibold text-zinc-500">
                            <span>T-04</span>
                            <span className="text-black font-bold">5 pts</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Sprint 3 */}
                    <div className="col-span-1 bg-zinc-50 p-6">
                      <div className="mb-4 flex items-center justify-between">
                        <h3 className="font-display font-bold uppercase tracking-wider text-lg">Sprint 3</h3>
                        <span className="bg-black text-white px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">QA & Polish</span>
                      </div>
                      <div className="space-y-3">
                        <div className="bg-white border-2 border-black p-3 sharp-shadow-sm">
                          <p className="text-sm font-bold mb-2">User Settings UI Integration</p>
                          <div className="flex justify-between items-center text-xs font-semibold text-zinc-500">
                            <span>T-08</span>
                            <span className="text-black font-bold">3 pts</span>
                          </div>
                        </div>
                        <div className="bg-white border-2 border-black p-3 sharp-shadow-sm">
                          <p className="text-sm font-bold mb-2">Cross-browser Testing & Fixes</p>
                          <div className="flex justify-between items-center text-xs font-semibold text-zinc-500">
                            <span>T-09, T-10</span>
                            <span className="text-black font-bold">5 pts</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </>
            ) : (
              <section className="bg-white border-2 border-black sharp-shadow p-6">
                <div className="flex items-center justify-between mb-8 pb-4 border-b-2 border-black">
                  <h2 className="font-display font-bold text-xl uppercase tracking-wide flex items-center gap-2">
                    <Activity className="w-6 h-6" />
                    Generation History
                  </h2>
                  <div className="flex gap-2">
                    <div className="relative">
                      <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                      <input 
                        type="text" 
                        placeholder="SEARCH..." 
                        className="pl-9 pr-4 py-2 border-2 border-black text-xs font-bold uppercase tracking-wider bg-zinc-50 focus:bg-white outline-none focus:ring-2 focus:ring-[#E2FF3D]"
                      />
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 border-2 border-black text-xs font-bold uppercase tracking-wider bg-zinc-50 hover:bg-zinc-100 transition-colors">
                      <Filter className="w-3 h-3" /> Filter
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  {[
                    { title: "Dark Mode for Dashboard", date: "Today, 10:42 AM", status: "Completed", color: "bg-[#E2FF3D]" },
                    { title: "SSO Enterprise Integration", date: "Yesterday, 14:15 PM", status: "Completed", color: "bg-[#E2FF3D]" },
                    { title: "Export to CSV Feature", date: "Oct 24, 09:30 AM", status: "Draft", color: "bg-amber-300" },
                    { title: "User Profile Revamp", date: "Oct 22, 16:45 PM", status: "Archived", color: "bg-zinc-200" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-4 border-2 border-black bg-white hover:bg-zinc-50 transition-colors cursor-pointer group">
                      <div className="flex items-center gap-4">
                        <div className={`w-3 h-3 border-2 border-black rounded-full ${item.color}`} />
                        <div>
                          <h4 className="font-bold text-sm">{item.title}</h4>
                          <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mt-1">{item.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 bg-white border-2 border-black hover:bg-[#E2FF3D] transition-colors">
                          <FileText className="w-4 h-4" />
                        </button>
                        <button className="p-2 bg-white border-2 border-black hover:bg-rose-400 hover:text-white transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
