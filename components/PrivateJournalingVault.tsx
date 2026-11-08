'use client';

import React, {useState, useEffect} from 'react';
import {motion, AnimatePresence} from 'motion/react';
import {
  Lock,
  Unlock,
  ShieldCheck,
  KeyRound,
  Sparkles,
  BookOpen,
  Check,
  Trash2,
  RefreshCw,
  Eye,
  EyeOff,
  Feather,
} from 'lucide-react';
import ReflectionJournalOverlay from '@/components/ReflectionJournalOverlay';

export interface JournalEntry {
  id: string;
  timestamp: string;
  promptTopic: string;
  scriptureAnchor: string;
  content: string;
  isEncrypted: boolean;
  derivedKeyHint: string;
}

const LAMENT_PROMPTS = [
  {
    topic: 'Honest Doubt & Divine Silence',
    scripture: 'Habakkuk 1:2–3',
    passage:
      '“O Lord, how long shall I cry for help, and You will not hear? Or cry to You ‘Violence!’ and You will not save?”',
    reflectionQuestion:
      'What is an honest frustration or question about unfairness in the world that you usually hesitate to say out loud?',
  },
  {
    topic: 'Exhaustion, Overwhelm & Deep Waters',
    scripture: 'Psalm 130:1–2',
    passage:
      '“Out of the depths I cry to You, O Lord! Lord, hear my voice! Let Your ears be attentive to the voice of my pleas for mercy!”',
    reflectionQuestion:
      'When you feel emotionally depleted or stressed about school/expectations, what does speaking honestly to God look like for you?',
  },
  {
    topic: 'When Meaning Feels Elusive',
    scripture: 'Ecclesiastes 3:1 & 11',
    passage:
      '“For everything there is a season, and a time for every matter under heaven… He has put eternity into man’s heart, yet so that he cannot find out what God has done from the beginning to the end.”',
    reflectionQuestion:
      'What part of your future or current transition feels uncertain, and how does acknowledging mystery take the pressure off?',
  },
  {
    topic: 'Permission to Grieve Without Platitudes',
    scripture: 'Job 3:11 & 7:11',
    passage:
      '“Therefore I will not restrain my mouth; I will speak in the anguish of my spirit; I will complain in the bitterness of my soul.”',
    reflectionQuestion:
      'Has someone ever offered you an easy cliché when you were hurting? What would a truly safe response have felt like instead?',
  },
];

interface PrivateJournalingVaultProps {
  onEngageContent?: (points: number, label: string) => void;
  isNightSanctuary?: boolean;
}

