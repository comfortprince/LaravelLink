import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="min-h-screen bg-gray-100 pt-6 sm:pt-0 dark:bg-gray-900">
            <div className='flex flex-col items-center'>
                <div className='my-4'>
                    <Link href="/">
                        <ApplicationLogo className="h-20 w-20 fill-current text-gray-500" />
                    </Link>
                </div>

                <div className='md:w-[34rem]'>
                    {children}
                </div>
            </div>
        </div>
    );
}
