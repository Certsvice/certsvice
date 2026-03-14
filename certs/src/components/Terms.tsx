import { TranscriptEntity } from 'src/types'

type Props = {
  terms: TranscriptEntity[]
}

export default function Terms({ terms }: Props) {
  return (
    <div className="space-y-6">
      {terms.map((term, idx) => (
        <div key={idx} className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
          {/* Term header */}
          <div className="flex items-center justify-between px-5 py-3 bg-slate-50 border-b border-slate-100">
            <div>
              <p className="font-semibold text-slate-900 text-sm">{term.name}</p>
              <p className="text-xs text-slate-500">{term.semester}</p>
            </div>
            <div className="flex items-center gap-6 text-center">
              <div>
                <p className="text-lg font-bold text-blue-600">{term.gpa?.toFixed(2)}</p>
                <p className="text-xs text-slate-400">GPA</p>
              </div>
              <div>
                <p className="text-lg font-bold text-indigo-600">{term.gpax?.toFixed(2)}</p>
                <p className="text-xs text-slate-400">GPAX</p>
              </div>
              <div>
                <p className="text-lg font-bold text-slate-700">{term.creditsEarned}</p>
                <p className="text-xs text-slate-400">Credits</p>
              </div>
            </div>
          </div>

          {/* Courses table */}
          {term.course && term.course.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left">
                    <th className="px-5 py-2.5 text-xs font-semibold text-slate-400 uppercase tracking-wider">Course Code</th>
                    <th className="px-5 py-2.5 text-xs font-semibold text-slate-400 uppercase tracking-wider">Course Name</th>
                    <th className="px-5 py-2.5 text-xs font-semibold text-slate-400 uppercase tracking-wider text-center">Credit</th>
                    <th className="px-5 py-2.5 text-xs font-semibold text-slate-400 uppercase tracking-wider text-center">Grade</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {term.course.map((course, cIdx) => (
                    <tr key={cIdx} className="hover:bg-slate-50 transition-colors">
                      <td className="px-5 py-3 font-mono text-xs text-slate-600">{course.courseCode}</td>
                      <td className="px-5 py-3 text-slate-800">{course.courseName}</td>
                      <td className="px-5 py-3 text-center text-slate-600">{course.credit}</td>
                      <td className="px-5 py-3 text-center">
                        <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold ${
                          course.grade === 'A' ? 'bg-emerald-100 text-emerald-700' :
                          course.grade === 'B+' || course.grade === 'B' ? 'bg-blue-100 text-blue-700' :
                          course.grade === 'C+' || course.grade === 'C' ? 'bg-amber-100 text-amber-700' :
                          course.grade === 'D+' || course.grade === 'D' ? 'bg-orange-100 text-orange-700' :
                          course.grade === 'F' ? 'bg-red-100 text-red-600' :
                          'bg-slate-100 text-slate-600'
                        }`}>
                          {course.grade}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
