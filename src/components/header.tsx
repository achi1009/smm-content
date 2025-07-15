import { Rocket } from "lucide-react";

export function Header() {
  return (
    <header className="bg-black border-b p-4 flex items-center gap-3 shadow-sm sticky top-0 z-10">
      <div className="bg-[#FDB7EA] text-primary-foreground p-2 rounded-lg">
        <Rocket className="w-6 h-6" />
      </div>
      <div>
        <h1 className="text-xl md:text-2xl font-bold font-headline text-white">
          ContentGen AI
        </h1>
        <p className="text-sm text-muted-foreground hidden md:block text-white">
          Your AI-powered content strategy partner.
        </p>
      </div>
    </header>
  );
}
