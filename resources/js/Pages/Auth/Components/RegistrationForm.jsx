export default function RegistrationForm({
    selectedRole,
    className=''
}) {
    return (
        <div className={`${className}`}>
            { selectedRole }
        </div>    
    );
}