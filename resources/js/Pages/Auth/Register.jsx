
import GuestLayout from '@/Layouts/GuestLayout';
import RoleSelectionCard from '@/Pages/Auth/Components/RoleSelectionCard';
import RegistrationForm from '@/Pages/Auth/Components/RegistrationForm';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

export default function Register() {
    const [selectedRole, setSelectedRole] = useState('');

    return (
        <GuestLayout>
            <Head title="Register" />

            <div className={`flex justify-center ${selectedRole !== '' && 'hidden'}`}>
                <RoleSelectionCard 
                    setSelectedRole = {setSelectedRole}
                    className='max-md:m-4'
                />
            </div>

            <RegistrationForm 
                selectedRole={selectedRole}
                className={`bg-white rounded-lg p-4 md:p-6 max-md:mx-4 mb-8 ${selectedRole === '' && 'hidden'}`}
            />
        </GuestLayout>
    );
}
