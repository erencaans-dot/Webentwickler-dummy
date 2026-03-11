import React from "react";
import { Lock } from "lucide-react";
import Link from "next/link";

export type FormDisclaimerType = "reservation" | "inquiry" | "contact";

interface FormDisclaimerProps {
    type?: FormDisclaimerType;
}

export const FormDisclaimer: React.FC<FormDisclaimerProps> = ({ type = "inquiry" }) => {
    const getPrefixText = () => {
        switch (type) {
            case "reservation":
                return "Deine Reservierungsanfrage ist völlig unverbindlich und kostenfrei.";
            case "contact":
                return "Deine Kontaktaufnahme ist völlig unverbindlich und kostenfrei.";
            case "inquiry":
            default:
                return "Deine Anfrage ist vollkommen unverbindlich und kostenfrei.";
        }
    };

    return (
        <p className="text-[11px] text-zinc-500 text-center mt-3 max-w-sm mx-auto leading-tight">
            <Lock className="w-3 h-3 inline-block mr-1 opacity-70 mb-[2px]" />
            {getPrefixText()} Mit dem Absenden erklärst du dich mit der Verarbeitung deiner Daten gemäß unserer{" "}
            <Link href="#" className="underline hover:text-zinc-400 transition-colors">
                Datenschutzerklärung
            </Link>{" "}
            einverstanden.
        </p>
    );
};
