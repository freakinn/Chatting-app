
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/providers/ThemeProvider";
import { Toggle } from "@/components/ui/toggle";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Toggle 
            pressed={theme === "dark"} 
            onPressedChange={toggleTheme}
            aria-label="Toggle theme"
            className="rounded-full h-8 w-8"
          >
            {theme === "dark" ? (
              <Moon className="h-4 w-4" />
            ) : (
              <Sun className="h-4 w-4" />
            )}
          </Toggle>
        </TooltipTrigger>
        <TooltipContent side="right">
          <p>{theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
