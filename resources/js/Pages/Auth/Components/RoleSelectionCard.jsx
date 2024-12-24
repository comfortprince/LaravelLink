import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';

export default function RoleSelectionCard({
    className='',
    setSelectedRole,
    roles
}) {
    return (
        <div
            className={`bg-white md:mt-6 p-6 rounded-lg shadow-md w-full max-w-md ${className}`}
        >
            <h1 className="text-xl font-bold text-gray-800 text-center mb-4">Welcome to LaravelLink</h1>
            <p className="text-base font-normal text-gray-600 text-center mb-4">Are you joining as a client or a freelancer?</p>
            
            <div className="flex flex-col sm:flex-row gap-4">
                {/* Client Button */}
                <PrimaryButton 
                    className='w-full justify-center'
                    onClick={()=>{setSelectedRole(()=>{
                        const role = roles.find(role => role.name === 'client');
                        return role;
                    })}}    
                >
                    Join as Client
                </PrimaryButton>

                {/* Freelancer Button */}
                <SecondaryButton 
                    className='w-full justify-center'
                    onClick={()=>{setSelectedRole(()=>{
                        const role = roles.find(role => role.name === 'client');
                        return role;
                    })}}
                >
                    Join as Freelancer
                </SecondaryButton>
            </div>
        </div>
    );
}