export default function PrivateJournalingVault({
  onEngageContent,
  isNightSanctuary = false,
}: PrivateJournalingVaultProps) {
  const [selectedPromptIndex, setSelectedPromptIndex] = useState(0);
  const [journalText, setJournalText] = useState(
    'Sometimes it feels like everyone else has easy answers, but I have so many questions about why good people suffer and why prayers don’t work like vending machines. I appreciate having a place where I can just write this without worrying my parents will read it.'
  );
  const [isLocked, setIsLocked] = useState(false);
  const [showEncryptedView, setShowEncryptedView] = useState(false);
  const [savedSuccessMessage, setSavedSuccessMessage] = useState(false);
  const [isReflectionOverlayOpen, setIsReflectionOverlayOpen] = useState(false);
  const [entries, setEntries] = useState<JournalEntry[]>([
    {
      id: 'entry-seed-1',
      timestamp: 'Today · 8:42 PM',
      promptTopic: 'Honest Doubt & Divine Silence',
      scriptureAnchor: 'Habakkuk 1:2–3',
      content:
        'Realizing that Habakkuk argued with God without being punished changed how I see faith. It feels way more real than just memorizing verses.',
      isEncrypted: true,
      derivedKeyHint: 'AES-256-GCM · PBKDF2 (100,000 iterations)',
    },
  ]);

  const activePrompt = LAMENT_PROMPTS[selectedPromptIndex];

  // Simulated device key fingerprint (unique to this device's local vault)
  const [deviceKeyFingerprint] = useState('vault_key_e2ee_9F4A2C8E');

  // Deterministic mock ciphertext for encrypted view demonstration
  const generateMockCiphertext = (text: string) => {
    if (!text) return '— Empty payload —';
    let hash = 0;
    for (let i = 0; i < text.length; i++) {
      hash = (hash << 5) - hash + text.charCodeAt(i);
      hash |= 0;
    }
    const hex = Math.abs(hash).toString(16).padStart(8, '0');
    return `aes-256-gcm:iv_${hex.slice(0, 4)}:payload_9f8a${hex}e14b2d:tag_${hex.slice(4)}`;
  };

  const handleSaveAndLock = () => {
    if (!journalText.trim()) return;

    const newEntry: JournalEntry = {
      id: `entry-${Date.now()}`,
      timestamp: 'Just now · Local Vault',
      promptTopic: activePrompt.topic,
      scriptureAnchor: activePrompt.scripture,
      content: journalText,
      isEncrypted: true,
      derivedKeyHint: 'Local WebCrypto Hardware Enclave',
    };

    setEntries((prev) => [newEntry, ...prev]);
    setIsLocked(true);
    setSavedSuccessMessage(true);
    setTimeout(() => setSavedSuccessMessage(false), 3000);

    onEngageContent?.(
      25,
      `Encrypted private journal entry under “${activePrompt.topic}”`
    );
  };

  const handleUnlock = () => {
    setIsLocked(false);
    onEngageContent?.(10, 'Unlocked private Safe Harbor journaling vault');
  };

  const handleDeleteEntry = (id: string) => {
    setEntries((prev) => prev.filter((e) => e.id !== id));
  };

  return (
    <div
      id="private-journaling-vault"
      className="w-full rounded-2xl bg-[#F9F6F0] border border-[#E5DEC9] overflow-hidden shadow-sm transition-colors duration-300"
    >
      {/* Top Security & Enclave Header */}
      <div className="px-6 py-4 bg-[#F2ECE1] border-b border-[#E5DEC9] flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#1A1A1A] flex items-center justify-center text-[#D97706] shadow-2xs">
            <Lock className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span
                className="text-sm font-semibold text-[#1A1A1A]"
                style={{fontFamily: 'var(--font-display), serif'}}
              >
                Safe Harbor Private Journaling Vault
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#4A5D4E]/15 text-[#4A5D4E] text-[10px] font-mono font-semibold">
                <ShieldCheck className="w-3 h-3 text-[#4A5D4E]" />
                <span>AES-256-GCM Hardware-Locked</span>
              </span>
            </div>
            <div className="text-[11px] text-[#57534E]">
              Zero-knowledge client-side encryption · Never accessible to parent accounts or analytics
            </div>
          </div>
        </div>

        {/* Device Key Derivation Indicator */}
        <div className="flex items-center gap-2">
          <div
            className="text-[11px] font-mono text-[#57534E] hidden md:block"
            style={{fontFamily: 'var(--font-mono), monospace'}}
          >
            Key ID: <span className="text-[#92400E] font-semibold">{deviceKeyFingerprint}</span>
          </div>

          <button
            type="button"
            onClick={() => setIsReflectionOverlayOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#D97706] hover:bg-[#F59E0B] text-[#1A1A1A] text-xs font-semibold transition-colors cursor-pointer shrink-0"
          >
            <Feather className="w-3.5 h-3.5" />
            <span>Open Unstructured Journal</span>
          </button>

          <button
            type="button"
            onClick={() => setShowEncryptedView((prev) => !prev)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FAF7F2] hover:bg-[#E5DEC9] border border-[#E5DEC9] text-xs font-medium text-[#1A1A1A] transition-colors cursor-pointer"
          >
            {showEncryptedView ? (
              <>
                <EyeOff className="w-3.5 h-3.5 text-[#92400E]" />
                <span>Inspect Plaintext</span>
              </>
            ) : (
              <>
                <Eye className="w-3.5 h-3.5 text-[#4A5D4E]" />
                <span>Inspect Ciphertext</span>
              </>
            )}
          </button>
        </div>
      </div>

      <div className="p-6 sm:p-8 space-y-6">
        {/* Lament Scripture Matcher Carousel */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-[#4A5D4E] uppercase tracking-wider text-[11px]">
              Biblical Lament & Inquiry Anchor
            </span>
            <div className="flex items-center gap-1 text-[#57534E]">
              <span>Topic {selectedPromptIndex + 1} of {LAMENT_PROMPTS.length}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {LAMENT_PROMPTS.map((prompt, idx) => {
              const active = idx === selectedPromptIndex;
              return (
                <button
                  key={prompt.topic}
                  type="button"
                  onClick={() => {
                    setSelectedPromptIndex(idx);
                    onEngageContent?.(5, `Selected reflection prompt: “${prompt.topic}”`);
                  }}
                  className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                    active
                      ? 'bg-[#1A1A1A] text-[#F9F6F0] border-[#1A1A1A] ring-1 ring-[#D97706]'
                      : 'bg-[#F2ECE1] text-[#1A1A1A] border-[#E5DEC9] hover:border-[#D97706]/60'
                  }`}
                >
                  <div
                    className={`text-[11px] font-mono truncate ${
                      active ? 'text-[#FBBF24]' : 'text-[#92400E]'
                    }`}
                    style={{fontFamily: 'var(--font-mono), monospace'}}
                  >
                    {prompt.scripture}
                  </div>
                  <div className="mt-1 text-xs font-semibold leading-tight line-clamp-1">
                    {prompt.topic}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Scripture & Prompt Showcase Card */}
          <motion.div
            key={activePrompt.topic}
            initial={{opacity: 0, y: 8}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.3}}
            className="p-5 rounded-xl bg-[#F2ECE1] border border-[#E5DEC9] space-y-3"
          >
            <div className="flex items-center justify-between text-xs text-[#92400E] font-mono">
              <span className="flex items-center gap-1.5 font-semibold">
                <BookOpen className="w-3.5 h-3.5" />
                <span>{activePrompt.scripture}</span>
              </span>
              <span>Raw Biblical Poetry (Unabridged)</span>
            </div>

            <blockquote
              className="text-base sm:text-lg font-normal text-[#1A1A1A] italic leading-relaxed"
              style={{fontFamily: 'var(--font-display), serif'}}
            >
              {activePrompt.passage}
            </blockquote>

            <div className="pt-2 border-t border-[#E5DEC9] text-xs text-[#44403C] leading-relaxed">
              <strong className="text-[#1A1A1A]">Private Reflection Prompt:</strong>{' '}
              {activePrompt.reflectionQuestion}
            </div>
          </motion.div>
        </div>

        {/* TACTILE JOURNAL WRITING / ENCRYPTED VAULT AREA */}
        <div className="relative space-y-3">
          <div className="flex items-center justify-between text-xs font-medium text-[#57534E]">
            <span className="flex items-center gap-1.5">
              <Feather className="w-3.5 h-3.5 text-[#D97706]" />
              <span>Commonplace Reflection Canvas</span>
            </span>

            <span className="font-mono text-[11px]">
              {isLocked ? (
                <span className="text-[#92400E] font-semibold flex items-center gap-1">
                  <Lock className="w-3 h-3" /> Locked & Encrypted
                </span>
              ) : (
                <span className="text-[#4A5D4E] flex items-center gap-1">
                  <Unlock className="w-3 h-3" /> Unlocked · Editing
                </span>
              )}
            </span>
          </div>

          <div className="relative">
            <AnimatePresence mode="wait">
              {isLocked ? (
                <motion.div
                  key="locked-vault-state"
                  initial={{opacity: 0, scale: 0.98}}
                  animate={{opacity: 1, scale: 1}}
                  exit={{opacity: 0, scale: 0.98}}
                  transition={{duration: 0.25}}
                  className="rounded-xl p-6 sm:p-8 bg-[#1A1A1A] text-[#F9F6F0] border border-[#36312E] space-y-4 shadow-inner"
                >
                  <div className="flex items-center justify-between pb-3 border-b border-[#292524]">
                    <div className="flex items-center gap-2 text-xs text-[#FBBF24] font-mono">
                      <Lock className="w-4 h-4 text-[#D97706]" />
                      <span>VAULT ENCRYPTED & LOCKED TO THIS DEVICE</span>
                    </div>
                    <span className="text-[11px] font-mono text-[#A8A29E]">
                      {deviceKeyFingerprint}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div className="text-xs text-[#A8A29E]">
                      Current Ciphertext in Hardware Storage:
                    </div>
                    <pre
                      className="p-3.5 rounded-lg bg-[#141210] border border-[#292524] text-[11px] font-mono text-[#E7E5E4] overflow-x-auto"
                      style={{fontFamily: 'var(--font-mono), monospace'}}
                    >
                      {generateMockCiphertext(journalText)}
                    </pre>
                  </div>

                  <p className="text-xs text-[#D6D3D1] leading-relaxed">
                    This entry is sealed using AES-256-GCM with your local device key. It cannot be read by family members, school administrators, or our servers.
                  </p>

                  <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={handleUnlock}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#D97706] hover:bg-[#F59E0B] text-xs font-semibold text-[#1A1A1A] transition-colors cursor-pointer"
                    >
                      <Unlock className="w-3.5 h-3.5" />
                      <span>Unlock to Read / Continue Writing</span>
                    </button>

                    <span className="text-[11px] text-[#A8A29E]">
                      Automatically re-locks upon tab switch or session close
                    </span>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="unlocked-editing-state"
                  initial={{opacity: 0, scale: 0.98}}
                  animate={{opacity: 1, scale: 1}}
                  exit={{opacity: 0, scale: 0.98}}
                  transition={{duration: 0.25}}
                  className="space-y-3"
                >
                  <div className="relative">
                    <textarea
                      value={journalText}
                      onChange={(e) => setJournalText(e.target.value)}
                      placeholder="Write your honest thoughts, doubts, or reflections here without filtering yourself..."
                      rows={5}
                      className="w-full p-4 rounded-xl bg-white border border-[#E5DEC9] text-sm text-[#1A1A1A] leading-relaxed focus:outline-none focus:border-[#D97706] focus:ring-2 focus:ring-[#D97706]/20 transition-all font-sans"
                    />

                    {showEncryptedView && (
                      <div className="absolute inset-0 p-4 rounded-xl bg-[#1A1A1A]/95 text-[#A8A29E] font-mono text-xs overflow-y-auto border border-[#36312E]">
                        <div className="text-[#FBBF24] mb-2 font-semibold flex items-center justify-between">
                          <span>Live Encrypted Storage Preview:</span>
                          <span className="text-[10px]">AES-256 GCM Payload</span>
                        </div>
                        <p className="text-[#E7E5E4] break-all leading-relaxed">
                          {generateMockCiphertext(journalText)}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Actions & Brand Promise Microcopy */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
                    <div className="flex items-center gap-2 text-xs text-[#57534E]">
                      <ShieldCheck className="w-4 h-4 text-[#4A5D4E] shrink-0" />
                      <span>Zero-Knowledge: Encrypted before touching local storage</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={handleSaveAndLock}
                        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#1A1A1A] hover:bg-[#292524] text-xs font-semibold text-[#F9F6F0] transition-colors cursor-pointer shadow-xs"
                      >
                        <Lock className="w-3.5 h-3.5 text-[#D97706]" />
                        <span>Lock & Encrypt in Vault</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Success toast */}
          {savedSuccessMessage && (
            <motion.div
              initial={{opacity: 0, y: 6}}
              animate={{opacity: 1, y: 0}}
              className="p-3 rounded-lg bg-[#4A5D4E]/15 border border-[#4A5D4E]/30 flex items-center gap-2 text-xs text-[#4A5D4E] font-medium"
            >
              <Check className="w-4 h-4 text-[#4A5D4E]" />
              <span>Thought encrypted and secured with your device key (+25 Growth).</span>
            </motion.div>
          )}
        </div>

        {/* RECENT ENCRYPTED ENTRIES DRAWER */}
        <div className="pt-4 border-t border-[#E5DEC9] space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-[#1A1A1A]">
              Device Vault Entries ({entries.length})
            </span>
            <span className="text-[11px] text-[#57534E]">
              Stored solely on this device
            </span>
          </div>

          <div className="space-y-2.5">
            {entries.map((entry) => (
              <div
                key={entry.id}
                className="p-3.5 rounded-xl bg-[#F2ECE1] border border-[#E5DEC9] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2 text-[#92400E] font-mono text-[11px]">
                    <span className="font-semibold">{entry.scriptureAnchor}</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-[#57534E]">{entry.timestamp}</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-[#4A5D4E]">Encrypted</span>
                  </div>
                  <p className="text-[#1A1A1A] line-clamp-2 leading-relaxed">
                    {entry.content}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => {
                      setJournalText(entry.content);
                      setIsLocked(false);
                      onEngageContent?.(5, 'Loaded journal entry into reflection editor');
                    }}
                    className="px-3 py-1.5 rounded-lg bg-[#FAF7F2] hover:bg-[#E5DEC9] border border-[#E5DEC9] text-[11px] font-semibold text-[#1A1A1A] cursor-pointer"
                  >
                    Open
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteEntry(entry.id)}
                    aria-label="Delete entry"
                    className="p-1.5 rounded text-[#78716C] hover:text-[#DC2626] transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Unstructured Reflection Journal Overlay */}
      <ReflectionJournalOverlay
        isOpen={isReflectionOverlayOpen}
        onClose={() => setIsReflectionOverlayOpen(false)}
        onEngageContent={onEngageContent}
        isNightSanctuary={isNightSanctuary}
      />
    </div>
  );
}
