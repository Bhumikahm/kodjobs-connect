
import * as React from "react"
import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    // Convert undefined values to empty strings to prevent object serialization issues
    const safeProps = { ...props };
    
    // Ensure value is a string, not an object
    if (safeProps.value !== null && typeof safeProps.value === 'object') {
      safeProps.value = '';
    }
    
    // Add specific handling for file inputs
    if (type === 'file') {
      const originalOnChange = safeProps.onChange;
      
      safeProps.onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // Make sure files are properly handled
        if (event.target.files && event.target.files.length > 0) {
          console.log("File selected:", event.target.files[0].name);
        }
        
        // Preserve the original onChange handler
        if (originalOnChange) {
          originalOnChange(event);
        }
      };
    }
    
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        ref={ref}
        {...safeProps}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
