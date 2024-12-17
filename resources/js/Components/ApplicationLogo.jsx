export default function ApplicationLogo(props) {
    return (
        <svg
            {...props} 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 100 100" 
            width="100" 
            height="100">
             {/* Hexagon */}
            <polygon points="50,5 90,25 90,75 50,95 10,75 10,25" fill="#1f2937" />
            {/* fill="#FF2D20" */}
            
            {/* Interlinking chain concept */}
            <circle cx="35" cy="50" r="10" stroke="#FFFFFF" strokeWidth="3" fill="none" />
            <circle cx="65" cy="50" r="10" stroke="#FFFFFF" strokeWidth="3" fill="none" />
            <line x1="40" y1="50" x2="60" y2="50" stroke="#FFFFFF" strokeWidth="3" />
        </svg>
    );
}
