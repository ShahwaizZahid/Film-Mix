import { LoaderPinwheel } from "lucide-react";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function LoadingSpinner({ size = "md", className = "" }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8", 
    lg: "w-12 h-12"
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <LoaderPinwheel className={`animate-spin text-purple-500 ${sizeClasses[size]}`} />
    </div>
  );
}

export function PageLoadingSpinner() {
  return (
    <div className="flex min-h-[200px] justify-center items-center">
      <LoadingSpinner size="lg" />
    </div>
  );
}
