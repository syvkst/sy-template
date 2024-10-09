import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { LanguageToggle } from "@/components/ui/language-toggle";

function App() {
  return (
    <>
      <div className="flex flex-col">
        <ModeToggle />
        <LanguageToggle />
        <Button variant="outline">Press me!</Button>
      </div>
    </>
  );
}

export default App;
