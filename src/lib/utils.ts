import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Gauge } from "lucide-react"
import React from "react"
import { toPng } from "html-to-image"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
/**
 * Exports a DOM element (chart) as a PNG image with F1 Analytics branding
 * @param elementRef - React ref to the DOM element to export
 * @param filename - Name for the downloaded file (without extension)
 */
export async function exportChartAsImage(
  elementRef: React.RefObject<HTMLElement>,
  filename: string = "f1analytics-chart"
): Promise<void> {
  if (!elementRef.current) {
    console.error("No element ref provided for chart export");
    return;
  }

  try {
    // Create a clone of the element to avoid modifying the original
    const originalElement = elementRef.current;
    
    // Wait a moment to ensure chart is fully rendered
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // Use the original element with all SVG intact rather than cloning
    // Add some custom styles just for the export
    const originalStyles = {
      position: originalElement.style.position,
      background: originalElement.style.background,
      padding: originalElement.style.padding, // Store original padding
      borderRadius: originalElement.style.borderRadius,
      overflow: originalElement.style.overflow
    };
    
    // Add export styles
    originalElement.style.background = '#111827';
    originalElement.style.borderRadius = '8px';
    originalElement.style.overflow = 'visible';
    
    // Reduce padding AND remove bottom padding specifically for height calculation
    originalElement.style.padding = '8px 8px 0px 8px'; // Top, Right, Bottom=0, Left
    
    // Fix title display for export
    const cardHeader = originalElement.querySelector('div[class*="CardHeader"]');
    const chartTitle = originalElement.querySelector('h3[class*="CardTitle"]');
    
    if (chartTitle && cardHeader) {
      // Clone the title to ensure it doesn't get affected by layout issues
      const titleText = chartTitle.textContent || '';
      
      if (titleText) {
        // Create a dedicated title element for the export
        const exportTitle = document.createElement('div');
        exportTitle.style.fontWeight = 'bold';
        exportTitle.style.fontSize = '18px';
        exportTitle.style.color = 'white';
        exportTitle.style.marginBottom = '5px'; // Minimal margin
        exportTitle.style.textAlign = 'center';
        exportTitle.style.width = '100%';
        exportTitle.style.paddingTop = '8px';
        exportTitle.textContent = titleText;
        
        // Hide the original header
        (cardHeader as HTMLElement).style.display = 'none';
        
        // Insert the new title at the top
        if (originalElement.firstChild) {
          originalElement.insertBefore(exportTitle, originalElement.firstChild);
        } else {
          originalElement.appendChild(exportTitle);
        }
      }
    }
    
    // Find the chart container and reduce top margin
    const chartContainer = originalElement.querySelector('.recharts-responsive-container');
    if (chartContainer) {
      (chartContainer as HTMLElement).style.marginTop = '0px'; // No additional margin
    }
    
    // Find any title element and ensure it doesn't overlap
    const title = originalElement.querySelector('.text-lg.font-semibold');
    if (title) {
      (title as HTMLElement).style.marginBottom = '5px'; // Minimal margin
      (title as HTMLElement).style.whiteSpace = 'nowrap';
    }
    
    // Find button container, calculate its height, and hide it
    const buttonsContainer = originalElement.querySelector('.mt-4.flex.justify-end'); // Use the class from SpeedTraceChart.tsx
    let buttonsContainerHeight = 0;
    let originalButtonContainerDisplay = '';
    if (buttonsContainer) {
      buttonsContainerHeight = (buttonsContainer as HTMLElement).offsetHeight + 16; // Get height + margin-top (mt-4 -> 1rem -> 16px)
      originalButtonContainerDisplay = (buttonsContainer as HTMLElement).style.display;
      (buttonsContainer as HTMLElement).style.display = 'none'; // Hide the container
    }
    
    // Create and add branding container (keeping previous styling)
    const brandingDiv = document.createElement('div');
    brandingDiv.style.position = 'absolute';
    brandingDiv.style.bottom = '10px'; // Position near bottom
    brandingDiv.style.right = '15px';
    brandingDiv.style.display = 'flex';
    brandingDiv.style.alignItems = 'center';
    brandingDiv.style.gap = '5px';
    brandingDiv.style.fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif';
    brandingDiv.style.fontSize = '14px';
    brandingDiv.style.letterSpacing = '-0.02em';
    brandingDiv.style.color = 'white';
    brandingDiv.style.backgroundColor = 'rgba(0, 0, 0, 0.65)';
    brandingDiv.style.padding = '4px 8px';
    brandingDiv.style.borderRadius = '4px';
    brandingDiv.style.zIndex = '9999';

    const gaugeIcon = document.createElement('span');
    gaugeIcon.innerHTML = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="16" height="16" fill="#eb4546">
  <path d="M256.004,0C114.613,0,0.001,114.613,0.001,256.004C0.001,397.387,114.613,512,256.004,512 
           c141.383,0,255.996-114.613,255.996-255.996C511.999,114.613,397.387,0,256.004,0z 
           M256.004,419.18 c-90.128,0-163.185-73.048-163.185-163.176S165.876,92.82,256.004,92.82 
           c90.12,0,163.176,73.057,163.176,163.185S346.124,419.18,256.004,419.18z"/>
  <path d="M256.004,271.78c8.718,0,15.776-7.058,15.776-15.776c0-8.718-7.058-15.784-15.776-15.784 
           c-8.725,0-15.784,7.066-15.784,15.784C240.219,264.722,247.279,271.78,256.004,271.78z"/>
  <path d="M150.727,196.65c1.108,2.954,3.495,5.239,6.5,6.212l56.239,18.289c5.239,1.684,10.977,0.787,15.429-2.446 
           c4.444-3.25,7.092-8.421,7.092-13.923v-59.1c0-3.148-1.446-6.136-3.927-8.082c-2.471-1.972-5.704-2.683-8.768-1.972 
           c0,0,0.838-0.634-4.85,1.152c-26.541,8.37-49.283,25.34-64.898,47.666c-3.216,4.587-1.98,3.275-1.98,3.275 
           C149.948,190.404,149.644,193.688,150.727,196.65z"/>
  <path d="M212.147,270.265c-1.701-5.248-5.807-9.361-11.045-11.045l-56.215-18.264 
           c-2.996-0.973-6.271-0.516-8.895,1.218c-2.624,1.752-4.308,4.604-4.579,7.752c0,0-0.338-0.998-0.398,4.96 
           c-0.254,27.828,8.87,54.683,25.273,76.451c3.368,4.469,2.488,2.886,2.488,2.886c2.073,2.378,5.103,3.682,8.235,3.554 
           c3.156-0.127,6.076-1.684,7.921-4.24l34.768-47.861C212.933,281.234,213.839,275.487,212.147,270.265z"/>
  <path d="M269.927,309.206c-3.25-4.443-8.422-7.084-13.923-7.084c-5.509,0-10.681,2.641-13.906,7.084l-34.75,47.81 
           c-1.845,2.547-2.438,5.814-1.575,8.861c0.838,3.038,3.03,5.51,5.95,6.738c0,0-1.066,0.025,4.596,1.921 
           c26.389,8.844,54.75,8.454,80.505-0.424c5.289-1.819,3.52-1.473,3.52-1.473c2.912-1.218,5.095-3.706,5.933-6.736 
           c0.846-3.047,0.245-6.297-1.6-8.845L269.927,309.206z"/>
  <path d="M367.155,240.939l-56.248,18.281c-5.23,1.684-9.352,5.797-11.037,11.045 
           c-1.709,5.222-0.804,10.968,2.446,15.403l34.726,47.819c1.862,2.564,4.782,4.096,7.938,4.249c3.149,0.135,6.178-1.194,8.235-3.58 
           c0,0-0.304,1.007,3.241-3.775c16.564-22.368,24.984-49.478,24.502-76.705c-0.094-5.586-0.33-3.792-0.33-3.792 
           c-0.271-3.148-1.946-6-4.578-7.735C373.426,240.423,370.16,239.957,367.155,240.939z"/>
  <path d="M283.112,218.706c4.461,3.225,10.182,4.13,15.421,2.446l56.198-18.289c3.005-0.966,5.392-3.259,6.5-6.212 
           c1.101-2.962,0.779-6.255-0.863-8.954c0,0,0.872,0.592-2.59-4.249c-16.148-22.674-39.321-39.042-65.372-47.006 
           c-5.358-1.625-3.724-0.863-3.724-0.863c-3.072-0.711-6.296,0.016-8.751,1.98c-2.48,1.938-3.919,4.926-3.919,8.066v59.152 
           C276.012,210.284,278.661,215.456,283.112,218.706z"/>
</svg>`;
    const F1Analytics = document.createElement('span');
    F1Analytics.innerHTML = '<span style="color: white; font-weight: 600; letter-spacing: -0.02em;"><span style="color: #ef4444; font-weight: 600; letter-spacing: -0.02em;">F1 Analytics</span>';
    brandingDiv.appendChild(gaugeIcon);
    brandingDiv.appendChild(F1Analytics);
    originalElement.appendChild(brandingDiv);

    // Calculate the height required, excluding hidden button container AND bottom padding
    // Add a small buffer (e.g., 5px) to ensure the bottom logo isn't cut off
    const calculatedHeight = originalElement.scrollHeight - buttonsContainerHeight + 5;
    
    // Convert to image, setting quality and resolution
    const dataUrl = await toPng(originalElement, {
      quality: 0.98,
      pixelRatio: 2,
      backgroundColor: '#111827',
      cacheBust: true,
      skipFonts: true,
      fontEmbedCSS: '',
      filter: (node) => {
        // Explicitly exclude the button container if somehow still visible
        if (buttonsContainer && node instanceof HTMLElement && node.isSameNode(buttonsContainer)) {
          return false;
        }
        return true; // Include all other nodes
      },
      width: originalElement.offsetWidth,
      height: calculatedHeight, // Use calculated height
      style: {
        transform: 'scale(1)',
        transformOrigin: 'top left'
      },
      canvasWidth: originalElement.offsetWidth,
      canvasHeight: calculatedHeight // Use calculated height
    });
    
    // Clean up - restore original styles (including original padding)
    originalElement.style.position = originalStyles.position;
    originalElement.style.background = originalStyles.background;
    originalElement.style.padding = originalStyles.padding; // Restore original padding
    originalElement.style.borderRadius = originalStyles.borderRadius;
    originalElement.style.overflow = originalStyles.overflow;
    
    // Restore button container visibility
    if (buttonsContainer) {
       (buttonsContainer as HTMLElement).style.display = originalButtonContainerDisplay; // Restore original display
    }
    
    // Remove branding
    if (originalElement.contains(brandingDiv)) {
      originalElement.removeChild(brandingDiv);
    }
    
    // Create download link
    const link = document.createElement('a');
    link.download = `${filename}.png`;
    link.href = dataUrl;
    link.click();
    
  } catch (error) {
    console.error('Error exporting chart as image:', error);
    
    // Show user-visible error alert
    if (typeof window !== 'undefined') {
      alert('Failed to export chart. Please try again later.');
    }
  }
}

// --- Tire Compound Colors ---

export const CompoundColors: Record<string, string> = {
    SOFT: '#EF4444', // Red
    MEDIUM: '#FCD34D', // Yellow
    HARD: '#FFFFFF', // White
    INTERMEDIATE: '#22C55E', // Green
    WET: '#3B82F6', // Blue
    UNKNOWN: '#9CA3AF', // Gray
    TEST: '#A78BFA', // Purple (for test compounds if ever needed)
  };
  
  export const getCompoundColor = (compound: string | undefined | null): string => {
    if (!compound) return CompoundColors.UNKNOWN;
    const upperCompound = compound.toUpperCase();
    return CompoundColors[upperCompound] || CompoundColors.UNKNOWN;
  };

// Function to format time in seconds to MM:SS.ms
export function formatTime(totalSeconds: number): string {
  if (isNaN(totalSeconds) || totalSeconds < 0) {
    return "--:--.---"; // Return placeholder for invalid input
  }

  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.floor(totalSeconds % 60);
  const milliseconds = Math.round((totalSeconds - Math.floor(totalSeconds)) * 1000);

  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(seconds).padStart(2, '0');
  const formattedMilliseconds = String(milliseconds).padStart(3, '0');

  return `${formattedMinutes}:${formattedSeconds}.${formattedMilliseconds}`;
}

// Add other utility functions if needed

