import { motion } from 'framer-motion';

interface SearchInputProps {
  focused: boolean;
  isLight: boolean;
  placeholder: string;
  query: string;
  inputRef: React.RefObject<HTMLInputElement | null>;
  onBlur: () => void;
  onChange: (value: string) => void;
  onClear: () => void;
  onFocus: () => void;
}

export default function SearchInput({ focused, inputRef, isLight, onBlur, onChange, onClear, onFocus, placeholder, query }: SearchInputProps) {
  return (
    <div className="relative mb-6" style={{ maxWidth: 640 }}>
      <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 15.803 7.5 7.5 0 0015.803 15.803z" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </div>
      <input aria-label="search" autoFocus className="w-full pl-12 pr-10 py-3.5 rounded-2xl text-sm outline-none transition-all" onBlur={onBlur} onChange={(event) => onChange(event.target.value)} onFocus={onFocus} placeholder={placeholder} ref={inputRef} style={{ background: isLight ? 'rgba(255,255,255,0.82)' : 'rgba(255,255,255,0.06)', color: isLight ? '#0f172a' : '#ffffff', border: `1px solid ${focused ? 'rgba(0,229,186,0.5)' : isLight ? 'rgba(15,23,42,0.08)' : 'rgba(255,255,255,0.08)'}`, boxShadow: focused ? '0 0 0 3px rgba(0,229,186,0.08)' : isLight ? '0 16px 30px rgba(15,23,42,0.05)' : 'none' }} type="search" value={query} />
      {query && <button aria-label="clear" className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors" onClick={onClear} style={{ color: isLight ? '#64748b' : '#9ca3af' }}><svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" /></svg></button>}
    </div>
  );
}


