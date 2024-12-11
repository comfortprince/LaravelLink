import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="grid place-items-center min-h-screen bg-gray-100 pt-6 sm:pt-0 dark:bg-gray-900">
            <div>
                <div className='flex justify-center mb-4'>
                    <Link href="/">
                        <ApplicationLogo className="h-20 w-20 fill-current text-gray-500" />
                    </Link>
                </div>

                <div className='mx-4'>
                    {children}
                </div>
            </div>
        </div>
    );
}
