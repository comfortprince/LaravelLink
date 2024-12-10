import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';

export default function RoleSelectionCard({
    className=''
}) {
    return (
        <div
            className={`bg-white mt-6 p-6 rounded-lg shadow-md w-full max-w-md ${className}`}
        >
            <h1 className="text-lg font-bold text-gray-800 text-center mb-4">Welcome to LaravelLink</h1>
            <p className="text-base font-normal text-gray-600 text-center mb-6">Are you joining as a client or a freelancer?</p>
            
            <div className="flex flex-col sm:flex-row gap-4">
                {/* Client Button */}
                <PrimaryButton className='w-full justify-center'>
                    Join as Client
                </PrimaryButton>

                {/* Freelancer Button */}
                <SecondaryButton className='w-full justify-center'>
                    Join as Freelancer
                </SecondaryButton>
            </div>
        </div>
    );
}