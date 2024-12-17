import { Link, useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import Select from '@/Components/Select';
import { useEffect, useState, useRef } from 'react';

export default function RegistrationForm({ 
    className = '',
    selectedRole
 }) {
    const [countries, setCountries] = useState(null);
    const countrySelectRef = useRef(null)
    const { data, setData, post, processing, errors } = useForm({
        roleId: '',
        firstName: '',
        surname: '',
        email: '',
        password: '',
        password_confirmation: '',
        profile_picture: null,
        country: '',
        city: '',
        website_link: '',
        bio: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    useEffect(() => {
        if (selectedRole) {
            setData('roleId', selectedRole.id)
        }
    }, [selectedRole]);

    // Fetch Country Data
    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const COUNTRIESAPI = 'https://restcountries.com/v3.1/all?fields=name';

                const countriesResponse = await fetch(COUNTRIESAPI);
                const countries = await countriesResponse.json();
                const formattedCountries = countries.map((country) => {
                    return { value: country.name.common, label: country.name.common}
                });
                formattedCountries.sort((countryA, countryB) => {
                    const nameA = countryA.value.toUpperCase();
                    const nameB = countryB.value.toUpperCase();
                    if (nameA < nameB) {
                      return -1;
                    }
                    if (nameA > nameB) {
                      return 1;
                    }
                  
                    // names must be equal
                    return 0;
                });
                setCountries(formattedCountries);
            } catch (error) {
                console.error('Error fetching countries:', error);
            }
          };
      
        fetchCountries();
    }, [])

    const clearCountrySelction = () => {
        countrySelectRef.current.clear();
        setData('country', '')
    }

    return (
        <form onSubmit={submit} className={`${className}`}>
            <div>
                <InputLabel htmlFor="firstName" value="First Name" />
                <TextInput
                    id="firstName"
                    name="firstName"
                    value={data.firstName}
                    className="mt-1 block w-full"
                    onChange={(e) => setData('firstName', e.target.value)}
                    required
                />
                <InputError message={errors.firstName} className="mt-2" />
            </div>

            <div className="mt-4">
                <InputLabel htmlFor="surname" value="Surname" />
                <TextInput
                    id="surname"
                    name="surname"
                    value={data.surname}
                    className="mt-1 block w-full"
                    onChange={(e) => setData('surname', e.target.value)}
                    required
                />
                <InputError message={errors.surname} className="mt-2" />
            </div>

            <div className="mt-4">
                <InputLabel htmlFor="email" value="Email" />
                <TextInput
                    id="email"
                    type="email"
                    name="email"
                    value={data.email}
                    className="mt-1 block w-full"
                    onChange={(e) => setData('email', e.target.value)}
                    required
                />
                <InputError message={errors.email} className="mt-2" />
            </div>

            <div className="mt-4">
                <InputLabel htmlFor="password" value="Password" />
                <TextInput
                    id="password"
                    type="password"
                    name="password"
                    value={data.password}
                    className="mt-1 block w-full"
                    onChange={(e) => setData('password', e.target.value)}
                    required
                />
                <InputError message={errors.password} className="mt-2" />
            </div>

            <div className="mt-4">
                <InputLabel htmlFor="password_confirmation" value="Confirm Password" />
                <TextInput
                    id="password_confirmation"
                    type="password"
                    name="password_confirmation"
                    value={data.password_confirmation}
                    className="mt-1 block w-full"
                    onChange={(e) => setData('password_confirmation', e.target.value)}
                    required
                />
                <InputError message={errors.password_confirmation} className="mt-2" />
            </div>

            <div className="mt-4">
                <InputLabel htmlFor="profile_picture" value="Profile Picture" />
                <input
                    id="profile_picture"
                    type="file"
                    name="profile_picture"
                    accept="image/jpeg,image/png,image/jpg,image/gif"
                    className="mt-1 block w-full"
                    onChange={(e) => setData('profile_picture', e.target.files[0])}
                    required
                />
                <InputError message={errors.profile_picture} className="mt-2" />
            </div>

            <div className="mt-4">
                <InputLabel htmlFor="country" value="Country" />
                <Select
                    options={countries}
                    onSelect={(selectedCountry => { setData('country', selectedCountry) })}
                    placeholder='Select a country..'
                    className='mt-1'
                    ref={countrySelectRef}
                />
                {data.country && (
                    <button
                        onClick={clearCountrySelction}
                        type='button'
                        className="mt-2 text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                    Clear Country Selection
                    </button>
                )}
                <InputError message={errors.country} className="mt-2" />
            </div>

            <div className="mt-4">
                <InputLabel htmlFor="city" value="City" />
                <TextInput
                    id="city"
                    name="city"
                    value={data.city}
                    className="mt-1 block w-full"
                    onChange={(e) => setData('city', e.target.value)}
                    required
                />
                <InputError message={errors.city} className="mt-2" />
            </div>

            <div className="mt-4">
                <InputLabel htmlFor="website_link" value="Website Link" />
                <TextInput
                    id="website_link"
                    type="url"
                    name="website_link"
                    value={data.website_link}
                    className="mt-1 block w-full"
                    onChange={(e) => setData('website_link', e.target.value)}
                />
                <InputError message={errors.website_link} className="mt-2" />
            </div>

            <div className="mt-4">
                <InputLabel htmlFor="bio" value="Bio" />
                <textarea
                    id="bio"
                    name="bio"
                    value={data.bio}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-indigo-600 dark:focus:ring-indigo-600 "
                    rows="4"
                    onChange={(e) => setData('bio', e.target.value)}
                    required
                ></textarea>
                <InputError message={errors.bio} className="mt-2" />
            </div>

            <div className="mt-4 flex items-center justify-end">
                <Link
                    href={route('login')}
                    className="rounded-md text-sm text-gray-600 underline hover:text-gray-900"
                >
                    Already registered?
                </Link>

                <PrimaryButton className="ms-4" disabled={processing}>
                    Register
                </PrimaryButton>
            </div>
        </form>
    );
}
