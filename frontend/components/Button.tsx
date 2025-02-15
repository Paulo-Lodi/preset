interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "accent";
}

export const Button: React.FC<ButtonProps> = ({ variant = "primary", className, children, ...Props}) => {
    const baseStyles = "px-4 py-2 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-offset-2";
    const variants = {
        primary: "bg-primary text-white hover:bg-blue-700",
        secondary: "bg-secondary text-white hover:bg-gray-700",
        accent: "bg-accent text-white hover:bg-green-700",
    };

    return (
        <button className={`${baseStyles} ${variants[variant]} ${className}`} {...Props}>
            {children}
        </button>
    )
}