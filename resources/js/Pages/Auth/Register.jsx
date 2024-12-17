
import GuestLayout from '@/Layouts/GuestLayout';
import RoleSelectionCard from '@/Pages/Auth/Components/RoleSelectionCard';
import RegistrationForm from '@/Pages/Auth/Components/RegistrationForm';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

export default function Register({
    roles
}) {
    const [selectedRole, setSelectedRole] = useState(null);

    return (
        <GuestLayout>
            <Head title="Register" />

            <div className={`flex justify-center ${selectedRole !== null && 'hidden'}`}>
                <RoleSelectionCard 
                    setSelectedRole = {setSelectedRole}
                    roles = {roles}
                    className='max-md:m-4'
                />
            </div>

            <RegistrationForm 
                selectedRole={selectedRole}
                className={`bg-white rounded-lg p-4 md:p-6 max-md:mx-4 mb-8 ${selectedRole === null && 'hidden'}`}
            />
        </GuestLayout>
    );
}
