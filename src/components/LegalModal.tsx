import React from 'react';
import { X, ShieldCheck } from 'lucide-react';
import { FSIA_CONTACT } from '../data/fsiaData';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

export const LegalModal: React.FC<LegalModalProps> = ({ isOpen, onClose, title }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div
        className="relative bg-white border border-[#D4AF37]/50 rounded-md shadow-2xl max-w-2xl w-full my-8 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-[#0C1322] text-white p-5 border-b border-[#D4AF37]/30 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#D4AF37]" />
            <h3 className="text-lg font-display font-bold text-white">{title}</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-neutral-300 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 text-xs sm:text-sm text-[#475569] space-y-4 max-h-[65vh] overflow-y-auto font-sans leading-relaxed">
          {title === 'Privacy Policy' && (
            <>
              <p>
                Forever Star India Awards (&ldquo;FSIA&rdquo;) is committed to respecting your privacy regarding any information we may collect while operating our website (fsia.in) and associated application processes.
              </p>
              <h4 className="font-bold text-[#0C1322]">1. Information Collection</h4>
              <p>
                We only ask for personal information when we truly need it to provide a service to you, such as registering for national beauty pageants, submitting award nominations, or coordinating audition sessions. We collect it by fair and lawful means, with your knowledge and consent.
              </p>
              <h4 className="font-bold text-[#0C1322]">2. Data Security</h4>
              <p>
                We protect the personal data we store within commercially acceptable means to prevent loss and theft, as well as unauthorized access, disclosure, copying, use, or modification.
              </p>
              <h4 className="font-bold text-[#0C1322]">3. Contact</h4>
              <p>
                If you have questions about how we handle user data and personal information, feel free to contact us at {FSIA_CONTACT.email}.
              </p>
            </>
          )}

          {title === 'Terms & Conditions' && (
            <>
              <p>
                By accessing fsia.in or submitting an entry for any Forever Star India pageant or award program, you agree to be bound by these website Terms and Conditions and all applicable laws and regulations in India.
              </p>
              <h4 className="font-bold text-[#0C1322]">1. Class 41 Intellectual Property</h4>
              <p>
                The Star Logo and Forever Star India are trademarks registered under Class 41 with the Government of India. Unauthorized duplication, reproduction, or commercial imitation of FSIA marks is strictly prohibited.
              </p>
              <h4 className="font-bold text-[#0C1322]">2. Selection & Participation</h4>
              <p>
                All auditions, city rounds, state representations, and crowning evaluations are conducted under our transparent merit guidelines. Participants are required to maintain ethical conduct and represent their titles with decorum.
              </p>
              <h4 className="font-bold text-[#0C1322]">3. Jurisdiction</h4>
              <p>
                Any dispute relating to FSIA activities shall be subject to the exclusive jurisdiction of the courts in Jaipur, Rajasthan.
              </p>
            </>
          )}

          {title === 'Refund Policy' && (
            <>
              <p>
                Registration and nomination processing fees cover administrative assessment, preliminary jury review, audition logistics, and slot reservations across city rounds.
              </p>
              <h4 className="font-bold text-[#0C1322]">1. Registration Fees</h4>
              <p>
                Once an application is processed and the candidate profile enters jury verification or audition scheduling, registration fees are non-refundable and non-transferable, except under specific circumstances explicitly approved in writing by FSIA management.
              </p>
              <h4 className="font-bold text-[#0C1322]">2. Event Rescheduling</h4>
              <p>
                In the rare event that a city audition or finale schedule is moved due to unavoidable logistical reasons, participant slots remain automatically valid for the rescheduled dates without requiring additional charges.
              </p>
            </>
          )}
        </div>

        <div className="p-4 bg-[#FAF9F5] border-t border-neutral-200 text-right">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#0C1322] text-white text-xs font-semibold uppercase tracking-wider rounded-sm"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};
