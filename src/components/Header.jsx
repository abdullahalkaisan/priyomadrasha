import React from 'react'
import LogoutButton from './buttons/LogoutButton';
import CreateButton from './buttons/CreateButton';
import BurgerButton from './buttons/BurgerButton';
import PendingButton from './buttons/PendingButton';
import Logo from './Logo';
import Menu from './Menu';
import BurgerMenu from './buttons/BurgerMenu';
import AdminButton from './buttons/AdminButton';

const Header = () => {
  return (
    <div className="sticky bg-white flex items-center justify-between px-6 py-2 ">
      <div className='flex items-center gap-16'>
        <Logo/>
        <div className='-mb-2'>
          <Menu/>
        </div>
      </div>
      <div className="flex items-center justify-baseline gap-3">
        <PendingButton />
        <CreateButton />
        <AdminButton/>
        {/* <BurgerButton /> */}
        <BurgerMenu/>

        {/* <LogoutButton/> */}
      </div>
    </div>
  );
}

export default Header