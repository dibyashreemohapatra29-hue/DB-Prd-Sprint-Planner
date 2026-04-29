import React, { useState } from "react";
import { 
  Terminal as TerminalIcon, 
  Play, 
  History, 
  CheckSquare, 
  AlertTriangle, 
  Cpu, 
  GitCommit, 
  Clock, 
  Search,
  ChevronRight,
  Filter
} from "lucide-react";

const Terminal = () => {
  const [activeTab, setActiveTab] = useState("output");
  const [isGenerating, setIsGenerating] = useState(false);

  const [formData, setFormData] = useState({
    title: "Dark mode for dashboard",
    users: "Power users, developers, nocturnal workers",
    goal: "Reduce eye strain, increase session length during night hours, match OS preferences",
    description: "Implement a system-wide dark mode theme. Must respect prefers-color-scheme by default but allow manual override in user settings. Ensure all charts and data visualizations maintain WCAG AAA contrast ratios in dark mode."
  });

  return (
    <div className="flex h-screen w-full bg-[#050505] text-[#a1a1aa] font-mono text-sm overflow-hidden">
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&display=swap');
        .font-mono { font-family: 'JetBrains Mono', monospace; }
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: #050505; }
        ::-webkit-scrollbar-thumb { background: #27272a; border-radius: 0px; }
        ::-webkit-scrollbar-thumb:hover { background: #3f3f46; }
        * { scrollbar-width: thin; scrollbar-color: #27272a #050505; }
        ::selection { background: rgba(34, 211, 238, 0.2); color: #22d3ee; }
      `}} />

      {/* SIDEBAR */}
      <div className="w-[320px] flex-shrink-0 border-r border-[#27272a] bg-[#0a0a0a] flex flex-col z-10">
        <div className="p-4 border-b border-[#27272a] flex items-center gap-3 text-cyan-400">
          <TerminalIcon size={18} />
          <span className="font-bold tracking-tight">PRD_PLANNER_V2</span>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          <div className="space-y-4">
            <div className="text-xs text-[#52525b] uppercase tracking-wider mb-2 flex items-center gap-2">
              <span className="w-2 h-2 bg-cyan-400/50 rounded-none inline-block"></span>
              INPUT_PARAMETERS
            </div>
            
            <div className="space-y-1.5">
              <label className="text-xs text-[#71717a] flex justify-between">
                <span>&gt; FEATURE_TITLE</span>
                <span className="text-[#3f3f46]">string</span>
              </label>
              <input 
                type="text" 
                value={formData.title}
                onChange={e => setFormData({...formData, title: e.target.value})}
                className="w-full bg-[#111111] border border-[#27272a] text-[#e4e4e7] p-2 focus:outline-none focus:border-cyan-500/50 focus:bg-[#151515] transition-colors rounded-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs text-[#71717a] flex justify-between">
                <span>&gt; TARGET_USERS</span>
                <span className="text-[#3f3f46]">string[]</span>
              </label>
              <textarea 
                value={formData.users}
                onChange={e => setFormData({...formData, users: e.target.value})}
                rows={2}
                className="w-full bg-[#111111] border border-[#27272a] text-[#e4e4e7] p-2 focus:outline-none focus:border-cyan-500/50 focus:bg-[#151515] transition-colors rounded-none resize-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs text-[#71717a] flex justify-between">
                <span>&gt; BUSINESS_GOAL</span>
                <span className="text-[#3f3f46]">string</span>
              </label>
              <textarea 
                value={formData.goal}
                onChange={e => setFormData({...formData, goal: e.target.value})}
                rows={3}
                className="w-full bg-[#111111] border border-[#27272a] text-[#e4e4e7] p-2 focus:outline-none focus:border-cyan-500/50 focus:bg-[#151515] transition-colors rounded-none resize-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs text-[#71717a] flex justify-between">
                <span>&gt; DESCRIPTION</span>
                <span className="text-[#3f3f46]">text</span>
              </label>
              <textarea 
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
                rows={6}
                className="w-full bg-[#111111] border border-[#27272a] text-[#e4e4e7] p-2 focus:outline-none focus:border-cyan-500/50 focus:bg-[#151515] transition-colors rounded-none resize-none"
              />
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-[#27272a] bg-[#0a0a0a] space-y-3">
          <button className="w-full bg-cyan-950/40 hover:bg-cyan-900/60 text-cyan-400 border border-cyan-800/50 p-2.5 flex items-center justify-center gap-2 transition-colors uppercase text-xs tracking-wider">
            <Play size={14} className="fill-cyan-400/20" />
            [ EXECUTE_GENERATION ]
          </button>
          <button 
            onClick={() => setActiveTab('history')}
            className="w-full bg-transparent hover:bg-[#111111] text-[#71717a] border border-[#27272a] p-2.5 flex items-center justify-center gap-2 transition-colors uppercase text-xs tracking-wider"
          >
            <History size={14} />
            [ VIEW_LOGS ]
          </button>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col bg-[#050505] min-w-0">
        <div className="h-14 border-b border-[#27272a] flex items-center px-4 justify-between bg-[#0a0a0a]/80 backdrop-blur-sm">
          <div className="flex space-x-1">
            <button 
              onClick={() => setActiveTab("output")}
              className={`px-4 py-2 text-xs uppercase tracking-wider border-b-2 transition-colors ${activeTab === 'output' ? 'border-cyan-400 text-cyan-400 bg-cyan-950/10' : 'border-transparent text-[#71717a] hover:text-[#a1a1aa]'}`}
            >
              /stdout
            </button>
            <button 
              onClick={() => setActiveTab("history")}
              className={`px-4 py-2 text-xs uppercase tracking-wider border-b-2 transition-colors ${activeTab === 'history' ? 'border-cyan-400 text-cyan-400 bg-cyan-950/10' : 'border-transparent text-[#71717a] hover:text-[#a1a1aa]'}`}
            >
              /var/log/history
            </button>
          </div>
          
          <div className="text-xs text-[#52525b] flex items-center gap-3">
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-green-500"></span> SYS_ONLINE</span>
            <span className="flex items-center gap-1"><Cpu size={12}/> {activeTab === 'output' ? '32ms' : '12ms'}</span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 md:p-8">
          <div className="max-w-5xl mx-auto">
            
            {activeTab === 'output' ? (
              <div className="space-y-8">
                {/* PRD CARD */}
                <div className="border border-[#27272a] bg-[#0a0a0a] relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-1 h-full bg-[#27272a] group-hover:bg-cyan-500/50 transition-colors"></div>
                  <div className="border-b border-[#27272a] bg-[#111111] px-4 py-2.5 flex items-center gap-2 text-xs text-[#e4e4e7]">
                    <GitCommit size={14} className="text-cyan-400" />
                    <span>01_PRODUCT_REQUIREMENTS.md</span>
                  </div>
                  <div className="p-5 space-y-4 text-[13px]">
                    <div className="grid grid-cols-[140px_1fr] gap-4 items-baseline border-b border-[#27272a]/50 pb-3">
                      <div className="text-[#71717a] uppercase text-xs">Summary</div>
                      <div className="text-[#e4e4e7]">Implement system-wide dark mode to reduce eye strain for nocturnal users, supporting OS-level prefers-color-scheme with manual overrides.</div>
                    </div>
                    <div className="grid grid-cols-[140px_1fr] gap-4 items-baseline border-b border-[#27272a]/50 pb-3">
                      <div className="text-[#71717a] uppercase text-xs">Success Metrics</div>
                      <ul className="text-[#d4d4d8] space-y-1 list-disc list-inside">
                        <li>50%+ adoption rate among active users within 30 days</li>
                        <li>Zero WCAG AAA contrast violations in automated tests</li>
                        <li>15% increase in average session duration after 8 PM local time</li>
                      </ul>
                    </div>
                    <div className="grid grid-cols-[140px_1fr] gap-4 items-baseline pb-1">
                      <div className="text-[#71717a] uppercase text-xs">Out of Scope</div>
                      <div className="text-[#a1a1aa] italic">Custom theming beyond light/dark (e.g., high contrast themes, custom accent colors). User-generated content color manipulation.</div>
                    </div>
                  </div>
                </div>

                {/* TASKS CARD */}
                <div className="border border-[#27272a] bg-[#0a0a0a] relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-1 h-full bg-[#27272a] group-hover:bg-purple-500/50 transition-colors"></div>
                  <div className="border-b border-[#27272a] bg-[#111111] px-4 py-2.5 flex items-center gap-2 text-xs text-[#e4e4e7]">
                    <CheckSquare size={14} className="text-purple-400" />
                    <span>02_ENGINEERING_TASKS.csv</span>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-[13px] border-collapse">
                      <thead>
                        <tr className="border-b border-[#27272a] text-[#71717a] text-xs">
                          <th className="p-3 font-normal">ID</th>
                          <th className="p-3 font-normal">TASK_DESCRIPTION</th>
                          <th className="p-3 font-normal">EFFORT</th>
                          <th className="p-3 font-normal">PRIORITY</th>
                          <th className="p-3 font-normal">RISK</th>
                        </tr>
                      </thead>
                      <tbody className="text-[#d4d4d8]">
                        <tr className="border-b border-[#27272a]/50 hover:bg-[#111111] transition-colors">
                          <td className="p-3 text-[#71717a]">TSK-01</td>
                          <td className="p-3">Design system color tokens audit and refactor</td>
                          <td className="p-3"><span className="bg-[#18181b] border border-[#27272a] px-2 py-0.5 text-[#a1a1aa]">XL (8d)</span></td>
                          <td className="p-3"><span className="text-red-400">P0</span></td>
                          <td className="p-3"><span className="text-yellow-400 flex items-center gap-1"><AlertTriangle size={12}/> HIGH</span></td>
                        </tr>
                        <tr className="border-b border-[#27272a]/50 hover:bg-[#111111] transition-colors">
                          <td className="p-3 text-[#71717a]">TSK-02</td>
                          <td className="p-3">Implement theme provider and local storage persistence</td>
                          <td className="p-3"><span className="bg-[#18181b] border border-[#27272a] px-2 py-0.5 text-[#a1a1aa]">M (3d)</span></td>
                          <td className="p-3"><span className="text-orange-400">P1</span></td>
                          <td className="p-3"><span className="text-green-400">LOW</span></td>
                        </tr>
                        <tr className="border-b border-[#27272a]/50 hover:bg-[#111111] transition-colors">
                          <td className="p-3 text-[#71717a]">TSK-03</td>
                          <td className="p-3">Update charting library themes for dark mode</td>
                          <td className="p-3"><span className="bg-[#18181b] border border-[#27272a] px-2 py-0.5 text-[#a1a1aa]">L (5d)</span></td>
                          <td className="p-3"><span className="text-orange-400">P1</span></td>
                          <td className="p-3"><span className="text-yellow-400">MED</span></td>
                        </tr>
                        <tr className="hover:bg-[#111111] transition-colors">
                          <td className="p-3 text-[#71717a]">TSK-04</td>
                          <td className="p-3">User settings UI updates for theme selection</td>
                          <td className="p-3"><span className="bg-[#18181b] border border-[#27272a] px-2 py-0.5 text-[#a1a1aa]">S (1d)</span></td>
                          <td className="p-3"><span className="text-blue-400">P2</span></td>
                          <td className="p-3"><span className="text-green-400">LOW</span></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* SPRINT PLAN CARD */}
                <div className="border border-[#27272a] bg-[#0a0a0a] relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-1 h-full bg-[#27272a] group-hover:bg-emerald-500/50 transition-colors"></div>
                  <div className="border-b border-[#27272a] bg-[#111111] px-4 py-2.5 flex items-center justify-between text-xs text-[#e4e4e7]">
                    <div className="flex items-center gap-2">
                      <Clock size={14} className="text-emerald-400" />
                      <span>03_SPRINT_ALLOCATION.yml</span>
                    </div>
                    <span className="text-[#71717a]">TOTAL_CAPACITY: 17d</span>
                  </div>
                  
                  <div className="p-5 grid grid-cols-1 lg:grid-cols-3 gap-4">
                    {/* Sprint 1 */}
                    <div className="border border-[#27272a] bg-[#111111]">
                      <div className="border-b border-[#27272a] p-2 bg-[#18181b] text-xs flex justify-between">
                        <span className="text-emerald-400 font-bold">SPRINT_124</span>
                        <span className="text-[#71717a]">8/10 pts</span>
                      </div>
                      <div className="p-3 space-y-2">
                        <div className="bg-[#0a0a0a] border border-[#27272a] p-2 text-xs">
                          <div className="flex justify-between mb-1">
                            <span className="text-[#a1a1aa]">TSK-01</span>
                            <span className="text-red-400">P0</span>
                          </div>
                          <div className="text-[#d4d4d8] mb-2">Design system color tokens audit</div>
                          <div className="text-[#52525b] flex items-center justify-between">
                            <span>Frontend</span>
                            <span>8d</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Sprint 2 */}
                    <div className="border border-[#27272a] bg-[#111111]">
                      <div className="border-b border-[#27272a] p-2 bg-[#18181b] text-xs flex justify-between">
                        <span className="text-emerald-400 font-bold">SPRINT_125</span>
                        <span className="text-[#71717a]">8/10 pts</span>
                      </div>
                      <div className="p-3 space-y-2">
                        <div className="bg-[#0a0a0a] border border-[#27272a] p-2 text-xs">
                          <div className="flex justify-between mb-1">
                            <span className="text-[#a1a1aa]">TSK-02</span>
                            <span className="text-orange-400">P1</span>
                          </div>
                          <div className="text-[#d4d4d8] mb-2">Implement theme provider</div>
                          <div className="text-[#52525b] flex items-center justify-between">
                            <span>Frontend</span>
                            <span>3d</span>
                          </div>
                        </div>
                        <div className="bg-[#0a0a0a] border border-[#27272a] p-2 text-xs">
                          <div className="flex justify-between mb-1">
                            <span className="text-[#a1a1aa]">TSK-03</span>
                            <span className="text-orange-400">P1</span>
                          </div>
                          <div className="text-[#d4d4d8] mb-2">Update charting library themes</div>
                          <div className="text-[#52525b] flex items-center justify-between">
                            <span>Frontend</span>
                            <span>5d</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Sprint 3 */}
                    <div className="border border-[#27272a] bg-[#111111]">
                      <div className="border-b border-[#27272a] p-2 bg-[#18181b] text-xs flex justify-between">
                        <span className="text-emerald-400 font-bold">SPRINT_126</span>
                        <span className="text-[#71717a]">1/10 pts</span>
                      </div>
                      <div className="p-3 space-y-2">
                        <div className="bg-[#0a0a0a] border border-[#27272a] p-2 text-xs">
                          <div className="flex justify-between mb-1">
                            <span className="text-[#a1a1aa]">TSK-04</span>
                            <span className="text-blue-400">P2</span>
                          </div>
                          <div className="text-[#d4d4d8] mb-2">User settings UI updates</div>
                          <div className="text-[#52525b] flex items-center justify-between">
                            <span>Frontend</span>
                            <span>1d</span>
                          </div>
                        </div>
                        <div className="border border-dashed border-[#27272a] p-2 text-xs text-center text-[#52525b] py-4">
                          -- IDLE_CAPACITY --
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#52525b]" size={16} />
                    <input 
                      type="text" 
                      placeholder="grep 'keyword'..."
                      className="w-full bg-[#0a0a0a] border border-[#27272a] text-[#e4e4e7] pl-10 p-2 focus:outline-none focus:border-cyan-500/50 transition-colors rounded-none"
                    />
                  </div>
                  <button className="bg-[#0a0a0a] border border-[#27272a] text-[#a1a1aa] p-2 hover:bg-[#111111] transition-colors flex items-center gap-2">
                    <Filter size={16} />
                    <span className="uppercase text-xs tracking-wider">Filter</span>
                  </button>
                </div>

                {/* History Item 1 */}
                <div className="border border-[#27272a] bg-[#0a0a0a] p-4 flex gap-4 hover:border-[#3f3f46] transition-colors cursor-pointer group">
                  <div className="text-[#52525b] text-xs pt-0.5 w-24 flex-shrink-0">14:32:01<br/>OCT_24</div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between">
                      <div className="text-[#e4e4e7] font-bold group-hover:text-cyan-400 transition-colors">Dark mode for dashboard</div>
                      <span className="text-xs border border-green-500/30 text-green-400 bg-green-500/10 px-2 py-0.5">SUCCESS</span>
                    </div>
                    <div className="text-xs text-[#71717a] line-clamp-2">Implement a system-wide dark mode theme. Must respect prefers-color-scheme by default but allow manual override...</div>
                    <div className="flex items-center gap-4 text-xs text-[#52525b] pt-2">
                      <span className="flex items-center gap-1"><GitCommit size={12}/> PRD</span>
                      <span className="flex items-center gap-1"><CheckSquare size={12}/> 4 TASKS</span>
                      <span className="flex items-center gap-1"><Clock size={12}/> 3 SPRINTS</span>
                    </div>
                  </div>
                </div>

                {/* History Item 2 */}
                <div className="border border-[#27272a] bg-[#0a0a0a] p-4 flex gap-4 hover:border-[#3f3f46] transition-colors cursor-pointer group">
                  <div className="text-[#52525b] text-xs pt-0.5 w-24 flex-shrink-0">09:15:44<br/>OCT_23</div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between">
                      <div className="text-[#e4e4e7] font-bold group-hover:text-cyan-400 transition-colors">RBAC Permissions System</div>
                      <span className="text-xs border border-green-500/30 text-green-400 bg-green-500/10 px-2 py-0.5">SUCCESS</span>
                    </div>
                    <div className="text-xs text-[#71717a] line-clamp-2">Granular role-based access control for enterprise organizations. Allow custom role creation and resource-level scoping.</div>
                    <div className="flex items-center gap-4 text-xs text-[#52525b] pt-2">
                      <span className="flex items-center gap-1"><GitCommit size={12}/> PRD</span>
                      <span className="flex items-center gap-1"><CheckSquare size={12}/> 12 TASKS</span>
                      <span className="flex items-center gap-1"><Clock size={12}/> 5 SPRINTS</span>
                    </div>
                  </div>
                </div>

                {/* History Item 3 */}
                <div className="border border-[#27272a] bg-[#0a0a0a] p-4 flex gap-4 hover:border-[#3f3f46] transition-colors cursor-pointer group opacity-60">
                  <div className="text-[#52525b] text-xs pt-0.5 w-24 flex-shrink-0">18:02:11<br/>OCT_21</div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between">
                      <div className="text-[#e4e4e7] font-bold group-hover:text-cyan-400 transition-colors">Stripe Billing Integration</div>
                      <span className="text-xs border border-red-500/30 text-red-400 bg-red-500/10 px-2 py-0.5">TIMEOUT</span>
                    </div>
                    <div className="text-xs text-[#71717a] line-clamp-2">Migrate from legacy payment processor to Stripe checkout. Implement metered billing and usage tracking.</div>
                    <div className="text-xs text-red-400/70 pt-2 font-mono">ERR: Generation context exceeded token limits.</div>
                  </div>
                </div>

              </div>
            )}
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terminal;
