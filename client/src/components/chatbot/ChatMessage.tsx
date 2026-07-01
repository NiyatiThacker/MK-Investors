import { motion } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
import { CheckCheck, Bot } from 'lucide-react'
import { Link } from 'react-router-dom'

interface ChatMessageProps {
  role: 'user' | 'model'
  content: string
  timestamp?: string
}

export default function ChatMessage({ role, content, timestamp }: ChatMessageProps) {
  const isUser = role === 'user'

  // Look for potential action pills in the message (e.g. Yes, show me | Tell me more)
  const showMockActions = !isUser && content.includes("Would you like personalized")

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-5 group`}
    >
      {!isUser && (
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shrink-0 mr-3 mt-1 shadow-sm border border-slate-200">
           <Bot size={18} className="text-white" />
        </div>
      )}
      
      <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} max-w-[85%]`}>
        <div
          className={`px-5 py-3.5 rounded-3xl text-[15px] leading-relaxed shadow-sm ${
            isUser
               ? 'bg-blue-600 text-white rounded-tr-sm'
               : 'bg-white border border-slate-200/60 text-slate-700 rounded-tl-sm'
          }`}
        >
          <div className={`prose prose-sm max-w-none ${isUser ? 'prose-invert !text-white' : 'text-slate-700'}`}>
            <ReactMarkdown 
              components={{
                p: ({node, ...props}) => <p className={`mb-3 last:mb-0 ${isUser ? '!text-white' : ''}`} {...props} />,
                a: ({node, href, ...props}) => {
                  const isInternal = href && href.startsWith('/')
                  if (isInternal) {
                    return (
                      <Link 
                        to={href} 
                        className={`${isUser ? 'text-blue-100' : 'text-blue-600'} hover:underline font-medium`} 
                        {...props} 
                      />
                    )
                  }
                  return (
                    <a 
                      href={href} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className={`${isUser ? 'text-blue-100' : 'text-blue-600'} hover:underline font-medium`} 
                      {...props} 
                    />
                  )
                },
                strong: ({node, ...props}) => <strong className={`font-semibold ${isUser ? '!text-white' : 'text-slate-900'}`} {...props} />,
                code: ({node, inline, ...props}: any) => (
                  inline 
                    ? <code className={`${isUser ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-800'} rounded px-1.5 py-0.5 text-xs font-mono`} {...props} />
                    : <code className="block bg-slate-800 text-slate-50 p-3 rounded-xl my-3 text-xs overflow-x-auto font-mono" {...props} />
                )
              }}
            >
              {content}
            </ReactMarkdown>
          </div>
        </div>

        {/* Action Pills Mockup */}
        {showMockActions && (
          <div className="flex gap-2 mt-3 w-full">
            <button className="flex-1 py-2 px-3 rounded-xl bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold hover:bg-blue-100 transition-colors shadow-sm">
              Yes, show me
            </button>
            <button className="flex-1 py-2 px-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 text-xs font-semibold hover:bg-slate-100 transition-colors shadow-sm">
              Tell me more
            </button>
          </div>
        )}

        {/* Timestamp & Read Receipt */}
        {timestamp && (
          <div className={`flex items-center gap-1.5 mt-1.5 text-[10px] font-medium text-slate-400 ${isUser ? 'mr-1' : 'ml-1'}`}>
            <span>{timestamp}</span>
            {isUser && <CheckCheck size={14} className="text-blue-500" />}
          </div>
        )}
      </div>
    </motion.div>
  )
}
