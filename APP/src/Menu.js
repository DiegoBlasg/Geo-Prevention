import { useState } from 'react';
import {Link} from 'react-router-dom';
export default function Menu() {
    const [sowPhoneMenu, setSowPhoneMenu] = useState(false)
    return (
        <div>
            
            <div className="w-full sm:w-auto sm:h-screen flex fixed z-50">
                <div className="w-full flex sm:flex-col justify-between items-center bg-zinc-900 text-gray-700 shadow sm:h-full">

                    <a href="/">
                        <img className="m-2 sm:m-0 sm:mt-4 w-14 mx-auto" src="/black.png" alt="logo" />
                    </a>
                    <div className='sm:hidden flex items-center text-zinc-100 cursor-pointer' onClick={() => setSowPhoneMenu(!sowPhoneMenu)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
                        </svg>
                    </div>
                    <ul className='hidden sm:block'>
                        
                        <li className="hover:bg-zinc-800">
                            <Link to="/" className="text-zinc-100 h-16 px-6 flex justify-center items-center w-fullfocus:text-orange-500">
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-fire" viewBox="0 0 16 16">
                                <path d="M8 16c3.314 0 6-2 6-5.5 0-1.5-.5-4-2.5-6 .25 1.5-1.25 2-1.25 2C11 4 9 .5 6 0c.357 2 .5 4-2 6-1.25 1-2 2.729-2 4.5C2 14 4.686 16 8 16Zm0-1c-1.657 0-3-1-3-2.75 0-.75.25-2 1.25-3C6.125 10 7 10.5 7 10.5c-.375-1.25.5-3.25 2-3.5-.179 1-.25 2 1 3 .625.5 1 1.364 1 2.25C11 14 9.657 15 8 15Z"/>
                            </svg>
                            </Link>
                        </li>
                        <li className="hover:bg-zinc-800">
                            <Link to="/places" className="text-zinc-100 h-16 px-6 flex justify-center items-center w-fullfocus:text-orange-500">
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-geo-alt-fill" viewBox="0 0 16 16">
                                <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
                            </svg>
                            </Link>
                        </li>
                        <li className="hover:bg-zinc-800">
                            <Link to="/estadisticas" className="text-zinc-100 h-16 px-6 flex justify-center items-center w-fullfocus:text-orange-500">
                                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-bar-chart-fill" viewBox="0 0 16 16">
                                    <path d="M1 11a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-3zm5-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V2z"/>
                                </svg>
                            </Link>
                        </li>
                        
                    </ul>
                    <div></div>
                </div>

            </div>
            {
                sowPhoneMenu &&
                <ul className='bg-zinc-900 fixed w-full mt-16 z-10'>
                    <li className="hover:bg-zinc-800">
                        <Link to="/" onClick={() => setSowPhoneMenu(!sowPhoneMenu)} className="text-zinc-100 h-16 px-6 flex justify-center items-center w-full">
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-fire" viewBox="0 0 16 16">
                                <path d="M8 16c3.314 0 6-2 6-5.5 0-1.5-.5-4-2.5-6 .25 1.5-1.25 2-1.25 2C11 4 9 .5 6 0c.357 2 .5 4-2 6-1.25 1-2 2.729-2 4.5C2 14 4.686 16 8 16Zm0-1c-1.657 0-3-1-3-2.75 0-.75.25-2 1.25-3C6.125 10 7 10.5 7 10.5c-.375-1.25.5-3.25 2-3.5-.179 1-.25 2 1 3 .625.5 1 1.364 1 2.25C11 14 9.657 15 8 15Z"/>
                        </svg>
                        </Link>
                    </li>
                    <li className="hover:bg-zinc-800">
                        <Link to="/places" onClick={() => setSowPhoneMenu(!sowPhoneMenu)} className="text-zinc-100 h-16 px-6 flex justify-center items-center w-full">
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-geo-alt-fill" viewBox="0 0 16 16">
                            <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
                        </svg>
                        </Link>
                    </li>
                    <li className="hover:bg-zinc-800">
                        <Link to="/estadisticas" onClick={() => setSowPhoneMenu(!sowPhoneMenu)} className="text-zinc-100 h-16 px-6 flex justify-center items-center w-full">
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-bar-chart-fill" viewBox="0 0 16 16">
                                <path d="M1 11a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-3zm5-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V2z"/>
                            </svg>
                        </Link>
                    </li>

                </ul>
            }
        </div>
    )
}