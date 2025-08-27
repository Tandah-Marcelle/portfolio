import { Target, Database, TrendingUp, Calendar, Users, AlertTriangle, Heart } from 'lucide-react';

const ProfessionalProjectSection = () => {
  const projectElements = [
    {
      title: 'Project Goal',
      icon: Target,
      content: 'Maternal High-Risk Pregnancy Identification Pipeline',
      description: 'Data pipeline to identify high-risk pregnancies across local clinics'
    },
    {
      title: 'Technical Focus',
      icon: Database,
      content: 'ETL Pipeline & Data Warehouse',
      description: 'Extract, Transform, Load processes with standardized reporting'
    },
    {
      title: 'Problem Statement',
      icon: AlertTriangle,
      content: 'Fragmented Health Data',
      description: 'Risk factors scattered across clinics without unified monitoring'
    },
    {
      title: 'Solution Impact',
      icon: Heart,
      content: 'Proactive Safety Net',
      description: 'Early identification and intervention for high-risk mothers'
    }
  ];

  const timeline = [
    {
      period: 'Phase 1 (Months 1-3)',
      goals: [
        'Data collection from 5 pilot clinics',
        'Build ETL pipeline architecture',
        'Develop data standardization protocols',
        'Create initial risk assessment algorithms'
      ]
    },
    {
      period: 'Phase 2 (Months 4-6)',
      goals: [
        'Deploy dashboard for health coordinators',
        'Implement real-time monitoring system',
        'Train regional health supervisors',
        'Scale to 15 additional clinics'
      ]
    }
  ];

  return (
    <section id="professional-project" className="py-5 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold mb-3 text-blue-900">
            Professional Project Presentation
          </h2>
          <p className="text-base text-gray-600 max-w-2xl mx-auto">
            AfricanWITS Girls In ICT 2025 - Maternal Health Data Pipeline
          </p>
        </div>

        {/* Project Title */}
        <div className="text-center mb-12">
          <div className="bg-blue-600 text-white p-6 rounded-lg max-w-3xl mx-auto">
            <h3 className="text-lg font-bold mb-2">Project Title</h3>
            <p className="text-base">"Maternal High-Risk Pregnancy Identification Pipeline"</p>
          </div>
        </div>

        {/* Core Elements */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {projectElements.map((element, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <div className="flex items-center mb-3">
                <element.icon className="text-blue-600 mr-3" size={20} />
                <h3 className="text-base font-semibold text-gray-800">{element.title}</h3>
              </div>
              <h4 className="font-medium text-blue-700 mb-2 text-sm">{element.content}</h4>
              <p className="text-gray-600 text-xs">{element.description}</p>
            </div>
          ))}
        </div>

        {/* Implementation Plan */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {timeline.map((plan, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <div className="flex items-center mb-4">
                <Calendar className="text-blue-600 mr-3" size={18} />
                <h3 className="text-base font-semibold text-gray-800">{plan.period}</h3>
              </div>
              <ul className="space-y-2">
                {plan.goals.map((goal, goalIndex) => (
                  <li key={goalIndex} className="flex items-start">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-1.5 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-700 text-xs">{goal}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Technical Architecture & Expected Outcomes */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <div className="flex items-center mb-4">
              <Database className="text-blue-600 mr-3" size={18} />
              <h3 className="text-base font-semibold text-gray-800">Technical Components</h3>
            </div>
            <ul className="space-y-2 text-xs text-gray-700">
              <li>• Data ingestion from multiple clinic systems</li>
              <li>• ETL pipeline for data standardization</li>
              <li>• Risk assessment algorithm implementation</li>
              <li>• Real-time dashboard for health coordinators</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <div className="flex items-center mb-4">
              <Users className="text-blue-600 mr-3" size={18} />
              <h3 className="text-base font-semibold text-gray-800">Expected Impact</h3>
            </div>
            <ul className="space-y-2 text-xs text-gray-700">
              <li>• Early identification of high-risk pregnancies</li>
              <li>• Improved maternal and infant health outcomes</li>
              <li>• Streamlined healthcare resource allocation</li>
              <li>• Scalable solution for regional health systems</li>
            </ul>
          </div>
        </div>

        {/* Success Metrics */}
        <div className="mt-8 bg-blue-50 p-6 rounded-lg border border-blue-200">
          <div className="flex items-center mb-4">
            <TrendingUp className="text-blue-600 mr-3" size={18} />
            <h3 className="text-base font-semibold text-gray-800">Success Metrics & Evaluation</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-medium text-blue-700 mb-2 text-sm">Technical Metrics</h4>
              <ul className="space-y-1 text-xs text-gray-700">
                <li>• 95% data accuracy rate</li>
                <li>• Real-time processing capability</li>
                <li>• 20+ clinic integration</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-blue-700 mb-2 text-sm">Health Outcomes</h4>
              <ul className="space-y-1 text-xs text-gray-700">
                <li>• 30% increase in early interventions</li>
                <li>• Reduced maternal complications</li>
                <li>• Improved care coordination</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-blue-700 mb-2 text-sm">System Performance</h4>
              <ul className="space-y-1 text-xs text-gray-700">
                <li>• Dashboard response time &lt;2s</li>
                <li>• 99.9% system uptime</li>
                <li>• Scalable architecture design</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfessionalProjectSection;