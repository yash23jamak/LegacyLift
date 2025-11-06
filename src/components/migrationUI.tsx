

import { useEffect, useState } from 'react';
import {
  ArrowRight,
  Code2,
  Zap,
  Box,
  RefreshCw,
  Layers,
  TrendingUp,
  CheckCircle2,
  Filter,
  ArrowUpDown,
  Gauge,
  Users,
  Wrench
} from 'lucide-react';

interface FeatureMapping {
  id: string;
  legacyFeature: string;
  reactEquivalent: string;
  description: string;
  category: 'rendering' | 'state' | 'routing' | 'data' | 'ui';
  complexity: 'low' | 'medium' | 'high';
  benefits: string[];
}

interface TechStackItem {
  name: string;
  role: string;
  type: 'legacy' | 'modern';
}

function migrationUI() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'name' | 'complexity'>('name');

  const featureMappings: FeatureMapping[] = [
    {
      id: '1',
      legacyFeature: 'JSP Pages & Servlets',
      reactEquivalent: 'React Components',
      description: 'Server-side rendered pages replaced with reusable, composable React components with client-side rendering',
      category: 'rendering',
      complexity: 'high',
      benefits: ['Reusability', 'Better Performance', 'Modularity']
    },
    {
      id: '2',
      legacyFeature: 'Session Attributes',
      reactEquivalent: 'useState / useContext',
      description: 'Server-side session management migrated to client-side state management using React hooks',
      category: 'state',
      complexity: 'medium',
      benefits: ['Real-time Updates', 'Type Safety', 'Predictable State']
    },
    {
      id: '3',
      legacyFeature: 'JSP Include Directives',
      reactEquivalent: 'Component Composition',
      description: 'Static includes replaced with dynamic component composition and props passing',
      category: 'ui',
      complexity: 'low',
      benefits: ['Dynamic Loading', 'Props Flow', 'Better Testing']
    },
    {
      id: '4',
      legacyFeature: 'JSTL Core Tags',
      reactEquivalent: 'JSX & JavaScript',
      description: 'Template logic replaced with JavaScript expressions and JSX syntax for better type checking',
      category: 'rendering',
      complexity: 'medium',
      benefits: ['Type Safety', 'IDE Support', 'Debugging']
    },
    {
      id: '5',
      legacyFeature: 'Request Dispatching',
      reactEquivalent: 'React Router',
      description: 'Server-side routing replaced with client-side routing for SPA navigation',
      category: 'routing',
      complexity: 'medium',
      benefits: ['Instant Navigation', 'Browser History', 'Code Splitting']
    },
    {
      id: '6',
      legacyFeature: 'JDBC Connections',
      reactEquivalent: 'REST APIs / GraphQL',
      description: 'Direct database connections replaced with API-based data fetching using hooks',
      category: 'data',
      complexity: 'high',
      benefits: ['Decoupled Architecture', 'Caching', 'Error Handling']
    },
    {
      id: '7',
      legacyFeature: 'jQuery DOM Manipulation',
      reactEquivalent: 'Virtual DOM / useRef',
      description: 'Imperative DOM updates replaced with declarative React rendering and refs when needed',
      category: 'ui',
      complexity: 'medium',
      benefits: ['Performance', 'Declarative', 'Predictable Updates']
    },
    {
      id: '8',
      legacyFeature: 'Scriptlets (<% %>)',
      reactEquivalent: 'useEffect / Custom Hooks',
      description: 'Embedded Java code replaced with React lifecycle hooks and custom hooks for logic',
      category: 'state',
      complexity: 'high',
      benefits: ['Separation of Concerns', 'Testability', 'Reusability']
    }
  ];

  const modernCapabilities = [
    { icon: Box, title: 'Component Reuse', description: 'Build once, use everywhere with props-based customization' },
    { icon: RefreshCw, title: 'React Hooks', description: 'useState, useEffect, useContext for powerful state management' },
    { icon: Layers, title: 'State Management', description: 'Context API, Redux, Zustand for complex application state' },
    { icon: Zap, title: 'Client-Side Routing', description: 'Fast navigation without page reloads using React Router' }
  ];

  const techStack: TechStackItem[] = [
    { name: 'JSP (JavaServer Pages)', role: 'Server-Side Rendering', type: 'legacy' },
    { name: 'Java Servlets', role: 'Request Handling', type: 'legacy' },
    { name: 'jQuery', role: 'DOM Manipulation', type: 'legacy' },
    { name: 'JSTL', role: 'Template Logic', type: 'legacy' },
    { name: 'ReactJS 18+', role: 'UI Library', type: 'modern' },
    { name: 'TypeScript', role: 'Type Safety', type: 'modern' },
    { name: 'Vite', role: 'Build Tool', type: 'modern' },
    { name: 'Tailwind CSS', role: 'Styling Framework', type: 'modern' }
  ];

  const improvements = [
    { icon: Gauge, title: 'Faster Load Times', stat: '70%', description: 'Reduction in initial page load with code splitting' },
    { icon: Box, title: 'Modular Components', stat: '95%', description: 'Component reusability across the application' },
    { icon: TrendingUp, title: 'Developer Velocity', stat: '3x', description: 'Faster feature development and iteration' },
    { icon: Users, title: 'Better UX', stat: '85%', description: 'Improvement in user satisfaction scores' }
  ];

  const categories = [
    { value: 'all', label: 'All Features' },
    { value: 'rendering', label: 'Rendering' },
    { value: 'state', label: 'State Management' },
    { value: 'routing', label: 'Routing' },
    { value: 'data', label: 'Data Fetching' },
    { value: 'ui', label: 'UI Updates' }
  ];

  const filteredMappings = featureMappings
    .filter(mapping => selectedCategory === 'all' || mapping.category === selectedCategory)
    .sort((a, b) => {
      if (sortBy === 'complexity') {
        const complexityOrder = { low: 1, medium: 2, high: 3 };
        return complexityOrder[b.complexity] - complexityOrder[a.complexity];
      }
      return a.legacyFeature.localeCompare(b.legacyFeature);
    });

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'low': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'medium': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'high': return 'bg-rose-100 text-rose-700 border-rose-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'rendering': return Code2;
      case 'state': return RefreshCw;
      case 'routing': return ArrowRight;
      case 'data': return Layers;
      case 'ui': return Box;
      default: return Code2;
    }
  };

    useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        <header className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Wrench className="w-4 h-4" />
            Technical Migration Case Study
          </div>
          <h1 className="text-5xl font-bold text-slate-900 mb-4 tracking-tight">
            Legacy JSP to Modern React
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            A comprehensive guide mapping legacy JavaServer Pages features to their modern React equivalents
          </p>
        </header>

        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <Zap className="w-7 h-7 text-blue-600" />
            <h2 className="text-3xl font-bold text-slate-900">Modern React Capabilities</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {modernCapabilities.map((capability, index) => {
              const Icon = capability.icon;
              return (
                <div
                  key={index}
                  className="group bg-white rounded-xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200 hover:border-blue-300 hover:-translate-y-1"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">{capability.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{capability.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Code2 className="w-7 h-7 text-blue-600" />
              <h2 className="text-3xl font-bold text-slate-900">Feature Mapping Comparison</h2>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-white rounded-lg shadow-sm border border-slate-200 p-1">
                <Filter className="w-4 h-4 text-slate-400 ml-2" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="bg-transparent border-none text-sm font-medium text-slate-700 focus:outline-none pr-3"
                >
                  {categories.map(cat => (
                    <option key={cat.value} value={cat.value}>{cat.label}</option>
                  ))}
                </select>
              </div>
              <button
                onClick={() => setSortBy(sortBy === 'name' ? 'complexity' : 'name')}
                className="flex items-center gap-2 bg-white rounded-lg shadow-sm border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
              >
                <ArrowUpDown className="w-4 h-4" />
                Sort by {sortBy === 'name' ? 'Complexity' : 'Name'}
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {filteredMappings.map((mapping) => {
              const CategoryIcon = getCategoryIcon(mapping.category);
              return (
                <div
                  key={mapping.id}
                  className="bg-white rounded-xl shadow-sm border border-slate-200 hover:shadow-lg transition-all duration-300 overflow-hidden"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6">
                    <div className="lg:col-span-5 space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                          <CategoryIcon className="w-5 h-5 text-slate-600" />
                        </div>
                        <div>
                          <div className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">Legacy (JSP)</div>
                          <h3 className="text-lg font-semibold text-slate-900">{mapping.legacyFeature}</h3>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 ml-13">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getComplexityColor(mapping.complexity)}`}>
                          {mapping.complexity.toUpperCase()} COMPLEXITY
                        </span>
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200 capitalize">
                          {mapping.category}
                        </span>
                      </div>
                    </div>

                    <div className="lg:col-span-1 flex items-center justify-center">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                        <ArrowRight className="w-5 h-5 text-white" />
                      </div>
                    </div>

                    <div className="lg:col-span-6 space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                          <Code2 className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className="text-xs font-medium text-blue-600 uppercase tracking-wide mb-1">Modern (React)</div>
                          <h3 className="text-lg font-semibold text-slate-900">{mapping.reactEquivalent}</h3>
                        </div>
                      </div>
                      <p className="text-slate-600 text-sm leading-relaxed ml-13">{mapping.description}</p>
                      <div className="flex flex-wrap gap-2 ml-13">
                        {mapping.benefits.map((benefit, idx) => (
                          <span key={idx} className="inline-flex items-center gap-1 px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-medium border border-green-200">
                            <CheckCircle2 className="w-3 h-3" />
                            {benefit}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <Layers className="w-7 h-7 text-blue-600" />
            <h2 className="text-3xl font-bold text-slate-900">Technology Stack Overview</h2>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <span className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center text-sm font-bold text-slate-600">1</span>
                  Legacy Stack
                </h3>
                <div className="space-y-3">
                  {techStack.filter(item => item.type === 'legacy').map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200">
                      <div>
                        <div className="font-semibold text-slate-900">{item.name}</div>
                        <div className="text-sm text-slate-600">{item.role}</div>
                      </div>
                      <div className="w-2 h-2 bg-slate-400 rounded-full"></div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <span className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-sm font-bold text-white">2</span>
                  Modern Stack
                </h3>
                <div className="space-y-3">
                  {techStack.filter(item => item.type === 'modern').map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <div>
                        <div className="font-semibold text-slate-900">{item.name}</div>
                        <div className="text-sm text-blue-600">{item.role}</div>
                      </div>
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-slate-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Gauge className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1">Performance</h4>
                    <p className="text-sm text-slate-600">Faster rendering and optimized bundle sizes</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Code2 className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1">Developer Experience</h4>
                    <p className="text-sm text-slate-600">Better tooling, debugging, and type safety</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1">Maintainability</h4>
                    <p className="text-sm text-slate-600">Modular architecture with easier updates</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp className="w-7 h-7 text-blue-600" />
            <h2 className="text-3xl font-bold text-slate-900">Summary of Improvements</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {improvements.map((improvement, index) => {
              const Icon = improvement.icon;
              return (
                <div
                  key={index}
                  className="bg-gradient-to-br from-white to-slate-50 rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-blue-600">{improvement.stat}</div>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">{improvement.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{improvement.description}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-8 text-white shadow-lg">
            <div className="flex justify-between items-center gap-4">
              {/* <div/ className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0 backdrop-blur-sm"> */}
              {/* </div> */}
              {/* <div className='flex items-center mx-2'>
                <CheckCircle2 className="w-6 h-6" />

              </div> */}
                <h3 className="text-2xl font-bold mb-2">Migration Complete Download ZIP</h3>
              <button className="w-full sm:w-auto bg-transparent text-white px-8 py-4 rounded-xl border-2 border-white hover:bg-white hover:text-blue-600 transition-all font-semibold text-lg">
                Download ZIP
              </button>
            </div>
          </div>
        </section>

        <footer className="mt-16 pt-8 border-t border-slate-200 text-center text-slate-600 text-sm">
          <p>Technical Migration Case Study · {new Date().getFullYear()}</p>
        </footer>
      </div>
    </div>
  );
}

export default migrationUI;
